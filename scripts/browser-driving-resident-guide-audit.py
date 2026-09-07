#!/usr/bin/env python3
import argparse
import pathlib
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright

OUT = pathlib.Path("browser-driving-resident")
OUT.mkdir(exist_ok=True)

PAGES = {
    "/living-in-spain/driving/": {
        "lang": "en",
        "heading": "Driving in Spain as a new resident",
        "exchange": "https://sede.dgt.gob.es/es/permisos-de-conducir/canjes-de-permisos/canjes-de-permisos-extranjeros/",
        "appointment": "https://sede.dgt.gob.es/es/otros-tramites/cita-previa",
        "detail": "/guides/driving-licence-exchange/",
    },
    "/es/living-in-spain/driving/": {
        "lang": "es",
        "heading": "Conducir en España como nuevo residente",
        "exchange": "https://sede.dgt.gob.es/es/permisos-de-conducir/canjes-de-permisos/canjes-de-permisos-extranjeros/",
        "appointment": "https://sede.dgt.gob.es/es/otros-tramites/cita-previa",
        "detail": "/guides/es/driving-licence-exchange/",
    },
}
VIEWPORTS = [(375, 844), (1280, 900)]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", required=True)
    args = parser.parse_args()
    base = args.base.rstrip("/") + "/"

    failures = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        for route, expected in PAGES.items():
            for width, height in VIEWPORTS:
                page = browser.new_page(viewport={"width": width, "height": height})
                response = page.goto(urljoin(base, route.lstrip("/")), wait_until="domcontentloaded", timeout=45000)
                if not response or response.status >= 400:
                    failures.append(f"{route} {width}px: HTTP {response.status if response else 'no response'}")
                    page.close()
                    continue
                page.wait_for_timeout(700)

                html_lang = page.locator("html").get_attribute("lang")
                if html_lang != expected["lang"]:
                    failures.append(f"{route} {width}px: html lang={html_lang!r}, expected {expected['lang']!r}")

                h1 = page.locator("h1#pageTitle")
                if h1.count() != 1 or not h1.is_visible() or expected["heading"] not in h1.inner_text():
                    failures.append(f"{route} {width}px: expected H1 is not visible")

                scroll_width = page.evaluate("document.documentElement.scrollWidth")
                client_width = page.evaluate("document.documentElement.clientWidth")
                if scroll_width > client_width + 1:
                    failures.append(f"{route} {width}px: horizontal overflow {scroll_width}>{client_width}")

                hrefs = page.locator("a[href]").evaluate_all("els => els.map(a => a.href)")
                raw_hrefs = page.locator("a[href]").evaluate_all("els => els.map(a => a.getAttribute('href'))")
                for external in (expected["exchange"], expected["appointment"]):
                    if external not in hrefs:
                        failures.append(f"{route} {width}px: missing visible DGT action {external}")
                if expected["detail"] not in raw_hrefs:
                    failures.append(f"{route} {width}px: missing detailed exchange guide link {expected['detail']}")

                dgt_buttons = page.locator(f'a[href="{expected["exchange"]}"], a[href="{expected["appointment"]}"]')
                if dgt_buttons.count() < 2:
                    failures.append(f"{route} {width}px: expected DGT exchange + appointment actions")
                else:
                    for idx in range(min(2, dgt_buttons.count())):
                        if not dgt_buttons.nth(idx).is_visible():
                            failures.append(f"{route} {width}px: DGT action {idx + 1} is not visible")

                safe_name = route.strip("/").replace("/", "-")
                page.screenshot(path=str(OUT / f"{safe_name}-{width}x{height}.png"), full_page=True)
                page.close()
        browser.close()

    if failures:
        raise AssertionError("Resident driving browser audit failed:\n" + "\n".join(failures))
    print(f"PASS browser: {len(PAGES)} resident-driving pages verified at {len(VIEWPORTS)} viewports")


if __name__ == "__main__":
    main()
