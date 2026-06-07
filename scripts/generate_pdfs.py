from pathlib import Path
import json

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parent.parent
MANIFEST_PATH = ROOT / "downloads" / "guide-manifest.json"
DOWNLOADS_DIR = ROOT / "downloads"
OVERRIDES_PATH = ROOT / "scripts" / "pdf_overrides.json"


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="GuideTitle",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=26,
            textColor=colors.HexColor("#8a1f19"),
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="GuideBody",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=15,
            textColor=colors.HexColor("#444444"),
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="GuideSection",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=12.5,
            leading=15,
            textColor=colors.HexColor("#1f1f1f"),
            spaceBefore=8,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="GuideMeta",
            parent=styles["BodyText"],
            fontName="Helvetica-Oblique",
            fontSize=9,
            leading=13,
            textColor=colors.HexColor("#6e6e73"),
            spaceAfter=8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="GuideLink",
            parent=styles["BodyText"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=colors.HexColor("#444444"),
            leftIndent=8,
            spaceAfter=4,
        )
    )
    return styles


def bullet_list(items, styles):
    if not items:
        return []
    flow = ListFlowable(
        [
            ListItem(
                Paragraph(str(item), styles["GuideBody"]),
                leftIndent=0,
            )
            for item in items
        ],
        bulletType="1" if len(items) <= 9 else "bullet",
        start="1",
        leftIndent=14,
    )
    return [flow, Spacer(1, 4)]


def build_story(guide, styles):
    labels = {
        "steps": "Step-by-step" if guide["lang"] == "en" else "Paso a paso",
        "documents": "Common documents" if guide["lang"] == "en" else "Documentos habituales",
        "forms": "Forms and fee notes" if guide["lang"] == "en" else "Formularios y notas de tasas",
        "links": "Official links" if guide["lang"] == "en" else "Enlaces oficiales",
        "important": "Important" if guide["lang"] == "en" else "Importante",
        "brand_note": (
            "HolaPapers is a planning guide only. Always verify the current official procedure before filing."
            if guide["lang"] == "en"
            else "HolaPapers es solo una guía de planificación. Comprueba siempre el procedimiento oficial vigente antes de presentar nada."
        ),
    }
    story = [
        Paragraph("HOLAPAPERS", styles["GuideMeta"]),
        Paragraph(guide["process"], styles["GuideTitle"]),
    ]

    if guide.get("explanation"):
        story.append(Paragraph(guide["explanation"], styles["GuideBody"]))

    story.append(Paragraph(labels["steps"], styles["GuideSection"]))
    story.extend(bullet_list(guide.get("steps", []), styles))

    if guide.get("documents"):
        story.append(Paragraph(labels["documents"], styles["GuideSection"]))
        story.extend(bullet_list(guide["documents"], styles))

    if guide.get("formsAndFees"):
        story.append(Paragraph(labels["forms"], styles["GuideSection"]))
        for item in guide["formsAndFees"]:
            line = f"<b>{item['code']}</b> - {item['description']} ({item['kind']})"
            if item.get("officialUrl"):
                line += f"<br/><font color='#6e6e73'>{item['officialUrl']}</font>"
            story.append(Paragraph(line, styles["GuideBody"]))

    if guide.get("officialServices"):
        story.append(Paragraph("Official forms and online services" if guide["lang"] == "en" else "Formularios oficiales y servicios online", styles["GuideSection"]))
        for item in guide["officialServices"]:
            line = f"<b>{item['label']}</b> - {item['kind']}"
            if item.get("url"):
                line += f"<br/><font color='#6e6e73'>{item['url']}</font>"
            story.append(Paragraph(line, styles["GuideLink"]))

    if guide.get("links"):
        story.append(Paragraph(labels["links"], styles["GuideSection"]))
        for link in guide["links"]:
            story.append(
                Paragraph(
                    f"<b>{link['label']}</b><br/><font color='#6e6e73'>{link['url']}</font>",
                    styles["GuideLink"],
                )
            )

    if guide.get("disclaimer"):
        story.append(Spacer(1, 6))
        story.append(Paragraph(labels["important"], styles["GuideSection"]))
        story.append(Paragraph(guide["disclaimer"], styles["GuideBody"]))

    story.append(Spacer(1, 10))
    story.append(
        Paragraph(
            labels["brand_note"],
            styles["GuideMeta"],
        )
    )
    return story


def generate_pdf(guide, styles):
    language_dir = DOWNLOADS_DIR / guide["lang"]
    language_dir.mkdir(parents=True, exist_ok=True)
    output_path = language_dir / f"{guide['id']}.pdf"
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title=guide["process"],
        author="HolaPapers",
    )
    doc.build(build_story(guide, styles))


def merge_guide(guide, overrides):
    merged = dict(guide)
    if not overrides:
        return merged
    for key in ["process", "explanation", "steps", "documents", "formsAndFees", "officialServices", "links", "disclaimer"]:
        if key in overrides:
            merged[key] = overrides[key]
    return merged


def main():
    manifest = json.loads(MANIFEST_PATH.read_text())
    overrides = json.loads(OVERRIDES_PATH.read_text()) if OVERRIDES_PATH.exists() else {}
    styles = build_styles()
    for lang, lang_guides in manifest.items():
        for guide in lang_guides:
            guide_override = overrides.get(lang, {}).get(guide["id"], {})
            generate_pdf(merge_guide(guide, guide_override), styles)


if __name__ == "__main__":
    main()
