import argparse
import concurrent.futures
import datetime as dt
import json
import os
import re
import subprocess
import time
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://iberigo.eu"
MARKER = "data-iberigo-freshness"
VISIBLE_MARKER = "data-iberigo-freshness-visible"
SITEMAPS = ("sitemap.xml", "sitemap-pages.xml")
MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
MONTHS_ES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]


def route_file(route: str) -> Path:
    if route == "/":
        return ROOT / "index.html"
    if route.endswith(".html"):
        return ROOT / route.lstrip("/")
    return ROOT / route.lstrip("/") / "index.html"


def git_last_modified(route: str) -> str:
    file_path = route_file(route)
    rel = file_path.relative_to(ROOT).as_posix()
    value = subprocess.check_output(
        ["git", "log", "-1", "--format=%cs", "--", rel],
        cwd=ROOT,
        text=True,
    ).strip()
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        raise AssertionError(f"{route}: no trustworthy Git last-modified date for {rel}")
    return value


def parse_sitemap_text(xml_text: str) -> dict[str, str]:
    root = ET.fromstring(xml_text)
    namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    result = {}
    for url in root.findall(f"{namespace}url"):
        loc = (url.findtext(f"{namespace}loc") or "").strip()
        lastmod = (url.findtext(f"{namespace}lastmod") or "").strip()
        if not loc.startswith(SITE):
            continue
        result[urlparse(loc).path] = lastmod
    return result


def parse_local_sitemap(file_name: str) -> dict[str, str]:
    return parse_sitemap_text((ROOT / file_name).read_text(encoding="utf-8"))


def meta_content(html: str, key: str, attr: str = "name") -> str:
    patterns = [
        rf'<meta\b(?=[^>]*\b{attr}=["\']{re.escape(key)}["\'])[^>]*\bcontent=["\']([^"\']*)["\'][^>]*>',
        rf'<meta\b(?=[^>]*\bcontent=["\']([^"\']*)["\'])[^>]*\b{attr}=["\']{re.escape(key)}["\'][^>]*>',
    ]
    for pattern in patterns:
        match = re.search(pattern, html, re.I)
        if match:
            return match.group(1).strip()
    return ""


def extract_lang(html: str) -> str:
    match = re.search(r'<html\b[^>]*\blang=["\']([^"\']+)["\']', html, re.I)
    return match.group(1).lower() if match else "en"


def is_article(html: str) -> bool:
    return meta_content(html, "og:type", "property").lower() == "article"


def visible_date_text(date_value: str, lang: str) -> str:
    parsed = dt.date.fromisoformat(date_value)
    if lang.startswith("es"):
        return f"Actualizado {parsed.day} de {MONTHS_ES[parsed.month - 1]} de {parsed.year}"
    return f"Updated {parsed.day} {MONTHS_EN[parsed.month - 1]} {parsed.year}"


def structured_graph(html: str) -> list[dict]:
    scripts = re.findall(
        r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*data-iberigo-structured-data[^>]*>([\s\S]*?)</script>',
        html,
        re.I,
    )
    if not scripts:
        raise AssertionError("missing IberiGo structured-data script")
    data = json.loads(scripts[-1])
    return data.get("@graph", [])


def validate_page(route: str, html: str, expected: str, require_structured: bool = True) -> None:
    if MARKER not in html:
        raise AssertionError(f"{route}: freshness marker missing")
    last_modified = meta_content(html, "last-modified")
    if last_modified != expected:
        raise AssertionError(f"{route}: last-modified={last_modified!r}, expected {expected}")
    if dt.date.fromisoformat(last_modified) > dt.date.today():
        raise AssertionError(f"{route}: last-modified is in the future: {last_modified}")

    if is_article(html):
        article_modified = meta_content(html, "article:modified_time", "property")
        if article_modified != expected:
            raise AssertionError(f"{route}: article:modified_time={article_modified!r}, expected {expected}")
        published_match = re.search(r'<meta\b(?=[^>]*property=["\']article:published_time["\'])[^>]*>', html, re.I)
        if published_match and MARKER in published_match.group(0):
            raise AssertionError(f"{route}: freshness build must not fabricate article:published_time")
        visible = re.search(rf'<span\b[^>]*{VISIBLE_MARKER}[^>]*>([^<]+)</span>', html, re.I)
        if visible:
            wanted = visible_date_text(expected, extract_lang(html))
            if visible.group(1).strip() != wanted:
                raise AssertionError(f"{route}: visible freshness={visible.group(1).strip()!r}, expected {wanted!r}")

    if require_structured:
        graph = structured_graph(html)
        if is_article(html):
            articles = [node for node in graph if node.get("@type") == "Article"]
            if len(articles) != 1:
                raise AssertionError(f"{route}: expected one Article JSON-LD node, found {len(articles)}")
            if articles[0].get("dateModified") != expected:
                raise AssertionError(f"{route}: Article dateModified={articles[0].get('dateModified')!r}, expected {expected}")


