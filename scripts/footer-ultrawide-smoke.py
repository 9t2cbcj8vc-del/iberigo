import os
import time
import urllib.request

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ.get("PREVIEW_BASE", "").rstrip("/")


def fail(message):
    raise AssertionError(message)


def wait_for_site():
    if not BASE:
        fail("PREVIEW_BASE is required")
    deadline = time.time() + 180
    last = None
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(BASE + "/", timeout=15) as response:
                if response.status == 200:
                    print(f"Site ready: {response.status} {BASE}/")
                    return
                last = f"HTTP {response.status}"
        except Exception as exc:
            last = repr(exc)
        time.sleep(4)
    fail(f"Preview did not become ready: {last}")


def footer_metrics(driver):
    return driver.execute_script(
        """
        const footer = document.querySelector('.site-footer');
        if (!footer) return null;
        const support = [...footer.querySelectorAll('p')].find((p) =>
          /IberiGo is free to use|IberiGo es gratis/i.test(p.textContent || '')
        ) || footer.querySelector('p');
        if (!support) return { missingSupport: true };
        const fr = footer.getBoundingClientRect();
        const pr = support.getBoundingClientRect();
        const cs = getComputedStyle(footer);
        return {
          viewport: window.innerWidth,
          footerWidth: fr.width,
          footerHeight: fr.height,
          supportWidth: pr.width,
          supportHeight: pr.height,
          paddingLeft: parseFloat(cs.paddingLeft),
          paddingRight: parseFloat(cs.paddingRight),
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          supportText: support.textContent.trim()
        };
        """
    )


def assert_layout(driver, width, height):
    driver.set_window_size(width, height)
    driver.get(BASE + "/")
    WebDriverWait(driver, 20).until(
        lambda d: d.execute_script(
            "return document.body.classList.contains('iberigo-overhaul') && !!document.querySelector('.site-footer')"
        )
    )
    driver.execute_script("document.querySelector('.site-footer').scrollIntoView({block:'center'})")
    time.sleep(0.4)
    metrics = footer_metrics(driver)
    if not metrics or metrics.get("missingSupport"):
        fail(f"Footer/support text missing at requested width {width}: {metrics}")

    viewport = metrics["viewport"]
    if metrics["footerWidth"] < viewport - 2:
        fail(f"Footer is not full width at {width}px: {metrics}")

    min_support_width = 240 if viewport <= 500 else 420
    if metrics["supportWidth"] < min_support_width:
        fail(f"Support sentence collapsed at {width}px: {metrics}")

    max_support_height = 180 if viewport <= 500 else 100
    if metrics["supportHeight"] > max_support_height:
        fail(f"Support sentence wraps excessively at {width}px: {metrics}")

    if metrics["footerHeight"] > 420:
        fail(f"Footer is excessively tall at {width}px: {metrics}")

    if metrics["scrollWidth"] > metrics["clientWidth"] + 1:
        fail(f"Horizontal overflow at {width}px: {metrics}")

    print(f"PASS footer layout @ {width}px: {metrics}")


def main():
    wait_for_site()
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(35)
    try:
        for width, height in [(3440, 1440), (2560, 1080), (1920, 1080), (390, 844)]:
            assert_layout(driver, width, height)
        print("ALL FOOTER WIDTH REGRESSION CHECKS PASSED")
    finally:
        driver.quit()


if __name__ == "__main__":
    main()
