---
name: sitegenius
description: Build a complete client website (LocalSite premium or AwardsSite immersive). Use whenever Kallon asks to make, build, or design a site or landing page.
---

# SiteGenius — RNR Solutions site builder

You are building a production website for an RNR Solutions client. Never ship drafts. SVG icons only, never emoji. Native scroll only (no Lenis).

**Prime directive (any model, especially Sonnet/Opus): do not design motion systems, WebGL, or page architecture from scratch. TRANSPLANT the verified starter templates and change only tokens + copy.** The templates already contain the award-level craft; your job is adaptation, not invention. Deviating from the templates is how quality drops.

## Step 0 — Read these files before anything
1. `skills/sitegenius/references/intake-menu.md` — the kickoff flow (menu-or-decide + content brief)
2. `skills/sitegenius/references/build-gotchas.md` — bugs already paid for; the QA harness lives here
3. `skills/sitegenius/references/design-planning.md` — style tile + industry presets

## Step 1 — Intake (always)
Follow intake-menu.md exactly: AskUserQuestion "Menu or you decide?" → menu flow or solo decisions → **content brief** (business facts in one message; extract from pasted material; `TODO:` for unknowns; NEVER invent facts — no fake reviews/hours/credentials/stats).

## Step 2 — Style tile sign-off
**Mandatory for every real client build — not a suggestion.** Skippable ONLY for disposable practice/QA builds explicitly marked as such (e.g. `clients/_practice/`); if there's any chance the output reaches a client, run this step even under time pressure — it's cheapest exactly when it's tempting to skip. Pick the industry preset from design-planning.md. Build the one-screen style tile (palette swatches, type specimen with the client's real headline, buttons default+hover, mini hero mock, card sample). Before locking: confirm the display font actually has the weight/style (italic vs bold) the token CSS assumes — check the Google Fonts spec, don't assume (see build-gotchas #18/#24, both caught late because this step was skipped). Screenshot at 1280, send it, ask "This direction, or adjust?" Iterate on the tile, never on a full build. On approval, tokens LOCK. Write the 5-line section map. Skip only if Kallon explicitly says skip for THIS build.

## Step 2.5 — Pick techniques (don't skip — 60 options exist, most builds use 5-15)
Read `skills/sitegenius/references/technique-selection.md` and apply its four filters: tier caps the budget → industry preset sets the register (trust-first/warm-local/craft-impact/spectacle-tolerant) → exactly ONE centerpiece spectacle technique per AwardsSite build → the "why" test cuts anything that's decoration with no job. Use the file's worked defaults unless the brief says otherwise. Only surface the centerpiece choice to Kallon via AskUserQuestion if it's genuinely ambiguous — supporting techniques follow from the tier default without asking.

## Step 3 — Build by transplant
- **LocalSite ($350-band)**: start from `templates/localsite-starter/index.html`. Replace every `{{PLACEHOLDER}}`, swap the `:root` token block. THEN add the premium layer the same way the AwardsSite starter does it (copy its cursor/magnetic/reveal script blocks): GSAP staggered ScrollTrigger reveals, labeled difference-cursor, hover tilt ≤12deg, magnetic primary CTAs, at least two luxury CSS touches (clip-path reveal, oversized italic serif moment, parallax decoration, count-up). Section background rhythm: bg → surface → bg → ink.
- **AwardsSite ($12k-band)**: start from `templates/awardssite-starter/index.html` — a complete verified immersive build (intro reveal, full-viewport fBm aura, line-by-line hero, marquee, editorial hover list, pinned horizontal scroll, continuity orbit, labeled cursor, magnetic CTAs). Follow its README: change tokens, shader vec3 colors, copy, schema — keep every script block and guard intact. If Step 2.5 selected a different centerpiece (3D model, scroll-scrubbed sequence, etc.) than the aura shader, swap that one system using its recipe in `design-options-catalog.md` — leave the rest of the starter's verified motion intact.
- Any technique beyond what's in the two starters comes from `design-options-catalog.md` — it's a recipe, not yet battle-tested, so budget extra QA time and watch for the failure modes in `build-gotchas.md`.
- Fonts: never Inter/Roboto/Arial. Fraunces, Playfair, Syne, Instrument Serif, Archivo Expanded, Hanken Grotesk (body).
- Copy: write from the content brief using `references/seo-copy-playbook.md` (PAS/AIDA/FAB per section). Images per `references/imagery-direction.md` — generation always asks the user first.
- The live example for craft calibration: `index.html` at repo root (webelt.ca). Read, NEVER modify.

## Step 4 — QA gates (hard, in order — run the exact harness from build-gotchas.md)
1. Sandbox CDN is blocked: make a `test-live.html` copy with local npm libs (never edit the real file's CDN URLs).
2. Playwright (`/opt/pw-browsers/chromium`) at 1440×900 and 375×812: wait for intro, walk the page, screenshot.
3. Assert: zero pageerrors · 375 scrollWidth == 375 · WebGL canvas has class `on` on desktop · reveals actually visible.
4. Contrast: run the gotchas script on every changed token pair — ≥4.5 text, ≥3.0 large/UI.
5. **Open and LOOK at every screenshot before saying done.** If it looks bland to you, it is worse for Kallon.

## Step 5 — Deliver
Send the HTML file itself (SendUserFile, display render) as the primary preview — stills cannot show motion and Kallon judges in the browser. Include mobile stills if he's on his phone. List remaining `TODO:`s. Commit and push per branch instructions.

## Standing rules
- Decisions Kallon has made are final; don't re-offer declined things or nag about "pending" items on finished work.
- Zero mobile overlap at 375px is a ship blocker. `transform`/`opacity` only. All motion dead under `prefers-reduced-motion`, decorative layers hidden ≤900px.
- Three.js pinned @0.158.0. Full WebGL guard set every time (see gotchas §6).
