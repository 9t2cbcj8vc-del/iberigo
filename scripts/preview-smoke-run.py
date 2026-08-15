import importlib.util
from pathlib import Path
from selenium.webdriver.support.ui import WebDriverWait

script = Path(__file__).with_name("preview-smoke-check.py")
spec = importlib.util.spec_from_file_location("preview_smoke_check", script)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def assert_img(driver, element, contains, label):
    src = element.get_attribute("src") or ""
    if contains not in src:
        module.fail(f"Wrong image on {label}: expected '{contains}' in '{src}'")
    driver.execute_script("arguments[0].scrollIntoView({block:'center'}); arguments[0].loading='eager';", element)
    try:
        WebDriverWait(driver, 8).until(
            lambda d: d.execute_script("return arguments[0].complete && arguments[0].naturalWidth > 0", element)
        )
    except Exception:
        module.fail(f"Image failed to load on {label}: {src}")


module.assert_img = assert_img
module.main()
