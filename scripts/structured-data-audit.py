import argparse
import concurrent.futures
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
SITE = "https://iberigo.eu"
PREVIEW = os.environ.get("PREVIEW_BASE", "").rstrip("/")
ORG_ID = f"{SITE}/#organization"
WEBSITE_ID = f"{SITE}/#website"
MARKER = "data-iberigo-structured-data"
UA = "IberiGo-structured-data-audit/1.0"
RULES = json.loads((ROOT / "scripts" / "seo-url-ownership.json").read_text(encoding="utf-8"))


def route_file(route: str) -> Path:
    if route == "/":
        return ROOT / "index.html"
    if route.endswith(".html"):
        return ROOT / route.lstrip("/")
    return ROOT / route.lstrip("/") / "index.html"


def clean_text(value: str) -> str:
    return html_lib.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", value or "")).strip())


def attr_from_tag(tag: str, name: str) -> str:
    match = re.search(rf"\b{re.escape(name)}\s*=\s*([\"'])(.*?)\1", tag or "", flags=re.I | re.S)
    return html_lib.unescape(match.group(2).strip()) if match else ""


def tag(html: str, pattern: str) -> str:
    match = re.search(pattern, html, flags=re.I | re.S)
    return match.group(0) if match else ""


def canonical(html: str) -> str:
    return attr_from_tag(tag(html, r"<link\b[^>]*rel=[\"']canonical[\"'][^>]*>"), "href")


def language(html: str) -> str:
    return attr_from_tag(tag(html, r"<html\b[^>]*>"), "lang") or "en"


def title_text(html: str) -> str:
    match = re.search(r"<title[^>]*>([\s\S]*?)</title>", html, flags=re.I)
    return clean_text(match.group(1)) if match else ""


def description(html: str) -> str:
    return attr_from_tag(tag(html, r"<meta\b[^>]*name=[\"']description[\"'][^>]*>"), "content")


def robots(html: str) -> str:
    value = attr_from_tag(tag(html, r"<meta\b[^>]*name=[\"']robots[\"'][^>]*>"), "content")
    return re.sub(r"\s+", "", value.lower()) if value else "index,follow"


def og_type(html: str) -> str:
    return attr_from_tag(tag(html, r"<meta\b[^>]*property=[\"']og:type[\"'][^>]*>"), "content").lower()


def h1_text(html: str) -> str:
    match = re.search(r"<h1\b[^>]*>([\s\S]*?)</h1>", html, flags=re.I)
    return clean_text(match.group(1)) if match else ""


def article_meta_date(html: str, prop: str) -> str:
    return attr_from_tag(tag(html, rf"<meta\b[^>]*property=[\"']{re.escape(prop)}[\"'][^>]*>"), "content")


def extract_schema(html: str):
    matches = re.findall(
        rf"<script\b[^>]*type=[\"']application/ld\+json[\"'][^>]*{MARKER}[^>]*>([\s\S]*?)</script>",
        html,
        flags=re.I,
    )
    if len(matches) != 1:
        raise AssertionError(f"expected exactly one IberiGo JSON-LD block, found {len(matches)}")
    try:
        data = json.loads(matches[0])
    except json.JSONDecodeError as exc:
        raise AssertionError(f"invalid JSON-LD: {exc}") from exc
    if data.get("@context") != "https://schema.org":
        raise AssertionError("JSON-LD @context must be https://schema.org")
    graph = data.get("@graph")
    if not isinstance(graph, list) or not graph:
        raise AssertionError("JSON-LD @graph missing or empty")
    return data, graph


def has_type(node, expected: str) -> bool:
    value = node.get("@type") if isinstance(node, dict) else None
    if isinstance(value, list):
        return expected in value
    return value == expected


def nodes_of_type(graph, expected: str):
    return [node for node in graph if isinstance(node, dict) and has_type(node, expected)]


def page_node(graph):
    nodes = [node for node in graph if isinstance(node, dict) and node.get("@type") in ("WebPage", "CollectionPage")]
    if len(nodes) != 1:
        raise AssertionError(f"expected one WebPage/CollectionPage node, found {len(nodes)}")
    return nodes[0]


