import html
import os
import re
import time
import urllib.request
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ.get("PREVIEW_BASE", "").rstrip("/")
ROOT = Path(__file__).resolve().parents[1]

MOVE_CASES = [
    ("eu", "workEmployee", "eu-employed", None, None),
    ("eu", "workSelf", "eu-self-employed", None, None),
    ("eu", "noWork", "eu-registration", None, None),
    ("eu", "remote", "eu-remote", None, None),
    ("eu", "family", "eu-family-self", None, None),
    ("eu", "studyAbroad", "eu-study-short", "short", None),
    ("eu", "studyAbroad", "eu-study", "long", None),
    ("eu", "studyAbroad", "eu-study-unsure", "notSure", None),
    ("nonEu", "workEmployee", "work-employed", None, None),
    ("nonEu", "workSelf", "work-self-employed", None, None),
    ("nonEu", "workSpecialist", "work-specialist", None, None),
    ("nonEu", "noWork", "non-lucrative", None, None),
    ("nonEu", "remote", "digital-nomad", None, None),
    ("nonEu", "specialCase", "special-cases", None, None),
    ("nonEu", "studyAbroad", "study-short", "short", None),
    ("nonEu", "studyAbroad", "study-abroad", "long", None),
    ("nonEu", "studyAbroad", "study-unsure-abroad", "notSure", None),
    ("nonEu", "studySpain", "study-short-in-spain", "short", None),
    ("nonEu", "studySpain", "study-in-spain", "long", None),
    ("nonEu", "studySpain", "study-unsure-in-spain", "notSure", None),
    ("nonEu", "family", "eu-family", None, "euCitizen"),
    ("nonEu", "family", "spanish-family", None, "spanishCitizen"),
    ("nonEu", "family", "spanish-eu-return-family", None, "spanishCitizenEuReturn"),
    ("nonEu", "family", "family", None, "nonEuResident"),
]

LIVING_ROUTES = [
    "padron", "nie", "tie", "social-security", "digital", "driving-licence-exchange",
    "sip-card", "private-health", "ehic-card", "banking", "renting-home",
    "job-search", "taxes", "vida-laboral", "phone"
]
VACATION_ROUTES = [
    "vacation-entry", "vacation-flights", "vacation-ground", "driving-spain-visitors",
    "vacation-booking", "vacation-hotels", "vacation-tourism", "vacation-reviews",
    "travel-insurance", "sim-esim-vpn"
]
BAD_TOKENS = ("undefined", "[object object]", "nan", "todo", "tbd")


def fail(message):
    raise AssertionError(message)


def clean_text(value):
    value = re.sub(r"<[^>]+>", " ", value or "")
    return " ".join(html.unescape(value).split())


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


def discover_static_guides():
    found = {}
    html_re = re.compile(r"<html\b([^>]*)>", re.I)
    attr_re = re.compile(r'\b(data-guide-id|data-guide-lang)=["\']([^"\']+)["\']', re.I)
    for path in ROOT.glob("guides/**/index.html"):
        text = path.read_text(encoding="utf-8")
        match = html_re.search(text)
        if not match:
            continue
        attrs = dict((k.lower(), v) for k, v in attr_re.findall(match.group(1)))
        guide_id = attrs.get("data-guide-id")
        lang = attrs.get("data-guide-lang")
        if guide_id and lang in {"en", "es"}:
            found[(lang, guide_id)] = path
    return found


def static_repository_audit():
    guides = discover_static_guides()
    if not guides:
        fail("No static guide pages with data-guide-id were discovered")

    ids = sorted({guide_id for _, guide_id in guides})
    missing_pairs = [
        guide_id for guide_id in ids
        if ("en", guide_id) not in guides or ("es", guide_id) not in guides
    ]
    if missing_pairs:
        fail(f"EN/ES static guide pairs missing: {missing_pairs}")

    internal_targets = set()
    broken_internal = []
    for (lang, guide_id), path in guides.items():
        text = path.read_text(encoding="utf-8")
        expected_self = f"/guides/es/{guide_id}/" if lang == "es" else f"/guides/{guide_id}/"
        expected_en = f"https://iberigo.eu/guides/{guide_id}/"
        expected_es = f"https://iberigo.eu/guides/es/{guide_id}/"
        if expected_en not in text or expected_es not in text:
            fail(f"{path}: missing EN/ES hreflang pair for {guide_id}")
        canonical = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)', text, re.I)
        if canonical:
            expected = expected_es if lang == "es" else expected_en
            if canonical.group(1) != expected:
                fail(f"{path}: canonical mismatch {canonical.group(1)!r} != {expected!r}")
        if f'data-guide-id="{guide_id}"' not in text or f'data-guide-lang="{lang}"' not in text:
            fail(f"{path}: guide metadata mismatch")
        for href in re.findall(r'href=["\'](/guides/(?:es/)?[^"\'#?]+/)["\']', text, re.I):
            internal_targets.add(href)

    for href in sorted(internal_targets):
        relative = href.strip("/") + "/index.html"
        if not (ROOT / relative).exists():
            broken_internal.append(href)
    if broken_internal:
        fail(f"Broken internal guide links in static pages: {broken_internal}")

    print(f"PASS static repository · {len(ids)} EN/ES guide pairs · {len(internal_targets)} internal guide targets")
    return guides


