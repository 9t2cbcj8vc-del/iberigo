#!/usr/bin/env python3
import argparse
import concurrent.futures
import pathlib
import re
import time
import urllib.request
from html.parser import HTMLParser
from urllib.parse import urlsplit

ROOT = pathlib.Path(__file__).resolve().parents[1]
SPANISH_ROOTS = [ROOT / "es", ROOT / "guides" / "es", ROOT / "the-spain-files" / "es"]
CONTENT_PREFIXES = (
    "/moving-to-spain/",
    "/living-in-spain/",
    "/guides/",
    "/the-spain-files/",
    "/start-here/",
    "/help-feedback/",
)
SPANISH_ALIASES = {
    "/living-in-spain/digital-certificate/": "/guides/es/digital/",
    "/living-in-spain/social-security/": "/guides/es/social-security/",
    "/living-in-spain/taxes/": "/guides/es/taxes/",
    "/the-spain-files/": "/the-spain-files/es/",
}


class AnchorParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.anchors = []
        self._current = None

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "a":
            return
        attrs_dict = dict(attrs)
        self._current = {"href": attrs_dict.get("href", ""), "attrs": attrs_dict, "text": ""}

    def handle_data(self, data):
        if self._current is not None:
            self._current["text"] += data

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._current is not None:
            self.anchors.append(self._current)
            self._current = None


def route_to_file(route: str) -> pathlib.Path:
    path = urlsplit(route).path
    rel = path.lstrip("/")
    if not rel or rel.endswith("/"):
        rel += "index.html"
    return ROOT / rel


def route_is_spanish(route: str) -> bool:
    file = route_to_file(route)
    if not file.exists() or not file.is_file():
        return False
    try:
        head = file.read_text(encoding="utf-8")[:2400]
    except Exception:
        return False
    return bool(re.search(r"<html\b[^>]*\blang=(['\"])es(?:-[^'\"]+)?\1", head, re.I))


def spanish_counterpart(href: str):
    if not href.startswith("/") or href.startswith("//"):
        return None
    route = urlsplit(href).path
    if route.startswith(("/es/", "/guides/es/", "/the-spain-files/es/")) or route_is_spanish(route):
        return None
    candidates = []
    if route in SPANISH_ALIASES:
        candidates.append(SPANISH_ALIASES[route])
    if route in ("/start-here/", "/start-here/index.html"):
        candidates.append("/es/start-here/")
    if route in ("/help-feedback/", "/help-feedback/index.html"):
        candidates.append("/es/help-feedback/")
    if route in ("/the-spain-files/", "/the-spain-files/index.html"):
        candidates.append("/the-spain-files/es/")
    if route.startswith("/moving-to-spain/"):
        candidates.append("/es" + route)
    if route.startswith("/living-in-spain/"):
        candidates.append("/es" + route)
    if route.startswith("/guides/"):
        candidates.append("/guides/es/" + route[len("/guides/"):])
    if route.startswith("/the-spain-files/") and route != "/the-spain-files/":
        candidates.append("/the-spain-files/es/" + route[len("/the-spain-files/"):])
    for candidate in candidates:
        if route_to_file(candidate).exists():
            return candidate
    return None


def is_language_control(anchor) -> bool:
    attrs = anchor["attrs"]
    classes = attrs.get("class", "") or ""
    text = anchor["text"].strip()
    return (
        "data-lang" in attrs
        or "hreflang" in attrs
        or "language-switch" in classes
        or "lang-switch" in classes
        or text.lower() in ("en", "english")
    )


def spanish_files():
    files = []
    for base in SPANISH_ROOTS:
        if base.exists():
            files.extend(base.rglob("*.html"))
    return sorted(set(files))


def route_for_file(file: pathlib.Path) -> str:
    rel = file.relative_to(ROOT).as_posix()
    if rel.endswith("index.html"):
        rel = rel[:-len("index.html")]
    return "/" + rel


def audit_html(html: str, label: str):
    parser = AnchorParser(); parser.feed(html)
    failures, unresolved = [], []
    for anchor in parser.anchors:
        href = anchor["href"]
        if not href.startswith("/") or href.startswith("//") or is_language_control(anchor):
            continue
        route = urlsplit(href).path
        if route.startswith(("/es/", "/guides/es/", "/the-spain-files/es/")) or route_is_spanish(route):
            continue
        if not route.startswith(CONTENT_PREFIXES):
            continue
        counterpart = spanish_counterpart(href)
        if counterpart:
            failures.append(f"{label}: avoidable English internal link {href} -> {counterpart}")
        else:
            unresolved.append(href)

    has_note = 'aria-labelledby="languageNote"' in html or "aria-labelledby='languageNote'" in html
    if has_note and not unresolved:
        failures.append(f"{label}: stale languageNote remains with no genuine English-only content links")
    return failures, unresolved


