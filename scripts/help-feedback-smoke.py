import os
import re
import time
import urllib.request

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
    assert_form("/help-feedback/", "en", "/help-feedback/thanks/", "Help &amp; Feedback")
    assert_form("/es/help-feedback/", "es", "/es/help-feedback/thanks/", "Ayuda y comentarios")
    fetch("/help-feedback/thanks/")
    fetch("/es/help-feedback/thanks/")
    assert_discovery()
    print("HELP & FEEDBACK PASSED")


if __name__ == "__main__":
    main()