def make_driver(width, height):
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument(f"--window-size={width},{height}")
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(40)
    return driver


def wait_loaded(driver):
    WebDriverWait(driver, 25).until(
        lambda d: d.execute_script(
            "return typeof setWizardFromPreset === 'function' && "
            "typeof pickRoute === 'function' && "
            "typeof directRoadmapFor === 'function' && "
            "window.__iberigoRoadmapNextActionsLoaded === true && "
            "!!document.querySelector('#routeWizard')"
        )
    )


def set_language(driver, lang):
    driver.get(BASE + "/")
    wait_loaded(driver)
    driver.execute_script("localStorage.setItem('holaPapersLang', arguments[0]);", lang)
    driver.refresh()
    wait_loaded(driver)
    WebDriverWait(driver, 15).until(
        lambda d: d.execute_script("return document.documentElement.lang") == lang
    )


def select_value(driver, name, value):
    result = driver.execute_script(
        """
        const input = document.querySelector(`input[name="${arguments[0]}"][value="${arguments[1]}"]`);
        if (!input) return {ok:false, reason:'missing'};
        const label = input.closest('label');
        if (label && label.hidden) return {ok:false, reason:'hidden'};
        input.click();
        return {ok:input.checked, reason:input.checked ? '' : 'not-checked'};
        """,
        name,
        value,
    )
    if not result.get("ok"):
        fail(f"Could not select {name}={value}: {result}")


def submit(driver):
    driver.execute_script("document.querySelector('#routeWizard').requestSubmit();")
    time.sleep(0.08)


def model_snapshot(driver, expression):
    return driver.execute_script(
        f"""
        const roadmap = {expression};
        const result = document.querySelector('#wizardResult');
        const toText = (raw) => {{
          const box = document.createElement('div');
          box.innerHTML = raw || '';
          return box.textContent.trim().replace(/\s+/g, ' ');
        }};
        const steps = Array.isArray(roadmap?.steps) ? roadmap.steps.map(toText) : [];
        const sourceLinks = [...result.querySelectorAll('a.gov-link, a.guide-source-card')];
        const route = typeof pickRoute === 'function' ? pickRoute() : null;
        const linkIds = Array.isArray(roadmap?.links) ? roadmap.links : [];
        return {{
          routeId: route?.id || null,
          process: toText(roadmap?.process || ''),
          explanation: toText(roadmap?.explanation || ''),
          steps,
          linkIds,
          unresolvedLinkIds: linkIds.filter((id) => typeof urls !== 'object' || !urls[id]),
          visibleSteps: result.querySelectorAll('.roadmap-list--full > li').length,
          nowCount: result.querySelectorAll('.roadmap-now').length,
          nowText: result.querySelector('.roadmap-now')?.textContent.trim().replace(/\s+/g, ' ') || '',
          resultText: result.textContent.trim().replace(/\s+/g, ' '),
          sourceCount: sourceLinks.length,
          sourceBadHref: sourceLinks.filter((a) => !/^https:\/\//.test(a.href)).map((a) => a.href),
          duplicateSourceHrefs: sourceLinks.map((a) => a.href).filter((href, i, all) => all.indexOf(href) !== i),
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        }};
        """
    )


