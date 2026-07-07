# Component Library — proven pieces, where they live, how to transplant them

**Purpose**: every component below has shipped, passed the full QA harness, and survived Kallon's review. When a new build needs one, copy it from the **canonical source file listed here** — never from memory, a scratch file, or an older build (gotcha #109: stale snapshots silently reintroduce fixed bugs; the canonical file is the only copy guaranteed to carry every fix).

**Rule**: copy from canonical → adapt tokens/ids → re-run the component's listed verification. If you improve a component in a new build, that new build becomes the canonical source — update this file's pointer in the same commit.

---

## Scroll & motion

### Pinned panel-stack (clip-path wipe slideshow) — Kallon's favorite centerpiece
- **Canonical**: `clients/immigration-paralegal-v2/index.html` (search `stack-panel`)
- Panels wipe via `clip-path: inset()` scrubbed by one pinned ScrollTrigger; hold+transition timing constants (`HOLD = 0.8, TRANSITION = 0.3`) so each panel rests before wiping.
- **Gotchas paid**: #91 (`:first-child` broke because `.stack-dots` was the real first child — uses explicit `.first` class + `[data-panel]` selectors), #92 (no hold time = wipes feel instant).
- **Verify**: panel 1 visible on arrival (not panel 2), each panel holds before wiping, dots track the active panel.

### Horizontal scroll-jack product rail — the one thing Kallon liked in FIELDWORK
- **Canonical**: `clients/_practice/arlo-ceramics/index.html` (search `initHScrollPin`)
- Sticky 100vh section inside a tall outer (`height:600vh`); track `x`-translated by scroll progress; progress bar via `onUpdate`; `invalidateOnRefresh` + function-based `end` so resize recalculates.
- **Verify**: rail actually translates on scroll (evaluate the track's `transform` before/after), progress bar moves, no horizontal page overflow at 375px.

### Scroll-linked section-color crossfade — approved fix for "harsh" color cuts
- **Canonical**: `clients/_practice/meridian-store/index.html` (search `initColorCrossfade`)
- Each section KEEPS its CSS-declared `background-color` (zero-JS state = correct, passes contrast on its own); GSAP `fromTo`-tweens the section's own background from the previous section's color, reading the target via `getComputedStyle`. Transition zone ends (`top 88%`) before the section's text reveal starts, so there's never a low-contrast overlap window.
- **Gotchas paid**: #116 — do NOT use a fixed backdrop layer (breaks ancestor-chain contrast + no-JS fallback).
- **Verify**: axe clean after a full scroll-walk; section colors correct with JS disabled.

### Quiet reveal layer (fade/rise on scroll)
- **Canonical**: `clients/_practice/rowan-winebar/index.html` (search `initMotion`)
- `gsap.from` opacity/y per section trigger, `once:true` on repeating grids to avoid re-fire jank.
- **Verify**: below-fold reveals become visible during the scroll-walk (axe can't measure invisible nodes — gotcha #4/#105).

### Hero video background (generated or client-supplied)
- **Canonical**: `clients/immigration-paralegal-v3-video/index.html` (search `heroVideo`); second reference composition in `clients/_practice/meridian-store/index.html` (bottom-aligned content + header color-flip tied to hero visibility)
- `IntersectionObserver` pause/play; gradient veil for text legibility; graceful degradation to background color when the video fails to load (verified under this sandbox's CDN block — gotchas #100/#101/#115).
- **Verify**: no layout break or console error with the video URL unreachable.

## Commerce

### localStorage cart core (add/remove/qty/subtotal/merge)
- **Canonical**: `clients/_practice/meridian-store/index.html` (with size variants) or `clients/_practice/arlo-ceramics/index.html` (without sizes) — search `getCart`
- Line items merge on duplicate id(+size); qty ≤ 0 removes the line; unique `*_cart` localStorage key per build (never reuse a key across demos).
- **Verify via Playwright, not visually**: add → qty inc → add same product from a different entry point → asserts ONE merged line in localStorage; add different product → two lines.

### Bottom-sheet cart drawer
- **Canonical**: `clients/_practice/arlo-ceramics/index.html` (search `cart-sheet`)
- Slides up from bottom edge; veil click closes; **`inert` toggled on close/open — never `aria-hidden`** (gotcha #103: aria-hidden on focusable children is itself a WCAG violation).

### Side cart drawer + quick-view panel (size selector)
- **Canonical**: `clients/_practice/meridian-store/index.html` (search `quickview`)
- Same `inert` discipline; quick-view add auto-opens the cart.

## Forms

### Reservation form (restaurant)
- **Canonical**: `clients/_practice/rowan-winebar/index.html` (search `resForm`)
- Date/time-slot/party-size selects, honeypot field, intercepted submit with in-place status note that names the real integration (Resy/OpenTable) needed for production.

### Newsletter form (honeypot + Supabase pattern)
- **Canonical (wired)**: the Supabase + RLS + honeypot recipe used across client builds; **canonical (demo/no-backend)**: `clients/_practice/rowan-winebar/index.html` `wireReservation` shape.
- **Gotcha paid**: #118 — apostrophes in JS strings: use double quotes (`"you're"`), never `\\'` (double-escape = parse error that kills ALL page JS in a single-script build).

## Structure & delivery

### Single-file page scaffold (header / main-landmark / sections / footer / sheet+veil / one inline script)
- **Canonical**: `clients/_practice/rowan-winebar/index.html` (cleanest), `clients/_practice/arlo-ceramics/index.html` (with commerce)
- Baked-in fixes: `<main>` landmark between header/footer (gotcha #113 `region`), heading order h1→h2→h3 with `.sr-only` bridges where a grid of h3/h4 cards follows (gotchas #106/#113), `.sr-only` utility class defined (not just used — gotcha #109).

### Placeholder image SVG generator
- **Canonical**: `clients/_practice/rowan-winebar/index.html` `placeholderSVG()` (has `preserveAspectRatio="xMidYMid slice"` so tiles crop like `object-fit:cover` in mixed-size grids)
- Always labeled, correct aspect, `role="img"` + aria-label. Replace with real/generated imagery per `imagery-direction.md` before any client delivery.

### Two-polarity accent tokens
- Not a component — a palette rule (gotcha #123): any accent used on both light and dark backgrounds gets TWO tokens up front (`--accent` / `--accent-lite`), each contrast-verified against its own background at ≥5:1 (margin rule, gotcha #121/#124). Reference implementation: `clients/_practice/rowan-winebar/index.html` (`--amber` / `--amber-lite`).
