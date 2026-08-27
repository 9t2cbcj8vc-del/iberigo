import argparse
import concurrent.futures
import html as html_lib
import json
import os
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://iberigo.eu"
PREVIEW = os.environ.get("PREVIEW_BASE", "").rstrip("/")
RULES = json.loads((ROOT / "scripts" / "seo-url-ownership.json").read_text(encoding="utf-8"))
UA = "IberiGo-indexing-ownership-audit/1.0"


def route_file(route: str) -> Path:
    if route == "/":
        return ROOT / "index.html"
    if route.endswith(".html"):
        return ROOT / route.lstrip("/")
    return ROOT / route.lstrip("/") / "index.html"


def extract(page: str, pattern: str, label: str):
    match = re.search(pattern, page, flags=re.I | re.S)
    if not match:
        raise AssertionError(f"missing {label}")
    return html_lib.unescape(match.group(1).strip())


def robots(page: str):
    match = re.search(r'<meta\s+name=["\']robots["\'][^>]*content=(["\'])(.*?)\1[^>]*>', page, flags=re.I | re.S)
    return match.group(2).lower().replace(" ", "") if match else "index,follow"


def canonical(page: str):
    return extract(page, r'<link\s+rel=["\']canonical["\'][^>]*href=(["\'])(.*?)\1[^>]*>', "canonical") if False else _canonical(page)


def _canonical(page: str):
    match = re.search(r'<link\s+rel=["\']canonical["\'][^>]*href=(["\'])(.*?)\1[^>]*>', page, flags=re.I | re.S)
    if not match:
        raise AssertionError("missing canonical")
    return html_lib.unescape(match.group(2).strip())


def title(page: str):
    return extract(page, r"<title>([\s\S]*?)</title>", "title")


def description(page: str):
    match = re.search(r'<meta\s+name=["\']description["\'][^>]*content=(["\'])(.*?)\1[^>]*>', page, flags=re.I | re.S)
    return html_lib.unescape(match.group(2).strip()) if match else ""


def hreflang(page: str, lang: str):
    pattern = rf'<link\s+rel=["\']alternate["\'][^>]*hreflang=["\']{re.escape(lang)}["\'][^>]*href=(["\'])(.*?)\1[^>]*>'
    match = re.search(pattern, page, flags=re.I | re.S)
    if not match:
        # Accept attributes in the opposite order.
        pattern = rf'<link\s+[^>]*href=(["\'])(.*?)\1[^>]*hreflang=["\']{re.escape(lang)}["\'][^>]*>'
        match = re.search(pattern, page, flags=re.I | re.S)
    return html_lib.unescape(match.group(2).strip()) if match else None


def sitemap_routes(text: str):
    routes = set()
    for loc in re.findall(r"<loc>\s*([^<]+)\s*</loc>", text, flags=re.I):
        url = urllib.parse.urlparse(html_lib.unescape(loc.strip()))
        if f"{url.scheme}://{url.netloc}" == SITE:
            routes.add(url.path)
    return routes


def read_local(route: str):
    file = route_file(route)
    if not file.exists():
        raise AssertionError(f"missing source file for {route}: {file.relative_to(ROOT)}")
    return file.read_text(encoding="utf-8")


def assert_self_canonical(route: str, page: str):
    path = urllib.parse.urlparse(_canonical(page)).path
    if path.rstrip("/") != route.rstrip("/"):
        raise AssertionError(f"canonical {path!r} is not self-canonical for {route!r}")


def audit_registered(read_page, sitemaps, redirects_text):
    failures = []
    all_sitemap = set().union(*sitemaps.values())

    for route in RULES["primary_indexable"]:
        try:
            page = read_page(route)
            if "noindex" in robots(page):
                raise AssertionError("declared primary is noindex")
            assert_self_canonical(route, page)
            if route not in all_sitemap:
                raise AssertionError("declared primary is missing from sitemap")
        except Exception as exc:
            failures.append(f"PRIMARY {route}: {exc}")

    for alias, primary in RULES["duplicate_aliases"].items():
        try:
            page = read_page(alias)
            if "noindex" not in robots(page):
                raise AssertionError("duplicate alias is indexable")
            if f'data-seo-primary="{primary}"' not in page:
                raise AssertionError(f"ownership marker does not point to {primary}")
            if alias in all_sitemap:
                raise AssertionError("duplicate alias remains in sitemap")
            primary_page = read_page(primary)
            if "noindex" in robots(primary_page):
                raise AssertionError("primary target is noindex")
            assert_self_canonical(primary, primary_page)
        except Exception as exc:
            failures.append(f"ALIAS {alias}: {exc}")

    for route in RULES["utility_noindex"]:
        try:
            page = read_page(route)
            if "noindex" not in robots(page):
                raise AssertionError("utility page is indexable")
            if route in all_sitemap:
                raise AssertionError("utility page remains in sitemap")
        except Exception as exc:
            failures.append(f"UTILITY {route}: {exc}")

    for alias, target in RULES["redirect_aliases"].items():
        try:
            if alias in all_sitemap:
                raise AssertionError("redirect source remains in sitemap")
            pattern = rf"(?m)^\s*{re.escape(alias)}\s+{re.escape(target)}\s+301!?\s*$"
            if not re.search(pattern, redirects_text):
                raise AssertionError("missing permanent redirect rule")
            target_page = read_page(target)
            if "noindex" in robots(target_page):
                raise AssertionError("redirect target is noindex")
        except Exception as exc:
            failures.append(f"REDIRECT {alias}: {exc}")

    for en_route, es_route in RULES["hreflang_pairs"]:
        try:
            en = read_page(en_route)
            es = read_page(es_route)
            if urllib.parse.urlparse(hreflang(en, "es") or "").path != es_route:
                raise AssertionError("English page does not point to canonical Spanish alternate")
            if urllib.parse.urlparse(hreflang(es, "en") or "").path != en_route:
                raise AssertionError("Spanish page does not point back to canonical English alternate")
        except Exception as exc:
            failures.append(f"HREFLANG {en_route} <-> {es_route}: {exc}")

    return failures


