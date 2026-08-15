import os
import sys
import time
import urllib.request
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE = os.environ.get("PREVIEW_BASE", "https://deploy-preview-162--iberigo.netlify.app").rstrip("/")
WAIT = 12


def wait_for_preview(timeout=240):
    deadline = time.time() + timeout
    last = None
    while time.time() < deadline:
        try:
            req = urllib.request.Request(BASE + "/", headers={"User-Agent": "IberiGo-preview-smoke"})
            with urllib.request.urlopen(req, timeout=15) as response:
                if 200 <= response.status < 400:
                    print(f"Preview ready: {response.status} {BASE}/")
                    return
                last = f"HTTP {response.status}"
        except Exception as exc:
            last = str(exc)
        time.sleep(5)
    raise RuntimeError(f"Preview did not become ready: {last}")


def fail(message):
    raise AssertionError(message)


def js(driver, expression):
    return driver.execute_script(f"return ({expression});")


def wait_js(driver, expression, timeout=WAIT):
    return WebDriverWait(driver, timeout).until(lambda d: bool(js(d, expression)))


def console_errors(driver, label):
    bad = []
    needles = (
        "uncaught",
        "referenceerror",
        "typeerror",
        "syntaxerror",
        "linklabels",
        "is not defined",
    )
    for entry in driver.get_log("browser"):
        msg = entry.get("message", "")
        level = entry.get("level", "")
        low = msg.lower()
        if level == "SEVERE" and any(needle in low for needle in needles):
            bad.append(msg)
    if bad:
        fail(f"Console error(s) on {label}:\n" + "\n".join(bad))


def assert_no_overflow(driver, label):
    overflow = js(driver, "document.documentElement.scrollWidth - window.innerWidth")
    if overflow > 1:
        fail(f"Horizontal overflow on {label}: {overflow}px")


def assert_img(driver, element, contains, label):
    src = element.get_attribute("src") or ""
    natural = driver.execute_script("return arguments[0].naturalWidth || 0", element)
    if contains not in src:
        fail(f"Wrong image on {label}: expected '{contains}' in '{src}'")
    if natural <= 0:
        fail(f"Image failed to load on {label}: {src}")


def visit(driver, path, label=None, mobile=False):
    label = label or path
    if mobile:
        driver.set_window_size(390, 844)
    else:
        driver.set_window_size(1280, 900)
    driver.get(BASE + path)
    WebDriverWait(driver, WAIT).until(lambda d: d.execute_script("return document.readyState") == "complete")
    time.sleep(1.0)
    if "Page Not Found" in driver.title or len(driver.find_element(By.TAG_NAME, "body").text.strip()) < 20:
        fail(f"Page failed to render: {label} ({driver.current_url})")
    assert_no_overflow(driver, label + (" mobile" if mobile else " desktop"))
    console_errors(driver, label)
    print(f"PASS page: {label}{' mobile' if mobile else ''}")


def group_image(driver, heading_text):
    script = """
    const wanted = arguments[0].toLowerCase();
    const group = [...document.querySelectorAll('.overhaul-directory-group')]
      .find(g => (g.querySelector('h3')?.textContent || '').trim().toLowerCase() === wanted);
    return group?.querySelector('img') || null;
    """
    element = driver.execute_script(script, heading_text)
    if not element:
        fail(f"Group not found: {heading_text}")
    return element


def hero_image(driver):
    element = driver.execute_script("return document.querySelector('.overhaul-guide-image, .guide-hero-card img, .result-hero-media img')")
    if not element:
        fail(f"Guide hero image not found on {driver.current_url}")
    return element


