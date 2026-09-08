import os
from pathlib import Path
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


def check_case(browser, route, name, query, expected_href, expected_id, width, height):
    page = browser.new_page(viewport={"width": width, "height": height})
    page.goto(BASE + route, wait_until="networkidle", timeout=90000)
    component = page.locator("[data-iberigo-intent-discovery]")
    if component.count() != 1:
        raise AssertionError(f"{route}: expected one intent component, found {component.count()}")
    component.scroll_into_view_if_needed()
    if not component.is_visible():
        raise AssertionError(f"{route}: intent component is not visible")
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

    if width == 375:
        page.screenshot(path=str(OUT / f"{name}-375x844.png"), full_page=True)
    page.close()


def main():
    if not BASE:
        raise SystemExit("PREVIEW_BASE is required")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for case in CASES:
            check_case(browser, *case, 375, 844)
            check_case(browser, *case, 1280, 900)
        browser.close()
    print(f"INTENT DISCOVERY BROWSER PASSED: {len(CASES) * 2} rendered cases")


if __name__ == "__main__":
    main()