def assert_quality(data, lang, label, expected_route=None):
    if expected_route and data["routeId"] != expected_route:
        fail(f"{label}: expected route {expected_route}, got {data['routeId']}")
    if not data["process"] or not data["explanation"]:
        fail(f"{label}: missing process/explanation: {data}")
    if not data["steps"]:
        fail(f"{label}: no roadmap steps")
    normalized = [" ".join(step.lower().split()) for step in data["steps"]]
    if any(not step for step in normalized):
        fail(f"{label}: empty roadmap step: {data['steps']}")
    if len(normalized) != len(set(normalized)):
        fail(f"{label}: duplicate roadmap steps: {data['steps']}")
    joined = " ".join([data["process"], data["explanation"], *data["steps"]]).lower()
    bad = [token for token in BAD_TOKENS if token in joined]
    if bad:
        fail(f"{label}: placeholder/runtime tokens found: {bad}")
    if data["visibleSteps"] != len(data["steps"]):
        fail(f"{label}: rendered {data['visibleSteps']} of {len(data['steps'])} stored steps")
    if data["nowCount"] != 1 or data["steps"][0] not in data["nowText"]:
        fail(f"{label}: Do-this-now mismatch: {data['nowText']!r}")
    legacy = "Próximos 3 pasos" if lang == "es" else "Next 3 steps"
    if legacy in data["resultText"]:
        fail(f"{label}: legacy '{legacy}' still visible")
    if data["unresolvedLinkIds"]:
        fail(f"{label}: unresolved source IDs {data['unresolvedLinkIds']}")
    if data["linkIds"] and data["sourceCount"] < 1:
        fail(f"{label}: source IDs exist but no source cards rendered")
    if data["sourceBadHref"]:
        fail(f"{label}: non-HTTPS source links {data['sourceBadHref']}")
    if data["overflow"]:
        fail(f"{label}: horizontal overflow")


def run_move_case(driver, lang, person, goal, expected_route, duration=None, sponsor=None):
    driver.get(BASE + "/")
    wait_loaded(driver)
    driver.execute_script("setWizardFromPreset('moving');")
    sequence = [driver.execute_script("return document.querySelector('#routeWizard').dataset.step")]
    if sequence != ["person"]:
        fail(f"{lang} {person}/{goal}: unexpected initial sequence {sequence}")

    select_value(driver, "personType", person)
    submit(driver)
    WebDriverWait(driver, 10).until(lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "goal")
    sequence.append("goal")
    select_value(driver, "goal", goal)
    submit(driver)

    if goal in ("studyAbroad", "studySpain"):
        WebDriverWait(driver, 10).until(lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "duration")
        sequence.append("duration")
        if duration is None:
            fail(f"Study case missing duration: {person}/{goal}")
        select_value(driver, "duration", duration)
        submit(driver)
    elif person == "nonEu" and goal == "family":
        WebDriverWait(driver, 10).until(lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "family")
        sequence.append("family")
        if sponsor is None:
            fail("Non-EU family case missing sponsor")
        select_value(driver, "familySponsor", sponsor)
        submit(driver)

    WebDriverWait(driver, 15).until(
        lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "result"
    )
    sequence.append("result")
    expected_sequence = ["person", "goal"]
    if goal in ("studyAbroad", "studySpain"):
        expected_sequence.append("duration")
    elif person == "nonEu" and goal == "family":
        expected_sequence.append("family")
    expected_sequence.append("result")
    if sequence != expected_sequence:
        fail(f"{lang} {person}/{goal}: question sequence {sequence} != {expected_sequence}")

    data = model_snapshot(driver, "roadmapFor(pickRoute())")
    suffix = f"/{duration}" if duration else f"/{sponsor}" if sponsor else ""
    label = f"{lang} move/{person}/{goal}{suffix}"
    assert_quality(data, lang, label, expected_route)
    print(f"PASS {label} -> {expected_route} · {len(data['steps'])} steps · {len(data['linkIds'])} source ids")
    return len(data["steps"])


def assert_menu_and_direct_models(driver, lang, preset, routes):
    driver.get(BASE + "/")
    wait_loaded(driver)
    driver.execute_script("setWizardFromPreset(arguments[0]);", preset)
    prefix = "/guides/es/" if lang == "es" else "/guides/"
    for route in routes:
        data = driver.execute_script(
            """
            const id = arguments[0];
            const card = document.querySelector(`[data-topic="${id}"]`);
            const link = card?.querySelector(':scope > a');
            const roadmap = directRoadmapFor(id);
            const toText = (raw) => { const b=document.createElement('div'); b.innerHTML=raw||''; return b.textContent.trim().replace(/\s+/g,' '); };
            const steps = Array.isArray(roadmap?.steps) ? roadmap.steps.map(toText) : [];
            return {
              card: !!card,
              href: link?.getAttribute('href') || '',
              process: toText(roadmap?.process || ''),
              explanation: toText(roadmap?.explanation || ''),
              steps,
              linkIds: Array.isArray(roadmap?.links) ? roadmap.links : [],
              unresolvedLinkIds: Array.isArray(roadmap?.links) ? roadmap.links.filter((id) => typeof urls !== 'object' || !urls[id]) : [],
              preview: card?.querySelector('small')?.textContent.trim().replace(/\s+/g,' ') || ''
            };
            """,
            route,
        )
        expected_href = f"{prefix}{route}/"
        if not data["card"] or data["href"] != expected_href:
            fail(f"{lang} {preset}/{route}: bad menu link {data}")
        if not data["process"] or not data["explanation"] or not data["steps"]:
            fail(f"{lang} {preset}/{route}: incomplete direct roadmap {data}")
        if data["unresolvedLinkIds"]:
            fail(f"{lang} {preset}/{route}: unresolved source IDs {data['unresolvedLinkIds']}")
        if clean_text(data["steps"][0]) not in clean_text(data["preview"]):
            fail(f"{lang} {preset}/{route}: preview is not first action: {data}")
        print(f"PASS {lang} menu/{preset}/{route} · {len(data['steps'])} steps")


