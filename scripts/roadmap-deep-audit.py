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
    "job-search", "taxes", "vida-laboral", "phone",
]

VACATION_ROUTES = [
    "vacation-entry", "vacation-flights", "vacation-ground", "driving-spain-visitors",
    "vacation-booking", "vacation-hotels", "vacation-tourism", "vacation-reviews",
    "travel-insurance", "sim-esim-vpn",
]

# These two strings indicate actual JavaScript/runtime leakage when they appear in
# rendered route copy. We intentionally do not substring-match NaN/TODO/TBD because
# normal English/Spanish words can contain those letter sequences.
BAD_TOKENS = ("undefined", "[object object]")

EXPECTED_CONTEXT_SOURCE = {
    "eu-employed": {
        "en": "https://europa.eu/youreurope/citizens/residence/residence-rights/workers/index_en.htm",
        "es": "https://europa.eu/youreurope/citizens/residence/residence-rights/workers/index_es.htm",
    },
    "eu-self-employed": {
        "en": "https://europa.eu/youreurope/citizens/residence/residence-rights/workers/index_en.htm",
        "es": "https://europa.eu/youreurope/citizens/residence/residence-rights/workers/index_es.htm",
    },
    "eu-remote": {
        "en": "https://europa.eu/youreurope/citizens/residence/residence-rights/workers/index_en.htm",
        "es": "https://europa.eu/youreurope/citizens/residence/residence-rights/workers/index_es.htm",
    },
    "eu-study-short": {
        "en": "https://europa.eu/youreurope/citizens/residence/residence-rights/students/index_en.htm",
        "es": "https://europa.eu/youreurope/citizens/residence/residence-rights/students/index_es.htm",
    },
    "eu-study": {
        "en": "https://europa.eu/youreurope/citizens/residence/residence-rights/students/index_en.htm",
        "es": "https://europa.eu/youreurope/citizens/residence/residence-rights/students/index_es.htm",
    },
    "eu-study-unsure": {
        "en": "https://europa.eu/youreurope/citizens/residence/residence-rights/students/index_en.htm",
        "es": "https://europa.eu/youreurope/citizens/residence/residence-rights/students/index_es.htm",
    },
    "eu-family-self": {
        "en": "https://europa.eu/youreurope/citizens/residence/documents-formalities/eu-family-members-registration/index_en.htm",
        "es": "https://europa.eu/youreurope/citizens/residence/documents-formalities/eu-family-members-registration/index_es.htm",
    },
}


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


def static_repository_audit():
    pages = {}
    html_re = re.compile(r"<html\b([^>]*)>", re.I)
    attr_re = re.compile(r'\b(data-guide-id|data-guide-lang)=["\']([^"\']+)["\']', re.I)

    for path in ROOT.glob("guides/**/index.html"):
        text = path.read_text(encoding="utf-8")
        match = html_re.search(text)
        if not match:
            continue
        attrs = {key.lower(): value for key, value in attr_re.findall(match.group(1))}
        guide_id = attrs.get("data-guide-id")
        lang = attrs.get("data-guide-lang")
        if guide_id and lang in {"en", "es"}:
            pages[(lang, guide_id)] = (path, text)

    if not pages:
        fail("No data-guide-id pages found")

    ids = sorted({guide_id for _, guide_id in pages})
    missing = [guide_id for guide_id in ids if ("en", guide_id) not in pages or ("es", guide_id) not in pages]
    if missing:
        fail(f"Static EN/ES guide pairs missing: {missing}")

    internal_targets = set()
    for (lang, guide_id), (path, text) in pages.items():
        en_url = f"https://iberigo.eu/guides/{guide_id}/"
        es_url = f"https://iberigo.eu/guides/es/{guide_id}/"
        expected_canonical = es_url if lang == "es" else en_url
        canonical = re.search(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)', text, re.I)
        if not canonical or canonical.group(1) != expected_canonical:
            fail(f"{path}: canonical missing or wrong")
        if en_url not in text or es_url not in text:
            fail(f"{path}: EN/ES hreflang pair missing")
        if f'data-guide-id="{guide_id}"' not in text or f'data-guide-lang="{lang}"' not in text:
            fail(f"{path}: guide metadata mismatch")
        internal_targets.update(
            re.findall(r'href=["\'](/guides/(?:es/)?[^"\'#?]+/)["\']', text, re.I)
        )

    broken = []
    for href in sorted(internal_targets):
        target = ROOT / (href.strip("/") + "/index.html")
        if not target.exists():
            broken.append(href)
    if broken:
        fail(f"Broken internal guide links: {broken}")

    print(f"PASS static repository · {len(ids)} EN/ES guide pairs · {len(internal_targets)} internal guide targets")


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
            "return typeof setWizardFromPreset==='function' && "
            "typeof pickRoute==='function' && typeof directRoadmapFor==='function' && "
            "window.__iberigoRoadmapNextActionsLoaded===true && !!document.querySelector('#routeWizard')"
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
    state = driver.execute_script(
        """
        const input=document.querySelector(`input[name="${arguments[0]}"][value="${arguments[1]}"]`);
        if(!input) return {ok:false, reason:'missing'};
        const label=input.closest('label');
        if(label && label.hidden) return {ok:false, reason:'hidden'};
        input.click();
        return {ok:input.checked, reason:input.checked?'':'not-checked'};
        """,
        name,
        value,
    )
    if not state.get("ok"):
        fail(f"Could not select {name}={value}: {state}")