def main():
    wait_for_preview()

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1280,900")
    options.set_capability("goog:loggingPrefs", {"browser": "ALL"})

    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(30)

    try:
        # Homepage / navigation / search modal / roadmap presence.
        visit(driver, "/", "homepage")
        wait_js(driver, "document.querySelector('.overhaul-hero')")
        nav_labels = js(driver, "[...document.querySelectorAll('nav [data-iberigo-section]')].map(a => a.textContent.trim())")
        expected = ["Move to Spain", "Living in Spain", "Visit Spain", "The Spain Files"]
        if nav_labels[:4] != expected:
            fail(f"Unexpected main navigation: {nav_labels}")
        if not js(driver, "document.querySelector('#wizard')"):
            fail("Homepage roadmap wizard #wizard is missing")

        opener = driver.find_element(By.CSS_SELECTOR, "[data-site-search-open], .search-nav-link")
        driver.execute_script("arguments[0].click()", opener)
        wait_js(driver, "document.querySelector('.site-search-dialog')?.open")
        focused = js(driver, "document.activeElement?.classList.contains('site-search-input')")
        if not focused:
            fail("Search modal did not autofocus its input")
        driver.execute_script("document.querySelector('.site-search-close').click()")
        wait_js(driver, "!document.querySelector('.site-search-dialog')?.open")
        console_errors(driver, "homepage search modal")
        print("PASS function: homepage nav + roadmap presence + search modal")

        # Language switching must actually change rendered language, then return to EN.
        es_button = driver.find_element(By.CSS_SELECTOR, ".language-switcher [data-lang='es']")
        driver.execute_script("arguments[0].click()", es_button)
        WebDriverWait(driver, 6).until(lambda d: d.execute_script("return document.documentElement.lang.toLowerCase().startsWith('es') || /múdate|mudarse|vivir en españa/i.test(document.body.innerText)"))
        console_errors(driver, "language switch EN→ES")
        en_button = driver.find_element(By.CSS_SELECTOR, ".language-switcher [data-lang='en']")
        driver.execute_script("arguments[0].click()", en_button)
        WebDriverWait(driver, 6).until(lambda d: d.execute_script("return document.documentElement.lang.toLowerCase().startsWith('en') || /move to spain|living in spain/i.test(document.body.innerText)"))
        console_errors(driver, "language switch ES→EN")
        print("PASS function: language switching")

        # Living hub = car/driving visual.
        visit(driver, "/guides/living-in-spain/", "Living hub EN")
        wait_js(driver, "document.querySelector('.overhaul-directory-groups--living-refined')")
        assert_img(driver, group_image(driver, "Transport & driving"), "driving-spain-visitors-20260722.webp", "Living EN Transport & driving")

        visit(driver, "/guides/es/living-in-spain/", "Living hub ES")
        wait_js(driver, "document.querySelector('.overhaul-directory-groups--living-refined')")
        assert_img(driver, group_image(driver, "Transporte y conducción"), "driving-spain-visitors-20260722.webp", "Living ES Transporte y conducción")

        # Visit hub = train/public transport visual.
        visit(driver, "/guides/vacation-in-spain/", "Visit hub EN")
        assert_img(driver, group_image(driver, "Getting there & around"), "transport-spain.webp", "Visit EN Getting there & around")

        visit(driver, "/guides/es/vacation-in-spain/", "Visit hub ES")
        assert_img(driver, group_image(driver, "Llegar y moverse"), "transport-spain.webp", "Visit ES Llegar y moverse")

        # Representative driving/public transport guide heroes.
        for path, expected_asset, label in [
            ("/guides/driving-licence-exchange/", "driving-licence-exchange-20260719.webp", "Driving licence EN"),
            ("/guides/es/driving-licence-exchange/", "driving-licence-exchange-20260719.webp", "Driving licence ES"),
            ("/guides/driving-spain-visitors/", "driving-spain-visitors-20260722.webp", "Visitor driving EN"),
            ("/guides/es/driving-spain-visitors/", "driving-spain-visitors-20260722.webp", "Visitor driving ES"),
            ("/guides/vacation-ground/", "transport-spain.webp", "Ground transport EN"),
            ("/guides/es/vacation-ground/", "transport-spain.webp", "Ground transport ES"),
            ("/guides/vacation-flights/", "transport-spain.webp", "Flights EN"),
            ("/guides/es/vacation-flights/", "transport-spain.webp", "Flights ES"),
        ]:
            visit(driver, path, label)
            assert_img(driver, hero_image(driver), expected_asset, label)
            console_errors(driver, label + " hero")

        # Search page functionality.
        visit(driver, "/search/", "Search page")
        search = WebDriverWait(driver, WAIT).until(EC.presence_of_element_located((By.ID, "siteSearch")))
        search.clear()
        search.send_keys("NIE")
        WebDriverWait(driver, WAIT).until(lambda d: len(d.find_elements(By.CSS_SELECTOR, ".search-result-card")) > 0)
        console_errors(driver, "search results")
        print("PASS function: search results")

        # Support and Spain Files visuals/function basics.
        visit(driver, "/support/", "Support")
        support_img = driver.find_element(By.CSS_SELECTOR, ".support-polish-visual img")
        if driver.execute_script("return arguments[0].naturalWidth || 0", support_img) <= 0:
            fail("Support editorial image failed to load")
        donate = driver.find_element(By.CSS_SELECTOR, ".support-action")
        if "ko-fi.com" not in (donate.get_attribute("href") or ""):
            fail("Support donation link is incorrect")

        visit(driver, "/the-spain-files/", "Spain Files EN")
        wait_js(driver, "document.querySelector('.overhaul-files-hero-image')")
        console_errors(driver, "Spain Files EN visual")

        visit(driver, "/the-spain-files/es/", "Spain Files ES")
        wait_js(driver, "document.querySelector('.overhaul-files-hero-image')")
        console_errors(driver, "Spain Files ES visual")

        # Mobile regression on the critical surfaces.
        for path, label in [
            ("/", "homepage"),
            ("/guides/living-in-spain/", "Living EN"),
            ("/guides/es/living-in-spain/", "Living ES"),
            ("/guides/vacation-in-spain/", "Visit EN"),
            ("/guides/es/vacation-in-spain/", "Visit ES"),
            ("/search/", "Search"),
            ("/support/", "Support"),
        ]:
            visit(driver, path, label, mobile=True)

        print("ALL PREVIEW CONSOLE/FUNCTION CHECKS PASSED")
    finally:
        driver.quit()


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"PREVIEW CHECK FAILED: {exc}", file=sys.stderr)
        raise
