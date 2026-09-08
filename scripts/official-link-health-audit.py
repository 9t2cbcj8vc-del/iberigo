#!/usr/bin/env python3
"""Inventory and monitor IberiGo links to official authorities.

PR mode is intentionally network-free: it verifies that official-link discovery still
works and produces a deterministic inventory. Scheduled/manual mode performs live
HTTP checks and classifies results without treating common government anti-bot
responses as broken links.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import html as html_lib
import json
import re
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
REPORT_JSON = ROOT / "official-link-health-report.json"
REPORT_MD = ROOT / "official-link-health-report.md"

SCAN_SUFFIXES = {".html", ".js", ".json", ".md", ".toml", ".yml", ".yaml"}
SKIP_DIRS = {".git", "node_modules", "browser-appointment-actions", "browser-resident-driving", "browser-spain-files-overflow"}

# National authorities mostly use .gob.es, but several important official services
# use their own domains. Local authority domains are deliberately explicit.
OFFICIAL_SUFFIXES = (
    ".gob.es",
    ".dgt.es",
    ".policia.es",
    ".fnmt.es",
    ".administracionelectronica.gob.es",
    ".europa.eu",
)
OFFICIAL_EXACT = {
    "dgt.es",
    "www.dgt.es",
    "policia.es",
    "www.policia.es",
    "fnmt.es",
    "www.fnmt.es",
    "torrevieja.es",
    "www.torrevieja.es",
}

PRIORITY_TERMS = (
    "appointment",
    "cita",
    "cita previa",
    "fingerprint",
    "toma de huellas",
    "nie",
    "tie",
    "ex-15",
    "ex-17",
    "790",
    "mercurio",
    "clave",
    "cl@ve",
    "fnmt",
    "aeat",
    "agencia tributaria",
    "seguridad social",
    "social security",
    "inss",
    "dgt",
    "extranjer",
    "polic",
    "padron",
    "padrón",
)

SOFT_404_TERMS = (
    "404",
    "page not found",
    "not found",
    "página no encontrada",
    "pagina no encontrada",
    "página no disponible",
    "pagina no disponible",
)

BLOCKED_CODES = {401, 403, 405, 406, 418, 429, 451}
HARD_BROKEN_CODES = {404, 410}
REDIRECT_CODES = {301, 302, 303, 307, 308}
URL_RE = re.compile(r"https?://[^\s\"'<>`]+", re.I)
TITLE_RE = re.compile(r"<title\b[^>]*>(.*?)</title>", re.I | re.S)


@dataclass(frozen=True)
class SourceRef:
    path: str
    line: int
    context: str


@dataclass
class LinkRecord:
    url: str
    host: str
    priority: bool
    sources: list[SourceRef]


@dataclass
class CheckResult:
    url: str
    host: str
    priority: bool
    status: str
    http_status: int | None
    final_url: str
    redirects: list[str]
    title: str
    detail: str
    source_count: int
    example_source: str


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: ANN001
        return None


def is_official_host(host: str) -> bool:
    host = host.lower().rstrip(".")
    if host in OFFICIAL_EXACT:
        return True
    return any(host == suffix.lstrip(".") or host.endswith(suffix) for suffix in OFFICIAL_SUFFIXES)


def clean_url(raw: str) -> str:
    value = html_lib.unescape(raw.strip())
    while value and value[-1] in ".,;:)]}":
        value = value[:-1]
    return value


def iter_scan_files() -> Iterable[Path]:
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in SCAN_SUFFIXES:
            continue
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        # Reports can contain their own URLs; never feed them back into inventory.
        if path.name.startswith("official-link-health-report"):
            continue
        yield path


def priority_from_context(url: str, context: str) -> bool:
    haystack = f"{url} {context}".lower()
    return any(term in haystack for term in PRIORITY_TERMS)


def discover_links() -> list[LinkRecord]:
    found: dict[str, list[SourceRef]] = {}
    priority: dict[str, bool] = {}

    for file_path in iter_scan_files():
        try:
            text = file_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        rel = file_path.relative_to(ROOT).as_posix()
        lines = text.splitlines()
        for line_no, line in enumerate(lines, start=1):
            if "http" not in line.lower():
                continue
            for match in URL_RE.finditer(line):
                url = clean_url(match.group(0))
                parsed = urllib.parse.urlsplit(url)
                host = (parsed.hostname or "").lower()
                if not host or not is_official_host(host):
                    continue
                context = re.sub(r"\s+", " ", line.strip())[:280]
                ref = SourceRef(rel, line_no, context)
                found.setdefault(url, []).append(ref)
                priority[url] = priority.get(url, False) or priority_from_context(url, context)

    records = []
    for url in sorted(found):
        host = urllib.parse.urlsplit(url).hostname or ""
        records.append(LinkRecord(url, host.lower(), priority[url], found[url]))
    return records


def normalized_path(url: str) -> str:
    parsed = urllib.parse.urlsplit(url)
    path = re.sub(r"/+", "/", parsed.path or "/")
    if path != "/":
        path = path.rstrip("/")
    return path


def extract_title(body: bytes, content_type: str) -> str:
    if "html" not in content_type.lower() and b"<html" not in body[:2048].lower():
        return ""
    text = body.decode("utf-8", errors="replace")
    match = TITLE_RE.search(text)
    if not match:
        return ""
    title = html_lib.unescape(re.sub(r"\s+", " ", match.group(1))).strip()
    return title[:240]


def classify_success(original: str, final_url: str, redirects: list[str], title: str) -> tuple[str, str]:
    lower_title = title.lower()
    if title and any(term in lower_title for term in SOFT_404_TERMS):
        return "BROKEN", f"soft-404/error title: {title}"
    if not redirects:
        return "GREEN", "direct response"

    original_parts = urllib.parse.urlsplit(original)
    final_parts = urllib.parse.urlsplit(final_url)
    same_host = (original_parts.hostname or "").lower() == (final_parts.hostname or "").lower()
    same_path = normalized_path(original) == normalized_path(final_url)
    if same_host and same_path:
        return "REDIRECTED", "canonical/scheme/query redirect"
    if is_official_host((final_parts.hostname or "").lower()):
        return "CHANGED", "official destination moved to a different host or path"
    return "BROKEN", "redirected away from a recognized official authority"


def opener() -> urllib.request.OpenerDirector:
    context = ssl.create_default_context()
    return urllib.request.build_opener(
        NoRedirect(),
        urllib.request.HTTPSHandler(context=context),
        urllib.request.HTTPHandler(),
    )


def fetch_once(url: str, timeout: int = 20, max_redirects: int = 6) -> tuple[int, str, list[str], str, str]:
    current = url
    redirects: list[str] = []
    client = opener()

    for _ in range(max_redirects + 1):
        request = urllib.request.Request(
            current,
            headers={
                "User-Agent": "Mozilla/5.0 (compatible; IberiGo-LinkHealth/1.0; +https://iberigo.eu)",
                "Accept": "text/html,application/xhtml+xml,application/json;q=0.8,*/*;q=0.5",
                "Accept-Language": "en,es;q=0.9",
                "Range": "bytes=0-131071",
            },
            method="GET",
        )
        try:
            with client.open(request, timeout=timeout) as response:
                code = int(response.getcode() or 0)
                content_type = response.headers.get("Content-Type", "")
                body = response.read(131072)
                title = extract_title(body, content_type)
                return code, current, redirects, title, ""
        except urllib.error.HTTPError as exc:
            code = int(exc.code)
            if code in REDIRECT_CODES:
                location = exc.headers.get("Location")
                if not location:
                    return code, current, redirects, "", "redirect response missing Location"
                target = urllib.parse.urljoin(current, location)
                redirects.append(target)
                current = target
                continue
            body = b""
            try:
                body = exc.read(131072)
            except Exception:
                pass
            title = extract_title(body, exc.headers.get("Content-Type", ""))
            return code, current, redirects, title, str(exc.reason or "HTTP error")
    return 0, current, redirects, "", "too many redirects"


def check_link(record: LinkRecord, retries: int = 2) -> CheckResult:
    last_detail = ""
    last_code: int | None = None
    last_final = record.url
    last_redirects: list[str] = []
    last_title = ""

    for attempt in range(retries + 1):
        try:
            code, final_url, redirects, title, detail = fetch_once(record.url)
            last_code, last_final, last_redirects, last_title, last_detail = code, final_url, redirects, title, detail
            if 200 <= code < 300:
                status, success_detail = classify_success(record.url, final_url, redirects, title)
                return CheckResult(
                    record.url,
                    record.host,
                    record.priority,
                    status,
                    code,
                    final_url,
                    redirects,
                    title,
                    success_detail,
                    len(record.sources),
                    f"{record.sources[0].path}:{record.sources[0].line}",
                )
            if code in HARD_BROKEN_CODES:
                status = "BROKEN"
                break
            if code in BLOCKED_CODES:
                status = "BLOCKED"
                break
            if 500 <= code <= 599 and attempt < retries:
                time.sleep(1.5 * (attempt + 1))
                continue
            status = "UNAVAILABLE"
            break
        except (urllib.error.URLError, TimeoutError, ssl.SSLError, OSError) as exc:
            last_detail = repr(exc)
            status = "UNAVAILABLE"
            if attempt < retries:
                time.sleep(1.5 * (attempt + 1))
                continue
            break
        except Exception as exc:  # Keep one strange government endpoint from aborting the run.
            last_detail = repr(exc)
            status = "UNAVAILABLE"
            break

    return CheckResult(
        record.url,
        record.host,
        record.priority,
        status,
        last_code,
        last_final,
        last_redirects,
        last_title,
        last_detail or "request did not produce a usable response",
        len(record.sources),
        f"{record.sources[0].path}:{record.sources[0].line}",
    )


def summary_counts(results: list[CheckResult]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for result in results:
        counts[result.status] = counts.get(result.status, 0) + 1
    return dict(sorted(counts.items()))


def actionable(result: CheckResult) -> bool:
    if result.status == "BROKEN":
        return True
    if result.priority and result.status == "CHANGED":
        return True
    return False


def hard_failure(result: CheckResult) -> bool:
    # Hard-fail only on strong evidence. BLOCKED/UNAVAILABLE are common for Spanish
    # government sites and must not be reported as confirmed broken links.
    return result.priority and result.status == "BROKEN"


def write_reports(records: list[LinkRecord], results: list[CheckResult] | None = None) -> None:
    if results is None:
        payload = {
            "mode": "inventory",
            "official_link_count": len(records),
            "priority_link_count": sum(1 for item in records if item.priority),
            "links": [
                {
                    "url": item.url,
                    "host": item.host,
                    "priority": item.priority,
                    "source_count": len(item.sources),
                    "sources": [asdict(source) for source in item.sources[:10]],
                }
                for item in records
            ],
        }
        lines = [
            "# IberiGo official link inventory",
            "",
            f"- Official URLs: **{len(records)}**",
            f"- Priority procedure/appointment URLs: **{payload['priority_link_count']}**",
            "",
        ]
    else:
        counts = summary_counts(results)
        payload = {
            "mode": "network",
            "official_link_count": len(records),
            "priority_link_count": sum(1 for item in records if item.priority),
            "counts": counts,
            "actionable_count": sum(1 for item in results if actionable(item)),
            "hard_failure_count": sum(1 for item in results if hard_failure(item)),
            "results": [asdict(item) for item in results],
        }
        lines = [
            "# IberiGo official link health",
            "",
            f"- Checked: **{len(results)}** official URLs",
            f"- Priority URLs: **{payload['priority_link_count']}**",
            f"- Actionable: **{payload['actionable_count']}**",
            f"- Confirmed broken priority links: **{payload['hard_failure_count']}**",
            "",
            "| Status | Priority | HTTP | Source | URL | Final destination / detail |",
            "|---|:---:|---:|---|---|---|",
        ]
        order = {"BROKEN": 0, "CHANGED": 1, "REDIRECTED": 2, "BLOCKED": 3, "UNAVAILABLE": 4, "GREEN": 5}
        for item in sorted(results, key=lambda r: (order.get(r.status, 9), not r.priority, r.url)):
            http = "" if item.http_status is None else str(item.http_status)
            final = item.final_url if item.final_url != item.url else item.detail
            final = final.replace("|", "\\|")
            url = item.url.replace("|", "\\|")
            lines.append(
                f"| {item.status} | {'yes' if item.priority else 'no'} | {http} | `{item.example_source}` | {url} | {final} |"
            )
        lines.extend(
            [
                "",
                "`BLOCKED` and `UNAVAILABLE` are informational because public-authority sites often reject automated clients. ",
                "Only confirmed broken priority links hard-fail the scheduled monitor.",
            ]
        )

    REPORT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    REPORT_MD.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def run_inventory(min_links: int, min_priority: int) -> int:
    records = discover_links()
    write_reports(records)
    print(f"OFFICIAL LINK INVENTORY: {len(records)} unique official URLs; {sum(r.priority for r in records)} priority")
    if len(records) < min_links:
        print(f"ERROR: discovered only {len(records)} official URLs; expected at least {min_links}", file=sys.stderr)
        return 1
    priority_count = sum(1 for item in records if item.priority)
    if priority_count < min_priority:
        print(f"ERROR: discovered only {priority_count} priority URLs; expected at least {min_priority}", file=sys.stderr)
        return 1
    return 0


def run_network(workers: int, min_links: int, min_priority: int) -> int:
    records = discover_links()
    if len(records) < min_links or sum(1 for item in records if item.priority) < min_priority:
        write_reports(records)
        print("ERROR: official-link inventory unexpectedly shrank; refusing live check", file=sys.stderr)
        return 1

    results: list[CheckResult] = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as pool:
        future_map = {pool.submit(check_link, record): record for record in records}
        for future in concurrent.futures.as_completed(future_map):
            result = future.result()
            results.append(result)
            print(f"{result.status:11} {'PRIORITY' if result.priority else '        '} {result.http_status or '-':>3} {result.url}")

    results.sort(key=lambda item: item.url)
    write_reports(records, results)
    counts = summary_counts(results)
    print("OFFICIAL LINK HEALTH:", ", ".join(f"{key}={value}" for key, value in counts.items()))
    hard = [item for item in results if hard_failure(item)]
    if hard:
        print(f"ERROR: {len(hard)} confirmed broken priority official link(s)", file=sys.stderr)
        return 1
    return 0


def self_test() -> int:
    assert is_official_host("sede.dgt.gob.es")
    assert is_official_host("www2.agenciatributaria.gob.es")
    assert is_official_host("sede.seg-social.gob.es")
    assert is_official_host("www.torrevieja.es")
    assert not is_official_host("example.com")
    assert clean_url("https://example.com/test).") == "https://example.com/test"
    assert normalized_path("https://example.com/a//b/") == "/a/b"
    assert classify_success("https://sede.dgt.gob.es/a", "https://sede.dgt.gob.es/a", [], "Cita previa") == (
        "GREEN",
        "direct response",
    )
    assert classify_success(
        "http://sede.dgt.gob.es/a", "https://sede.dgt.gob.es/a", ["https://sede.dgt.gob.es/a"], "Cita previa"
    )[0] == "REDIRECTED"
    assert classify_success(
        "https://sede.dgt.gob.es/old", "https://sede.dgt.gob.es/new", ["https://sede.dgt.gob.es/new"], "DGT"
    )[0] == "CHANGED"
    assert classify_success("https://sede.dgt.gob.es/a", "https://sede.dgt.gob.es/a", [], "404 - Página no encontrada")[0] == "BROKEN"
    print("OFFICIAL LINK HEALTH SELF-TEST PASSED")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser()
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--inventory", action="store_true", help="Discover official URLs without network requests")
    mode.add_argument("--network", action="store_true", help="Perform live checks of discovered official URLs")
    mode.add_argument("--self-test", action="store_true", help="Run deterministic classifier tests")
    parser.add_argument("--workers", type=int, default=6)
    parser.add_argument("--min-links", type=int, default=10)
    parser.add_argument("--min-priority", type=int, default=3)
    args = parser.parse_args()

    if args.self_test:
        return self_test()
    if args.inventory:
        return run_inventory(args.min_links, args.min_priority)
    return run_network(max(1, min(args.workers, 10)), args.min_links, args.min_priority)


if __name__ == "__main__":
    raise SystemExit(main())