def submit(driver):
    driver.execute_script("document.querySelector('#routeWizard').requestSubmit()")
    time.sleep(0.08)


def snapshot(driver, expression):
    data = driver.execute_script(
        f"""
        const roadmap={expression};
        const result=document.querySelector('#wizardResult');
        const text=(raw)=>{{const b=document.createElement('div'); b.innerHTML=raw||''; return b.textContent||'';}};
        const route=typeof pickRoute==='function' ? pickRoute() : null;
        return {{
          routeId:route?.id||null,
          process:text(roadmap?.process||''),
          explanation:text(roadmap?.explanation||''),
          steps:Array.isArray(roadmap?.steps)?roadmap.steps.map(text):[],
          documents:Array.isArray(roadmap?.documents)?roadmap.documents.map(text):[],
          linkIds:Array.isArray(roadmap?.links)?roadmap.links:[],
          visibleSteps:result.querySelectorAll('.roadmap-list--full > li').length,
          nowCount:result.querySelectorAll('.roadmap-now').length,
          nowText:result.querySelector('.roadmap-now')?.textContent||'',
          resultText:result.textContent||'',
          sourceHrefs:[...result.querySelectorAll('.route-links-note a[href]')].map(a=>a.href),
          overflow:document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        }};
        """
    )
    for key in ("process", "explanation", "nowText", "resultText"):
        data[key] = clean_text(data[key])
    data["steps"] = [clean_text(step) for step in data["steps"]]
    data["documents"] = [clean_text(doc) for doc in data["documents"]]
    return data


def assert_quality(data, lang, label, expected_route=None, require_documents=False):
    if expected_route and data["routeId"] != expected_route:
        fail(f"{label}: route {data['routeId']} != {expected_route}")
    if not data["process"] or not data["explanation"]:
        fail(f"{label}: missing process/explanation")
    if not data["steps"]:
        fail(f"{label}: missing roadmap steps")
    if require_documents and not data["documents"]:
        fail(f"{label}: missing document guidance")

    normalized = [" ".join(step.lower().split()) for step in data["steps"]]
    if any(not step for step in normalized):
        fail(f"{label}: empty step")
    if len(normalized) != len(set(normalized)):
        fail(f"{label}: duplicate steps {data['steps']}")

    joined = " ".join([data["process"], data["explanation"], *data["steps"]]).lower()
    bad = [token for token in BAD_TOKENS if token in joined]
    if bad:
        fail(f"{label}: runtime leakage {bad}")

    if data["visibleSteps"] != len(data["steps"]):
        fail(f"{label}: rendered {data['visibleSteps']} of {len(data['steps'])} steps")
    if data["nowCount"] != 1 or data["steps"][0] not in data["nowText"]:
        fail(f"{label}: Do-this-now mismatch")

    legacy = "Próximos 3 pasos" if lang == "es" else "Next 3 steps"
    if legacy in data["resultText"]:
        fail(f"{label}: legacy '{legacy}' visible")

    if data["linkIds"] and not data["sourceHrefs"]:
        fail(f"{label}: route has source references but no source cards")
    bad_hrefs = [href for href in data["sourceHrefs"] if not href.startswith("https://")]
    if bad_hrefs:
        fail(f"{label}: non-HTTPS source cards {bad_hrefs}")

    if expected_route in EXPECTED_CONTEXT_SOURCE:
        expected_source = EXPECTED_CONTEXT_SOURCE[expected_route][lang]
        if expected_source not in data["sourceHrefs"]:
            fail(f"{label}: contextual official source missing: {expected_source}")

    if data["overflow"]:
        fail(f"{label}: horizontal overflow")


