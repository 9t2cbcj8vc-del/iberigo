import os
import time
import urllib.request

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ.get("PREVIEW_BASE", "").rstrip("/")
PATHS = [
    "/start-here/",
    "/es/start-here/",
    "/moving-to-spain/eu-registration/",
    "/es/moving-to-spain/eu-registration/",
    "/guides/eu-registration/",
    "/guides/es/eu-registration/",
    "/guides/living-in-spain/",
    "/guides/es/living-in-spain/",
]


def wait_for_site(timeout=180):
    if not BASE:
        raise AssertionError("PREVIEW_BASE is required")
    deadline = time.time() + timeout
    last = None
    while time.time() < deadline:
        try:
            request = urllib.request.Request(BASE + "/", headers={"User-Agent": "IberiGo-page-toc-smoke"})
            with urllib.request.urlopen(request, timeout=15) as response:
                if 200 <= response.status < 400:
                    return
                last = f"HTTP {response.status}"
        except Exception as exc:
            last = repr(exc)
        time.sleep(3)
    raise AssertionError(f"Preview did not become ready: {last}")


def main():
    wait_for_site()
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1280,900")
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(35)

    try:
        for page_path in PATHS:
            driver.get(BASE + page_path)
            WebDriverWait(driver, 15).until(
                lambda d: d.execute_script("return document.readyState") == "complete"
            )

            toc_count = driver.execute_script(
                "return document.querySelectorAll('[data-guide-toc], .guide-toc, .guide-toc-mobile').length;"
            )
            visible_heading_count = driver.execute_script(
                """
                return [...document.querySelectorAll('strong, summary, h2, h3')]
                  .filter(el => /^(On this page|En esta página)$/i.test((el.textContent || '').trim()))
                  .length;
                """
            )
            if toc_count or visible_heading_count:
                raise AssertionError(
                    f"{page_path}: stale page TOC remains (toc nodes={toc_count}, headings={visible_heading_count})"
                )

            layout_state = driver.execute_script(
                """
                const layouts = [...document.querySelectorAll('.guide-layout')];
                return layouts.map(el => ({
                  single: el.classList.contains('guide-layout--single'),
                  directAside: !!el.querySelector(':scope > .guide-toc')
                }));
                """
            )
            for state in layout_state:
                if not state["directAside"] and not state["single"]:
                    raise AssertionError(f"{page_path}: guide layout still reserves an empty TOC sidebar")

            print(f"PASS no page TOC: {page_path}")

        print("PAGE TOC REMOVAL SMOKE PASSED")
    finally:
        driver.quit()


if __name__ == "__main__":
    main()