def expected_dates(routes: list[str]) -> dict[str, str]:
    shallow = subprocess.check_output(["git", "rev-parse", "--is-shallow-repository"], cwd=ROOT, text=True).strip()
    if shallow == "true":
        raise AssertionError("Freshness audit requires full Git history; configure actions/checkout with fetch-depth: 0")
    return {route: git_last_modified(route) for route in routes}


def validate_sitemaps(sitemaps: dict[str, dict[str, str]], expected: dict[str, str]) -> None:
    page_routes = set(sitemaps["sitemap-pages.xml"])
    if set(sitemaps["sitemap.xml"]) != page_routes:
        only_main = sorted(set(sitemaps["sitemap.xml"]) - page_routes)
        only_pages = sorted(page_routes - set(sitemaps["sitemap.xml"]))
        raise AssertionError(f"Sitemap route sets differ: sitemap-only={only_main[:5]}, pages-only={only_pages[:5]}")
    if page_routes != set(expected):
        raise AssertionError("Expected Git route set does not match sitemap route set")
    for file_name, values in sitemaps.items():
        for route, wanted in expected.items():
            actual = values.get(route, "")
            if actual != wanted:
                raise AssertionError(f"{file_name} {route}: lastmod={actual!r}, expected {wanted}")
            if dt.date.fromisoformat(actual) > dt.date.today():
                raise AssertionError(f"{file_name} {route}: future lastmod {actual}")


def excluded_routes() -> list[str]:
    policy = json.loads((ROOT / "scripts" / "seo-url-ownership.json").read_text(encoding="utf-8"))
    routes = list(policy.get("duplicate_aliases", {}).keys())
    routes += list(policy.get("utility_noindex", []))
    return sorted(set(routes))


def validate_excluded_html(route: str, html: str) -> None:
    if MARKER in html or VISIBLE_MARKER in html:
        raise AssertionError(f"{route}: noindex/utility page must not receive freshness markup")


def fetch(path: str, base: str, attempts: int = 8) -> str:
    url = base.rstrip("/") + path
    last = None
    for attempt in range(attempts):
        try:
            request = urllib.request.Request(url, headers={"User-Agent": "IberiGo-content-freshness-audit/1.0"})
            with urllib.request.urlopen(request, timeout=25) as response:
                if response.status == 200:
                    return response.read().decode("utf-8")
                last = f"HTTP {response.status}"
        except Exception as exc:
            last = repr(exc)
        time.sleep(min(2 + attempt, 8))
    raise AssertionError(f"Could not fetch {url}: {last}")


def audit_local() -> None:
    sitemaps = {name: parse_local_sitemap(name) for name in SITEMAPS}
    routes = list(sitemaps["sitemap-pages.xml"])
    expected = expected_dates(routes)
    validate_sitemaps(sitemaps, expected)
    for route in routes:
        html = route_file(route).read_text(encoding="utf-8")
        validate_page(route, html, expected[route])
    for route in excluded_routes():
        file_path = route_file(route)
        if file_path.exists():
            validate_excluded_html(route, file_path.read_text(encoding="utf-8"))
    print(f"CONTENT FRESHNESS LOCAL PASSED: {len(routes)} indexable pages")


def audit_preview() -> None:
    base = os.environ["PREVIEW_BASE"].rstrip("/")
    local_routes = list(parse_local_sitemap("sitemap-pages.xml"))
    expected = expected_dates(local_routes)
    remote_sitemaps = {name: parse_sitemap_text(fetch(f"/{name}", base)) for name in SITEMAPS}
    validate_sitemaps(remote_sitemaps, expected)

    failures = []

    def check(route: str) -> None:
        validate_page(route, fetch(route, base), expected[route])

    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        future_map = {pool.submit(check, route): route for route in local_routes}
        for future in concurrent.futures.as_completed(future_map):
            route = future_map[future]
            try:
                future.result()
            except Exception as exc:
                failures.append(f"{route}: {exc}")

    if failures:
        raise AssertionError("Preview freshness failures:\n" + "\n".join(sorted(failures)))

    for route in excluded_routes():
        try:
            html = fetch(route, base, attempts=4)
        except AssertionError:
            continue
        validate_excluded_html(route, html)
    print(f"CONTENT FRESHNESS PREVIEW PASSED: {len(local_routes)} indexable pages")


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
