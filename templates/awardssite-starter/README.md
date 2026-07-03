# AwardsSite Starter Template

A **complete, QA-verified immersive site** (this is the signed-off immigration build, kept intact as the master). Every motion system is wired and tested:

intro word reveal → full-viewport fBm WebGL aura (cursor-reactive, breathing) → line-by-line hero headline → drifting marquee → editorial hover service list → pinned horizontal-scroll process → continuity orbit ring morphing across the page → parallax quote mark → labeled custom cursor (dot + trailing ring) → magnetic CTAs → smart-sticky header → grain overlay → lined 3-field Supabase form.

## How to use (IMPORTANT — especially for Sonnet/Opus builds)

**Do NOT write motion, WebGL, or animation code from scratch. Transplant this file.** The systems here survived a full debug cycle; rewriting them reintroduces the bugs listed in `skills/sitegenius/references/build-gotchas.md`.

Per client, change ONLY:
1. **Tokens** — the `:root` block: `--bg/--bg-2` (dark), `--paper/--paper-2` (light), `--brass/--brass-text/--brass-soft` (accent family: one bright for dark bg, one dark ≥4.5:1 for light bg), fonts. Then update the 5 shader colors in the `frag` string (vec3 values = your dark bg, lighter bg, accent, soft accent, deep warm — divide hex by 255).
2. **Copy** — business name, headline lines (keep the 3-line `.ln` structure), services, steps, quote, NAP. Follow `seo-copy-playbook.md`.
3. **Schema JSON-LD** — @type + real business facts (TODO anything unknown; never invent).
4. Marquee words, section headings, cursor labels (`data-cursor`).

Keep untouched: all `<script>` logic, the guard conditions, the `.ln`/`.rv` markup patterns, the `html.gsap` reveal system, breakpoints, reduced-motion blocks.

## QA before done (non-negotiable)
Run the exact harness in `build-gotchas.md` §QA: local-lib swap → Playwright screenshots at 1440 and 375 → check canvas `on`, zero pageerrors, 375 scrollWidth == 375 → LOOK at the screenshots → contrast-check any token you changed (script in gotchas).
