import os
import time
import urllib.request

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ["PREVIEW_BASE"].rstrip("/")
URL = BASE + "/guides/vida-laboral/"

for _ in range(45):
    try:
        with urllib.request.urlopen(URL, timeout=10) as response:
            if response.status == 200:
                break
    except Exception:
        pass
    time.sleep(2)

options = Options()
options.add_argument("--headless=new")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--window-size=1440,1000")
options.set_capability("goog:loggingPrefs", {"browser": "ALL"})
driver = webdriver.Chrome(options=options)
try:
    driver.get(URL)
    WebDriverWait(driver, 25).until(
        lambda d: d.execute_script("return window.__iberigoRoadmapNextActionsLoaded === true")
    )
    time.sleep(1)
    state = driver.execute_script(
        """
        const result = document.querySelector('#wizardResult');
        const roadmap = typeof directRoadmapFor === 'function' ? directRoadmapFor('vida-laboral') : null;
        return {
          url: location.href,
          lang: document.documentElement.lang,
          guideId: document.documentElement.dataset.guideId || null,
          appSrc: [...document.scripts].map(s => s.src).find(src => /\/app\.js/.test(src)) || null,
          addonLoaded: window.__iberigoRoadmapNextActionsLoaded === true,
          resultHidden: result?.hidden,
          fullListCount: result?.querySelectorAll('.roadmap-list--full').length || 0,
          nowCount: result?.querySelectorAll('.roadmap-now').length || 0,
          listClasses: [...(result?.querySelectorAll('.roadmap-list') || [])].map(el => el.className),
          resultText: (result?.innerText || '').slice(0, 1400),
          modelSteps: roadmap?.steps || null,
          currentDirectRoute: typeof currentDirectRoute !== 'undefined' ? currentDirectRoute : 'UNAVAILABLE'
        };
        """
    )
    print("VIDA_DEBUG_STATE=", state)
    print("BROWSER_LOGS=", driver.get_log("browser"))
finally:
    driver.quit()
