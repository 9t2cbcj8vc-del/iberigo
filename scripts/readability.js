(() => {
  const STYLE_ID = "iberigo-readability-style";
  const PROCESSED = "readabilityProcessed";
  const MIN_PARAGRAPH = 420;
  const TARGET_CHUNK = 230;
  const MAX_CHUNK = 360;

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      main .readability-split + .readability-split { margin-top: 0.95rem !important; }
      main .readability-split { max-width: 68ch; }
      @media (max-width: 520px) {
        main .readability-split + .readability-split { margin-top: 1rem !important; }
      }
    `;
    document.head.appendChild(style);
  }

  const excluded = [
    "nav",
    "footer",
    ".site-footer",
    ".guide-source-description",
    ".guide-source-tag",
    ".guide-reading-time",
    ".last-reviewed",
    ".helper-note",
    ".disclaimer",
    "[data-no-readability-split]"
  ].join(",");

  function sentenceSegments(text) {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      try {
        const segmenter = new Intl.Segmenter(document.documentElement.lang || "en", { granularity: "sentence" });
        return Array.from(segmenter.segment(text)).map((item) => ({
          start: item.index,
          end: item.index + item.segment.length,
          text: item.segment
        }));
      } catch (_) {}
    }

    const segments = [];
    const regex = /[^.!?]+(?:[.!?]+(?=\s|$)|$)\s*/g;
    let match;
    while ((match = regex.exec(text))) {
      segments.push({ start: match.index, end: regex.lastIndex, text: match[0] });
    }
    return segments;
  }

  function chunkRanges(text) {
    const sentences = sentenceSegments(text).filter((item) => item.text.trim());
    if (sentences.length < 3) return [];

    const ranges = [];
    let chunkStart = sentences[0].start;
    let chunkLength = 0;
    let chunkSentences = 0;

    sentences.forEach((sentence, index) => {
      const sentenceLength = sentence.end - sentence.start;
      const wouldOverflow = chunkLength > 0 && chunkLength + sentenceLength > MAX_CHUNK;

      if (wouldOverflow && chunkLength >= TARGET_CHUNK * 0.7) {
        ranges.push([chunkStart, sentence.start]);
        chunkStart = sentence.start;
        chunkLength = 0;
        chunkSentences = 0;
      }

      chunkLength += sentenceLength;
      chunkSentences += 1;

      const isLast = index === sentences.length - 1;
      const healthyBreak = chunkLength >= TARGET_CHUNK && chunkSentences >= 2;
      const hardBreak = chunkLength >= MAX_CHUNK;

      if (!isLast && (healthyBreak || hardBreak)) {
        ranges.push([chunkStart, sentence.end]);
        chunkStart = sentence.end;
        chunkLength = 0;
        chunkSentences = 0;
      }
    });

    if (chunkStart < text.length) ranges.push([chunkStart, text.length]);
    return ranges.length > 1 ? ranges : [];
  }

  function textNodesOf(element) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    let offset = 0;
    while ((node = walker.nextNode())) {
      nodes.push({ node, start: offset, end: offset + node.nodeValue.length });
      offset += node.nodeValue.length;
    }
    return nodes;
  }

  function locate(nodes, offset, preferEnd = false) {
    if (!nodes.length) return null;
    for (let i = 0; i < nodes.length; i += 1) {
      const entry = nodes[i];
      if (offset < entry.end || (preferEnd && offset === entry.end) || (offset === entry.start && i === nodes.length - 1)) {
        return { node: entry.node, offset: Math.max(0, Math.min(entry.node.nodeValue.length, offset - entry.start)) };
      }
    }
    const last = nodes[nodes.length - 1];
    return { node: last.node, offset: last.node.nodeValue.length };
  }

  function splitParagraph(paragraph) {
    if (!(paragraph instanceof HTMLParagraphElement)) return;
    if (paragraph.dataset[PROCESSED] === "true") return;
    if (!paragraph.closest("main")) return;
    if (paragraph.closest(excluded)) return;

    const text = paragraph.textContent || "";
    if (text.trim().length < MIN_PARAGRAPH) return;

    const ranges = chunkRanges(text);
    if (ranges.length < 2) return;

    const nodes = textNodesOf(paragraph);
    if (!nodes.length) return;

    const replacements = [];
    ranges.forEach(([start, end], index) => {
      const startPoint = locate(nodes, start, false);
      const endPoint = locate(nodes, end, true);
      if (!startPoint || !endPoint) return;

      const range = document.createRange();
      range.setStart(startPoint.node, startPoint.offset);
      range.setEnd(endPoint.node, endPoint.offset);

      const next = paragraph.cloneNode(false);
      if (index > 0) next.removeAttribute("id");
      next.classList.add("readability-split");
      next.dataset[PROCESSED] = "true";
      next.appendChild(range.cloneContents());
      if ((next.textContent || "").trim()) replacements.push(next);
    });

    if (replacements.length > 1) paragraph.replaceWith(...replacements);
  }

  function process(root = document) {
    if (root instanceof HTMLParagraphElement) splitParagraph(root);
    if (root.querySelectorAll) root.querySelectorAll("main p").forEach(splitParagraph);
  }

  let queued = false;
  const queueProcess = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      process(document);
    });
  };

  const start = () => {
    process(document);
    const main = document.querySelector("main");
    if (!main || !("MutationObserver" in window)) return;
    const observer = new MutationObserver(queueProcess);
    observer.observe(main, { childList: true, subtree: true, characterData: true });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
