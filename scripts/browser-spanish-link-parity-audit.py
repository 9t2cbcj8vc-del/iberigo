#!/usr/bin/env python3
import argparse
import pathlib
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright

OUT = pathlib.Path("browser-spanish-parity")
OUT.mkdir(exist_ok=True)

PAGES = {
    "/es/moving-to-spain/eu-citizens/": [
        "/es/moving-to-spain/healthcare/",
        "/es/moving-to-spain/registering-on-the-padron/",
        "/es/moving-to-spain/eu-registration/",
    ],
    "/es/moving-to-spain/non-eu-citizens/": [
        "/guides/es/padron/",
        "/guides/es/banking/",
        "/guides/es/digital/",
        "/guides/es/taxes/",
        "/guides/es/tie/",
    ],
    "/es/start-here/": [],
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
                    page.close(); continue
                page.wait_for_timeout(700)
                scroll_width = page.evaluate("document.documentElement.scrollWidth")
                client_width = page.evaluate("document.documentElement.clientWidth")
                if scroll_width > client_width + 1:
                    failures.append(f"{route} {width}px: horizontal overflow {scroll_width}>{client_width}")

                hrefs = page.locator("a[href]").evaluate_all("els => els.map(a => a.getAttribute('href'))")
                for href in expected:
                    if href not in hrefs:
                        failures.append(f"{route} {width}px: missing Spanish href {href}")

                if route.endswith("/eu-citizens/"):
                    forbidden = ["/moving-to-spain/healthcare/", "/moving-to-spain/registering-on-the-padron/"]
                    for href in forbidden:
                        if href in hrefs:
                            failures.append(f"{route} {width}px: avoidable English href still rendered {href}")

                safe_name = route.strip("/").replace("/", "-") or "root"
                page.screenshot(path=str(OUT / f"{safe_name}-{width}x{height}.png"), full_page=True)
                page.close()
        browser.close()

    if failures:
        raise AssertionError("Spanish parity browser audit failed:\n" + "\n".join(failures))
    print(f"PASS browser: {len(PAGES)} Spanish journeys verified at {len(VIEWPORTS)} viewports")


if __name__ == "__main__":
    main()
