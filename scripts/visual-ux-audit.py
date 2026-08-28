import argparse
import os
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VISUAL_MARKER = "data-iberigo-visual-ux-cleanup"
RUNTIME_MARKER = "data-iberigo-action-first-runtime"
ACTION_CARD_MARKER = '<section class="action-first-card" data-iberigo-action-first'
LEGACY_ROUTES = (
    "/guides/nie/",
    "/guides/es/nie/",
    "/guides/tie/",
    "/guides/es/tie/",
)
DUPLICATE_HEADINGS = (
    "Next 3 steps",
    "Forms and documents",
    "Official source links",
    "Próximos 3 pasos",
    "Formularios y documentos",
    "Enlaces oficiales",
)


def route_file(route: str) -> Path:
    if route == "/":
        return ROOT / "index.html"
    return ROOT / route.lstrip("/") / "index.html"


def assert_global_visual_css(label: str, html: str) -> None:
    if html.count(VISUAL_MARKER) != 1:
        raise AssertionError(f"{label}: expected exactly one visual UX style marker")
    required = (
        "overflow-x: auto",
        "flex-basis: auto !important",
        "scroll-margin-top: 112px",
        ".topbar .search-nav-link { order: -2; }",
        ".topbar .language-switcher",
    )
    for token in required:
        if token not in html:
            raise AssertionError(f"{label}: missing mobile visual UX rule: {token}")


def assert_runtime_js(label: str, js: str) -> None:
    required = (
        RUNTIME_MARKER,
        "bakedActionFirstPage",
        'document.querySelector("[data-iberigo-action-first]")',
        "showDirectGuide();",
        'type: "direct-guide"',
        "directRoute: guideId",
    )
    for token in required:
        if token not in js:
            raise AssertionError(f"{label}: missing client runtime protection: {token}")


def assert_legacy_action_first(route: str, html: str, preview: bool) -> None:
    if html.count(ACTION_CARD_MARKER) != 1:
        raise AssertionError(f"{route}: expected exactly one action-first card")
    panel_pos = html.find(ACTION_CARD_MARKER)
    result_hero_pos = html.find('class="result-hero"')
    if result_hero_pos == -1 or panel_pos > result_hero_pos:
        raise AssertionError(f"{route}: action-first card must appear before the legacy result hero")
    if preview:
        intro_pos = html.find("data-crawler-guide-intro")
        if intro_pos == -1:
            raise AssertionError(f"{route}: deployed page is missing crawler guide introduction")
        if not intro_pos < panel_pos < result_hero_pos:
            raise AssertionError(f"{route}: deployed order must be intro -> action card -> explanation")
    for heading in DUPLICATE_HEADINGS:
        if f"<strong>{heading}</strong>" in html:
            raise AssertionError(f"{route}: duplicate legacy filing block remains: {heading}")


def audit_local() -> None:
    home = route_file("/").read_text(encoding="utf-8")
    assert_global_visual_css("/", home)
    app_js = (ROOT / "app.js").read_text(encoding="utf-8")
    assert_runtime_js("app.js", app_js)
    for route in LEGACY_ROUTES:
        html = route_file(route).read_text(encoding="utf-8")
        assert_global_visual_css(route, html)
        assert_legacy_action_first(route, html, preview=False)
    print("VISUAL UX LOCAL PASSED: compact header, static action cards and baked-DOM runtime path verified")


def request_once(url: str) -> tuple[int, str]:
    request = urllib.request.Request(url, headers={"User-Agent": "IberiGo-visual-ux-audit/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            return response.status, response.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read().decode("utf-8", errors="replace")


def fetch(url: str, ready_marker: str, attempts: int = 10) -> str:
    last = None
    for attempt in range(attempts):
        try:
            status, body = request_once(url)
            if status == 200 and ready_marker in body:
                return body
            last = f"HTTP {status}, marker={ready_marker in body}"
        except (urllib.error.URLError, TimeoutError) as exc:
            last = repr(exc)
        time.sleep(min(2 + attempt, 8))
    raise AssertionError(f"Could not fetch ready preview {url}: {last}")


def audit_preview() -> None:
    base = os.environ["PREVIEW_BASE"].rstrip("/")
    home = fetch(base + "/", VISUAL_MARKER)
    assert_global_visual_css("preview /", home)
    app_js = fetch(base + "/app.js", RUNTIME_MARKER)
    assert_runtime_js("preview app.js", app_js)
    for route in LEGACY_ROUTES:
        html = fetch(base + route, VISUAL_MARKER)
        assert_global_visual_css(f"preview {route}", html)
        assert_legacy_action_first(route, html, preview=True)
    print("VISUAL UX PREVIEW PASSED: raw HTML and baked-DOM client runtime verified on Netlify")


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
