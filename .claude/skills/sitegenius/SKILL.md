---
name: sitegenius
description: Build a complete client website (LocalSite premium or AwardsSite immersive). Use whenever Kallon asks to make, build, or design a site or landing page.
---

# SiteGenius — RNR Solutions site builder

You are building a production website for an RNR Solutions client. Never ship drafts. SVG icons only, never emoji. Native scroll only (no Lenis).

## Step 1 — ALWAYS start with the intake menu
Read `skills/sitegenius/references/intake-menu.md` and follow it exactly: first ask via AskUserQuestion whether Kallon wants the multiple-choice menu or wants you to decide everything. If menu → run the choice flow (every question has an "Other"). If "you decide" → choose everything yourself and build without further design questions.

Either way, run the **content brief** step from that file: collect the business facts (name, phone, address, services, hours, real quote) in one message, extract from any pasted material, mark unknowns as `TODO:` — never invent facts. Copy is drafted from the brief before layout is finalized.

## Step 2 — Load the knowledge
Read the reference files in `skills/sitegenius/references/` as needed:
- `design-fundamentals-2026.md` — tokens first: fluid type scale, OKLCH 60-30-10 palette with AA pairs, layered shadows. Always.
- `functional-sites-2026.md` — hero 10-second test, 3-field forms, CTA rules, local checklist. Always.
- `seo-copy-playbook.md` — schema JSON-LD + section-by-section copy formulas. Always.
- `imagery-direction.md` — before touching any image. Image generation always asks the user first.
- `awwwards-techniques.md` + `awwwards-research-2026.md` — AwardsSite tier only.

## Step 3 — Style tile sign-off (before any full build)
Read `skills/sitegenius/references/design-planning.md`. Pick the industry preset, build the one-screen style tile (palette, type specimen with real headline, buttons, mini hero mock, card sample), screenshot it at 1280px, and show it: "This direction, or adjust?" Iterate on the tile, never on a full build. Tokens lock on approval. Also write the 5-line section map. Skip only if Kallon says to skip it.

## Step 4 — Build
- LocalSite / landing: copy `templates/localsite-starter/index.html`, replace every `{{PLACEHOLDER}}`, swap the `:root` token block to the client palette + fonts (never Inter/Roboto; reach for Fraunces, Playfair, Syne, Instrument Serif).
- **LocalSite is Premium 9/10 — the template alone is NOT done.** Every LocalSite also gets the motion + luxury layer:
  - GSAP (`cdn.jsdelivr.net/npm/gsap@3` + ScrollTrigger + SplitText, all free): SplitText stagger reveal on the hero headline; ScrollTrigger reveals with stagger on cards/sections (not uniform fade-ins).
  - Custom cursor: `mix-blend-mode: difference` ring, grows on interactive hover — desktop `(hover:hover)` only.
  - Hover tilt on cards (perspective, ≤12deg) and magnetic pull on primary CTAs — desktop only.
  - Luxury CSS: at least two of — clip-path reveal (`inset(100% 0 0 0)` → `0%`), oversized italic/serif editorial moments, parallax depth on decorative layers, count-up numbers, blend-mode accents.
  - Deliberate whitespace variance + section background rhythm (bg → surface → bg → ink) — equal-padding uniform sections read as template output.
  - All of it: `transform`/`opacity` only, dead under `prefers-reduced-motion`, hidden ≤900px where decorative.
- AwardsSite: everything above + WebGL layer (desktop + hover:hover + motion-on only, off ≤900px, DPR ≤1.5, pause offscreen, `if(!window.THREE) return`; three pinned @0.158.0).
- The example build for reference: `index.html` at repo root (webelt.ca) — read it for tone and craft level; NEVER modify it.

## Step 5 — QA before saying done (hard gates)
1. Screenshot at 375px and 1280px (Playwright, `/opt/pw-browsers/chromium`) and LOOK at them.
2. Zero mobile overlap at 375px — `getBoundingClientRect()` on absolute/fixed elements; no horizontal overflow.
3. WCAG AA contrast on every text/bg pair incl. focus rings; `:focus-visible` on all interactive elements.
4. Zero console errors. Only `transform`/`opacity` animated. `prefers-reduced-motion` respected.
Do not report a phase complete until these pass.