def audit_local():
    failures, unresolved = [], []
    files = spanish_files()
    for file in files:
        route = route_for_file(file)
        html = file.read_text(encoding="utf-8")
        page_failures, page_unresolved = audit_html(html, route)
        failures.extend(page_failures)
        unresolved.extend((route, href) for href in page_unresolved)

    specific = {
        ROOT / "es/moving-to-spain/eu-citizens/index.html": [
            "/es/moving-to-spain/healthcare/",
            "/es/moving-to-spain/registering-on-the-padron/",
            "/es/moving-to-spain/eu-registration/",
            "/guides/es/digital/",
            "/guides/es/social-security/",
            "/guides/es/taxes/",
            "/the-spain-files/es/",
        ],
        ROOT / "es/moving-to-spain/non-eu-citizens/index.html": [
            "/guides/es/padron/",
            "/guides/es/banking/",
            "/guides/es/digital/",
            "/guides/es/taxes/",
            "/guides/es/tie/",
            "/the-spain-files/es/",
        ],
        ROOT / "guides/es/banking/index.html": ["/es/start-here/", "/the-spain-files/es/"],
    }
    for file, needles in specific.items():
        html = file.read_text(encoding="utf-8")
        for needle in needles:
            if needle not in html:
                failures.append(f"/{file.relative_to(ROOT).as_posix()}: missing expected Spanish route {needle}")

    stale_label_re = re.compile(r"\((?:solo\s+)?en\s+ingl[eé]s\)", re.I)
    for file in files:
        html = file.read_text(encoding="utf-8")
        parser = AnchorParser(); parser.feed(html)
        for anchor in parser.anchors:
            if stale_label_re.search(anchor["text"]) and spanish_counterpart(anchor["href"]):
                failures.append(f"{route_for_file(file)}: stale '(en inglés)' label on {anchor['href']}")

    if failures:
        raise AssertionError("Spanish parity local audit failed:\n" + "\n".join(failures))
    print(f"PASS local: {len(files)} Spanish HTML pages have no avoidable English internal links")
    unique = sorted(set(unresolved))
    print(f"INFO local: {len(unique)} genuine English-only/internal fallbacks remain")
    for route, href in unique:
        print(f"KEEP {route}: {href}")


def fetch(url: str):
    last = None
    for attempt in range(12):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "IberiGo Spanish parity audit"})
            with urllib.request.urlopen(req, timeout=25) as response:
                return response.read().decode("utf-8")
        except Exception as exc:
            last = exc
            if attempt < 11:
                time.sleep(5)
    raise RuntimeError(f"fetch failed for {url}: {last}")


def audit_preview(base: str):
    routes = [route_for_file(f) for f in spanish_files()]
    failures = []

    def check(route):
        html = fetch(base.rstrip("/") + route)
        parser = AnchorParser(); parser.feed(html)
        page_failures = []
        for anchor in parser.anchors:
            href = anchor["href"]
            if not href.startswith("/") or href.startswith("//") or is_language_control(anchor):
                continue
            target = urlsplit(href).path
            if route_is_spanish(target):
                continue
            counterpart = spanish_counterpart(href)
            if counterpart:
                page_failures.append(f"{route}: deployed avoidable English internal link {href} -> {counterpart}")
        return page_failures

    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        futures = {pool.submit(check, route): route for route in routes}
        for future in concurrent.futures.as_completed(futures):
            route = futures[future]
            try:
                failures.extend(future.result())
            except Exception as exc:
                failures.append(f"{route}: {exc}")

    if failures:
        raise AssertionError("Spanish parity preview audit failed:\n" + "\n".join(failures))
    print(f"PASS preview: {len(routes)} deployed Spanish pages checked for avoidable English internal links")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", action="store_true")
    parser.add_argument("--preview", action="store_true")
    parser.add_argument("--base")
    args = parser.parse_args()
    if args.local:
        audit_local()
    elif args.preview:
        if not args.base:
            raise SystemExit("--base is required with --preview")
        audit_preview(args.base)
    else:
        raise SystemExit("Choose --local or --preview")


if __name__ == "__main__":
    main()