def sitemap_routes_from_xml(xml: str):
    routes = []
    for loc in re.findall(r"<loc>\s*(https://iberigo\.eu[^<]*)</loc>", xml, flags=re.I):
        parsed = urlparse(html_lib.unescape(loc.strip()))
        routes.append(parsed.path or "/")
    return list(dict.fromkeys(routes))


def local_sitemap_routes():
    return sitemap_routes_from_xml((ROOT / "sitemap-pages.xml").read_text(encoding="utf-8"))


def validate_page(route: str, html: str):
    can = canonical(html)
    lang = language(html)
    title = title_text(html)
    desc = description(html)
    page_robots = robots(html)
    if "noindex" in page_robots:
        raise AssertionError("sitemap page is noindex")
    if can != f"{SITE}{route}":
        raise AssertionError(f"canonical mismatch: {can!r}")
    if not title or not desc:
        raise AssertionError("title or meta description missing")

    data, graph = extract_schema(html)
    serialized = json.dumps(data, ensure_ascii=False)
    if '"HowTo"' in serialized or '"FAQPage"' in serialized:
        raise AssertionError("deprecated/ineligible HowTo or FAQPage schema present")

    page = page_node(graph)
    if page.get("@id") != f"{can}#webpage":
        raise AssertionError(f"WebPage @id mismatch: {page.get('@id')!r}")
    if page.get("url") != can:
        raise AssertionError(f"WebPage url mismatch: {page.get('url')!r}")
    if page.get("name") != title:
        raise AssertionError(f"WebPage name does not match title: {page.get('name')!r} != {title!r}")
    if page.get("description") != desc:
        raise AssertionError("WebPage description does not match meta description")
    if page.get("inLanguage") != lang:
        raise AssertionError(f"WebPage language mismatch: {page.get('inLanguage')!r} != {lang!r}")
    if page.get("isPartOf") != {"@id": WEBSITE_ID}:
        raise AssertionError("WebPage isPartOf must reference the IberiGo WebSite")

    websites = nodes_of_type(graph, "WebSite")
    orgs = nodes_of_type(graph, "Organization")
    breadcrumbs = nodes_of_type(graph, "BreadcrumbList")
    articles = nodes_of_type(graph, "Article")

    if route == "/":
        if len(websites) != 1 or len(orgs) != 1:
            raise AssertionError("homepage must define exactly one WebSite and one Organization")
        website = websites[0]
        org = orgs[0]
        if website.get("@id") != WEBSITE_ID or website.get("url") != f"{SITE}/" or website.get("name") != "IberiGo":
            raise AssertionError("homepage WebSite identity mismatch")
        if website.get("publisher") != {"@id": ORG_ID}:
            raise AssertionError("WebSite publisher must reference IberiGo Organization")
        if org.get("@id") != ORG_ID or org.get("url") != f"{SITE}/" or org.get("name") != "IberiGo":
            raise AssertionError("homepage Organization identity mismatch")
        if breadcrumbs or articles:
            raise AssertionError("homepage should not claim BreadcrumbList or Article schema")
    else:
        if websites or orgs:
            raise AssertionError("full WebSite/Organization definitions belong on the homepage only")
        if len(breadcrumbs) != 1:
            raise AssertionError(f"expected one BreadcrumbList, found {len(breadcrumbs)}")
        items = breadcrumbs[0].get("itemListElement")
        if not isinstance(items, list) or len(items) < 2:
            raise AssertionError("BreadcrumbList must contain at least two items")
        positions = [item.get("position") for item in items]
        if positions != list(range(1, len(items) + 1)):
            raise AssertionError(f"breadcrumb positions are not consecutive: {positions}")
        if items[0].get("item") != f"{SITE}/" or items[0].get("name") != "IberiGo":
            raise AssertionError("breadcrumb must start at IberiGo homepage")
        if items[-1].get("item") != can:
            raise AssertionError("breadcrumb must end at the canonical page URL")

    source_type = og_type(html)
    if source_type == "article":
        if len(articles) != 1:
            raise AssertionError(f"og:type=article requires exactly one Article node, found {len(articles)}")
        article = articles[0]
        expected_h1 = h1_text(html) or re.sub(r"\s+[—|-]\s+IberiGo\s*$", "", title)
        if article.get("@id") != f"{can}#article" or article.get("url") != can:
            raise AssertionError("Article identity/canonical mismatch")
        if article.get("headline") != expected_h1:
            raise AssertionError(f"Article headline mismatch: {article.get('headline')!r} != {expected_h1!r}")
        if article.get("description") != desc or article.get("inLanguage") != lang:
            raise AssertionError("Article description/language mismatch")
        if article.get("mainEntityOfPage") != {"@id": f"{can}#webpage"}:
            raise AssertionError("Article mainEntityOfPage mismatch")
        if article.get("publisher") != {"@id": ORG_ID}:
            raise AssertionError("Article publisher must reference IberiGo Organization")
        if page.get("mainEntity") != {"@id": f"{can}#article"}:
            raise AssertionError("WebPage mainEntity must reference Article")

        published = article_meta_date(html, "article:published_time")
        modified = article_meta_date(html, "article:modified_time")
        if article.get("datePublished") and article.get("datePublished") != published:
            raise AssertionError("Article datePublished is not backed by exact page metadata")
        if article.get("dateModified") and article.get("dateModified") != modified:
            raise AssertionError("Article dateModified is not backed by exact page metadata")
        if published and article.get("datePublished") != published:
            raise AssertionError("machine-readable published date exists but is missing from Article schema")
        if modified and article.get("dateModified") != modified:
            raise AssertionError("machine-readable modified date exists but is missing from Article schema")
    elif articles:
        raise AssertionError("non-article page must not claim Article schema")


