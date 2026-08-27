import argparse
import concurrent.futures
import os
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXCLUDED_DIRS = {".git", ".github", ".netlify", "node_modules", "outputs", "work"}
BANNED_PUBLIC_MARKERS = (
    "data-editorial-checklist",
    '"editorialChecklist"',
    "Editorial Checklist",
    "Grammar reviewed",
    "Internal links checked",
    "External links checked",
    "Mobile reviewed",
    "Desktop reviewed",
    "Accessibility reviewed",
    "SEO reviewed",
    "Facts verified",
    "Lista de comprobación editorial",
    "Gramática revisada",
    "Enlaces internos revisados",
    "Enlaces externos revisados",
    "Móvil revisado",
    "Escritorio revisado",
    "Accesibilidad revisada",
    "SEO revisado",
    "Hechos verificados",
)


def public_html_files() -> list[Path]:
    files = []
    for file in ROOT.rglob("*.html"):
        rel = file.relative_to(ROOT)
        if any(part in EXCLUDED_DIRS for part in rel.parts[:-1]):
            continue
        files.append(file)
    return sorted(files)


def route_for(file: Path) -> str:
    rel = file.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[: -len("index.html")]
    return "/" + rel


def assert_clean(label: str, html: str) -> None:
    found = [marker for marker in BANNED_PUBLIC_MARKERS if marker in html]
    if found:
        raise AssertionError(f"{label}: public internal-QA markers found: {', '.join(found)}")


def fetch(route: str, base: str, attempts: int = 5) -> str:
    url = base.rstrip("/") + route
    last_error = None
    for attempt in range(attempts):
        try:
            request = urllib.request.Request(
                url,
                headers={"User-Agent": "IberiGo-public-editorial-status-audit/1.0"},
            )
            with urllib.request.urlopen(request, timeout=25) as response:
                return response.read().decode("utf-8", errors="replace")
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError) as exc:
            last_error = exc
            time.sleep(min(2 + attempt, 6))
    raise AssertionError(f"could not fetch {url}: {last_error}")


def audit_local() -> None:
    files = public_html_files()
    if not files:
        raise AssertionError("no public HTML files discovered")
    for file in files:
        assert_clean(file.relative_to(ROOT).as_posix(), file.read_text(encoding="utf-8"))
    print(f"PUBLIC EDITORIAL STATUS LOCAL PASSED: {len(files)} public HTML files")


def audit_preview() -> None:
    base = os.environ["PREVIEW_BASE"].rstrip("/")
    files = public_html_files()
    routes = sorted({route_for(file) for file in files})
    failures = []

    def check(route: str) -> None:
        assert_clean(route, fetch(route, base))

    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        future_map = {pool.submit(check, route): route for route in routes}
        for future in concurrent.futures.as_completed(future_map):
            route = future_map[future]
            try:
                future.result()
            except Exception as exc:  # noqa: BLE001 - aggregate every route failure
                failures.append(f"{route}: {exc}")

    if failures:
        raise AssertionError("Preview editorial-status failures:\n" + "\n".join(sorted(failures)))
    print(f"PUBLIC EDITORIAL STATUS PREVIEW PASSED: {len(routes)} public HTML routes")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", action="store_true")
    parser.add_argument("--preview", action="store_true")
    args = parser.parse_args()
    if not args.local and not args.preview:
        parser.error("choose --local or --preview")
    if args.local:
        audit_local()
    if args.preview:
        audit_preview()


if __name__ == "__main__":
    main()
