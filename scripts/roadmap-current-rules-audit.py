import os
import time
import urllib.request

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

BASE = os.environ["PREVIEW_BASE"].rstrip("/")

CHECKS = {
    "en": {
        "family": [
            "requested authorization to reside for at least another year",
            "health insurance",
            "stable unregistered partner",
            "EX-02",
        ],
        "study-in-spain": [
            "higher education",
            "regular status",
            "at least two months",
            "Mercurio",
            "exceeds six months",
        ],
        "spanish-family": ["EX-24", "free", "one-month"],
        "work-employed": ["Spanish employer", "EX-03", "Social Security"],
        "work-self-employed": ["Spanish consulate", "EX-07", "Social Security"],
        "digital-nomad": ["20%", "outside Spain", "UGE"],
    },
    "es": {
        "family": [
            "solicitado autorización para residir durante al menos otro año",
            "seguro de enfermedad",
            "pareja estable no registrada",
            "EX-02",
        ],
        "study-in-spain": [
            "estudios superiores",
            "situación regular",
            "al menos dos meses",
            "Mercurio",
            "supera seis meses",
        ],
        "spanish-family": ["EX-24", "gratuito", "un mes"],
        "work-employed": ["empleador", "EX-03", "Seguridad Social"],
        "work-self-employed": ["consulado", "EX-07", "Seguridad Social"],
        "digital-nomad": ["20%", "fuera de España", "UGE"],
    },
}


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
        for lang, route_checks in CHECKS.items():
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
                    "return document.documentElement.lang===arguments[0] && "
                    "typeof roadmapFor==='function' && window.__iberigoRoadmapNextActionsLoaded===true",
                    lang,
                )
            )

            app_src = driver.execute_script(
                "return [...document.scripts].map(s=>s.src).find(src=>src.includes('/app.js')) || ''"
            )
            if "20260816-roadmap-next-actions-3" not in app_src:
                raise AssertionError(f"{lang}: current-rule bundle cache key missing: {app_src}")

            for route_id, required in route_checks.items():
                text = driver.execute_script(
                    """
                    const id=arguments[0];
                    const route=routes.find(r=>r.id===id) || {id};
                    const roadmap=roadmapFor(route);
                    const box=document.createElement('div');
                    box.innerHTML=[
                      roadmap?.process || '',
                      roadmap?.explanation || '',
                      ...(roadmap?.steps || []),
                      ...(roadmap?.documents || []),
                      roadmap?.whatHappensNext || ''
                    ].join(' ');
                    return (box.textContent || '').replace(/\s+/g,' ').trim();
                    """,
                    route_id,
                )
                missing = [phrase for phrase in required if phrase.lower() not in text.lower()]
                if missing:
                    raise AssertionError(
                        f"{lang}/{route_id}: current-rule markers missing {missing}; text={text[:1800]}"
                    )
                print(f"PASS current rules {lang}/{route_id} · {len(required)} markers")

        print("CURRENT-RULE ROUTE AUDIT PASSED IN EN AND ES")
    finally:
        driver.quit()


if __name__ == "__main__":
    main()
