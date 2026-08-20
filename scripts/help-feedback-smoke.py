import os
import re
import time
import urllib.request

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ["PREVIEW_BASE"].rstrip("/")


def fetch(path, attempts=20):
    url = BASE + path
    last = None
    for _ in range(attempts):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "IberiGo-help-feedback-smoke/1.0"})
            with urllib.request.urlopen(req, timeout=20) as response:
                if response.status == 200:
                    return response.read().decode("utf-8")
                last = f"HTTP {response.status}"
        except Exception as exc:
            last = repr(exc)
        time.sleep(3)
    raise AssertionError(f"Could not fetch {url}: {last}")


def assert_form(path, lang, action, title):
    html = fetch(path)
    lowered = html.lower()
    if f'<html lang="{lang}"' not in lowered:
        raise AssertionError(f"{path}: wrong language")
    if title not in html:
        raise AssertionError(f"{path}: missing title marker {title}")
    if 'name="iberigo-help-feedback"' not in html:
        raise AssertionError(f"{path}: Netlify form name missing")
    if 'data-netlify="true"' not in html:
        raise AssertionError(f"{path}: Netlify form detection missing")
    if 'netlify-honeypot="bot-field"' not in html:
        raise AssertionError(f"{path}: honeypot missing")
    if f'action="{action}"' not in html:
        raise AssertionError(f"{path}: wrong success action")
    for field in ["topic", "page_url", "message", "visitor_email", "language"]:
        if f'name="{field}"' not in html:
            raise AssertionError(f"{path}: missing field {field}")
    email = re.search(r'<input[^>]+name="visitor_email"[^>]*>', html, re.I)
    if not email or "required" in email.group(0).lower():
        raise AssertionError(f"{path}: visitor email must remain optional")
    if "mailto:" in lowered:
        raise AssertionError(f"{path}: public email/mailto link must not be exposed")
    if "passport numbers" not in lowered and "números de pasaporte" not in lowered:
        raise AssertionError(f"{path}: sensitive-data warning missing")
    print(f"PASS {path}: Netlify form, optional email, privacy warning, no public email")


def assert_success_routing():
    with open("_redirects", "r", encoding="utf-8") as handle:
        redirects = handle.read()

    expected_rules = [
        "/help-feedback/thanks /help-feedback/thanks/index.html 200!",
        "/help-feedback/thanks/ /help-feedback/thanks/index.html 200!",
        "/es/help-feedback/thanks /es/help-feedback/thanks/index.html 200!",
        "/es/help-feedback/thanks/ /es/help-feedback/thanks/index.html 200!",
    ]
    for rule in expected_rules:
        if rule not in redirects:
            raise AssertionError(f"Missing feedback success redirect rule: {rule}")

    for path in [
        "/help-feedback/thanks/",
        "/help-feedback/thanks/index.html",
        "/es/help-feedback/thanks/",
        "/es/help-feedback/thanks/index.html",
    ]:
        fetch(path)

    print("PASS success routing: exact files and friendly EN/ES thank-you URLs return 200")


def assert_rendered_refinements():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1536,1000")
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(35)

    expected_notes = {
        "/help-feedback/": "We read all messages, but a personal reply is not guaranteed.",
        "/es/help-feedback/": "Leemos todos los mensajes, pero no podemos garantizar una respuesta personal.",
    }

    try:
        for path, expected_note in expected_notes.items():
            driver.get(BASE + path)
            WebDriverWait(driver, 20).until(
                lambda d: d.execute_script(
                    "return Boolean(document.querySelector('.hf-reply-note')) && Boolean(document.querySelector('[name=\"topic\"]')) && Boolean(document.querySelector('[name=\"page_url\"]'));"
                )
            )
            result = driver.execute_script(
                """
                const topic = document.querySelector('[name="topic"]').getBoundingClientRect();
                const pageUrl = document.querySelector('[name="page_url"]').getBoundingClientRect();
                return {
                  topicTop: topic.top,
                  pageTop: pageUrl.top,
                  topicHeight: topic.height,
                  pageHeight: pageUrl.height,
                  note: document.querySelector('.hf-reply-note')?.textContent?.trim() || ''
                };
                """
            )
            if abs(result["topicTop"] - result["pageTop"]) > 2:
                raise AssertionError(f"{path}: Topic and Page URL controls are vertically misaligned: {result}")
            if abs(result["topicHeight"] - result["pageHeight"]) > 2:
                raise AssertionError(f"{path}: Topic and Page URL controls have different heights: {result}")
            if result["note"] != expected_note:
                raise AssertionError(f"{path}: reply disclaimer mismatch: {result['note']!r}")
            print(f"PASS {path}: aligned Topic/Page URL controls and reply disclaimer")
    finally:
        driver.quit()


def assert_discovery():
    home = fetch("/")
    if 'href="/help-feedback/"' not in home or "Help & Feedback" not in home:
        raise AssertionError("Homepage footer missing Help & Feedback link")

    search = fetch("/search-index.json")
    for url in ["/help-feedback/", "/es/help-feedback/"]:
        if f'"url": "{url}"' not in search:
            raise AssertionError(f"Search index missing {url}")

    for sitemap in ["/sitemap.xml", "/sitemap-pages.xml"]:
        xml = fetch(sitemap)
        for url in ["https://iberigo.eu/help-feedback/", "https://iberigo.eu/es/help-feedback/"]:
            if f"<loc>{url}</loc>" not in xml:
                raise AssertionError(f"{sitemap}: missing {url}")
    print("PASS discovery: homepage footer, search index and sitemaps")


def main():
    assert_form("/help-feedback/", "en", "/help-feedback/thanks/index.html", "Help &amp; Feedback")
    assert_form("/es/help-feedback/", "es", "/es/help-feedback/thanks/index.html", "Ayuda y comentarios")
    assert_success_routing()
    assert_rendered_refinements()
    assert_discovery()
    print("HELP & FEEDBACK PASSED")


if __name__ == "__main__":
    main()
