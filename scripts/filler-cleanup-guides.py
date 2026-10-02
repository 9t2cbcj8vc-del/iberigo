#!/usr/bin/env python3
"""Strip Guide System boilerplate from committed HTML (EN + ES).

Idempotent. Does NOT touch /guides/* legacy shells, Spain Files, or lean models
(staying-long-term, documents-apostilles-translations). Edits HTML in place;
never runs generate-guide-system.js.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SKIP = {
    "living-in-spain/staying-long-term",
    "es/living-in-spain/staying-long-term",
    "moving-to-spain/documents-apostilles-translations",
    "es/moving-to-spain/documents-apostilles-translations",
    # Already lean (≤2% filler in the audit) — leave alone.
    "living-in-spain/driving",
}

# Section ids / title patterns to drop entirely.
DROP_IDS = {
    "importantNote", "notaImportante",
    "atGlance", "enResumen",
    "whoThisRoadmapIsFor", "whoThisGuideIsFor", "paraQuienEsEstaGuia",
    "scopeNotice", "avisoDeAlcance",
    "legalDisclaimer", "avisoLegal",
}
DROP_TITLE_RE = re.compile(
    r"^(Important note|Nota importante|At a Glance|En resumen|"
    r"Who this (?:roadmap|guide) is for|Para qui[eé]n es esta gu[ií]a|"
    r"Scope Notice|Aviso de alcance|Legal Disclaimer|Aviso legal)$",
    re.I,
)

TIE_IDS_RE = re.compile(r"tieBasics|conceptosBasicosTie", re.I)
TIE_TITLE_RE = re.compile(r"TIE basics|Conceptos b[aá]sicos de la TIE", re.I)

GENERIC_MISTAKE_RE = re.compile(
    r"Relying only on (?:informal advice|social media|forums)|"
    r"rules are the same everywhere|same for every nationality|"
    r"Confiar solo en (?:consejos informales|redes sociales|foros)|"
    r"mismas (?:normas|reglas) (?:para todas|en todas)|"
    r"iguales para todas las nacionalidades",
    re.I,
)

HEDGE_ANSWER_RE = re.compile(
    r"\b(it depends|depends on your|check (?:the )?official|varies by|"
    r"not covered here|may (?:need|vary|depend)|can vary|"
    r"depende de|consulta (?:las )?fuentes? oficiales|puede variar|"
    r"no (?:se )?cubre aqu[ií]|puede (?:hacer falta|depender))\b",
    re.I,
)

WEAK_HERO_RE = re.compile(
    r"Not one process|No single answer|Not automatic|"
    r"No hay un [uú]nico|No es autom[aá]tico|No hay una [uú]nica respuesta|"
    r"Different status, different route|General information|"
    r"Sequence, not deadlines|Orden, no plazos",
    re.I,
)

SECTION_RE = re.compile(
    r'<section\b([^>]*)>([\s\S]*?)</section>',
    re.I,
)


def page_lang(path: Path, html: str) -> str:
    if "/es/" in path.as_posix() or path.as_posix().startswith("es/"):
        return "es"
    m = re.search(r'<html[^>]*\slang="([^"]+)"', html, re.I)
    if m and m.group(1).lower().startswith("es"):
        return "es"
    return "en"


def section_id(attrs: str, body: str) -> str:
    m = re.search(r'\bid=["\']([^"\']+)["\']', attrs)
    if m:
        return m.group(1)
    m = re.search(r'<h2\b[^>]*\bid=["\']([^"\']+)["\']', body, re.I)
    return m.group(1) if m else ""


def section_title(body: str) -> str:
    m = re.search(r"<h2\b[^>]*>([\s\S]*?)</h2>", body, re.I)
    if not m:
        return ""
    return re.sub(r"<[^>]+>", "", m.group(1)).strip()


def extract_cards(body: str) -> list[str]:
    return re.findall(r"<article class=\"guide-info-card\">[\s\S]*?</article>", body, re.I)


def card_text(card: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", card)).strip()


def trim_mistakes(body: str, lang: str) -> str | None:
    cards = extract_cards(body)
    if not cards:
        return None
    kept = []
    for card in cards:
        text = card_text(card)
        if GENERIC_MISTAKE_RE.search(text):
            continue
        kept.append(card)
        if len(kept) >= 3:
            break
    if not kept:
        kept = cards[:3]
    # Renumber 1..n
    out = []
    for i, card in enumerate(kept, 1):
        out.append(re.sub(r"(<h3>)[^<]*(</h3>)", rf"\g<1>{i}\2", card, count=1))
    title = "Errores comunes" if lang == "es" else "Common Mistakes"
    sid = "erroresComunes" if lang == "es" else "commonMistakes"
    grid = "\n          ".join(out)
    return (
        f'<section class="guide-section" aria-labelledby="{sid}" data-filler-cleaned="mistakes">'
        f'<h2 id="{sid}">{title}</h2>'
        f'<div class="guide-card-grid">{grid}</div></section>'
    )


def trim_questions(body: str, lang: str) -> str | None:
    # FAQ may be <h3>Q</h3><p>A</p> or cards
    pairs = re.findall(
        r"(<h3\b[^>]*>[\s\S]*?</h3>\s*<p\b[^>]*>[\s\S]*?</p>)",
        body,
        re.I,
    )
    cards = extract_cards(body)
    kept_html = []
    if pairs:
        for block in pairs:
            ans = re.search(r"<p\b[^>]*>([\s\S]*?)</p>", block, re.I)
            text = re.sub(r"<[^>]+>", " ", ans.group(1) if ans else block)
            # Keep if answer has a concrete tip OR is not pure hedge
            concrete = bool(
                re.search(
                    r"\b(use|open|apply|bring|file|register|pay|book|link|see |"
                    r"usa |abre |solicita |lleva |presenta |empadron|paga |"
                    r"https?://|/guides/|/moving-to-spain/|/living-in-spain/|"
                    r"/the-spain-files/)\b",
                    text,
                    re.I,
                )
            )
            if HEDGE_ANSWER_RE.search(text) and not concrete:
                continue
            kept_html.append(block)
            if len(kept_html) >= 4:
                break
        if not kept_html:
            return ""  # drop entire section
        title = "Preguntas frecuentes" if lang == "es" else "Real Questions People Ask"
        sid = "preguntasFrecuentes" if lang == "es" else "realQuestions"
        return (
            f'<section class="guide-section" aria-labelledby="{sid}" data-filler-cleaned="questions">'
            f'<h2 id="{sid}">{title}</h2>'
            + "".join(kept_html)
            + "</section>"
        )
    if cards:
        kept = []
        for card in cards:
            text = card_text(card)
            if HEDGE_ANSWER_RE.search(text) and not re.search(
                r"/guides/|/moving-to-spain/|/living-in-spain/|/the-spain-files/", text
            ):
                continue
            kept.append(card)
            if len(kept) >= 4:
                break
        if not kept:
            return ""
        title = "Preguntas frecuentes" if lang == "es" else "Real Questions People Ask"
        sid = "preguntasFrecuentes" if lang == "es" else "realQuestions"
        return (
            f'<section class="guide-section" aria-labelledby="{sid}" data-filler-cleaned="questions">'
            f'<h2 id="{sid}">{title}</h2>'
            f'<div class="guide-card-grid">{" ".join(kept)}</div></section>'
        )
    return None


def shorten_continue(body: str, lang: str) -> str | None:
    links = re.findall(
        r'<a class="guide-button[^"]*" href="([^"]+)">([\s\S]*?)</a>',
        body,
        re.I,
    )
    # Also title+button pairs
    if not links:
        links = re.findall(
            r'<h3>([^<]+)</h3>[\s\S]*?<a class="guide-button[^"]*" href="([^"]+)">',
            body,
            re.I,
        )
        links = [(href, label) for label, href in links]
    cleaned = []
    seen = set()
    for href, label in links:
        label = re.sub(r"<[^>]+>", "", label).strip()
        label = re.sub(r"\s+", " ", label)
        if href in seen:
            continue
        seen.add(href)
        cleaned.append((href, label))
        if len(cleaned) >= 3:
            break
    if not cleaned:
        return ""  # drop
    title = "Sigue explorando" if lang == "es" else "Continue"
    sid = "continuaTuRecorrido" if lang == "es" else "continueJourney"
    items = "".join(
        f'<li><a href="{href}">{label}</a></li>' for href, label in cleaned
    )
    return (
        f'<section class="guide-section guide-continue-journey" aria-labelledby="{sid}" '
        f'data-filler-cleaned="continue">'
        f'<h2 id="{sid}">{title}</h2>'
        f'<ul class="guide-plain-links">{items}</ul></section>'
    )


def replace_tie(body: str, lang: str, sid: str) -> str:
    if lang == "es":
        return (
            f'<section class="guide-section" aria-labelledby="{sid}" data-filler-cleaned="tie">'
            f'<h2 id="{sid}">TIE</h2>'
            f'<p>Muchos residentes no comunitarios necesitan la TIE (tarjeta de identidad de extranjero) '
            f'después de la aprobación o la llegada. Detalles, plazo de un mes y cita de huellas: '
            f'<a href="/guides/es/tie/">guía de la TIE</a>.</p></section>'
        )
    return (
        f'<section class="guide-section" aria-labelledby="{sid}" data-filler-cleaned="tie">'
        f'<h2 id="{sid}">TIE</h2>'
        f'<p>Many non-EU residents need a TIE (foreigner identity card) after approval or arrival. '
        f'For the one-month deadline, fingerprint appointment and documents, see the '
        f'<a href="/guides/tie/">TIE guide</a>.</p></section>'
    )


def soften_hero(html: str) -> tuple[str, int]:
    count = 0

    def repl(m: re.Match) -> str:
        nonlocal count
        block = m.group(0)
        strong = re.search(r"<strong>([\s\S]*?)</strong>", block)
        if not strong or not WEAK_HERO_RE.search(strong.group(1)):
            return block
        count += 1
        return ""

    next_html = re.sub(
        r'\s*<aside class="guide-hero-card"[^>]*>[\s\S]*?</aside>',
        repl,
        html,
        count=1,
    )
    if count:
        next_html = re.sub(
            r'(<section class="panel guide-card-panel guide-hero"[^>]*)>',
            r'\1 style="grid-template-columns: minmax(0, 1fr);">',
            next_html,
            count=1,
        )
    return next_html, count


def scrub_toc(html: str, removed_ids: set[str]) -> str:
    if not removed_ids:
        return html

    def scrub_nav(m: re.Match) -> str:
        nav = m.group(0)
        for sid in removed_ids:
            nav = re.sub(
                rf'\s*<li>\s*<a href="#{re.escape(sid)}"[^>]*>[\s\S]*?</a>\s*</li>',
                "",
                nav,
                flags=re.I,
            )
        return nav

    return re.sub(
        r"<nav[^>]*>\s*<ol>[\s\S]*?</ol>\s*</nav>",
        scrub_nav,
        html,
        flags=re.I,
    )


def process(html: str, lang: str) -> tuple[str, dict]:
    stats = {
        "dropped": 0,
        "tie": 0,
        "mistakes": 0,
        "questions": 0,
        "continue": 0,
        "hero": 0,
    }
    removed_ids: set[str] = set()

    def transform(m: re.Match) -> str:
        attrs, body = m.group(1), m.group(2)
        full = m.group(0)
        sid = section_id(attrs, body)
        title = section_title(body)
        classes = attrs

        # Already cleaned sections: leave alone
        if 'data-filler-cleaned="' in full:
            return full

        if sid in DROP_IDS or DROP_TITLE_RE.match(title):
            stats["dropped"] += 1
            if sid:
                removed_ids.add(sid)
            return ""

        if "guide-scope-notice" in classes or "guide-legal-disclaimer" in classes:
            stats["dropped"] += 1
            if sid:
                removed_ids.add(sid)
            return ""

        if TIE_IDS_RE.search(sid) or TIE_TITLE_RE.search(title):
            stats["tie"] += 1
            use_id = sid or ("conceptosBasicosTie" if lang == "es" else "tieBasics")
            removed_ids.add(use_id)
            # keep same id for any lingering TOC anchors
            return replace_tie(body, lang, use_id)

        if sid in {"commonMistakes", "erroresComunes"} or re.match(
            r"Common Mistakes|Errores comunes", title, re.I
        ):
            replacement = trim_mistakes(body, lang)
            if replacement is not None:
                stats["mistakes"] += 1
                return replacement
            return full

        if sid in {"realQuestions", "preguntasFrecuentes"} or re.match(
            r"Real Questions|Preguntas frecuentes", title, re.I
        ):
            replacement = trim_questions(body, lang)
            if replacement is not None:
                stats["questions"] += 1
                if replacement == "":
                    if sid:
                        removed_ids.add(sid)
                    return ""
                return replacement
            return full

        if "guide-continue-journey" in classes or sid in {
            "continueJourney",
            "continuaTuRecorrido",
        } or re.match(r"Continue Your Journey|Contin[uú]a tu recorrido", title, re.I):
            replacement = shorten_continue(body, lang)
            if replacement is not None:
                stats["continue"] += 1
                if replacement == "":
                    if sid:
                        removed_ids.add(sid)
                    return ""
                return replacement
            return full

        return full

    # Only rewrite sections inside <main> … </main> to avoid CSS false positives
    main_m = re.search(r"(<main\b[^>]*>)([\s\S]*?)(</main>)", html, re.I)
    if not main_m:
        return html, stats
    before, main_body, after = main_m.group(1), main_m.group(2), main_m.group(3)
    new_main = SECTION_RE.sub(transform, main_body)
    # Collapse leftover blank lines from removals
    new_main = re.sub(r"\n{3,}", "\n\n", new_main)
    html = html[: main_m.start()] + before + new_main + after + html[main_m.end() :]
    html = scrub_toc(html, removed_ids)
    html, hero_n = soften_hero(html)
    stats["hero"] = hero_n

    # Lightweight plain-links styling if continue was shortened
    if stats["continue"] and "data-filler-plain-links-style" not in html:
        style = (
            "\n    <style data-filler-plain-links-style>"
            ".guide-plain-links{margin:0;padding-left:1.1rem;display:grid;gap:.45rem}"
            ".guide-plain-links a{color:#9a3412;font-weight:700;text-underline-offset:2px}"
            "</style>"
        )
        html = html.replace("</head>", f"{style}\n  </head>", 1)

    if any(stats.values()) and 'data-filler-cleanup="' not in html:
        html = html.replace("<html", '<html data-filler-cleanup="1"', 1)

    return html, stats


def target_files() -> list[Path]:
    out = []
    for base in [
        ROOT / "moving-to-spain",
        ROOT / "living-in-spain",
        ROOT / "es" / "moving-to-spain",
        ROOT / "es" / "living-in-spain",
    ]:
        if not base.exists():
            continue
        for f in sorted(base.glob("*/index.html")):
            rel = f.parent.relative_to(ROOT).as_posix()
            if rel in SKIP:
                continue
            out.append(f)
    return out


def main() -> None:
    totals = {k: 0 for k in ("files", "dropped", "tie", "mistakes", "questions", "continue", "hero")}
    for f in target_files():
        original = f.read_text(encoding="utf-8")
        if 'data-filler-cleanup="1"' in original and "FORCE" not in __import__("os").environ:
            # Re-run still ok: sections already cleaned are skipped via data-filler-cleaned
            pass
        lang = page_lang(f.relative_to(ROOT), original)
        updated, stats = process(original, lang)
        if updated == original:
            continue
        f.write_text(updated, encoding="utf-8")
        totals["files"] += 1
        for k, v in stats.items():
            totals[k] += v
        print(f"cleaned {f.relative_to(ROOT)} {stats}")
    print(f"filler-cleanup-guides: {totals}")


if __name__ == "__main__":
    main()
