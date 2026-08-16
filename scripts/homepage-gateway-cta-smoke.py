import os
import time
import urllib.request

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ.get("PREVIEW_BASE", "").rstrip("/")
CACHE_KEY = "20260816-homepage-cta-runtime-1"
EXPECTED = {
    "en": {
        "move": "Plan your move",
        "vacation": "Plan your visit",
        "living": "Browse living guides",
    },
    "es": {
        "move": "Planifica tu mudanza",
        "vacation": "Planifica tu visita",
        "living": "Guías para vivir",
    },
}


def wait_for_site(timeout=180):
    if not BASE:
        raise AssertionError("PREVIEW_BASE is required")
    deadline = time.time() + timeout
    last = None
    while time.time() < deadline:
        try:
            request = urllib.request.Request(BASE + "/", headers={"User-Agent": "IberiGo-homepage-cta-smoke"})
            with urllib.request.urlopen(request, timeout=15) as response:
                if 200 <= response.status < 400:
                    return
                last = f"HTTP {response.status}"
        except Exception as exc:
            last = repr(exc)
        time.sleep(3)
    raise AssertionError(f"Preview did not become ready: {last}")


def wait_gateway(driver, lang):
    WebDriverWait(driver, 20).until(
        lambda d: d.execute_script(
            """
            const expectedLang = arguments[0];
            const cards = [...document.querySelectorAll('[data-home-card] .gateway-card-action')];
            const gateway = [...document.scripts].find(s => (s.src || '').includes('/scripts/homepage-gateway-cards.js'));
            return document.documentElement.lang.toLowerCase().startsWith(expectedLang)
              && cards.length === 3
              && gateway
              && gateway.src.includes(arguments[1]);
            """,
            lang,
            CACHE_KEY,
        )
    )


def rendered_ctas(driver):
    return driver.execute_script(
        """
        return Object.fromEntries(
          [...document.querySelectorAll('[data-home-card]')].map(card => [
            card.dataset.homeCard,
            card.querySelector('.gateway-card-action')?.textContent.trim() || ''
          ])
        );
        """
    )


def assert_language(driver, lang):
    driver.get(BASE + "/")
    driver.execute_script("localStorage.setItem('holaPapersLang', arguments[0]);", lang)
    driver.refresh()
    wait_gateway(driver, lang)
    actual = rendered_ctas(driver)
    if actual != EXPECTED[lang]:
        raise AssertionError(f"{lang}: rendered gateway CTAs {actual} != {EXPECTED[lang]}")
    print(f"PASS homepage gateway CTAs {lang}: {actual}")


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
        assert_language(driver, "en")
        assert_language(driver, "es")
        print("HOMEPAGE GATEWAY CTA SMOKE PASSED")
    finally:
        driver.quit()


if __name__ == "__main__":
    main()
