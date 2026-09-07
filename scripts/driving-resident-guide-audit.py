#!/usr/bin/env python3
import argparse
import json
import pathlib
import re
import time
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
DGT = {
    "valid": "https://www.dgt.es/nuestros-servicios/permisos-de-conducir/permisos-extranjeros-y-de-fuerzas-y-cuerpos-de-seguridad/permisos-validos-para-conducir-en-espana/",
    "agreements": "https://www.dgt.es/nuestros-servicios/permisos-de-conducir/permisos-extranjeros-y-de-fuerzas-y-cuerpos-de-seguridad/canjes-de-permisos/paises-con-convenio-de-canjes/",
    "exchange": "https://sede.dgt.gob.es/es/permisos-de-conducir/canjes-de-permisos/canjes-de-permisos-extranjeros/",
    "appointment": "https://sede.dgt.gob.es/es/otros-tramites/cita-previa",
    "exam": "https://sede.dgt.gob.es/es/permisos-de-conducir/obtencion-y-gestion-de-permisos/solicitud-de-prueba-de-aptitud-de-examen/",
}
ROUTES = {
    "en": "/living-in-spain/driving/",
    "es": "/es/living-in-spain/driving/",
}


def route_file(route: str) -> pathlib.Path:
    return ROOT / route.strip("/") / "index.html"


def assert_page(html: str, lang: str, label: str):
    route = ROUTES[lang]
    peer = ROUTES["es" if lang == "en" else "en"]
    failures = []
    required = [
        'data-driving-resident-guide="true"',
        f'<link rel="canonical" href="https://iberigo.eu{route}" />',
        f'<link rel="alternate" hreflang="en" href="https://iberigo.eu{ROUTES["en"]}" />',
        f'<link rel="alternate" hreflang="es" href="https://iberigo.eu{ROUTES["es"]}" />',
        DGT["valid"], DGT["agreements"], DGT["exchange"], DGT["appointment"], DGT["exam"],
    ]
    for needle in required:
        if needle not in html:
            failures.append(f"{label}: missing {needle}")
    if not re.search(r'<html\b[^>]*\blang=["\']' + lang + r'["\']', html, re.I):
        failures.append(f"{label}: wrong or missing html lang={lang}")
    if re.search(r'<meta\s+name=["\']robots["\'][^>]*noindex', html, re.I):
        failures.append(f"{label}: route is still noindex")
    if lang == "en":
        semantic = ["six months", "Exchange is voluntary", "online exchange", "/guides/driving-licence-exchange/"]
    else:
        semantic = ["seis meses", "El canje es voluntario", "canje online", "/guides/es/driving-licence-exchange/"]
    for needle in semantic:
        if needle.lower() not in html.lower():
            failures.append(f"{label}: missing route-defining guidance: {needle}")
    if "200 €" in html or "94,05 €" in html or "28,87 €" in html:
        failures.append(f"{label}: stale hard-coded fee/fine amount found")
    return failures


def audit_local():
    failures = []
    for lang, route in ROUTES.items():
        file = route_file(route)
        if not file.exists():
            failures.append(f"{route}: generated page missing")
            continue
        failures.extend(assert_page(file.read_text(encoding="utf-8"), lang, route))

    search = json.loads((ROOT / "search-index.json").read_text(encoding="utf-8"))
    urls = {entry.get("url") for entry in search}
    for route in ROUTES.values():
        if route not in urls:
            failures.append(f"search-index.json: missing {route}")
    for sitemap in ("sitemap.xml", "sitemap-pages.xml"):
        text = (ROOT / sitemap).read_text(encoding="utf-8")
        for route in ROUTES.values():
            if f"https://iberigo.eu{route}" not in text:
                failures.append(f"{sitemap}: missing {route}")

    spanish_sources = [
        ROOT / "es/moving-to-spain/eu-citizens/index.html",
        ROOT / "es/moving-to-spain/settling-into-spain/index.html",
    ]
    for file in spanish_sources:
        html = file.read_text(encoding="utf-8")
        if 'href="/es/living-in-spain/driving/"' not in html:
            failures.append(f"{file.relative_to(ROOT)}: missing Spanish resident-driving link")
        if 'href="/living-in-spain/driving/"' in html:
            failures.append(f"{file.relative_to(ROOT)}: avoidable English resident-driving link remains")

    if failures:
        raise AssertionError("Resident driving local audit failed:\n" + "\n".join(failures))
    print("PASS local: bilingual resident-driving pages, indexing and Spanish journeys verified")


def fetch(url: str) -> str:
    last = None
    for attempt in range(12):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "IberiGo resident driving audit"})
            with urllib.request.urlopen(req, timeout=25) as response:
                return response.read().decode("utf-8")
        except Exception as exc:
            last = exc
            if attempt < 11:
                time.sleep(5)
    raise RuntimeError(f"fetch failed for {url}: {last}")


def audit_preview(base: str):
    failures = []
    for lang, route in ROUTES.items():
        html = fetch(base.rstrip("/") + route)
        failures.extend(assert_page(html, lang, "preview " + route))
    for route in ("/es/moving-to-spain/eu-citizens/", "/es/moving-to-spain/settling-into-spain/"):
        html = fetch(base.rstrip("/") + route)
        if 'href="/es/living-in-spain/driving/"' not in html:
            failures.append(f"preview {route}: missing Spanish resident-driving link")
        if 'href="/living-in-spain/driving/"' in html:
            failures.append(f"preview {route}: English resident-driving fallback remains")
    if failures:
        raise AssertionError("Resident driving preview audit failed:\n" + "\n".join(failures))
    print("PASS preview: bilingual resident-driving routes and Spanish journey links verified")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", action="store_true")
    parser.add_argument("--preview", action="store_true")
    parser.add_argument("--base")
    args = parser.parse_args()
    if args.local:
        audit_local()
    elif args.preview:
        if not args.base:
            raise SystemExit("--base is required with --preview")
        audit_preview(args.base)
    else:
        raise SystemExit("Choose --local or --preview")


if __name__ == "__main__":
    main()
