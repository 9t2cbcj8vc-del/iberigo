import os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ["PREVIEW_BASE"].rstrip("/")
OUT = Path("browser-banking-tax")
OUT.mkdir(exist_ok=True)

ROUTES = [
    ("bank-en", "/guides/banking/", "Banking in Spain: choose the account you actually need"),
    ("bank-es", "/guides/es/banking/", "Banca en España: elige la cuenta que realmente necesitas"),
    ("tax-en", "/guides/taxes/", "Taxes in Spain: establish tax residence before choosing a form"),
    ("tax-es", "/guides/es/taxes/", "Impuestos en España: determina primero tu residencia fiscal"),
]


def verify(page, name, route, expected_title):
    page.goto(BASE + route, wait_until="domcontentloaded", timeout=60000)
    card = page.locator("section[data-iberigo-action-first]")
    intro = page.locator("[data-crawler-guide-intro]")
    hero = page.locator(".result-hero")
    card.wait_for(state="visible", timeout=30000)
    intro.wait_for(state="visible", timeout=30000)
    hero.wait_for(state="visible", timeout=30000)
    page.screenshot(path=str(OUT / f"{name}.png"), full_page=True)

    assert card.count() == 1, f"{route}: action card count={card.count()}"
    assert card.locator("h2").inner_text().strip() == expected_title, f"{route}: wrong action title"
    assert page.locator(".action-first-item").count() == 6, f"{route}: expected six action items"
    scripts = page.evaluate("() => [...document.scripts].map(s => s.src || '')")
    assert not any("/app.js" in src for src in scripts), f"{route}: legacy app.js loaded"
    order = page.evaluate("""() => {
      const absTop=(el)=>el.getBoundingClientRect().top + scrollY;
      return [absTop(document.querySelector('[data-crawler-guide-intro]')), absTop(document.querySelector('[data-iberigo-action-first]')), absTop(document.querySelector('.result-hero'))];
    }""")
    assert order[0] < order[1] < order[2], f"{route}: wrong visual order {order}"
    assert page.locator(".language-switcher a").count() == 2, f"{route}: language switcher should use links"
    body = page.locator("body").inner_text()
    assert "Next 3 steps" not in body and "Próximos 3 pasos" not in body, f"{route}: legacy next-steps visible"
    if "taxes" in route:
        for token in ("IRPF", "IRNR", "Modelo 030", "720"):
            assert token in body, f"{route}: missing {token}"
    else:
        assert "IBAN" in body, f"{route}: missing IBAN guidance"
    box = card.bounding_box()
    assert box, f"{route}: missing card box"
    viewport_width = page.viewport_size["width"]
    minimum = 900 if viewport_width >= 1000 else viewport_width * 0.70
    assert box["width"] >= minimum, f"{route}: action card too narrow ({box['width']} < {minimum})"
    overflow = page.evaluate("() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1")
    assert not overflow, f"{route}: horizontal overflow"
    print(f"BROWSER PASS {route}: card width={box['width']:.0f}, order={order}")


with sync_playwright() as p:
    browser = p.chromium.launch()
    for viewport_name, viewport in [("desktop", {"width": 1440, "height": 1000}), ("mobile", {"width": 390, "height": 844})]:
        context = browser.new_context(viewport=viewport)
        page = context.new_page()
        for name, route, title in ROUTES:
            verify(page, f"{viewport_name}-{name}", route, title)
        context.close()
    browser.close()

print("BANKING/TAX BROWSER PASSED: desktop and mobile EN/ES guides verified")
