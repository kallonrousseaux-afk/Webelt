# Intake Menu — Site-Build Kickoff Behavior

**Mandatory behavior whenever Kallon asks for a new site** ("make me a site", "build a LocalSite for X", etc.). This replaces free-form Phase 0 questioning with a fast multiple-choice flow.

## Step 0 — Offer the menu (always, first message)

Ask ONE question via AskUserQuestion before anything else:

> **Quick menu?** — "Want to pick the direction from a menu, or should I decide everything?"
> - "Menu — give me choices"
> - "You decide — just build it"

- If **"You decide"** (or any no): skip the menu entirely. Choose tier, archetype, palette, fonts, sections from best judgment + the reference files, and go straight to build. Do not ask further design questions.
- If **"Menu"**: run Step 1. Every question must include distinct options; the user can always type a custom answer via the built-in "Other".

## Step 1 — The menu (AskUserQuestion, max 4 questions per call, 2 calls max)

**Call 1 — direction:**
1. **Tier** — LocalSite premium (default, $350-band) / AwardsSite immersive (WebGL spectacle) / Simple landing page
2. **Vibe** — Editorial warm (cream, serif, RNR-style) / Techno-futurist (dark, neon, bento) / Clean minimal (white, lots of air) / Bold & loud (big type, saturated color)
3. **Palette seed** — Warm earth (cream/terracotta/gold) / Cool slate (navy/ice/silver) / Fresh natural (green/cream/charcoal) / Pull from client's existing brand
4. **Hero style** — Big headline + real photo / Work shown in device mock / Full-bleed image + overlay / Type-only statement hero

**Call 2 — content (only if not obvious from the request):**
1. **Pages/sections** — 3-page standard (home/services/contact) / One-pager with sections / 5+ pages (trades SEO structure)
2. **Imagery** — Client has photos / Generate with Higgsfield (ask-first rule still applies) / Browser-mock portfolio style / Minimal, type-led
3. **Motion level** — Subtle reveals only / Full motion system (cursor, tilt, magnetic) / Almost none (fastest)
4. **Form goal** — Quote/contact form / Booking-style / Mailing list / Click-to-call only

Skip any question already answered by the user's request (e.g. "build an AwardsSite for a restaurant, dark theme" → skip tier + vibe). Never re-ask a decided question later.

## Step 2 — Confirm in one line, then build

One sentence restating the picks ("LocalSite, editorial warm, earth palette, photo hero, 3 pages — building.") — then go. No further approval gates unless a hard rule requires one (image generation always asks first).

## Notes
- Menu answers override defaults but never override hard rules (mobile overlap, native scroll, connector rules, no stock).
- Start every build from `templates/localsite-starter/index.html` unless AwardsSite tier was chosen.