def audit_sitemap_pages(read_page, sitemap_routes_set):
    failures = []
    seen_canonicals = {}
    seen_titles = {}
    seen_descriptions = {}
    for route in sorted(sitemap_routes_set):
        try:
            page = read_page(route)
            if "noindex" in robots(page):
                raise AssertionError("sitemap URL is noindex")
            assert_self_canonical(route, page)
            can = urllib.parse.urlparse(_canonical(page)).path.rstrip("/") or "/"
            if can in seen_canonicals and seen_canonicals[can] != route:
                raise AssertionError(f"canonical also owned by {seen_canonicals[can]}")
            seen_canonicals[can] = route

            page_title = " ".join(title(page).split())
            if page_title in seen_titles and seen_titles[page_title] != route:
                raise AssertionError(f"duplicate title with {seen_titles[page_title]}: {page_title}")
            seen_titles[page_title] = route

            desc = " ".join(description(page).split())
            if desc and desc in seen_descriptions and seen_descriptions[desc] != route:
                raise AssertionError(f"duplicate meta description with {seen_descriptions[desc]}")
            if desc:
                seen_descriptions[desc] = route
        except Exception as exc:
            failures.append(f"SITEMAP {route}: {exc}")
    return failures


def audit_local():
    sitemaps = {
        name: sitemap_routes((ROOT / name).read_text(encoding="utf-8"))
        for name in ("sitemap-pages.xml", "sitemap.xml")
    }
    failures = audit_registered(read_local, sitemaps, (ROOT / "_redirects").read_text(encoding="utf-8"))
    failures += audit_sitemap_pages(read_local, set().union(*sitemaps.values()))
    if failures:
        raise AssertionError("Local SEO ownership audit failed:\n" + "\n".join(sorted(failures)))
    print(f"PASS local SEO ownership audit: {len(set().union(*sitemaps.values()))} sitemap URLs")


def fetch(url: str, timeout=20, retries=3):
    last = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=timeout) as response:
                return response.status, response.geturl(), response.read().decode("utf-8", errors="replace")
        except Exception as exc:
            last = exc
            if attempt + 1 < retries:
                time.sleep(1.5 * (attempt + 1))
    raise last


def wait_preview(base: str, timeout=180):
    deadline = time.time() + timeout
    last = None
    while time.time() < deadline:
        try:
            status, _, _ = fetch(base + "/", timeout=10, retries=1)
            if status == 200:
                return
        except Exception as exc:
            last = exc
        time.sleep(3)
    raise RuntimeError(f"preview not ready: {last}")


def audit_preview(base: str):
    wait_preview(base)
    sitemap_text = {}
    sitemap_sets = {}
    for name in ("sitemap-pages.xml", "sitemap.xml"):
        status, _, body = fetch(f"{base}/{name}")
        if status != 200:
            raise AssertionError(f"{name} returned {status}")
        sitemap_text[name] = body
        sitemap_sets[name] = sitemap_routes(body)

    cache = {}
    def read_page(route):
        if route not in cache:
            status, _, body = fetch(base + route)
            if status != 200:
                raise AssertionError(f"HTTP {status}")
            cache[route] = body
        return cache[route]

    status, _, redirects_body = 200, base, (ROOT / "_redirects").read_text(encoding="utf-8")
    failures = audit_registered(read_page, sitemap_sets, redirects_body)

    routes = sorted(set().union(*sitemap_sets.values()))
    def check(route):
        page = read_page(route)
        if "noindex" in robots(page):
            raise AssertionError("sitemap URL is noindex")
        assert_self_canonical(route, page)
        return route

    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        futures = {pool.submit(check, route): route for route in routes}
        for future in concurrent.futures.as_completed(futures):
            route = futures[future]
            try:
                future.result()
            except Exception as exc:
                failures.append(f"SITEMAP {route}: {exc}")

    if failures:
        raise AssertionError("Preview SEO ownership audit failed:\n" + "\n".join(sorted(failures)))
    print(f"PASS deployed-preview SEO ownership audit: {len(routes)} sitemap URLs")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", action="store_true")
    parser.add_argument("--preview", action="store_true")
    parser.add_argument("--base", default=PREVIEW)
    args = parser.parse_args()
    if not args.local and not args.preview:
        args.local = True
    if args.local:
        audit_local()
    if args.preview:
        if not args.base:
            raise SystemExit("PREVIEW_BASE or --base required")
        audit_preview(args.base.rstrip("/"))


if __name__ == "__main__":
    main()
