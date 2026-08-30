import argparse
import html as html_lib
import json
import os
import re
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "scripts" / "action-first-banking-tax"
PANEL = '<section class="action-first-card" data-iberigo-action-first'
STATIC = 'data-iberigo-static-action-guide="true"'
REQUIRED_IDS = ("procedure", "where", "select", "forms", "bring", "after")


def route_file(route: str) -> Path:
    return ROOT / route.lstrip("/") / "index.html"


def configs():
    rows = []
    for file in sorted(DATA.glob("*.json")):
        data = json.loads(file.read_text(encoding="utf-8"))
        ids = tuple(item["id"] for item in data["items"])
        if ids != REQUIRED_IDS:
            raise AssertionError(f"{file.name}: wrong item order {ids}")
        if data["sourceChecked"] != "2026-08-30":
            raise AssertionError(f"{file.name}: wrong source date")
        if data["procedureKey"] not in {"banking-spain", "taxes-spain"}:
            raise AssertionError(f"{file.name}: unexpected procedure key")
        rows.append((file, data))
    if len(rows) != 4:
        raise AssertionError(f"expected 4 configs, found {len(rows)}")
    return rows


def visible_text(fragment: str) -> str:
    return " ".join(html_lib.unescape(re.sub(r"<[^>]+>", " ", fragment)).split())


def meta_description(page: str) -> str:
    tag = re.search(r"<meta\b(?=[^>]*name=[\"']description[\"'])[^>]*>", page, re.I | re.S)
    if not tag:
        raise AssertionError("meta description missing")
    match = re.search(r"content=(\"([^\"]*)\"|'([^']*)')", tag.group(0), re.I | re.S)
    if not match:
        raise AssertionError("meta description content missing")
    return html_lib.unescape((match.group(2) if match.group(2) is not None else match.group(3)).strip())


def validate(file: Path, data: dict, page: str, preview: bool):
    route = data["route"]
    if page.count(PANEL) != 1:
        raise AssertionError(f"{route}: expected one action card")
    if STATIC not in page:
        raise AssertionError(f"{route}: static-first marker missing")
    if "app.js" in page:
        raise AssertionError(f"{route}: legacy app.js still present")
    if f'data-procedure-key="{data["procedureKey"]}"' not in page:
        raise AssertionError(f"{route}: procedure key missing")
    for item_id in REQUIRED_IDS:
        if f'data-action-item="{item_id}"' not in page:
            raise AssertionError(f"{route}: missing action item {item_id}")
    intro_pos = page.find("data-crawler-guide-intro")
    card_pos = page.find(PANEL)
    hero_pos = page.find('class="result-hero"')
    if min(intro_pos, card_pos, hero_pos) < 0 or not intro_pos < card_pos < hero_pos:
        raise AssertionError(f"{route}: expected intro -> card -> detail order")
    if any(x in page for x in ("<strong>Next 3 steps</strong>", "<strong>Próximos 3 pasos</strong>", "<strong>Official links</strong>", "<strong>Enlaces oficiales</strong>")):
        raise AssertionError(f"{route}: legacy practical sections remain")
    intro = re.search(r"<div\b[^>]*data-crawler-guide-intro[^>]*>([\s\S]*?)</div>", page, re.I)
    if not intro:
        raise AssertionError(f"{route}: crawler intro missing")
    if meta_description(page) not in visible_text(intro.group(1)):
        raise AssertionError(f"{route}: meta description is not visible in crawler intro")
    if data["procedureKey"] == "banking-spain":
        for token in ("source of funds", "origen de fondos", "IBAN"):
            if token.lower() in page.lower():
                break
        else:
            raise AssertionError(f"{route}: banking KYC/IBAN guidance missing")
        stale = ("may not satisfy landlords or employers who require a Spanish IBAN", "Good for sending money internationally at mid-market rates")
        if any(x in page for x in stale):
            raise AssertionError(f"{route}: stale bank-product recommendation remains")
    else:
        needed = ("183", "IRPF", "IRNR", "Modelo 030", "720")
        if not all(x in page for x in needed):
            raise AssertionError(f"{route}: core tax decision guidance missing")
        stale = ("generally means spending more than 183 days per year", "taxation only on Spanish-source income for up to six years")
        if any(x in page for x in stale):
            raise AssertionError(f"{route}: stale tax shortcut remains")
    for link in data["links"]:
        if f'href="{link["url"]}"' not in page:
            raise AssertionError(f"{route}: official link missing {link['url']}")
    if preview and 'class="language-switcher"' not in page:
        raise AssertionError(f"{route}: language switcher missing")


def request(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": "IberiGo-banking-tax-audit/1.0"})
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


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", action="store_true")
    parser.add_argument("--preview", action="store_true")
    args = parser.parse_args()
    if not args.local and not args.preview:
        parser.error("choose --local or --preview")
    for file, data in configs():
        page = fetch(os.environ["PREVIEW_BASE"], data["route"]) if args.preview else route_file(data["route"]).read_text(encoding="utf-8")
        validate(file, data, page, args.preview)
    print("BANKING/TAX AUDIT PASSED: EN/ES banking and tax static-first guides verified")


if __name__ == "__main__":
    main()
