import argparse
import concurrent.futures
import html as html_lib
import os
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_PREVIEW = os.environ.get("PREVIEW_BASE", "").rstrip("/")
USER_AGENT = "IberiGo-crawler-first-audit/1.0"


def generated_routes(root: Path):
    routes = []
    for file in sorted((root / "guides").rglob("index.html")):
        text = file.read_text(encoding="utf-8")
        if "data-guide-id=" not in text or "data-guide-lang=" not in text:
            continue
        rel = file.relative_to(root).as_posix()
        route = "/" + rel[: -len("index.html")]
        routes.append((route, file))
    if not routes:
        raise AssertionError("No generated guide routes found")
    return routes


def text_content(fragment: str):
    without_tags = re.sub(r"<[^>]+>", " ", fragment)
    return " ".join(html_lib.unescape(without_tags).split())


def attr_content(page: str, pattern: str, label: str):
    match = re.search(pattern, page, flags=re.I | re.S)
    if not match:
        raise AssertionError(f"missing {label}")
    return html_lib.unescape(match.group(1).strip())


def meta_description(page: str):
    match = re.search(
        r"<meta\s+name=[\"']description[\"']\s+content=(\"([^\"]*)\"|'([^']*)')[^>]*>",
        page,
        flags=re.I | re.S,
    )
    if not match:
        raise AssertionError("missing meta description")
    value = match.group(2) if match.group(2) is not None else match.group(3)
    return html_lib.unescape(value.strip())


def tag_with_id(page: str, element_id: str):
    match = re.search(
        rf"<([a-zA-Z0-9-]+)\b[^>]*\bid=(?:\"{re.escape(element_id)}\"|'{re.escape(element_id)}')[^>]*>",
        page,
        flags=re.I,
    )
    if not match:
        raise AssertionError(f"missing #{element_id}")
    return match.group(0)


def assert_hidden(page: str, element_id: str):
    tag = tag_with_id(page, element_id)
    if not re.search(r"\shidden(?:\s|=|>)", tag, flags=re.I):
        raise AssertionError(f"#{element_id} is not hidden in raw guide HTML")


def audit_page(route: str, page: str):
    html_tag = re.search(r"<html\b[^>]*>", page, flags=re.I)
    if not html_tag or 'data-crawler-first="true"' not in html_tag.group(0):
        raise AssertionError("missing data-crawler-first marker")

    title = attr_content(page, r"<title>([\s\S]*?)</title>", "title")
    expected_h1 = re.sub(r"\s+—\s+IberiGo\s*$", "", title, flags=re.I)
    description = meta_description(page)

    canonical = attr_content(
        page,
        r"<link\s+rel=[\"']canonical[\"']\s+href=[\"']([^\"']+)[\"'][^>]*>",
        "canonical",
    )
    canonical_path = urllib.parse.urlparse(canonical).path
    if canonical_path.rstrip("/") != route.rstrip("/"):
        raise AssertionError(f"canonical path {canonical_path!r} does not match {route!r}")

    for language in ("en", "es"):
        if not re.search(rf"hreflang=[\"']{language}[\"']", page, flags=re.I):
            raise AssertionError(f"missing {language} hreflang")

    for element_id in ("guide-cards", "routeWizard"):
        assert_hidden(page, element_id)
    for optional_id in ("documents", "sources"):
        if re.search(rf"\bid=(?:\"{optional_id}\"|'{optional_id}')", page, flags=re.I):
            assert_hidden(page, optional_id)

    result_tag = tag_with_id(page, "wizardResult")
    if re.search(r"\shidden(?:\s|=|>)", result_tag, flags=re.I):
        raise AssertionError("#wizardResult must be visible in raw HTML")
    if "is-empty" in result_tag:
        raise AssertionError("#wizardResult still has is-empty class")

    intro_match = re.search(
        r"<div\b[^>]*data-crawler-guide-intro[^>]*>([\s\S]*?)</div>",
        page,
        flags=re.I,
    )
    if not intro_match:
        raise AssertionError("missing crawler guide intro")
    intro = intro_match.group(1)

    h1_match = re.search(r"<h1\b[^>]*>([\s\S]*?)</h1>", intro, flags=re.I)
    if not h1_match:
        raise AssertionError("crawler guide intro has no H1")
    actual_h1 = text_content(h1_match.group(1))
    if actual_h1 != expected_h1:
        raise AssertionError(f"crawler H1 {actual_h1!r} != title {expected_h1!r}")

    intro_text = text_content(intro)
    if description not in intro_text:
        raise AssertionError("meta description is not present in crawler intro")

    generic_markers = (
        "Your roadmap will appear here",
        "Where should we begin?",
        "Choose a situation card",
        "Tu hoja de ruta aparecerá aquí",
        "¿Por dónde empezamos?",
    )
    if any(marker in intro_text for marker in generic_markers):
        raise AssertionError("generic homepage/roadmap copy leaked into crawler intro")


def fetch(url: str, timeout=30, attempts=3):
    last_error = None
    for attempt in range(1, attempts + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=timeout) as response:
                if response.status != 200:
                    raise AssertionError(f"HTTP {response.status} for {url}")
                return response.read().decode("utf-8", errors="replace")
        except Exception as exc:  # noqa: BLE001
            last_error = exc
            if attempt < attempts:
                time.sleep(attempt * 1.5)
    raise last_error


def wait_for_preview(base: str, timeout=180):
    deadline = time.time() + timeout
    last_error = None
    while time.time() < deadline:
        try:
            fetch(base + "/", timeout=10, attempts=1)
            return
        except Exception as exc:  # noqa: BLE001
            last_error = exc
            time.sleep(3)
    raise RuntimeError(f"Preview did not become ready: {last_error}")


def audit_local(root: Path, routes):
    failures = []
    for route, file in routes:
        try:
            audit_page(route, file.read_text(encoding="utf-8"))
        except Exception as exc:  # noqa: BLE001
            failures.append(f"{route}: {exc}")
    if failures:
        raise AssertionError("Local crawler audit failed:\n" + "\n".join(failures))
    print(f"PASS local raw crawler HTML: {len(routes)} generated guides")


def audit_preview(base: str, routes):
    wait_for_preview(base)
    failures = []

    def check(item):
        route, _ = item
        page = fetch(base + route)
        audit_page(route, page)
        return route

    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        futures = {pool.submit(check, item): item[0] for item in routes}
        for future in concurrent.futures.as_completed(futures):
            route = futures[future]
            try:
                future.result()
            except Exception as exc:  # noqa: BLE001
                failures.append(f"{route}: {exc}")

    if failures:
        failures.sort()
        raise AssertionError("Deployed-preview crawler audit failed:\n" + "\n".join(failures))
    print(f"PASS deployed-preview raw crawler HTML: {len(routes)} generated guides")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", action="store_true")
    parser.add_argument("--preview", action="store_true")
    parser.add_argument("--base", default=DEFAULT_PREVIEW)
    args = parser.parse_args()

    if not args.local and not args.preview:
        args.local = True
    routes = generated_routes(ROOT)

    if args.local:
        audit_local(ROOT, routes)
    if args.preview:
        if not args.base:
            raise SystemExit("PREVIEW_BASE or --base is required for --preview")
        audit_preview(args.base.rstrip("/"), routes)


if __name__ == "__main__":
    main()
