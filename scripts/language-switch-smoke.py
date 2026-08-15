import os
import time
import urllib.request
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ.get("PREVIEW_BASE", "https://deploy-preview-163--iberigo.netlify.app").rstrip("/")


def wait_for_site(timeout=180):
    deadline = time.time() + timeout
    last_error = None
    while time.time() < deadline:
        try:
            req = urllib.request.Request(BASE + "/", headers={"User-Agent": "IberiGo-language-smoke"})
            with urllib.request.urlopen(req, timeout=10) as response:
                if response.status == 200:
                    print(f"Site ready: {response.status} {BASE}/")
                    return
        except Exception as exc:
            last_error = exc
        time.sleep(3)
    raise RuntimeError(f"Site did not become ready: {last_error}")


def nav_labels(driver):
    return driver.execute_script(
        "return [...document.querySelectorAll('nav [data-iberigo-section]')].map(a => a.textContent.trim())"
    )


def stored_lang(driver):
    return driver.execute_script("return localStorage.getItem('holaPapersLang')")


def wait_home_lang(driver, lang, expected_labels):
    WebDriverWait(driver, 15).until(
        lambda d: d.execute_script("return document.readyState === 'complete'")
        and d.execute_script("return document.documentElement.lang.toLowerCase().startsWith(arguments[0])", lang)
        and nav_labels(d)[:4] == expected_labels
        and d.execute_script("return !!document.querySelector('.overhaul-hero')")
    )


def click_lang(driver, lang):
    button = driver.find_element(By.CSS_SELECTOR, f".language-switcher [data-lang='{lang}']")
    driver.execute_script("arguments[0].click()", button)


def assert_no_console_errors(driver, label):
    bad = []
    for entry in driver.get_log("browser"):
        message = entry.get("message", "")
        if any(token in message for token in ("Uncaught ReferenceError", "Uncaught TypeError", "Uncaught SyntaxError")):
            bad.append(message)
    if bad:
        raise AssertionError(f"Console errors on {label}: {bad}")


def main():
    wait_for_site()

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1280,900")
    options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(30)

    en_labels = ["Move to Spain", "Living in Spain", "Visit Spain", "The Spain Files"]
    es_labels = ["Mudarse a España", "Vivir en España", "Visitar España", "The Spain Files"]

    try:
        driver.get(BASE + "/")
        driver.execute_script("localStorage.removeItem('holaPapersLang')")
        driver.refresh()
        wait_home_lang(driver, "en", en_labels)
        print("PASS homepage boot EN")

        click_lang(driver, "es")
        wait_home_lang(driver, "es", es_labels)
        if stored_lang(driver) != "es":
            raise AssertionError("Spanish preference was not persisted")
        print("PASS homepage EN -> ES without hard refresh")

        click_lang(driver, "en")
        wait_home_lang(driver, "en", en_labels)
        if stored_lang(driver) != "en":
            raise AssertionError("English preference was not persisted")
        print("PASS homepage ES -> EN without hard refresh")

        click_lang(driver, "es")
        wait_home_lang(driver, "es", es_labels)
        print("PASS repeated homepage EN -> ES switch")
        assert_no_console_errors(driver, "homepage repeated switching")

        driver.get(BASE + "/guides/es/living-in-spain/")
        WebDriverWait(driver, 10).until(lambda d: d.execute_script("return document.documentElement.lang.startsWith('es')"))
        click_lang(driver, "en")
        WebDriverWait(driver, 10).until(lambda d: "/guides/living-in-spain/" in d.current_url and "/guides/es/" not in d.current_url)
        if stored_lang(driver) != "en":
            raise AssertionError("Guide switch ES -> EN did not persist language")
        print("PASS guide ES -> EN with persisted preference")

        click_lang(driver, "es")
        WebDriverWait(driver, 10).until(lambda d: "/guides/es/living-in-spain/" in d.current_url)
        if stored_lang(driver) != "es":
            raise AssertionError("Guide switch EN -> ES did not persist language")
        print("PASS guide EN -> ES with persisted preference")
        assert_no_console_errors(driver, "guide language switching")

        driver.get(BASE + "/")
        wait_home_lang(driver, "es", es_labels)
        print("PASS Spanish preference survives return to homepage")

        print("ALL LANGUAGE SWITCH REGRESSION CHECKS PASSED")
    finally:
        driver.quit()


if __name__ == "__main__":
    main()