def assert_static_guide(driver, lang, route):
    prefix = "/guides/es/" if lang == "es" else "/guides/"
    driver.get(BASE + f"{prefix}{route}/")
    wait_loaded(driver)
    WebDriverWait(driver, 15).until(
        lambda d: d.execute_script(
            "return document.documentElement.dataset.guideId === arguments[0] && "
            "!!document.querySelector('#wizardResult .roadmap-list--full') && "
            "!!document.querySelector('#wizardResult .roadmap-now')",
            route,
        )
    )
    meta = driver.execute_script(
        """
        const id=arguments[0], lang=arguments[1];
        return {
          guideId: document.documentElement.dataset.guideId,
          guideLang: document.documentElement.dataset.guideLang,
          htmlLang: document.documentElement.lang,
          canonical: document.querySelector('link[rel="canonical"]')?.href || '',
          en: document.querySelector('link[rel="alternate"][hreflang="en"]')?.href || '',
          es: document.querySelector('link[rel="alternate"][hreflang="es"]')?.href || '',
          xdefault: document.querySelector('link[rel="alternate"][hreflang="x-default"]')?.href || '',
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        };
        """,
        route,
        lang,
    )
    if meta["guideId"] != route or meta["guideLang"] != lang or meta["htmlLang"] != lang:
        fail(f"static {lang}/{route}: language/guide metadata mismatch {meta}")
    expected_en = f"https://iberigo.eu/guides/{route}/"
    expected_es = f"https://iberigo.eu/guides/es/{route}/"
    expected_canonical = expected_es if lang == "es" else expected_en
    if meta["canonical"] != expected_canonical or meta["en"] != expected_en or meta["es"] != expected_es or meta["xdefault"] != expected_en:
        fail(f"static {lang}/{route}: canonical/hreflang mismatch {meta}")
    if meta["overflow"]:
        fail(f"static {lang}/{route}: horizontal overflow")
    data = model_snapshot(driver, f"directRoadmapFor('{route}')")
    assert_quality(data, lang, f"static {lang}/{route}")
    print(f"PASS static {lang}/{route} · {len(data['steps'])} steps")


def run_language(driver, lang, parity, check_static=False):
    set_language(driver, lang)
    for person, goal, expected, duration, sponsor in MOVE_CASES:
        count = run_move_case(driver, lang, person, goal, expected, duration, sponsor)
        key = (person, goal, duration, sponsor)
        parity.setdefault(key, {})[lang] = count

    assert_menu_and_direct_models(driver, lang, "living", LIVING_ROUTES)
    assert_menu_and_direct_models(driver, lang, "vacation", VACATION_ROUTES)

    if check_static:
        for route in LIVING_ROUTES + VACATION_ROUTES:
            assert_static_guide(driver, lang, route)


def assert_parity(parity):
    mismatches = []
    for key, counts in parity.items():
        if set(counts) != {"en", "es"} or counts["en"] != counts["es"]:
            mismatches.append((key, counts))
    if mismatches:
        fail(f"EN/ES move-route step-count parity failures: {mismatches}")
    print(f"PASS EN/ES parity · {len(parity)} move decision cases")


def main():
    wait_for_site()
    static_repository_audit()
    parity = {}

    desktop = make_driver(1440, 1000)
    try:
        run_language(desktop, "en", parity, check_static=True)
        run_language(desktop, "es", parity, check_static=True)
    finally:
        desktop.quit()

    assert_parity(parity)

    # Full decision tree again at a narrow mobile viewport. This catches wrapping,
    # hidden-control and result-overflow regressions without duplicating every
    # static-page network navigation a second time.
    mobile_parity = {}
    mobile = make_driver(390, 844)
    try:
        run_language(mobile, "en", mobile_parity, check_static=False)
        run_language(mobile, "es", mobile_parity, check_static=False)
    finally:
        mobile.quit()
    assert_parity(mobile_parity)

    print("EXTENSIVE ROADMAP AUDIT PASSED: DESKTOP + MOBILE, EN + ES")


if __name__ == "__main__":
    main()
