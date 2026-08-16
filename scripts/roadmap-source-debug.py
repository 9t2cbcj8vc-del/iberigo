import json
import os
import time
import urllib.request

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ["PREVIEW_BASE"].rstrip("/")


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


def main():
    wait_site()
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1440,1000")
    options.set_capability("goog:loggingPrefs", {"browser": "ALL"})
    driver = webdriver.Chrome(options=options)
    try:
        driver.get(BASE + "/")
        WebDriverWait(driver, 25).until(
            lambda d: d.execute_script(
                "return typeof setWizardFromPreset==='function' && "
                "window.__iberigoRoadmapNextActionsLoaded===true"
            )
        )
        driver.execute_script("setWizardFromPreset('moving')")
        driver.execute_script("document.querySelector('input[name=\"personType\"][value=\"eu\"]').click()")
        driver.execute_script("document.querySelector('#routeWizard').requestSubmit()")
        WebDriverWait(driver, 10).until(
            lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "goal"
        )
        driver.execute_script("document.querySelector('input[name=\"goal\"][value=\"workEmployee\"]').click()")
        driver.execute_script("document.querySelector('#routeWizard').requestSubmit()")
        WebDriverWait(driver, 10).until(
            lambda d: d.execute_script("return document.querySelector('#routeWizard').dataset.step") == "result"
        )
        time.sleep(0.5)
        state = driver.execute_script(
            """
            const route = pickRoute();
            const roadmap = roadmapFor(route);
            const sourceSection = document.querySelector('#wizardResult .route-links-note');
            return {
              appSrc: [...document.scripts].map(s=>s.src).find(src=>src.includes('/app.js')) || '',
              nextActionsLoaded: window.__iberigoRoadmapNextActionsLoaded === true,
              sourceCompletionLoaded: window.__iberigoRoadmapSourceCompletionLoaded === true,
              routeId: route?.id || null,
              roadmapLinks: roadmap?.links || [],
              globalUrl: window.urls?.['eu-worker-rights-en'] || null,
              globalLabel: window.linkLabels?.en?.['eu-worker-rights-en'] || null,
              globalMeta: window.govMeta?.['eu-worker-rights-en'] || null,
              sourceSectionExists: !!sourceSection,
              rendered: [...document.querySelectorAll('#wizardResult .route-links-note a[href]')].map(a=>({
                href:a.href,
                title:a.querySelector('.guide-source-title')?.textContent?.trim() || a.textContent.trim().slice(0,100),
                supplemental:a.dataset.roadmapSupplementalSource || null
              })),
              supplementalNodes: [...document.querySelectorAll('[data-roadmap-supplemental-source]')].map(a=>a.dataset.roadmapSupplementalSource),
              resultText: document.querySelector('#wizardResult')?.textContent?.trim().slice(0,2500) || ''
            };
            """
        )
        print("SOURCE_DEBUG_STATE=" + json.dumps(state, ensure_ascii=False, sort_keys=True))
        print("BROWSER_LOGS=" + json.dumps(driver.get_log("browser"), ensure_ascii=False))
    finally:
        driver.quit()


if __name__ == "__main__":
    main()
