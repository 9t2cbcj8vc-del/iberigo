import argparse
import os
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VISUAL_MARKER = "data-iberigo-visual-ux-cleanup"
STATIC_MARKER = 'data-iberigo-static-action-guide="true"'
STATIC_STYLE = "data-iberigo-static-action-guide-style"
ACTION_CARD_MARKER = '<section class="action-first-card" data-iberigo-action-first'
LEGACY_ROUTES = (
    "/guides/nie/",
    "/guides/es/nie/",
    "/guides/tie/",
    "/guides/es/tie/",
)
DUPLICATE_HEADINGS = (
    "Next 3 steps", "Forms and documents", "Official source links",
    "Próximos 3 pasos", "Formularios y documentos", "Enlaces oficiales",
)


def route_file(route: str) -> Path:
    if route == "/": return ROOT / "index.html"
    return ROOT / route.lstrip("/") / "index.html"


def assert_global_visual_css(label: str, html: str) -> None:
    if html.count(VISUAL_MARKER) != 1:
        raise AssertionError(f"{label}: expected one visual UX marker")
    for token in ("overflow-x: auto", "flex-basis: auto !important", "scroll-margin-top: 112px"):
        if token not in html: raise AssertionError(f"{label}: missing mobile rule {token}")


def assert_static_action_guide(route: str, html: str, preview: bool) -> None:
    if html.count(ACTION_CARD_MARKER) != 1:
        raise AssertionError(f"{route}: expected exactly one action-first card")
    if STATIC_MARKER not in html or html.count(STATIC_STYLE) != 1:
        raise AssertionError(f"{route}: static direct-guide layout marker missing")
    if "app.js" in html:
        raise AssertionError(f"{route}: legacy app.js must not load on static action guide")
    if 'grid-template-columns: minmax(0, 1fr) !important' not in html:
        raise AssertionError(f"{route}: one-column direct-guide override missing")
    panel_pos = html.find(ACTION_CARD_MARKER)
    hero_pos = html.find('class="result-hero"')
    intro_pos = html.find("data-crawler-guide-intro")
    if not (intro_pos != -1 and hero_pos != -1 and intro_pos < panel_pos < hero_pos):
        raise AssertionError(f"{route}: expected intro -> action card -> explanation order")
    for heading in DUPLICATE_HEADINGS:
        if f"<strong>{heading}</strong>" in html:
            raise AssertionError(f"{route}: duplicate filing block remains: {heading}")


def audit_local() -> None:
    assert_global_visual_css("/", route_file("/").read_text(encoding="utf-8"))
    for route in LEGACY_ROUTES:
        html = route_file(route).read_text(encoding="utf-8")
        assert_global_visual_css(route, html)
        assert_static_action_guide(route, html, preview=False)
    print("VISUAL UX LOCAL PASSED: static-first NIE/TIE guides verified")


def request_once(url: str) -> tuple[int, str]:
    request = urllib.request.Request(url, headers={"User-Agent": "IberiGo-visual-ux-audit/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            return response.status, response.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read().decode("utf-8", errors="replace")


def fetch(url: str, marker: str, attempts: int = 10) -> str:
    last = None
    for attempt in range(attempts):
        try:
            status, body = request_once(url)
            if status == 200 and marker in body: return body
            last = f"HTTP {status}, marker={marker in body}"
        except (urllib.error.URLError, TimeoutError) as exc:
            last = repr(exc)
        time.sleep(min(2 + attempt, 8))
    raise AssertionError(f"Could not fetch ready preview {url}: {last}")


def audit_preview() -> None:
    base = os.environ["PREVIEW_BASE"].rstrip("/")
    assert_global_visual_css("preview /", fetch(base + "/", VISUAL_MARKER))
    for route in LEGACY_ROUTES:
        html = fetch(base + route, STATIC_MARKER)
        assert_global_visual_css(f"preview {route}", html)
        assert_static_action_guide(route, html, preview=True)
    print("VISUAL UX PREVIEW PASSED: static-first NIE/TIE HTML verified on Netlify")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", action="store_true")
    parser.add_argument("--preview", action="store_true")
    args = parser.parse_args()
    if not args.local and not args.preview: parser.error("choose --local or --preview")
    if args.local: audit_local()
    if args.preview: audit_preview()


if __name__ == "__main__": main()
