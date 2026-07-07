# RNR Solutions — Session Handoff

Live site: https://webelt.ca/#top

## Who
Kallon Rousseaux — kallon.rousseaux@gmail.com
RNR Solutions — 2-person web agency, Winnipeg, MB. Goal: 500 websites in 6 months.
Sales: Apollo/Clay lead gen → cold call → Zoom close.

## Pricing
| Service | Price |
|---|---|
| Landing page | $150 (option only — never lead with it) |
| 3-page site | $350 (main sell / headline price) |
| Security audit | $300 (anchor/upsell) |
| Contact form / booking / mailing list | $125–$175 each |
| SEO | $75 |
| Maintenance | $19/mo or $149/yr |

Tools: Figma, Cursor, Supabase, Hostinger, Claude, Apollo (free plan — people search locked), Clay (enriches by domain/LinkedIn URL).

## User preferences (read first)
- Terse responses. No over-explaining. No trailing summaries.
- "Just do it for me" = fully autonomous.
- Very visual — judge quality in the browser, screenshot at 375px and 1280px before calling anything done.
- Production-quality only. SVG icons only, never emoji.
- Don't re-push things declined ("9.5 is good" — do NOT offer 10/10 again).
- Design first, always. No deploy/ops talk during design phase.

## Hard rules
1. **No mobile overlap** — zero tolerance at 375px. Test with `getBoundingClientRect()` on all absolute elements; hide/reflow decorative elements ≤900px. Ship blocker.
2. **Design-first sequencing** — perfect design before deploy/connector work.
3. **Image generation** — always ask first (AskUserQuestion: user specifies vs Claude chooses). Every image must explain the business or show craft. No laptop/desk stock clichés. The café-in-browser mock works because it reads as real client work.
4. **Adobe ↔ Higgsfield never cross** — Adobe rejects external CDN URLs. Finish inside the connector that made it: Higgsfield upscale/remove-bg by job_id; film grain via CSS `.grain` overlay (~7% opacity); palette via prompt at generation time. Adobe image tools only on Adobe-native assets.
5. **Native scroll only** — Lenis was tried and removed. `scroll-behavior: smooth` + `scroll-padding-top: 90px`. Ignore Lenis in SiteGenius SKILL.md for RNR builds.

## RNR landing page (webelt.ca)
Source on user's machine: `C:\Users\Owner\rnr-landing\` — `index.html` (AwardsSite 9.5/10, WebGL fBm aura), `index-localsite.html` (LocalSite 9/10), `hero-cafe.webp` (49KB, in use), `hero-cafe-2k.webp` (2K master, unused), `server.js` (port 4321). Deploy zip: `C:\Users\Owner\Desktop\rnr-site.zip` (Hostinger).

Palette: `--bg:#EFE9DE; --surface:#FAF6EF; --surface-2:#F1EADC; --ink:#1A150F; --accent:#B0492A; --accent-deep:#893821; --gold:#A8854C;`
Fonts: Fraunces (display) + Hanken Grotesk (body).
Three.js pinned: `cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js` (three.min.js deprecated r160+).
WebGL aura: fBm domain-warped, gold shimmer, vignette, cursor-reactive (`uMouse`), canvas `#gl`, aria-hidden, pointer-events none.

In the site: café hero in browser mock, count-up metrics, pricing ($350 headline), magnetic CTAs, custom difference-cursor, hover tilt, horizontal scroll process section (desktop only).

**Supabase form is LIVE** on webelt.ca (done 2026-07). POSTs to `/rest/v1/leads`, honeypot `_gotcha`. Note: the `index.html` in this repo predates that and still has placeholder credentials — it's a design/pattern reference, not the deployed file.

Design signed off 2026-06-24. Do not push 10/10 upgrades.

## SAAP Thai Curry (second project)
`C:\Users\Owner\saap-thai-curry` — Next.js 14 App Router, TS, Tailwind, Vercel Analytics. Founders: Layla McCurdy & Kallon Rousseaux. FoodFare Corydon, Winnipeg. saapthaicurry@gmail.com. Plant-based Thai Red Curry; email/in-person ordering only.
Colors: cream #F6F0E6 / red #C63B1E / green #173C2B / gold #D8A14B / charcoal #2D2D2D. Fonts: Playfair Display italic 700 + Inter.
Remaining: fix focus-ring contrast on green button (use `outline: 3px solid #FFF; outline-offset: 3px`), Vercel deploy (domain not registered), Resend API setup, confirm founders photo.

## SiteGenius skill
**The pipeline lives in `.claude/skills/sitegenius/SKILL.md` in this repo — that file is the source of truth, not this summary.** (An older local copy may exist at `C:\Users\Owner\.claude\skills\sitegenius\` — the repo version supersedes it; the old "7-phase / Figma / React components" description is obsolete.)

Current shape: Step 0 read references (incl. `kallon-taste.md` + `component-library.md`) → intake (`intake-menu.md`) → style-tile sign-off → technique selection → **build by transplant** from the two verified starters (`templates/localsite-starter/`, `templates/awardssite-starter/`) → QA gates (the harness in `build-gotchas.md`) → visual self-review (`visual-review.md`) → deliver single-file → launch (`launch-playbook.md` + `handoff-kit.md`).

### Reference bundle in this repo (`skills/sitegenius/references/`)
Research: `awwwards-techniques.md`, `awwwards-research-2026.md`, `functional-sites-2026.md`, `design-fundamentals-2026.md`, `design-options-catalog.md`, `technique-selection.md`.
Process: `intake-menu.md` (mandatory kickoff), `design-planning.md`, `seo-copy-playbook.md`, `imagery-direction.md` (incl. the image-plan + Higgsfield prompt recipes).
Accumulated experience: `build-gotchas.md` (120+ paid-for bugs + the QA harness), `kallon-taste.md` (accept/reject ledger — update after every reaction), `component-library.md` (proven components by canonical source file), `visual-review.md` (the mandatory "ugly check").
Launch: `launch-playbook.md` (deploy package spec + Hostinger go-live), `handoff-kit.md` (client-facing handoff template).

## Known bugs / lessons
| Problem | Fix |
|---|---|
| three.min.js deprecated r160+ | Pin three@0.158.0 |
| Adobe rejects Higgsfield CDN URLs | Never cross connectors |
| WebGL rAF stalls screenshot tools | Fresh preview server before capture |
| Horizontal scroll breaks mobile | ≤900px CSS + JS guards |
| font_recommend errors | user_query ≤ 150 chars |

## Pending tasks (priority)
1. SAAP contrast fix — green button focus ring (on Kallon's machine, not this repo).
2. SAAP deploy — after saapthaicurry.com registered.
3. First REAL client launch: run `launch-playbook.md` end-to-end on a paying client and bring back every live-side failure so it gets folded into the playbook — the sandbox side is fully rehearsed (deploy package pattern proven on `clients/_practice/rowan-winebar/`), the live side has zero paid-for gotchas yet.
(Older items — awwwards research, Supabase on webelt.ca, RNR site edits — done and folded in.)
