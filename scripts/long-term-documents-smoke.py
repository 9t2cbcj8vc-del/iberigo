import html as html_lib
import json
import os
import re
import time
import urllib.request

BASE = os.environ["PREVIEW_BASE"].rstrip("/")

CASES = [
    {
        "path": "/living-in-spain/staying-long-term/",
        "lang": "en",
        "peer": "/es/living-in-spain/staying-long-term/",
        "h1": "Staying in Spain long term",
        "markers": ["EX-18", "EX-19", "EX-11", "790-052", "Spanish nationality by residence", "10 years", "2 years"],
        "sources": ["sede.policia.gob.es", "administracion.gob.es", "49.-autorizacion-de-residencia-de-larga-duracion-nacional", "50.-autorizacion-de-residencia-de-larga-duracion-ue", "sede.mjusticia.gob.es", "boe.es"],
    },
    {
        "path": "/es/living-in-spain/staying-long-term/",
        "lang": "es",
        "peer": "/living-in-spain/staying-long-term/",
        "h1": "Vivir en España a largo plazo",
        "markers": ["EX-18", "EX-19", "EX-11", "790-052", "Nacionalidad española por residencia", "10 años", "2 años"],
        "sources": ["sede.policia.gob.es", "administracion.gob.es", "49.-autorizacion-de-residencia-de-larga-duracion-nacional", "50.-autorizacion-de-residencia-de-larga-duracion-ue", "sede.mjusticia.gob.es", "boe.es"],
    },
    {
        "path": "/moving-to-spain/documents-apostilles-translations/",
        "lang": "en",
        "peer": "/es/moving-to-spain/documents-apostilles-translations/",
        "h1": "Documents, apostilles & sworn translations",
        "markers": ["2016/1191", "Hague", "diplomatic legalisation", "Sworn translations", "Originals, copies and document age"],
        "sources": ["Legalizacion-y-apostilla", "Servicio-de-legalizaciones", "Traductores-Interpretes-Jurados", "Buscador-STIJ", "e-justice.europa.eu"],
    },
    {
        "path": "/es/moving-to-spain/documents-apostilles-translations/",
        "lang": "es",
        "peer": "/moving-to-spain/documents-apostilles-translations/",
        "h1": "Documentos, apostillas y traducciones juradas",
        "markers": ["2016/1191", "La Haya", "legalización diplomática", "Traducciones juradas", "Originales, copias y antigüedad del documento"],
        "sources": ["Legalizacion-y-apostilla", "Servicio-de-legalizaciones", "Traductores-Interpretes-Jurados", "Buscador-STIJ", "e-justice.europa.eu"],
    },
]


def fetch(path, attempts=12):
    url = BASE + path
    last = None
    for _ in range(attempts):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "IberiGo-CI/1.0"})
            with urllib.request.urlopen(req, timeout=20) as response:
                if response.status == 200:
                    return response.read().decode("utf-8")
                last = f"HTTP {response.status}"
        except Exception as exc:
            last = repr(exc)
        time.sleep(5)
    raise AssertionError(f"Could not fetch {url}: {last}")


def attr(html, pattern, label, path):
    match = re.search(pattern, html, re.I)
    if not match:
        raise AssertionError(f"{path}: missing {label}")
    return match.group(1)


def assert_page(case):
    path = case["path"]
    raw = fetch(path)
    decoded = html_lib.unescape(raw)
    if f'<html lang="{case["lang"]}"' not in raw:
        raise AssertionError(f"{path}: wrong html lang")

    canonical = attr(raw, r'<link\s+rel="canonical"\s+href="([^"]+)"', "canonical", path)
    expected = "https://iberigo.eu" + path
    if canonical != expected:
        raise AssertionError(f"{path}: canonical {canonical} != {expected}")

    en = attr(raw, r'<link\s+rel="alternate"\s+hreflang="en"\s+href="([^"]+)"', "en hreflang", path)
    es = attr(raw, r'<link\s+rel="alternate"\s+hreflang="es"\s+href="([^"]+)"', "es hreflang", path)
    expected_en = "https://iberigo.eu" + (path if case["lang"] == "en" else case["peer"])
    expected_es = "https://iberigo.eu" + (path if case["lang"] == "es" else case["peer"])
    if en != expected_en or es != expected_es:
        raise AssertionError(f"{path}: hreflang mismatch en={en} es={es}")

    if f'data-lang-href="{case["peer"]}"' not in raw:
        raise AssertionError(f"{path}: language-switch peer missing")
    if case["h1"] not in decoded:
        raise AssertionError(f"{path}: H1 marker missing")

    for marker in case["markers"]:
        if marker.lower() not in decoded.lower():
            raise AssertionError(f"{path}: content marker missing: {marker}")
    for marker in case["sources"]:
        if marker.lower() not in raw.lower():
            raise AssertionError(f"{path}: official source missing: {marker}")

    if re.search(r'<(?:aside|details)[^>]*guide-toc', raw, re.I):
        raise AssertionError(f"{path}: page TOC returned after final build")
    if "On this page" in decoded or "En esta página" in decoded:
        raise AssertionError(f"{path}: removed page-TOC wording returned")

    print(f"PASS {path} · canonical/hreflang/content/sources")


def assert_hubs():
    en = fetch("/guides/living-in-spain/")
    es = fetch("/guides/es/living-in-spain/")
    for href in ["/living-in-spain/staying-long-term/", "/moving-to-spain/documents-apostilles-translations/"]:
        if f'href="{href}"' not in en:
            raise AssertionError(f"English Living hub missing {href}")
    for href in ["/es/living-in-spain/staying-long-term/", "/es/moving-to-spain/documents-apostilles-translations/"]:
        if f'href="{href}"' not in es:
            raise AssertionError(f"Spanish Living hub missing {href}")
    print("PASS Living hubs · both clusters discoverable in EN/ES")


def assert_search_and_sitemaps():
    entries = json.loads(fetch("/search-index.json"))
    urls = [entry.get("url") for entry in entries]
    for case in CASES:
        count = urls.count(case["path"])
        if count != 1:
            raise AssertionError(f"search-index {case['path']}: expected 1 entry, found {count}")

    for sitemap in ["/sitemap.xml", "/sitemap-pages.xml"]:
        xml = fetch(sitemap)
        for case in CASES:
            loc = f"https://iberigo.eu{case['path']}"
            if f"<loc>{loc}</loc>" not in xml:
                raise AssertionError(f"{sitemap}: missing {loc}")
    print("PASS search + sitemaps · all four pages indexed")


def main():
    fetch("/")
    for case in CASES:
        assert_page(case)
    assert_hubs()
    assert_search_and_sitemaps()
    print("LONG-TERM + DOCUMENT GUIDE CLUSTERS PASSED")


if __name__ == "__main__":
    main()
