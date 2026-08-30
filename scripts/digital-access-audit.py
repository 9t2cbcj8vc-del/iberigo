import argparse
import json
import os
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "scripts" / "action-first-digital"
PANEL = '<section class="action-first-card" data-iberigo-action-first'
STATIC = 'data-iberigo-static-action-guide="true"'
STATIC_STYLE = "data-iberigo-static-action-guide-style"
REQUIRED_IDS = ("procedure", "where", "select", "forms", "bring", "after")
DUPLICATES = ("Next 3 steps", "Forms and documents", "Official source links", "Official links", "Próximos 3 pasos", "Formularios y documentos", "Enlaces oficiales")


def route_file(route: str) -> Path:
    return ROOT / route.lstrip("/") / "index.html"


def configs():
    entries = []
    seen = set()
    langs = set()
    for file in sorted(DATA.glob("*.json")):
        data = json.loads(file.read_text(encoding="utf-8"))
        route = data["route"]
        if route in seen:
            raise AssertionError(f"duplicate route {route}")
        seen.add(route)
        langs.add(data["lang"])
        ids = tuple(item["id"] for item in data["items"])
        if ids != REQUIRED_IDS:
            raise AssertionError(f"{file.name}: item order {ids}")
        if data["sourceChecked"] != "2026-08-30":
            raise AssertionError(f"{file.name}: unexpected source date")
        if data["procedureKey"] != "digital-access":
            raise AssertionError(f"{file.name}: unexpected procedure key")
        if not route_file(route).exists():
            raise AssertionError(f"{file.name}: missing target {route}")
        entries.append((file, data))
    if len(entries) != 2 or langs != {"en", "es"}:
        raise AssertionError("expected one EN and one ES digital-access config")
    return entries


def validate(file: Path, data: dict, html: str, preview: bool):
    route = data["route"]
    if html.count(PANEL) != 1:
        raise AssertionError(f"{route}: expected one exact action card")
    if STATIC not in html or html.count(STATIC_STYLE) != 1:
        raise AssertionError(f"{route}: static-first marker/style missing")
    if "app.js" in html:
        raise AssertionError(f"{route}: legacy app.js still present")
    if 'data-procedure-key="digital-access"' not in html:
        raise AssertionError(f"{route}: procedure key missing")
    source = file.relative_to(ROOT).as_posix()
    if f'data-action-source="{source}"' not in html:
        raise AssertionError(f"{route}: source marker missing")
    if f'datetime="{data["sourceChecked"]}"' not in html:
        raise AssertionError(f"{route}: source date missing")
    for item_id in REQUIRED_IDS:
        if f'data-action-item="{item_id}"' not in html:
            raise AssertionError(f"{route}: missing action item {item_id}")
    for link in data.get("links", []):
        if f'href="{link["url"]}"' not in html:
            raise AssertionError(f"{route}: link missing {link['url']}")
    intro = html.find("data-crawler-guide-intro")
    card = html.find(PANEL)
    hero = html.find('class="result-hero"')
    if min(intro, card, hero) < 0 or not intro < card < hero:
        raise AssertionError(f"{route}: expected intro -> card -> detailed explanation")
    for heading in DUPLICATES:
        if f"<strong>{heading}</strong>" in html:
            raise AssertionError(f"{route}: duplicate legacy section remains: {heading}")
    required_copy = ("Cl@ve Móvil", "Cl@ve Permanente", "FNMT", "advanced" if data["lang"] == "en" else "avanzado")
    for token in required_copy:
        if token not in html:
            raise AssertionError(f"{route}: current digital guidance missing {token}")
    stale = ("PIN and permanent modes", "PIN o modalidad permanente", "Cl@ve usually needs", "Cl@ve normalmente necesita")
    for token in stale:
        if token in html:
            raise AssertionError(f"{route}: stale digital wording remains: {token}")
    if preview and 'class="language-switcher"' not in html:
        raise AssertionError(f"{route}: language switcher missing")


def audit_local():
    for file, data in configs():
        validate(file, data, route_file(data["route"]).read_text(encoding="utf-8"), False)
    print("DIGITAL ACCESS LOCAL PASSED: FNMT + Cl@ve static-first guides verified")


def request(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": "IberiGo-digital-access-audit/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=25) as response:
            return response.status, response.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read().decode("utf-8", errors="replace")


def fetch(base: str, route: str):
    last = None
    for attempt in range(12):
        try:
            status, body = request(base.rstrip("/") + route)
            if status == 200 and PANEL in body and STATIC in body:
                return body
            last = f"HTTP {status}, panel={PANEL in body}, static={STATIC in body}"
        except (urllib.error.URLError, TimeoutError) as exc:
            last = repr(exc)
        time.sleep(min(3 + attempt, 9))
    raise AssertionError(f"preview not ready for {route}: {last}")


def audit_preview():
    base = os.environ["PREVIEW_BASE"]
    for file, data in configs():
        validate(file, data, fetch(base, data["route"]), True)
    print("DIGITAL ACCESS PREVIEW PASSED: EN/ES deployed routes verified")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", action="store_true")
    parser.add_argument("--preview", action="store_true")
    args = parser.parse_args()
    if not args.local and not args.preview:
        parser.error("choose --local or --preview")
    if args.local:
        audit_local()
    if args.preview:
        audit_preview()


if __name__ == "__main__":
    main()