def run_move_case(driver, lang, person, goal, expected_route, duration=None, sponsor=None):
    driver.get(BASE + "/")
    wait_loaded(driver)
    driver.execute_script("setWizardFromPreset('moving')")
    sequence = [driver.execute_script("return document.querySelector('#routeWizard').dataset.step")]
    if sequence != ["person"]:
        fail(f"{lang} {person}/{goal}: unexpected initial state {sequence}")

    select_value(driver, "personType", person)
    submit(driver)
    WebDriverWait(driver, 10).until(
        lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "goal"
    )
    sequence.append("goal")
    select_value(driver, "goal", goal)
    submit(driver)

    if goal in ("studyAbroad", "studySpain"):
        WebDriverWait(driver, 10).until(
            lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "duration"
        )
        sequence.append("duration")
        if duration is None:
            fail(f"{person}/{goal}: duration missing from test case")
        select_value(driver, "duration", duration)
        submit(driver)
    elif person == "nonEu" and goal == "family":
        WebDriverWait(driver, 10).until(
            lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "family"
        )
        sequence.append("family")
        if sponsor is None:
            fail("Non-EU family test case missing sponsor")
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
        fail(f"{lang} {person}/{goal}: sequence {sequence} != {expected_sequence}")

    suffix = f"/{duration}" if duration else f"/{sponsor}" if sponsor else ""
    label = f"{lang} move/{person}/{goal}{suffix}"
    data = snapshot(driver, "roadmapFor(pickRoute())")
    assert_quality(data, lang, label, expected_route, require_documents=True)
    print(f"PASS {label} -> {expected_route} · {len(data['steps'])} steps · {len(data['sourceHrefs'])} source cards")
    return len(data["steps"])


def assert_menu_models(driver, lang, preset, routes):
    driver.get(BASE + "/")
    wait_loaded(driver)
    driver.execute_script("setWizardFromPreset(arguments[0])", preset)
    prefix = "/guides/es/" if lang == "es" else "/guides/"

    for route in routes:
        data = driver.execute_script(
            """
            const id=arguments[0];
            const card=document.querySelector(`[data-topic="${id}"]`);
            const link=card?.querySelector(':scope > a');
            const roadmap=directRoadmapFor(id);
            const text=(raw)=>{const b=document.createElement('div'); b.innerHTML=raw||''; return b.textContent||'';};
            return {
              card:!!card,
              href:link?.getAttribute('href')||'',
              process:text(roadmap?.process||''),
              explanation:text(roadmap?.explanation||''),
              steps:Array.isArray(roadmap?.steps)?roadmap.steps.map(text):[],
              preview:card?.querySelector('small')?.textContent||''
            };
            """,
            route,
        )
        expected_href = f"{prefix}{route}/"
        if not data["card"] or data["href"] != expected_href:
            fail(f"{lang} menu/{preset}/{route}: link mismatch {data}")
        steps = [clean_text(step) for step in data["steps"]]
        if not clean_text(data["process"]) or not clean_text(data["explanation"]) or not steps:
            fail(f"{lang} menu/{preset}/{route}: incomplete direct roadmap")
        if steps[0] not in clean_text(data["preview"]):
            fail(f"{lang} menu/{preset}/{route}: preview != first action")
        print(f"PASS {lang} menu/{preset}/{route} · {len(steps)} steps")


