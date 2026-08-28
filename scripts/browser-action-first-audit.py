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


def verify(page, name, route, expected_title):
    page.goto(BASE + route, wait_until="networkidle", timeout=90000)
    page.wait_for_timeout(1200)

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

    visible_section_labels = [
        text.strip() for text in page.locator(".result-section > strong").all_inner_texts()
    ]
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
    page.screenshot(path=str(OUT / f"{name}.png"), full_page=True)


with sync_playwright() as p:
    browser = p.chromium.launch()
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
