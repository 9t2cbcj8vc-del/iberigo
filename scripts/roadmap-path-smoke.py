import os
import time
import urllib.request

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ.get("PREVIEW_BASE", "").rstrip("/")


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
    found = driver.execute_script(
        """
        const input = document.querySelector(`input[name="${arguments[0]}"][value="${arguments[1]}"]`);
        if (!input) return false;
        const label = input.closest('label');
        if (label && label.hidden) return 'hidden';
        input.click();
        return input.checked;
        """,
        name,
        value,
    )
    if found is not True:
        fail(f"Could not select {name}={value}: {found}")


def submit(driver):
    driver.execute_script("document.querySelector('#routeWizard').requestSubmit();")
    time.sleep(0.12)


def assert_roadmap_dom(driver, model_expression, lang, label, expected_route=None):
    data = driver.execute_script(
        f"""
        const roadmap = {model_expression};
        const result = document.querySelector('#wizardResult');
        const list = result.querySelector('.roadmap-list--full');
        const now = result.querySelector('.roadmap-now');
        const heading = list?.closest('.result-section')?.querySelector(':scope > strong')?.textContent.trim() || '';
        const route = typeof pickRoute === 'function' ? pickRoute() : null;
        return {{
          routeId: route?.id || null,
          modelSteps: Array.isArray(roadmap?.steps) ? roadmap.steps.length : 0,
          visibleSteps: list ? list.querySelectorAll('li').length : 0,
          nowText: now?.textContent.trim() || '',
          firstStep: roadmap?.steps?.[0] || '',
          heading,
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        }};
        """
    )
    if expected_route and data["routeId"] != expected_route:
        fail(f"{label}: expected route {expected_route}, got {data}")
    if data["modelSteps"] < 1 or data["visibleSteps"] != data["modelSteps"]:
        fail(f"{label}: full roadmap is not visible: {data}")
    if not data["nowText"] or data["firstStep"] not in data["nowText"]:
        fail(f"{label}: Do-this-now block missing first action: {data}")
    expected_heading = "Tu hoja de ruta" if lang == "es" else "Your roadmap"
    if data["heading"] != expected_heading:
        fail(f"{label}: roadmap heading mismatch: {data}")
    if data["overflow"]:
        fail(f"{label}: horizontal overflow detected: {data}")
    route_note = f" -> {expected_route}" if expected_route else ""
    print(f"PASS {lang} {label}{route_note} · {data['visibleSteps']} steps")


def assert_move_result(driver, expected_route, lang, label):
    WebDriverWait(driver, 15).until(
        lambda d: d.execute_script(
            "return document.querySelector('#routeWizard').dataset.step === 'result' && "
            "!document.querySelector('#wizardResult').hidden"
        )
    )
    assert_roadmap_dom(driver, "roadmapFor(pickRoute())", lang, label, expected_route)


def run_move_case(driver, lang, person, goal, expected_route, duration=None, sponsor=None):
    driver.get(BASE + "/")
    wait_loaded(driver)
    driver.execute_script("setWizardFromPreset('moving');")
    WebDriverWait(driver, 10).until(
        lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "person"
    )
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
        if duration is None:
            fail(f"Study case missing duration: {person}/{goal}")
        select_value(driver, "duration", duration)
        submit(driver)
    elif person == "nonEu" and goal == "family":
        WebDriverWait(driver, 10).until(
            lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "family"
        )
        if sponsor is None:
            fail("Non-EU family case missing sponsor")
        select_value(driver, "familySponsor", sponsor)
        submit(driver)

    suffix = f"/{duration}" if duration else f"/{sponsor}" if sponsor else ""
    assert_move_result(driver, expected_route, lang, f"move/{person}/{goal}{suffix}")


def run_direct_case(driver, lang, preset, direct_route):
    driver.get(BASE + "/")
    wait_loaded(driver)
    driver.execute_script("setWizardFromPreset(arguments[0]);", preset)
    selector = f'[data-direct-route="{direct_route}"]'
    WebDriverWait(driver, 10).until(
        lambda d: d.execute_script("return !!document.querySelector(arguments[0]);", selector)
    )
    clicked = driver.execute_script(
        "const b=document.querySelector(arguments[0]); if(!b) return false; b.click(); return true;",
        selector,
    )
    if not clicked:
        fail(f"Could not open direct route {preset}/{direct_route}")
    WebDriverWait(driver, 10).until(
        lambda d: d.execute_script(
            "return !!document.querySelector('#wizardResult .roadmap-list--full') && "
            "!!document.querySelector('#wizardResult .roadmap-now')"
        )
    )
    assert_roadmap_dom(
        driver,
        f"directRoadmapFor('{direct_route}')",
        lang,
        f"{preset}/{direct_route}",
    )


def run_language(driver, lang):
    set_language(driver, lang)

    move_cases = [
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
    for person, goal, expected, duration, sponsor in move_cases:
        run_move_case(driver, lang, person, goal, expected, duration, sponsor)

    living_routes = [
        "padron", "digital", "nie", "tie", "social-security", "sip-card",
        "private-health", "ehic-card", "banking", "renting-home", "job-search",
        "taxes", "phone", "vida-laboral", "driving-licence-exchange"
    ]
    vacation_routes = [
        "vacation-entry", "vacation-citizenship", "vacation-flights", "vacation-ground",
        "vacation-booking", "vacation-hotels", "vacation-tourism", "vacation-reviews",
        "travel-insurance", "driving-spain-visitors", "sim-esim-vpn"
    ]
    for route in living_routes:
        run_direct_case(driver, lang, "living", route)
    for route in vacation_routes:
        run_direct_case(driver, lang, "vacation", route)


def main():
    wait_for_site()
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1440,1000")
    driver = webdriver.Chrome(options=options)
    driver.set_page_load_timeout(35)
    try:
        run_language(driver, "en")
        run_language(driver, "es")
        print("ALL SELECTABLE ROADMAP PATHS PASSED IN EN AND ES")
    finally:
        driver.quit()


if __name__ == "__main__":
    main()