def assert_static_guide(driver, lang, route):
    prefix = "/guides/es/" if lang == "es" else "/guides/"
    driver.get(BASE + f"{prefix}{route}/")
    wait_loaded(driver)
    WebDriverWait(driver, 15).until(
        lambda d: d.execute_script(
            "return document.documentElement.dataset.guideId===arguments[0] && "
            "!!document.querySelector('#wizardResult .roadmap-list--full') && "
            "!!document.querySelector('#wizardResult .roadmap-now')",
            route,
        )
    )

    meta = driver.execute_script(
        """
        return {
          guideId:document.documentElement.dataset.guideId||'',
          guideLang:document.documentElement.dataset.guideLang||'',
          htmlLang:document.documentElement.lang||'',
          canonical:document.querySelector('link[rel="canonical"]')?.href||'',
          en:document.querySelector('link[rel="alternate"][hreflang="en"]')?.href||'',
          es:document.querySelector('link[rel="alternate"][hreflang="es"]')?.href||'',
          xdefault:document.querySelector('link[rel="alternate"][hreflang="x-default"]')?.href||'',
          overflow:document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        };
        """
    )
    en_url = f"https://iberigo.eu/guides/{route}/"
    es_url = f"https://iberigo.eu/guides/es/{route}/"
    canonical = es_url if lang == "es" else en_url
    if meta["guideId"] != route or meta["guideLang"] != lang or meta["htmlLang"] != lang:
        fail(f"static {lang}/{route}: metadata mismatch {meta}")
    if meta["canonical"] != canonical or meta["en"] != en_url or meta["es"] != es_url or meta["xdefault"] != en_url:
        fail(f"static {lang}/{route}: canonical/hreflang mismatch {meta}")
    if meta["overflow"]:
        fail(f"static {lang}/{route}: horizontal overflow")

    data = snapshot(driver, f"directRoadmapFor('{route}')")
    assert_quality(data, lang, f"static {lang}/{route}")
    print(f"PASS static {lang}/{route} · {len(data['steps'])} steps · {len(data['sourceHrefs'])} source cards")


def run_language(driver, lang, parity, static_pages=False):
    set_language(driver, lang)
    for person, goal, expected, duration, sponsor in MOVE_CASES:
        count = run_move_case(driver, lang, person, goal, expected, duration, sponsor)
        parity.setdefault((person, goal, duration, sponsor), {})[lang] = count

    assert_menu_models(driver, lang, "living", LIVING_ROUTES)
    assert_menu_models(driver, lang, "vacation", VACATION_ROUTES)

    if static_pages:
        for route in LIVING_ROUTES + VACATION_ROUTES:
            assert_static_guide(driver, lang, route)


def assert_parity(parity, label):
    mismatches = []
    for key, counts in parity.items():
        if set(counts) != {"en", "es"} or counts["en"] != counts["es"]:
            mismatches.append((key, counts))
    if mismatches:
        fail(f"{label} EN/ES step-count parity failures: {mismatches}")
    print(f"PASS {label} EN/ES parity · {len(parity)} move cases")


def main():
    wait_for_site()
    static_repository_audit()

    desktop_parity = {}
    desktop = make_driver(1440, 1000)
    try:
        run_language(desktop, "en", desktop_parity, static_pages=True)
        run_language(desktop, "es", desktop_parity, static_pages=True)
    finally:
        desktop.quit()
    assert_parity(desktop_parity, "desktop")

    mobile_parity = {}
    mobile = make_driver(390, 844)
    try:
        run_language(mobile, "en", mobile_parity, static_pages=False)
        run_language(mobile, "es", mobile_parity, static_pages=False)
    finally:
        mobile.quit()
    assert_parity(mobile_parity, "mobile")

    print("EXTENSIVE ROADMAP AUDIT PASSED: DESKTOP + MOBILE, EN + ES")


if __name__ == "__main__":
    main()
