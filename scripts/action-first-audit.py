import argparse
import concurrent.futures
import datetime as dt
import html as html_lib
import json
import os
import re
import time
import urllib.error
import urllib.request
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "scripts" / "action-first"
PANEL_MARKER = "data-iberigo-action-first"
STYLE_MARKER = "data-iberigo-action-first-style"
REQUIRED_ITEM_IDS = ("procedure", "where", "select", "forms", "bring", "after")
PLACEHOLDERS = ("Content under editorial review", "TBD", "TODO")


def route_file(route: str) -> Path:
    if route == "/":
        return ROOT / "index.html"
    if route.endswith(".html"):
        return ROOT / route.lstrip("/")
    return ROOT / route.lstrip("/") / "index.html"


def config_files() -> list[Path]:
    return sorted(DATA_DIR.glob("*.json"))


def load_configs() -> list[tuple[Path, dict]]:
    files = config_files()
    if not files:
        raise AssertionError("No action-first configs found")
    loaded = []
    seen_routes = set()
    for file_path in files:
        data = json.loads(file_path.read_text(encoding="utf-8"))
        route = data.get("route", "")
        if not route or route in seen_routes:
            raise AssertionError(f"{file_path.name}: missing or duplicate route {route!r}")
        seen_routes.add(route)
        if data.get("lang") not in {"en", "es"}:
            raise AssertionError(f"{file_path.name}: unsupported language {data.get('lang')!r}")
        ids = [item.get("id") for item in data.get("items", [])]
        if ids != list(REQUIRED_ITEM_IDS):
            raise AssertionError(f"{file_path.name}: action item ids/order={ids!r}, expected {list(REQUIRED_ITEM_IDS)!r}")
        checked = data.get("sourceChecked", "")
        try:
            checked_date = dt.date.fromisoformat(checked)
        except ValueError as exc:
            raise AssertionError(f"{file_path.name}: invalid sourceChecked {checked!r}") from exc
        if checked_date > dt.date.today():
            raise AssertionError(f"{file_path.name}: sourceChecked is in the future: {checked}")
        page = route_file(route)
        if not page.exists():
            raise AssertionError(f"{file_path.name}: route target missing: {route}")
        for link in data.get("links", []):
            url = link.get("url", "")
            if not link.get("label") or not url:
                raise AssertionError(f"{file_path.name}: invalid action link")
            parsed = urlparse(url)
            if parsed.scheme and parsed.scheme != "https":
                raise AssertionError(f"{file_path.name}: external links must use HTTPS: {url}")
            if url.startswith("/") and not route_file(parsed.path).exists():
                raise AssertionError(f"{file_path.name}: local action link target missing: {url}")
        loaded.append((file_path, data))

    pairs: dict[str, dict[str, dict]] = {}
    for _, data in loaded:
        pairs.setdefault(data["procedureKey"], {})[data["lang"]] = data
    for key, langs in pairs.items():
        if set(langs) != {"en", "es"}:
            raise AssertionError(f"{key}: action-first procedure must have EN and ES configs")
        en_ids = [item["id"] for item in langs["en"]["items"]]
        es_ids = [item["id"] for item in langs["es"]["items"]]
        if en_ids != es_ids:
            raise AssertionError(f"{key}: EN/ES semantic item ids differ")
    return loaded


def extract_panel(page_label: str, page_html: str) -> str:
    matches = re.findall(
        rf'<section\b(?=[^>]*\b{PANEL_MARKER}\b)[^>]*>[\s\S]*?</section>',
        page_html,
        re.I,
    )
    if len(matches) != 1:
        raise AssertionError(f"{page_label}: expected one action-first panel, found {len(matches)}")
    return matches[0]


def validate_rendered(file_path: Path, data: dict, page_html: str) -> None:
    route = data["route"]
    page_lang = re.search(r'<html\b[^>]*\blang=["\']([^"\']+)["\']', page_html, re.I)
    if not page_lang or page_lang.group(1).lower() != data["lang"]:
        raise AssertionError(f"{route}: page language does not match action config")
    if page_html.count(STYLE_MARKER) != 1:
        raise AssertionError(f"{route}: expected one action-first style block")
    panel = extract_panel(route, page_html)
    source = file_path.relative_to(ROOT).as_posix()
    if f'data-action-source="{html_lib.escape(source, quote=True)}"' not in panel:
        raise AssertionError(f"{route}: action source marker does not match {source}")
    if f'data-procedure-key="{html_lib.escape(data["procedureKey"], quote=True)}"' not in panel:
        raise AssertionError(f"{route}: procedure key marker missing")
    for item_id in REQUIRED_ITEM_IDS:
        if f'data-action-item="{item_id}"' not in panel:
            raise AssertionError(f"{route}: rendered action item missing: {item_id}")
    if f'datetime="{data["sourceChecked"]}"' not in panel:
        raise AssertionError(f"{route}: source checked date missing from panel")
    if any(token in panel for token in PLACEHOLDERS):
        raise AssertionError(f"{route}: action panel contains publishing placeholder text")
    for link in data.get("links", []):
        escaped = html_lib.escape(link["url"], quote=True)
        if f'href="{escaped}"' not in panel:
            raise AssertionError(f"{route}: rendered link missing: {link['url']}")
    panel_pos = page_html.find(PANEL_MARKER)
    quick_pos = page_html.find('id="quickAnswer"')
    if quick_pos != -1 and panel_pos > quick_pos:
        raise AssertionError(f"{route}: action card must appear before the detailed guide sections")


