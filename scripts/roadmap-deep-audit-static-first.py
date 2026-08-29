import importlib.util
from pathlib import Path

from selenium.webdriver.support.ui import WebDriverWait

HERE = Path(__file__).resolve().parent
TARGET = HERE / "roadmap-deep-audit.py"

spec = importlib.util.spec_from_file_location("iberigo_roadmap_deep_audit", TARGET)
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)

legacy_assert_static_guide = audit.assert_static_guide


def assert_static_first_guide(driver, lang, route):
    prefix = "/guides/es/" if lang == "es" else "/guides/"
    driver.get(audit.BASE + f"{prefix}{route}/")

    WebDriverWait(driver, 25).until(
        lambda d: d.execute_script("return document.readyState") == "complete"
    )

    is_static_first = driver.execute_script(
        "return document.documentElement.dataset.iberigoStaticActionGuide === 'true'"
    )
    if not is_static_first:
        return legacy_assert_static_guide(driver, lang, route)

    WebDriverWait(driver, 15).until(
        lambda d: d.execute_script(
            "return !!document.querySelector('[data-crawler-guide-intro]') && "
            "!!document.querySelector('[data-iberigo-action-first]') && "
            "!!document.querySelector('#wizardResult .result-hero')"
        )
    )

    meta = driver.execute_script(
        """
        const scripts=[...document.scripts].map(s=>s.src||'');
        const result=document.querySelector('#wizardResult');
        const intro=document.querySelector('[data-crawler-guide-intro]');
        const card=document.querySelector('[data-iberigo-action-first]');
        const hero=document.querySelector('#wizardResult .result-hero');
        const absTop=(el)=>el ? el.getBoundingClientRect().top + window.scrollY : -1;
        return {
          guideId:document.documentElement.dataset.guideId||'',
          guideLang:document.documentElement.dataset.guideLang||'',
          htmlLang:document.documentElement.lang||'',
          canonical:document.querySelector('link[rel="canonical"]')?.href||'',
          en:document.querySelector('link[rel="alternate"][hreflang="en"]')?.href||'',
          es:document.querySelector('link[rel="alternate"][hreflang="es"]')?.href||'',
          actionCards:document.querySelectorAll('[data-iberigo-action-first]').length,
          actionItems:document.querySelectorAll('[data-iberigo-action-first] [data-action-item]').length,
          legacyApp:scripts.some(src=>/\/app\.js(?:\?|$)/.test(src)),
          resultText:result?.textContent||'',
          introTop:absTop(intro),
          cardTop:absTop(card),
          heroTop:absTop(hero),
          overflow:document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        };
        """
    )

    expected_en = f"https://iberigo.eu/guides/{route}/"
    expected_es = f"https://iberigo.eu/guides/es/{route}/"
    expected_canonical = expected_es if lang == "es" else expected_en

    if meta["guideId"] != route:
        audit.fail(f"static-first {lang}/{route}: guide id {meta['guideId']} != {route}")
    if meta["guideLang"] != lang or meta["htmlLang"] != lang:
        audit.fail(
            f"static-first {lang}/{route}: language metadata mismatch "
            f"guide={meta['guideLang']} html={meta['htmlLang']}"
        )
    if meta["canonical"] != expected_canonical:
        audit.fail(f"static-first {lang}/{route}: canonical {meta['canonical']} != {expected_canonical}")
    if meta["en"] != expected_en or meta["es"] != expected_es:
        audit.fail(
            f"static-first {lang}/{route}: hreflang mismatch "
            f"en={meta['en']} es={meta['es']}"
        )
    if meta["actionCards"] != 1:
        audit.fail(f"static-first {lang}/{route}: expected one action card, got {meta['actionCards']}")
    if meta["actionItems"] != 6:
        audit.fail(f"static-first {lang}/{route}: expected six action items, got {meta['actionItems']}")
    if meta["legacyApp"]:
        audit.fail(f"static-first {lang}/{route}: legacy app.js loaded")
    if not (meta["introTop"] < meta["cardTop"] < meta["heroTop"]):
        audit.fail(
            f"static-first {lang}/{route}: visual order wrong "
            f"intro/card/hero={meta['introTop']}/{meta['cardTop']}/{meta['heroTop']}"
        )
    legacy = "Próximos 3 pasos" if lang == "es" else "Next 3 steps"
    if legacy in meta["resultText"]:
        audit.fail(f"static-first {lang}/{route}: legacy '{legacy}' visible")
    if meta["overflow"]:
        audit.fail(f"static-first {lang}/{route}: horizontal overflow")

    print(
        f"PASS static-first {lang}/{route} · {meta['actionItems']} action items · "
        "legacy app absent"
    )


audit.assert_static_guide = assert_static_first_guide

audit.main()
