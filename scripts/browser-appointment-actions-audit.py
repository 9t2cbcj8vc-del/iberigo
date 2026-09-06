#!/usr/bin/env python3
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get("PREVIEW_BASE", "").rstrip("/")
if not BASE:
    raise SystemExit("PREVIEW_BASE is required")

OUT = Path("browser-appointment-actions")
OUT.mkdir(exist_ok=True)

ROUTES = [
    ("tax-en", "/guides/taxes/", "taxes-spain"),
    ("tax-es", "/guides/es/taxes/", "taxes-spain"),
    ("social-en", "/guides/social-security/", "social-security-number"),
    ("social-es", "/guides/es/social-security/", "social-security-number"),
    ("eu-en", "/moving-to-spain/eu-citizens/", "eu-roadmap-cita"),
    ("eu-es", "/es/moving-to-spain/eu-citizens/", "eu-roadmap-cita-es"),
    ("non-eu-en", "/moving-to-spain/non-eu-citizens/", "non-eu-roadmap-tie-cita"),
    ("non-eu-es", "/es/moving-to-spain/non-eu-citizens/", "non-eu-roadmap-tie-cita-es"),
    ("padron-en", "/the-spain-files/padron-torrevieja/", "torrevieja-padron-en"),
    ("padron-es", "/the-spain-files/es/padron-torrevieja/", "torrevieja-padron-es"),
]

VIEWPORTS = [("phone", 375, 844), ("desktop", 1280, 900)]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for viewport_name, width, height in VIEWPORTS:
        page = browser.new_page(viewport={"width": width, "height": height})
        for name, route, marker in ROUTES:
            page.goto(BASE + route, wait_until="domcontentloaded", timeout=60000)
            page.wait_for_selector(f'[data-iberigo-appointment-action="{marker}"]', timeout=20000)
            locator = page.locator(f'[data-iberigo-appointment-action="{marker}"]')
            if locator.count() != 1:
                raise AssertionError(f"{route}: expected one {marker} appointment action, got {locator.count()}")
            locator.scroll_into_view_if_needed()
            if not locator.is_visible():
                raise AssertionError(f"{route}: appointment action is not visible")
            box = locator.bounding_box()
            if not box:
                raise AssertionError(f"{route}: appointment action has no bounding box")
            if box["x"] < -1 or box["x"] + box["width"] > width + 1:
                raise AssertionError(f"{route}: appointment action overflows viewport: {box}")
            scroll_width = page.evaluate("document.documentElement.scrollWidth")
            if scroll_width > width + 1:
                raise AssertionError(f"{route}: page horizontally overflows ({scroll_width}px > {width}px)")
            if viewport_name == "phone" and name in {"tax-en", "social-en", "eu-en", "non-eu-en", "padron-en"}:
                page.screenshot(path=str(OUT / f"{name}-{width}x{height}.png"), full_page=True)
            print(f"PASS {viewport_name} {name}: action visible, scrollWidth={scroll_width}")
        page.close()
    browser.close()
