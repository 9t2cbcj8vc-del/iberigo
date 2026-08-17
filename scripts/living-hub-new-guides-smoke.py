import os
import time
import urllib.request

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ.get("PREVIEW_BASE", "").rstrip("/")

CASES = [
    {
        "path": "/guides/living-in-spain/",
        "title": "Residence & documents",
        "links": {
            "/living-in-spain/staying-long-term/": "Staying in Spain long term",
            "/moving-to-spain/documents-apostilles-translations/": "Documents, apostilles & sworn translations",
        },
    },
    {
        "path": "/guides/es/living-in-spain/",
        "title": "Residencia y documentos",
        "links": {
            "/es/living-in-spain/staying-long-term/": "Vivir en España a largo plazo",
            "/es/moving-to-spain/documents-apostilles-translations/": "Documentos, apostillas y traducciones juradas",
        },
    },
]


def wait_for_site(timeout=180):
    if not BASE:
        raise AssertionError("PREVIEW_BASE is required")
    deadline = time.time() + timeout
    last = None
    while time.time() < deadline:
        try:
            req = urllib.request.Request(BASE + "/", headers={"User-Agent": "IberiGo-living-hub-runtime-smoke"})
            with urllib.request.urlopen(req, timeout=15) as response:
                if 200 <= response.status < 400:
                    return
                last = f"HTTP {response.status}"
        except Exception as exc:
            last = repr(exc)
        time.sleep(3)
    raise AssertionError(f"Preview did not become ready: {last}")


def assert_case(driver, case):
    driver.get(BASE + case["path"])
    WebDriverWait(driver, 25).until(
        lambda d: d.execute_script(
            "return Boolean(document.querySelector('[data-new-guide-cluster=\"long-term-documents\"]'));"
        )
    )

    rendered = driver.execute_script(
        """
        const group = document.querySelector('[data-new-guide-cluster="long-term-documents"]');
        return {
          visible: Boolean(group && group.getClientRects().length),
          title: group?.querySelector('h3')?.textContent?.trim() || '',
          links: Object.fromEntries(
            [...(group?.querySelectorAll('a[href]') || [])].map(a => [a.getAttribute('href'), a.querySelector('strong')?.textContent?.trim() || a.textContent.trim()])
          ),
          isFirstGroup: Boolean(group && group.parentElement && [...group.parentElement.querySelectorAll('.overhaul-directory-group')][0] === group)
        };
        """
    )

    if not rendered["visible"]:
        raise AssertionError(f"{case['path']}: new guide group exists but is not visible")
    if rendered["title"] != case["title"]:
        raise AssertionError(f"{case['path']}: title {rendered['title']!r} != {case['title']!r}")
    if rendered["links"] != case["links"]:
        raise AssertionError(f"{case['path']}: rendered links {rendered['links']} != {case['links']}")
    if not rendered["isFirstGroup"]:
        raise AssertionError(f"{case['path']}: new guide group is not the first visible topic group")

    print(f"PASS {case['path']} · rendered Residence/Documents group visible with both new guides")


def main():
    wait_for_site()
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1280,1000")
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(35)
    try:
        for case in CASES:
            assert_case(driver, case)
        print("LIVING HUB NEW GUIDE RUNTIME SMOKE PASSED")
    finally:
        driver.quit()


if __name__ == "__main__":
    main()
