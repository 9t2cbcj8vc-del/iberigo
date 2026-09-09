import os
from pathlib import Path
from urllib.parse import quote
from playwright.sync_api import sync_playwright

BASE = os.environ.get("PREVIEW_BASE", "").rstrip("/")
OUT = Path("browser-intent-discovery")
OUT.mkdir(exist_ok=True)

CASES = [
    ("/", "home-en", "My visa was approved", "/guides/tie-after-approval/", "tie-after-approval"),
    ("/start-here/", "start-en", "I need a socail security number", "/guides/social-security/", "social-security"),
    ("/es/start-here/", "start-es", "necesito empadronaminto", "/guides/es/padron/", "padron"),
]


def assert_no_overflow(page, route):
    metrics = page.evaluate("""() => ({
      doc: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
      body: document.body.scrollWidth
    })""")
    if metrics["doc"] > metrics["viewport"] + 1 or metrics["body"] > metrics["viewport"] + 1:
        raise AssertionError(f"{route}: horizontal overflow {metrics}")


def assert_early_placement(page, route, component):
    placement = component.evaluate("""(node) => ({
      parentId: node.parentElement?.id || '',
      parentClass: node.parentElement?.className || '',
      prevClass: node.previousElementSibling?.className || '',
      prevTag: node.previousElementSibling?.tagName || '',
      nextClass: node.nextElementSibling?.className || '',
      nextTag: node.nextElementSibling?.tagName || ''
    })""")
    if route == "/":
        if "guide-card-panel" not in placement["parentClass"]:
            raise AssertionError(f"{route}: discovery is not inside the homepage intro panel: {placement}")
        if "section-heading" not in placement["prevClass"]:
            raise AssertionError(f"{route}: discovery must immediately follow the homepage intro heading: {placement}")
    else:
        if "guide-hero" not in placement["prevClass"]:
            raise AssertionError(f"{route}: discovery must be directly after the hero: {placement}")
        if "guide-section" not in placement["nextClass"] and "guide-toc-mobile" not in placement["nextClass"]:
            raise AssertionError(f"{route}: discovery must be before the first guide section (or local mobile TOC): {placement}")


def check_case(browser, route, name, query, expected_href, expected_id, width, height):
    page = browser.new_page(viewport={"width": width, "height": height})
    page.goto(BASE + route, wait_until="networkidle", timeout=90000)
    component = page.locator("[data-iberigo-intent-discovery]")
    if component.count() != 1:
        raise AssertionError(f"{route}: expected one intent component, found {component.count()}")
    if not component.is_visible():
        raise AssertionError(f"{route}: intent component is not visible")
    assert_early_placement(page, route, component)
    assert_no_overflow(page, route)

    box = component.bounding_box()
    if not box or box["x"] < -1 or box["x"] + box["width"] > width + 1:
        raise AssertionError(f"{route}: component escapes viewport: {box}, width={width}")

    input_el = component.locator("[data-intent-input]")
    input_el.fill(query)
    primary = component.locator(".intent-discovery-result.is-primary")
    primary.wait_for(state="visible", timeout=5000)
    href = primary.get_attribute("href")
    result_id = primary.get_attribute("data-intent-result")
    if href != expected_href or result_id != expected_id:
        raise AssertionError(f"{route} {query!r}: expected {expected_id} {expected_href}, got {result_id} {href}")

    fallback = component.locator("[data-intent-fallback]")
    if not fallback.is_visible():
        raise AssertionError(f"{route}: full-search fallback is not visible")
    expected_fallback = f"/search/?q={quote(query)}"
    actual_fallback = fallback.get_attribute("href")
    if actual_fallback != expected_fallback:
        raise AssertionError(f"{route}: fallback did not preserve query; expected {expected_fallback}, got {actual_fallback}")

    if width == 375:
        page.screenshot(path=str(OUT / f"{name}-375x844.png"), full_page=True)
    page.close()


def check_full_search_handoff(browser):
    query = "purple umbrella moon paperwork"
    page = browser.new_page(viewport={"width": 375, "height": 844})
    page.goto(f"{BASE}/search/?q={quote(query)}", wait_until="networkidle", timeout=90000)
    search_input = page.locator("#siteSearch")
    search_input.wait_for(state="visible", timeout=5000)
    if search_input.input_value() != query:
        raise AssertionError(f"Full search did not prefill handoff query: {search_input.input_value()!r}")
    assert_no_overflow(page, "/search/")
    page.close()


def main():
    if not BASE:
        raise SystemExit("PREVIEW_BASE is required")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for case in CASES:
            check_case(browser, *case, 375, 844)
            check_case(browser, *case, 1280, 900)
        check_full_search_handoff(browser)
        browser.close()
    print(f"INTENT DISCOVERY BROWSER PASSED: {len(CASES) * 2} discovery renders + full-search handoff")


if __name__ == "__main__":
    main()
