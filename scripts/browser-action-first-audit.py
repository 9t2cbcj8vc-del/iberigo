import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ["PREVIEW_BASE"].rstrip("/")
OUT = Path("browser-audit")
OUT.mkdir(exist_ok=True)

ROUTES = [
    ("nie-en", "/guides/nie/", "NIE: your assignment filing card"),
    ("nie-es", "/guides/es/nie/", "NIE: tu ficha para la asignación"),
    ("tie-en", "/guides/tie/", "TIE: your card filing checklist"),
    ("tie-es", "/guides/es/tie/", "TIE: tu lista para tramitar la tarjeta"),
]

DUPLICATE_LABELS = {
    "Next 3 steps",
    "Forms and documents",
    "Official source links",
    "Próximos 3 pasos",
    "Formularios y documentos",
    "Enlaces oficiales",
}

INIT_TRACE = r"""
(() => {
  window.__iberigoAudit = { events: [] };
  const snapshot = (label) => {
    const result = document.querySelector('#wizardResult');
    window.__iberigoAudit.events.push({
      label,
      readyState: document.readyState,
      guideId: document.documentElement?.dataset?.guideId || null,
      actionCards: document.querySelectorAll('[data-iberigo-action-first]').length,
      intros: document.querySelectorAll('[data-crawler-guide-intro]').length,
      resultChildren: result ? result.children.length : null,
      resultText: result ? result.innerText.slice(0, 220) : null
    });
  };
  document.addEventListener('readystatechange', () => snapshot('readystatechange:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => snapshot('DOMContentLoaded'));
  window.addEventListener('load', () => snapshot('load'));
  const observer = new MutationObserver((mutations) => {
    let relevant = false;
    for (const mutation of mutations) {
      for (const node of [...mutation.addedNodes, ...mutation.removedNodes]) {
        if (!(node instanceof Element)) continue;
        if (
          node.matches?.('[data-iberigo-action-first], #wizardResult') ||
          node.querySelector?.('[data-iberigo-action-first], #wizardResult')
        ) relevant = true;
      }
      if (mutation.target instanceof Element && mutation.target.closest?.('#wizardResult')) relevant = true;
    }
    if (relevant) snapshot('mutation');
  });
  observer.observe(document, { childList: true, subtree: true });
  snapshot('init-script');
})();
"""


