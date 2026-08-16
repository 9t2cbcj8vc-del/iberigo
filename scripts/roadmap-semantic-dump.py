import json
import os
import time
import urllib.request

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ["PREVIEW_BASE"].rstrip("/")
CASES = [
    ("eu", "workEmployee", None, None),
    ("nonEu", "studySpain", "long", None),
    ("nonEu", "family", None, "spanishCitizen"),
    ("nonEu", "workEmployee", None, None),
]


def wait_site():
    deadline = time.time() + 180
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(BASE + "/", timeout=15) as response:
                if response.status == 200:
                    return
        except Exception:
            pass
        time.sleep(3)
    raise RuntimeError("Preview not ready")


def choose(driver, name, value):
    ok = driver.execute_script(
        """
        const input=document.querySelector(`input[name="${arguments[0]}"][value="${arguments[1]}"]`);
        if(!input) return false;
        input.click();
        return input.checked;
        """,
        name,
        value,
    )
    if not ok:
        raise RuntimeError(f"Could not select {name}={value}")
    driver.execute_script("document.querySelector('#routeWizard').requestSubmit()")


def main():
    wait_site()
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1440,1000")
    driver = webdriver.Chrome(options=options)
    try:
        for person, goal, duration, sponsor in CASES:
            driver.get(BASE + "/")
            WebDriverWait(driver, 25).until(
                lambda d: d.execute_script(
                    "return typeof setWizardFromPreset==='function' && "
                    "window.__iberigoRoadmapNextActionsLoaded===true"
                )
            )
            driver.execute_script("localStorage.setItem('holaPapersLang','es')")
            driver.refresh()
            WebDriverWait(driver, 25).until(
                lambda d: d.execute_script("return document.documentElement.lang==='es'")
            )
            driver.execute_script("setWizardFromPreset('moving')")
            choose(driver, "personType", person)
            WebDriverWait(driver, 10).until(
                lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "goal"
            )
            choose(driver, "goal", goal)
            if duration:
                WebDriverWait(driver, 10).until(
                    lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "duration"
                )
                choose(driver, "duration", duration)
            if sponsor:
                WebDriverWait(driver, 10).until(
                    lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "family"
                )
                choose(driver, "familySponsor", sponsor)
            WebDriverWait(driver, 10).until(
                lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "result"
            )
            state = driver.execute_script(
                """
                const route=pickRoute();
                return {
                  routeId:route?.id||'',
                  routeTitle:route?.title||'',
                  routeSummary:route?.summary||'',
                  visibleText:(document.querySelector('#wizardResult')?.textContent||'').trim().replace(/\s+/g,' ').slice(0,1800)
                };
                """
            )
            print("SPANISH_UI=" + json.dumps(state, ensure_ascii=False, sort_keys=True))
    finally:
        driver.quit()


if __name__ == "__main__":
    main()
