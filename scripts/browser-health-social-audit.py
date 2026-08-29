import os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ["PREVIEW_BASE"].rstrip("/")
OUT = Path("browser-health-social")
OUT.mkdir(exist_ok=True)

ROUTES = [
    ("sip-en", "/guides/sip-card/", "Public healthcare: entitlement first, health card second"),
    ("sip-es", "/guides/es/sip-card/", "Sanidad pública: primero el derecho, después la tarjeta"),
    ("ss-en", "/guides/social-security/", "Social Security number: your NUSS filing card"),
    ("ss-es", "/guides/es/social-security/", "Número de Seguridad Social: tu ficha NUSS"),
]

DUPLICATES = {
    "Next 3 steps", "Forms and documents", "Official source links", "Official links",
    "Próximos 3 pasos", "Formularios y documentos", "Enlaces oficiales",
}


def verify(page, name, route, expected_title):
    page.goto(BASE + route, wait_until="networkidle", timeout=90000)
    card = page.locator("section[data-iberigo-action-first]")
    intro = page.locator("[data-crawler-guide-intro]")
    hero = page.locator(".result-hero")
    assert card.count() == 1, f"{route}: action card count={card.count()}"
    assert intro.count() == 1, f"{route}: intro count={intro.count()}"
    assert hero.count() == 1, f"{route}: detail hero count={hero.count()}"
    assert card.is_visible() and intro.is_visible() and hero.is_visible(), f"{route}: primary guide blocks not visible"
    assert card.locator("h2").inner_text().strip() == expected_title, f"{route}: wrong card title"

    scripts = page.evaluate("() => [...document.scripts].map(s => s.src || '')")
    assert not any("/app.js" in src for src in scripts), f"{route}: legacy app.js loaded"

    order = page.evaluate("""() => {
      const intro = document.querySelector('[data-crawler-guide-intro]');
      const card = document.querySelector('[data-iberigo-action-first]');
      const hero = document.querySelector('.result-hero');
      return [intro.getBoundingClientRect().top + scrollY, card.getBoundingClientRect().top + scrollY, hero.getBoundingClientRect().top + scrollY];
    }""")
    assert order[0] < order[1] < order[2], f"{route}: wrong visual order {order}"

    labels = [x.strip() for x in page.locator(".result-section > strong").all_inner_texts()]
    assert not [x for x in labels if x in DUPLICATES], f"{route}: duplicate legacy sections {labels}"

    lang_links = page.locator(".language-switcher a")
    assert lang_links.count() == 2, f"{route}: language switcher should use two links"

    box = card.bounding_box()
    assert box, f"{route}: missing action-card box"
    viewport_width = page.viewport_size["width"]
    minimum_width = min(330, viewport_width * 0.72)
    assert box["width"] >= minimum_width, (
        f"{route}: action card unexpectedly narrow ({box['width']:.0f}px; minimum {minimum_width:.0f}px for {viewport_width}px viewport)"
    )
    page.screenshot(path=str(OUT / f"{name}.png"), full_page=True)
    print(f"BROWSER PASS {route}: card width={box['width']:.0f}, y-order={order}")


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

print("HEALTH/SOCIAL BROWSER PASSED: desktop and mobile rendered guides verified")