def diagnostics(page, name, route):
    data = page.evaluate(
        """() => ({
          href: location.href,
          readyState: document.readyState,
          guideId: document.documentElement.dataset.guideId || null,
          actionCards: document.querySelectorAll('[data-iberigo-action-first]').length,
          intros: document.querySelectorAll('[data-crawler-guide-intro]').length,
          heroCount: document.querySelectorAll('.result-hero').length,
          scripts: [...document.scripts].map(s => s.src || '[inline]'),
          resources: performance.getEntriesByType('resource').map(r => r.name).filter(n => /\.js(?:\?|$)/.test(n)),
          audit: window.__iberigoAudit || null,
          resultHtml: document.querySelector('#wizardResult')?.innerHTML || null
        })"""
    )
    (OUT / f"{name}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    (OUT / f"{name}.html").write_text(page.content(), encoding="utf-8")
    page.screenshot(path=str(OUT / f"{name}.png"), full_page=True)
    print(f"DIAGNOSTIC {route}: actionCards={data['actionCards']} intros={data['intros']} heroes={data['heroCount']}")
    print(f"SCRIPTS {route}: {data['scripts']}")
    print(f"AUDIT EVENTS {route}: {data['audit']}")
    return data


def verify(page, name, route, expected_title):
    page.add_init_script(INIT_TRACE)
    page.goto(BASE + route, wait_until="domcontentloaded", timeout=90000)
    for label, delay in [("0ms", 0), ("50ms", 50), ("200ms", 150), ("500ms", 300), ("1200ms", 700)]:
        if delay:
            page.wait_for_timeout(delay)
        page.evaluate("label => window.__iberigoAudit?.events.push({label, readyState: document.readyState, actionCards: document.querySelectorAll('[data-iberigo-action-first]').length, intros: document.querySelectorAll('[data-crawler-guide-intro]').length, resultChildren: document.querySelector('#wizardResult')?.children.length ?? null})", label)
    data = diagnostics(page, name, route)

    card = page.locator("section[data-iberigo-action-first]")
    intro = page.locator("[data-crawler-guide-intro]")
    hero = page.locator(".result-hero")

    assert card.count() == 1, f"{route}: action card count={card.count()}"
    assert intro.count() == 1, f"{route}: crawler intro count={intro.count()}"
    assert hero.count() == 1, f"{route}: result hero count={hero.count()}"
    assert card.is_visible(), f"{route}: action card is not visible after JS initializes"
    assert intro.is_visible(), f"{route}: crawler intro is not visible after JS initializes"
    assert hero.is_visible(), f"{route}: result hero is not visible after JS initializes"

    title = card.locator("h2").inner_text().strip()
    assert title == expected_title, f"{route}: unexpected action-card title {title!r}"

    order = page.evaluate(
        """() => {
          const intro = document.querySelector('[data-crawler-guide-intro]');
          const card = document.querySelector('[data-iberigo-action-first]');
          const hero = document.querySelector('.result-hero');
          return {
            introBeforeCard: Boolean(intro.compareDocumentPosition(card) & Node.DOCUMENT_POSITION_FOLLOWING),
            cardBeforeHero: Boolean(card.compareDocumentPosition(hero) & Node.DOCUMENT_POSITION_FOLLOWING),
          };
        }"""
    )
    assert order["introBeforeCard"], f"{route}: intro is not before action card in live DOM"
    assert order["cardBeforeHero"], f"{route}: action card is not before explanation in live DOM"

    visible_section_labels = [text.strip() for text in page.locator(".result-section > strong").all_inner_texts()]
    duplicates = [text for text in visible_section_labels if text in DUPLICATE_LABELS]
    assert not duplicates, f"{route}: duplicate legacy filing sections still visible: {duplicates}"

    card_box = card.bounding_box()
    intro_box = intro.bounding_box()
    hero_box = hero.bounding_box()
    assert card_box and intro_box and hero_box, f"{route}: missing bounding box for visible guide elements"
    assert intro_box["y"] < card_box["y"] < hero_box["y"], (
        f"{route}: visual Y order wrong: intro={intro_box['y']}, card={card_box['y']}, hero={hero_box['y']}"
    )

    print(
        f"BROWSER PASS {route}: title={title!r}; "
        f"y intro/card/hero={intro_box['y']:.0f}/{card_box['y']:.0f}/{hero_box['y']:.0f}; "
        f"result labels={visible_section_labels}"
    )


with sync_playwright() as p:
    browser = p.chromium.launch()

    # First prove what Chromium parses when JavaScript cannot mutate the page.
    no_js = browser.new_context(viewport={"width": 1440, "height": 1000}, java_script_enabled=False)
    no_js_page = no_js.new_page()
    no_js_page.goto(BASE + "/guides/nie/", wait_until="domcontentloaded", timeout=90000)
    no_js_count = no_js_page.locator("section[data-iberigo-action-first]").count()
    no_js_page.screenshot(path=str(OUT / "no-js-nie-en.png"), full_page=True)
    (OUT / "no-js-nie-en.html").write_text(no_js_page.content(), encoding="utf-8")
    print(f"NO-JS PARSED DOM /guides/nie/: actionCards={no_js_count}")
    assert no_js_count == 1, "Chromium does not parse the baked NIE action card even with JavaScript disabled"
    no_js.close()

    for viewport_name, viewport in [
        ("desktop", {"width": 1440, "height": 1000}),
        ("mobile", {"width": 390, "height": 844}),
    ]:
        context = browser.new_context(viewport=viewport)
        page = context.new_page()
        for name, route, title in ROUTES:
            verify(page, f"{viewport_name}-{name}", route, title)
        context.close()
    browser.close()

print("BROWSER ACTION-FIRST AUDIT PASSED: live DOM and screenshots verified after JavaScript initialization")