def audit_local():
    failures = []
    routes = local_sitemap_routes()
    for route in routes:
        file = route_file(route)
        if not file.exists():
            failures.append(f"{route}: sitemap target missing: {file.relative_to(ROOT)}")
            continue
        try:
            validate_page(route, file.read_text(encoding="utf-8"))
        except Exception as exc:
            failures.append(f"{route}: {exc}")

    noindex_routes = list(RULES.get("duplicate_aliases", {}).keys()) + list(RULES.get("utility_noindex", []))
    for route in noindex_routes:
        file = route_file(route)
        if not file.exists():
            failures.append(f"{route}: declared noindex route missing")
            continue
        html = file.read_text(encoding="utf-8")
        if MARKER in html:
            failures.append(f"{route}: noindex route must not receive primary structured data")

    if failures:
        raise AssertionError("Local structured-data audit failed:\n" + "\n".join(sorted(failures)))
    print(f"PASS local structured data: {len(routes)} indexable sitemap pages; noindex aliases/utilities stay schema-free")


def fetch(path: str, attempts=8, timeout=25):
    if not PREVIEW:
        raise AssertionError("PREVIEW_BASE is required for preview audit")
    url = PREVIEW + path
    last = None
    for attempt in range(attempts):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=timeout) as response:
                if response.status == 200:
                    return response.read().decode("utf-8")
                last = f"HTTP {response.status}"
        except Exception as exc:
            last = repr(exc)
        if attempt + 1 < attempts:
            time.sleep(min(2 + attempt, 6))
    raise AssertionError(f"Could not fetch {url}: {last}")


def wait_for_preview():
    fetch("/", attempts=20, timeout=20)
    print(f"Preview ready: {PREVIEW}")


def audit_preview():
    wait_for_preview()
    routes = sitemap_routes_from_xml(fetch("/sitemap-pages.xml"))
    failures = []

    def check(route):
        try:
            validate_page(route, fetch(route))
            return None
        except Exception as exc:
            return f"{route}: {exc}"

    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        for result in pool.map(check, routes):
            if result:
                failures.append(result)

    if failures:
        raise AssertionError("Preview structured-data audit failed:\n" + "\n".join(sorted(failures)))
    print(f"PASS deployed structured data: {len(routes)} indexable sitemap pages validated")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", action="store_true")
    parser.add_argument("--preview", action="store_true")
    args = parser.parse_args()
    if not args.local and not args.preview:
        parser.error("choose --local and/or --preview")
    if args.local:
        audit_local()
    if args.preview:
        audit_preview()


if __name__ == "__main__":
    main()
