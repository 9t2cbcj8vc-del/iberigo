import json
import os
import time
import urllib.request

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ["PREVIEW_BASE"].rstrip("/")
ROUTES = [
    "study-in-spain", "study-abroad", "study-short", "study-short-in-spain",
    "spanish-family", "spanish-eu-return-family", "family", "eu-family",
    "work-employed", "work-self-employed", "work-specialist", "digital-nomad",
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


def main():
    wait_site()
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1440,1000")
    driver = webdriver.Chrome(options=options)
    try:
        for lang in ("en", "es"):
            driver.get(BASE + "/")
            WebDriverWait(driver, 25).until(
                lambda d: d.execute_script(
                    "return typeof roadmapFor==='function' && typeof routes!=='undefined' && "
                    "window.__iberigoRoadmapNextActionsLoaded===true"
                )
            )
            driver.execute_script("localStorage.setItem('holaPapersLang', arguments[0])", lang)
            driver.refresh()
            WebDriverWait(driver, 25).until(
                lambda d: d.execute_script(
                    "return document.documentElement.lang===arguments[0] && typeof roadmapFor==='function'",
                    lang,
                )
            )
            data = driver.execute_script(
                """
                const ids=arguments[0];
                const text=(raw)=>{ const b=document.createElement('div'); b.innerHTML=raw||''; return (b.textContent||'').trim().replace(/\s+/g,' '); };
                return ids.map(id=>{
                  const route=routes.find(r=>r.id===id) || {id};
                  const roadmap=roadmapFor(route);
                  return {
                    id,
                    routeFound: !!routes.find(r=>r.id===id),
                    title: route.title || '',
                    summary: route.summary || '',
                    appointment: route.appointment || '',
                    routeDocuments: route.documents || [],
                    process: text(roadmap?.process || ''),
                    explanation: text(roadmap?.explanation || ''),
                    steps: (roadmap?.steps || []).map(text),
                    documents: (roadmap?.documents || []).map(text),
                    links: roadmap?.links || [],
                    whatHappensNext: text(roadmap?.whatHappensNext || '')
                  };
                });
                """,
                ROUTES,
            )
            print("SEMANTIC_" + lang.upper() + "=" + json.dumps(data, ensure_ascii=False, sort_keys=True))
    finally:
        driver.quit()


if __name__ == "__main__":
    main()
