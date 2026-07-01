# PR #5 Review — Risk Keyword Sweep

Searched all 14 rendered draft pages (the generator's output, which is what a reader/reviewer sees) for: `TODO`, `legal advice`, `tax advice`, `always`, `guaranteed`, `within 30 days`, `first week`, `must`, `Ministry responsible for immigration`, `Coming soon`. No automatic rewrites were made except where noted — this is a report for human review.

`guaranteed`, `within 30 days`, and `first week` produced **zero matches** across all 14 pages — no fixed-timeline or overclaiming language of that kind was found.

## Genuine open item

| File | Route | Context | Risk type | Recommended action |
|---|---|---|---|---|
| `moving-to-spain/eu-citizens/index.html`, `moving-to-spain/healthcare/index.html`, `moving-to-spain/eu-registration/index.html` | `/moving-to-spain/eu-citizens/`, `/moving-to-spain/healthcare/`, `/moving-to-spain/eu-registration/` | Official-source card: `"Ministry responsible for immigration" — "TODO: verify and link the Ministry of Inclusion, Social Security and Migrations' extranjería portal — could not be confirmed reachable during this pass."` | Unverified official source (already flagged in Sprint 34) | Verify the ministry's current extranjería portal domain and link it, or keep as an explicit TODO through review — do not guess the URL. Already tracked in `docs/BACKLOG.md`. |

## Reviewed and judged low-risk (no action needed, listed for transparency)

### "Coming soon" — `/start-here/` (6 occurrences)
All 6 are `aria-disabled="true"` buttons on not-yet-built persona cards (non-EU, family, work, study, retire, self-employed). This is the intended incomplete-roadmap pattern, not a placeholder oversight. **No action.**

### "legal advice" / "tax advice" — all 14 pages
Every occurrence is the standard footer line ("Free to use. Not legal advice."), the `Legal Disclaimer` section ("This guide is for informational purposes and is not legal advice."), the tax guide's explicit "this guide is general information only and is not tax advice" note, or (on the bank account guide) a line telling readers not to treat account labels as legal advice. All of these are the *correct*, intended disclaimer language — the sweep matching them is expected, not a finding. **No action.**

### "always" / "must" — all instances reviewed individually

| File | Snippet | Verdict |
|---|---|---|
| `moving-to-spain/finding-accommodation/index.html` | "Short-term accommodation may not **always** provide the documents needed for padrón registration." | Hedged negation — matches the "requirements may vary" house style. Safe. |
| `moving-to-spain/finding-accommodation/index.html` | "Check which utilities are included and which **must** be contracted or paid separately." | Descriptive, not a legal absolute about the reader's own procedure. Low risk, but a reviewer should confirm this is universally true across landlords/regions. |
| `moving-to-spain/registering-on-the-padron/index.html` | "Do I need a NIE first? Not **always**. Some town halls may accept a passport or national ID..." | Hedged negation. Safe. |
| `moving-to-spain/eu-registration/index.html` | "Thinking NIE alone **always** means residence registration is complete." | Appears inside "Common Mistakes" — describes a misconception to correct, not an assertion of fact. Safe. |
| `living-in-spain/opening-a-bank-account/index.html` | "Do I need a Spanish bank account to live in Spain? Not **always** legally, but it can make salary, rent, utilities, taxes... easier." | Hedged negation. Safe. |
| `living-in-spain/digital-certificate/index.html` | "These details are not **always** required in the same way." / "Do I need both Digital Certificate and Cl@ve? Not **always**." | Both hedged negations. Safe. |
| `living-in-spain/social-security/index.html` | "Do I need Social Security if I am not working? Not **always**. It depends on your situation..." | Hedged negation. Safe. |
| `living-in-spain/driving/index.html` | "**Always** check the current DGT rules for your licence type." | Advice to verify with the official source (DGT) — the encouraged pattern, not an overclaim about the procedure itself. Safe. |
| `moving-to-spain/settling-into-spain/index.html` | "Banks **must** identify customers, but accepted documents and account types can vary by bank and by your situation." | States a real regulatory fact (KYC/AML identification requirement) rather than a promise to the reader. Low risk — reviewer should confirm this is accurately worded, but it is not a fixed-timeline or overclaiming issue. |

No instance of "always" or "must" asserts a fixed timeline, a guaranteed outcome, or a nationwide-uniform procedure — all either hedge explicitly, describe a misconception, cite a real regulatory fact, or point the reader to check an official source.

## Confirmed clean (zero matches)

- `guaranteed`
- `within 30 days`
- `first week`
