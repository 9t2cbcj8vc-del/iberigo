#!/usr/bin/env python3
import argparse
import os
import pathlib
import time
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
IMMIGRATION = "https://sede.administracionespublicas.gob.es/pagina/index/directorio/icpplus/language/es_ES"
AEAT = "https://www2.agenciatributaria.gob.es/wlpl/TOCP-MUTE/internet/identificacion"
INSS = "https://w6.seg-social.es/ProsaInternetAnonimo/OnlineAccess?ARQ.SPM.ACTION=LOGIN&ARQ.SPM.APPTYPE=SERVICE&ARQ.IDAPP=CPMSWACS&ORGANISMO=I"
TORREVIEJA = "https://torrevieja.sedelectronica.es/citaprevia.0"

CHECKS = {
    "/guides/taxes/": [AEAT, "Book an AEAT appointment", 'data-iberigo-appointment-action="taxes-spain"'],
    "/guides/es/taxes/": [AEAT, "Reservar cita con la AEAT", 'data-iberigo-appointment-action="taxes-spain"'],
    "/guides/social-security/": [INSS, "INSS appointment (benefits / other INSS matters)", 'data-iberigo-appointment-action="social-security-number"'],
    "/guides/es/social-security/": [INSS, "Cita INSS (prestaciones / otras gestiones INSS)", 'data-iberigo-appointment-action="social-security-number"'],
    "/moving-to-spain/eu-citizens/": [IMMIGRATION, "Book EU registration appointment", 'data-iberigo-appointment-action="eu-roadmap-cita"'],
    "/es/moving-to-spain/eu-citizens/": [IMMIGRATION, "Reservar cita de registro UE", 'data-iberigo-appointment-action="eu-roadmap-cita-es"'],
    "/moving-to-spain/non-eu-citizens/": [IMMIGRATION, "Book TIE / fingerprint appointment", 'data-iberigo-appointment-action="non-eu-roadmap-tie-cita"'],
    "/es/moving-to-spain/non-eu-citizens/": [IMMIGRATION, "Reservar cita TIE / huellas", 'data-iberigo-appointment-action="non-eu-roadmap-tie-cita-es"'],
    "/the-spain-files/padron-torrevieja/": [TORREVIEJA, "Book cita previa", "select Residentes Internacionales", 'data-iberigo-appointment-action="torrevieja-padron-en"'],
    "/the-spain-files/es/padron-torrevieja/": [TORREVIEJA, "Reservar cita previa", "selecciona Residentes Internacionales", 'data-iberigo-appointment-action="torrevieja-padron-es"'],
    # Existing direct appointment routes that this pass must preserve.
    "/guides/nie/": [IMMIGRATION],
    "/guides/tie/": [IMMIGRATION],
    "/guides/digital/": [AEAT, INSS, "FNMT appointment via Tax Agency", "FNMT appointment via Social Security"],
}


def local_html(route: str) -> str:
    file = ROOT / route.strip("/") / "index.html"
    if not file.exists():
        raise AssertionError(f"{route}: local file missing")
    return file.read_text(encoding="utf-8")


def preview_html(base: str, route: str) -> str:
    url = base.rstrip("/") + route
    last = None
    for attempt in range(12):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "IberiGo appointment audit"})
            with urllib.request.urlopen(req, timeout=25) as response:
                return response.read().decode("utf-8")
        except Exception as exc:  # preview can still be deploying when CI starts
            last = exc
            if attempt < 11:
                time.sleep(5)
    raise AssertionError(f"{route}: preview fetch failed: {last}")


def audit(loader, label: str):
    failures = []
    for route, needles in CHECKS.items():
        try:
            html = loader(route)
        except Exception as exc:
            failures.append(str(exc))
            continue
        for needle in needles:
            if needle not in html:
                failures.append(f"{route}: missing {needle!r}")
        if route in {"/guides/nie/", "/guides/tie/"}:
            lower = html.lower()
            if "appointment" not in lower and "cita" not in lower:
                failures.append(f"{route}: direct booking URL exists but appointment semantics are missing")
        if route in {"/guides/taxes/", "/guides/es/taxes/"}:
            if html.count('data-iberigo-appointment-action="taxes-spain"') != 1:
                failures.append(f"{route}: expected exactly one injected AEAT appointment action")
        if route in {"/guides/social-security/", "/guides/es/social-security/"}:
            if "NUSS" not in html or "Importass" not in html:
                failures.append(f"{route}: NUSS/Importass primary route missing")
            if html.count('data-iberigo-appointment-action="social-security-number"') != 1:
                failures.append(f"{route}: expected exactly one injected INSS appointment action")
    if failures:
        raise AssertionError(f"{label} appointment audit failed:\n" + "\n".join(failures))
    print(f"PASS {label}: {len(CHECKS)} appointment-discovery routes verified")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", action="store_true")
    parser.add_argument("--preview", action="store_true")
    args = parser.parse_args()
    if args.local:
        audit(local_html, "local")
    elif args.preview:
        base = os.environ.get("PREVIEW_BASE")
        if not base:
            raise SystemExit("PREVIEW_BASE is required")
        audit(lambda route: preview_html(base, route), "preview")
    else:
        raise SystemExit("Choose --local or --preview")


if __name__ == "__main__":
    main()
