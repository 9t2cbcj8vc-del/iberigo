#!/usr/bin/env python3
"""Browser regression audit for the Torrevieja Padrón Spain Files article."""

from __future__ import annotations

import json
import os
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = os.environ.get("PREVIEW_BASE", "https://iberigo.eu").rstrip("/")
OUT = Path("browser-spain-files-overflow")
OUT.mkdir(parents=True, exist_ok=True)

PADRON_ROUTES = [
    ("/the-spain-files/padron-torrevieja/", "padron-en"),
    ("/the-spain-files/es/padron-torrevieja/", "padron-es"),
]
CONTROL_ROUTES = [
    ("/the-spain-files/nie-spain/", "nie-en"),
    ("/the-spain-files/non-lucrative-visa-spain/", "non-lucrative-visa-en"),
]
PHONE_VIEWPORTS = [(375, 844), (390, 844)]
PADRON_WIDE_VIEWPORTS = [(768, 1024), (1280, 900)]


def measure(page):
    return page.evaluate(
        """
        () => {
          const wrap = document.querySelector('.article-wrap');
          const body = document.querySelector('.article-body');
          const table = document.querySelector('.article-body table');
          const offenders = [...document.querySelectorAll('body *')]
            .map(el => {
              const r = el.getBoundingClientRect();
              return {tag: el.tagName, cls: el.className || '', left: r.left, right: r.right, width: r.width};
            })
            .filter(x => x.right > innerWidth + 1 || x.left < -1)
            .slice(0, 20);
          const rect = el => el ? (() => {
            const r = el.getBoundingClientRect();
            return {left: r.left, right: r.right, width: r.width};
          })() : null;
          return {
            innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            bodyScrollWidth: document.body.scrollWidth,
            wrap: rect(wrap),
            articleBody: rect(body),
            table: rect(table),
            tableLayout: table ? getComputedStyle(table).tableLayout : null,
            offenders,
          };
        }
        """
    )


def assert_no_document_overflow(label: str, metrics: dict) -> None:
    viewport = metrics["innerWidth"]
    max_width = max(metrics["scrollWidth"], metrics["bodyScrollWidth"])
    if max_width > viewport + 1:
        raise AssertionError(
            f"{label}: horizontal overflow {max_width - viewport:.1f}px; "
            f"metrics={json.dumps(metrics, ensure_ascii=False)}"
        )
    wrap = metrics["wrap"]
    if not wrap or wrap["left"] < -1 or wrap["right"] > viewport + 1:
        raise AssertionError(f"{label}: article wrapper leaves viewport; {metrics}")


def audit_page(page, route: str, name: str, width: int, height: int, *, padron: bool) -> None:
    page.set_viewport_size({"width": width, "height": height})
    url = f"{BASE}{route}"
    page.goto(url, wait_until="domcontentloaded", timeout=45_000)
    page.wait_for_selector(".article-wrap", state="visible", timeout=20_000)
    metrics = measure(page)

    if padron:
        page.screenshot(
            path=str(OUT / f"{name}-{width}x{height}.png"),
            full_page=True,
        )

    assert_no_document_overflow(f"{name} {width}x{height}", metrics)

    if padron and width <= 520:
        table = metrics["table"]
        article_body = metrics["articleBody"]
        if not table or not article_body:
            raise AssertionError(f"{name}: missing timeline table/article body")
        if metrics["tableLayout"] != "fixed":
            raise AssertionError(f"{name}: mobile timeline table is not fixed-layout: {metrics}")
        if table["right"] > article_body["right"] + 1 or table["width"] > article_body["width"] + 1:
            raise AssertionError(f"{name}: timeline table exceeds article body: {metrics}")

    print(
        f"PASS {name} {width}x{height}: "
        f"viewport={metrics['innerWidth']} scroll={metrics['scrollWidth']} "
        f"wrap={metrics['wrap']['width']:.1f}px"
    )


def main() -> None:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        page = browser.new_page()
        try:
            for route, name in PADRON_ROUTES:
                for width, height in PHONE_VIEWPORTS + PADRON_WIDE_VIEWPORTS:
                    audit_page(page, route, name, width, height, padron=True)
            for route, name in CONTROL_ROUTES:
                for width, height in PHONE_VIEWPORTS:
                    audit_page(page, route, name, width, height, padron=False)
        finally:
            browser.close()


if __name__ == "__main__":
    main()
