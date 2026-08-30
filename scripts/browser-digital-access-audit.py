import os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ["PREVIEW_BASE"].rstrip("/")
OUT = Path("browser-digital-access")
OUT.mkdir(exist_ok=True)

ROUTES = [
    ("digital-en", "/guides/digital/", "Digital access: choose FNMT certificate or Cl@ve"),
    ("digital-es", "/guides/es/digital/", "Acceso digital: elige certificado FNMT o Cl@ve"),
]

DUPLICATES = {"Next 3 steps", "Forms and documents", "Official source links", "Official links", "Próximos 3 pasos", "Formularios y documentos", "Enlaces oficiales"}


def verify(page, name, route, expected_title):
    page.goto(BASE + route, wait_until="networkidle", timeout=90000)
    card = page.locator("section[data-iberigo-action-first]")
    intro = page.locator("[data-crawler-guide-intro]")
    hero = page.locator(".result-hero")
    assert card.count() == 1, f"{route}: action card count={card.count()}"
    assert intro.count() == 1 and hero.count() == 1, f"{route}: missing intro/detail blocks"
    assert card.is_visible() and intro.is_visible() and hero.is_visible(), f"{route}: primary guide blocks not visible"
    assert card.locator("h2").inner_text().strip() == expected_title, f"{route}: wrong action title"

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
    assert page.locator(".action-first-item").count() == 6, f"{route}: expected six action items"
    assert page.locator(".language-switcher a").count() == 2, f"{route}: language switcher should be links"

    body = page.locator("body").inner_text()
    for token in ("FNMT", "Cl@ve Móvil", "Cl@ve Permanente"):
        assert token in body, f"{route}: missing {token}"

    box = card.bounding_box()
    assert box, f"{route}: missing action-card box"
    viewport_width = page.viewport_size["width"]
    assert box["width"] >= viewport_width * 0.72, f"{route}: action card too narrow ({box['width']} of {viewport_width})"
    overflow = page.evaluate("() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1")
    assert not overflow, f"{route}: horizontal overflow"
    page.screenshot(path=str(OUT / f"{name}.png"), full_page=True)
    print(f"BROWSER PASS {route}: card width={box['width']:.0f}, y-order={order}")


with sync_playwright() as p:
    browser = p.chromium.launch()
    for viewport_name, viewport in [("desktop", {"width": 1440, "height": 1000}), ("mobile", {"width": 390, "height": 844})]:
        context = browser.new_context(viewport=viewport)
        page = context.new_page()
        for name, route, title in ROUTES:
            verify(page, f"{viewport_name}-{name}", route, title)
        context.close()
    browser.close()

print("DIGITAL ACCESS BROWSER PASSED: desktop and mobile EN/ES guides verified")
