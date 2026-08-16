import os
import time
import urllib.request

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ.get("PREVIEW_BASE", "").rstrip("/")

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

EXPECTED_HINTS = {
    "eu-employed": ("Extranjería", "Extranjería"),
    "eu-self-employed": ("Extranjería", "Extranjería"),
    "eu-registration": ("Extranjería", "Extranjería"),
    "eu-remote": ("Extranjería", "Extranjería"),
    "eu-family-self": ("Extranjería", "Extranjería"),
    "eu-study-short": ("No residence filing", "Sin trámite de residencia"),
    "eu-study": ("Extranjería", "Extranjería"),
    "eu-study-unsure": ("Do not file yet", "No presentes todavía"),
    "work-employed": ("Mercurio", "Mercurio"),
    "work-self-employed": ("Spanish consulate", "consulado español"),
    "work-specialist": ("UGE-CE", "UGE-CE"),
    "non-lucrative": ("Spanish consulate", "consulado español"),
    "digital-nomad": ("UGE-CE", "UGE-CE"),
    "special-cases": ("Migraciones catalogue", "catálogo oficial de Migraciones"),
    "study-short": ("Spanish consulate", "consulado español"),
    "study-abroad": ("consular office", "oficina consular"),
    "study-unsure-abroad": ("Do not file", "No presentes"),
    "study-short-in-spain": ("No separate long-stay filing", "Sin solicitud separada"),
    "study-in-spain": ("Mercurio", "Mercurio"),
    "study-unsure-in-spain": ("Do not file", "No presentes"),
    "eu-family": ("Extranjería", "Extranjería"),
    "spanish-family": ("Mercurio", "Mercurio"),
    "spanish-eu-return-family": ("EX-19", "EX-19"),
    "family": ("Mercurio", "Mercurio"),
}

BANNED_POLICE_FEE_COPY = ("12.00 EUR", "16.08 EUR", "12,00 €", "16,08 €")


def fail(message):
    raise AssertionError(message)


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


def make_driver():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1440,1000")
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(40)
    return driver


def wait_loaded(driver):
    WebDriverWait(driver, 25).until(
        lambda d: d.execute_script(
            "return typeof setWizardFromPreset==='function' && "
            "typeof pickRoute==='function' && typeof roadmapFor==='function' && "
            "window.__iberigoRoadmapNextActionsLoaded===true && "
            "window.__iberigoRoadmapWhereToApplyLoaded===true"
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
    ok = driver.execute_script(
        """
        const input=document.querySelector(`input[name="${arguments[0]}"][value="${arguments[1]}"]`);
        if(!input) return false;
        const label=input.closest('label');
        if(label && label.hidden) return false;
        input.click();
        return input.checked;
        """,
        name,
        value,
    )
    if not ok:
        fail(f"Could not select {name}={value}")


def submit(driver):
    driver.execute_script("document.querySelector('#routeWizard').requestSubmit()")
    time.sleep(0.08)


def run_case(driver, lang, person, goal, expected_route, duration=None, sponsor=None):
    driver.get(BASE + "/")
    wait_loaded(driver)
    driver.execute_script("setWizardFromPreset('moving')")

    select_value(driver, "personType", person)
    submit(driver)
    WebDriverWait(driver, 10).until(
        lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "goal"
    )
    select_value(driver, "goal", goal)
    submit(driver)

    if goal in ("studyAbroad", "studySpain"):
        WebDriverWait(driver, 10).until(
            lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "duration"
        )
        select_value(driver, "duration", duration)
        submit(driver)
    elif person == "nonEu" and goal == "family":
        WebDriverWait(driver, 10).until(
            lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "family"
        )
        select_value(driver, "familySponsor", sponsor)
        submit(driver)

    WebDriverWait(driver, 15).until(
        lambda d: d.execute_script(
            "return document.querySelector('#routeWizard').dataset.step==='result' && "
            "!document.querySelector('#wizardResult').hidden && "
            "document.querySelectorAll('#wizardResult .roadmap-where').length===1"
        )
    )

    data = driver.execute_script(
        """
        const route=pickRoute();
        const roadmap=roadmapFor(route);
        const where=document.querySelector('#wizardResult .roadmap-where');
        return {
          routeId: route?.id || '',
          modelWhere: roadmap?.whereToApply || '',
          visibleWhere: where?.textContent?.trim() || '',
          whereRoute: where?.dataset?.routeWhere || '',
          fullText: document.querySelector('#wizardResult')?.textContent || '',
          appSrc: [...document.scripts].map(s=>s.src).find(src=>src.includes('/app.js')) || ''
        };
        """
    )

    if data["routeId"] != expected_route or data["whereRoute"] != expected_route:
        fail(f"{lang}/{expected_route}: route mismatch {data}")
    if not data["modelWhere"] or not data["visibleWhere"]:
        fail(f"{lang}/{expected_route}: missing where-to-apply guidance")
    expected_heading = "Dónde hacer este trámite" if lang == "es" else "Where to do this"
    if expected_heading not in data["visibleWhere"]:
        fail(f"{lang}/{expected_route}: missing localized heading: {data['visibleWhere']}")
    hint = EXPECTED_HINTS[expected_route][1 if lang == "es" else 0]
    if hint.lower() not in data["visibleWhere"].lower():
        fail(f"{lang}/{expected_route}: missing expected location hint '{hint}': {data['visibleWhere']}")
    banned = [token for token in BANNED_POLICE_FEE_COPY if token in data["fullText"]]
    if banned:
        fail(f"{lang}/{expected_route}: stale hard-coded Police fee copy {banned}")
    if "20260816-roadmap-next-actions-4" not in data["appSrc"]:
        fail(f"{lang}/{expected_route}: new app cache key missing: {data['appSrc']}")

    print(f"PASS {lang}/{expected_route} · where-to-apply visible")


def main():
    wait_for_site()
    driver = make_driver()
    try:
        for lang in ("en", "es"):
            set_language(driver, lang)
            for person, goal, route, duration, sponsor in MOVE_CASES:
                run_case(driver, lang, person, goal, route, duration, sponsor)
    finally:
        driver.quit()
    print("ALL 24 MOVE OUTCOMES HAVE EN/ES FILING-LOCATION GUIDANCE")


if __name__ == "__main__":
    main()