def public_html_files() -> list[Path]:
    excluded = {".git", ".github", ".netlify", "node_modules", "outputs", "work"}
    files = []
    for file_path in ROOT.rglob("*.html"):
        rel = file_path.relative_to(ROOT)
        if any(part in excluded for part in rel.parts[:-1]):
            continue
        files.append(file_path)
    return files


def audit_local() -> None:
    configs = load_configs()
    configured_routes = {data["route"] for _, data in configs}
    found_routes = set()
    for file_path, data in configs:
        page_html = route_file(data["route"]).read_text(encoding="utf-8")
        validate_rendered(file_path, data, page_html)
        found_routes.add(data["route"])
    if found_routes != configured_routes:
        raise AssertionError("Not every action-first route rendered")

    marker_files = []
    for page in public_html_files():
        text = page.read_text(encoding="utf-8")
        if PANEL_MARKER in text:
            marker_files.append(page)
    if len(marker_files) != len(configs):
        rels = [file.relative_to(ROOT).as_posix() for file in marker_files]
        raise AssertionError(f"Action-first marker leaked beyond configured pages: {rels}")
    print(f"ACTION-FIRST LOCAL PASSED: {len(configs)} bilingual route pages across {len(configs) // 2} procedures")


def request_once(url: str) -> tuple[int, str]:
    request = urllib.request.Request(url, headers={"User-Agent": "IberiGo-action-first-audit/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            return response.status, response.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read().decode("utf-8", errors="replace")


def fetch(route: str, base: str, attempts: int = 8) -> str:
    url = base.rstrip("/") + route
    last = None
    for attempt in range(attempts):
        try:
            status, body = request_once(url)
            if status == 200:
                return body
            last = f"HTTP {status}"
        except (urllib.error.URLError, TimeoutError) as exc:
            last = repr(exc)
        time.sleep(min(2 + attempt, 8))
    raise AssertionError(f"Could not fetch {url}: {last}")


def wait_for_preview(base: str, first_route: str) -> None:
    last = None
    for attempt in range(12):
        try:
            home_status, _ = request_once(base.rstrip("/") + "/")
            route_status, route_html = request_once(base.rstrip("/") + first_route)
            if home_status == 200 and route_status == 200 and PANEL_MARKER in route_html:
                return
            last = f"home={home_status}, route={route_status}, marker={PANEL_MARKER in route_html}"
        except (urllib.error.URLError, TimeoutError) as exc:
            last = repr(exc)
        time.sleep(min(3 + attempt, 10))
    raise AssertionError(f"Netlify preview did not become ready with action-first output: {last}")


def audit_preview() -> None:
    base = os.environ["PREVIEW_BASE"].rstrip("/")
    configs = load_configs()
    wait_for_preview(base, configs[0][1]["route"])
    failures = []

    def check(entry: tuple[Path, dict]) -> None:
        file_path, data = entry
        validate_rendered(file_path, data, fetch(data["route"], base))

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        future_map = {pool.submit(check, entry): entry[1]["route"] for entry in configs}
        for future in concurrent.futures.as_completed(future_map):
            route = future_map[future]
            try:
                future.result()
            except Exception as exc:  # noqa: BLE001
                failures.append(f"{route}: {exc}")
    if failures:
        raise AssertionError("Action-first preview failures:\n" + "\n".join(sorted(failures)))
    print(f"ACTION-FIRST PREVIEW PASSED: {len(configs)} bilingual route pages across {len(configs) // 2} procedures")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", action="store_true")
    parser.add_argument("--preview", action="store_true")
    args = parser.parse_args()
    if not args.local and not args.preview:
        parser.error("choose --local or --preview")
    if args.local:
        audit_local()
    if args.preview:
        audit_preview()


if __name__ == "__main__":
    main()
