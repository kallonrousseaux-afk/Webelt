# Build Gotchas — bugs already paid for. Do not repay them.

Every one of these happened during a real build in this repo. Check this list before debugging.

## Animation / GSAP
1. **CSS reveal classes race GSAP `from()`** — if `.rv{opacity:0;transition:…}` is transitioning to visible when `gsap.from(...,{opacity:0})` starts, GSAP captures the mid-transition value (~0) as the END value and animates 0→0: elements stay invisible with zero errors. Fix (already in the starter): GSAP path adds `html.gsap` class; CSS `html.gsap .rv{opacity:1;transform:none;transition:none}` so GSAP owns a stable end-state. Never mix CSS transitions and GSAP tweens on the same properties.
2. **Hero line reveals need `white-space:nowrap`** on each `.ln` at desktop (normal wrap ≤900px). Without it, long lines wrap inside the overflow-hidden span, breaking the line reveal and pushing content below the fold.
3. **Pinned horizontal sections look like a giant empty block in full-page screenshots** — that's the pin runway (scroll distance), not a bug. Verify pinning live/section-by-section, not via fullPage capture.
4. **Reveal elements below the fold stay opacity:0 in screenshots** unless you scroll the page first. QA harness must walk the page (`scrollTo` in steps) before fullPage capture.

## WebGL
5. **`three.min.js` deprecated at r160+** — pin `three@0.158.0`.
6. **The full guard set** (all of it, every time): `prefers-reduced-motion` + `(hover:hover)` + `innerWidth>900` + `if(!window.THREE) return` + try/catch on renderer + DPR ≤1.5 + IntersectionObserver pause offscreen.
7. **WebGL rAF can stall screenshot tools** — capture on a fresh page load; if captures hang, screenshot section-by-section.

## Sandbox / QA environment (Claude Code cloud)
8. **CDN (jsdelivr) is BLOCKED in the sandbox browser; Google Fonts is not.** The site will silently run its no-GSAP fallback and look static. For QA: `npm install playwright three@0.158.0 gsap@3` in the scratchpad, sed the CDN URLs to `node_modules/...` in a `test-live.html` COPY (never in the real file), and test that. `npm install X --no-save` can prune other packages — install everything in one command.
9. **Playwright**: launch with `executablePath:'/opt/pw-browsers/chromium'`; do not run `playwright install`.
10. **Screenshots hide motion** — the user cannot judge an animated build from stills. Always send the actual HTML file (SendUserFile, display:render) as the preview, screenshots as backup only.

## Contrast (recurring failure)
11. **Gold/brass accents fail AA on light backgrounds** (~3.6:1) and mid-gold fails on navy (~3.9:1). Keep TWO accent tones per palette: bright (`--brass` #C9A96A-class) for dark bg text, dark (`--brass-text` #7A5E2E-class) for light bg text. Verify with:
```python
def lum(h):
    r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    f=lambda c: c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
def cr(a,b):
    l1,l2=sorted([lum(a),lum(b)],reverse=True); return (l1+0.05)/(l2+0.05)
# cr('7A5E2E','F5F1E8') must be >= 4.5 for text, >= 3.0 for large text/UI
```

## QA harness (run exactly this before "done")
```js
// scratchpad: node, playwright installed, test-live.html = copy with local libs
const { chromium } = require('playwright');
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
// 1440x900: wait 5s (intro), screenshot; walk page in 700px steps; fullPage shot
// 375x812: same; then assert:
//   document.documentElement.scrollWidth === 375
//   document.getElementById('gl')?.classList.contains('on')  (desktop run)
//   zero pageerror events
// THEN OPEN AND LOOK AT EVERY SCREENSHOT before reporting done.
```

## Process
12. **User-declared decisions are final** — don't re-offer what was declined, don't keep flagging "pending" items on finished work.
13. **Facts are never invented** — no fake reviews/hours/credentials/stats; visible `TODO:` markers instead.
14. **Preview = the deliverable**: send the HTML file itself, mobile screenshots when asked from a phone.

## Grid overflow (found in practice build #1)
15. **Grid items overflow their track at mobile widths even with `img{width:100%}` in CSS** — a grid item's default `min-width:auto` means the browser considers the child's intrinsic/attribute size (e.g. `<img width="720">`) as a floor before percentage widths apply, blowing the whole row out past the viewport. Symptom: `scrollWidth` far exceeds the viewport at 375px even though every element "looks" responsive in the code. Fix: `.hero-grid>*,.contact-grid>*{min-width:0}` (or `min-width:0` on any grid/flex child holding a sized image). Now baked into `templates/localsite-starter/index.html` — check any OLDER copy of that file for this fix before reusing it.

## Practice build 3 findings (AwardsSite, warm-local swap)
16. **Swapping the pinned-horizontal-scroll section for a different centerpiece leaves a dangling ScrollTrigger reference** — the starter's JS has a `const track = document.querySelector('.htrack')` block wired specifically to the pinned process section. If you swap that section out (e.g. for a draggable gallery per the warm-local default), you MUST also remove/replace that JS block — it silently does nothing at runtime (querySelector returns null, then `track.scrollWidth` would throw) rather than erroring at write time. Regex/search-replace on markup alone is not enough; always grep the file afterward for the old section's class names (e.g. `.htrack`, `.hproc`) across BOTH the CSS and the `<script>` block before calling a centerpiece swap done.
17. **Bulk find-replace copy passes need a post-pass grep for leftover source-business strings** (e.g. old business name in CTA buttons, footer taglines) — string literals get reused in multiple spots (nav CTA vs footer CTA vs contact-section CTA) and a targeted replace can miss siblings with slightly different surrounding HTML. Always `grep -c` the old business name / old CTA text after the substitution pass, before QA screenshots.

## Practice build 4 findings (craft/impact register)
18. **Not every display font has an italic cut** — Archivo Expanded (used for trades/craft-impact register) has no italic variant. The starter templates lean on `font-style:italic` for accent words throughout. When swapping to a font family without italics, swap those rules to `font-style:normal;font-weight:800` (extra-bold) instead — bold-weight accents read even better in a bold/craft register than italic would have. Check the font's available styles before locking tokens in the style-tile phase, not after the copy pass.
19. **Spotlight-cursor before/after recipe (design-options-catalog) works cleanly as a centerpiece transplant** — graduated from documented recipe to verified in this build. Mobile fallback (static 50/50 clip-path split, no cursor tracking) confirmed working at 375px.

## Practice build 5 findings (spectacle-tolerant, scroll-scrubbed sequence)
20. **`scroll-behavior:smooth` (a standing project rule) breaks naive automated QA scrolling** — `window.scrollTo(x,y)` becomes an animated scroll under this CSS, not an instant jump. A test that calls `scrollTo` then checks state after a short fixed wait (e.g. 300-400ms) can sample MID-ANIMATION state and wrongly conclude a scroll-driven feature is broken. Fix: `document.documentElement.style.scrollBehavior='auto'` before any QA script does programmatic `scrollTo` checks, restore/ignore after (it's a throwaway test page). This bit the scroll-scrubbed-sequence verification in this build — the recipe was correct; the first test harness was not.
21. **Testing scroll-scrubbed/scrubbed canvas features: sample a pixel that actually changes, and use a full-canvas checksum, not a single fixed point.** A center-anchored decoration (e.g. a static marker circle) stays identical across every frame and gives a false "nothing changed" reading. Sum a strided sample across the full `getImageData` buffer instead of one coordinate.
22. **Scroll-scrubbed image sequence recipe (design-options-catalog) graduated to verified** — confirmed the pin-runway height, `ScrollTrigger scrub` progress mapping, and frame-draw logic all work correctly end-to-end (self-contained SVG data-URI frames used in place of real photography for this practice build; swap for real pre-rendered frames in production).

## Practice build 6 findings (menu-driven intake, LocalSite)
23. **Menu-driven intake confirmed working end-to-end** — AskUserQuestion flow (tier/vibe/palette/hero) plus the content-brief step, including a mid-flow user correction ("stop, redo it, let me pick") that discarded an already-QA-passed but wrongly-sourced build (a "you decide" build made when the user actually wanted the menu). Lesson: when a build is produced under the wrong intake path, don't try to salvage/relabel it — bin it and rerun the real path. Cheap to redo at this size; expensive to explain later why the "menu" build wasn't actually built from menu answers.
24. **Fonts with only one weight (e.g. Archivo Black, weight 400 only) need heading rules adjusted** — the starter's `h1,h2,h3{font-weight:600}` is a no-op/mismatch on single-weight display fonts. Same family of bug as gotcha #18 (italic-less fonts); check available weights AND styles before locking tokens, not after.
25. **Custom palettes built from scratch (not a preset) still need the contrast script run** — this build's volt-lime anchor cell used dark ink text, which happened to pass, but bright/vibrant custom palettes are the highest-risk category for accidental AA failures. Always run the gotchas contrast checker on every color pair introduced outside the documented presets.

## Retrospective fix pass (all 6 review findings acted on)
26. **Supabase RLS silently blocks every submission on a fresh table** — the #1 real-world reason these forms "just don't work" once deployed. Verified against a local mock server (success 201, RLS-block 401, honeypot no-op) — the JS logic itself has no bugs; the missing piece was documentation. Both starters now carry the required SQL directly above `SUPABASE_URL`:
```sql
alter table leads enable row level security;
create policy "anon insert leads" on leads for insert to anon with check (true);
```
Added `Prefer: return=minimal` to every fetch call across both starters and all delivered builds (cosmetic/efficiency, not a bug).
27. **Page transitions (Barba.js) recipe graduated to verified** — tested against a real 2-page setup (local npm install, CDN blocked in-sandbox): DOM swaps correctly on click, no reload, URL updates, zero errors.
28. **Floating 3D icon primitives recipe graduated to verified** — confirmed the render loop advances every frame and the scene renders correctly (screenshot-verified three lit icosahedrons); a same-pixel-sampling test gave a false negative because the sampled point sat between shapes — screenshot inspection is more reliable than single-pixel diffing for this class of recipe.
29. **WebKit/Safari hardening added to both starters** — `-webkit-backdrop-filter` prefix added alongside `backdrop-filter` (unprefixed alone silently no-ops on Safari); `min-height:100vh` declared before `100svh` as a cascade fallback for older WebKit; `color-mix()` header background given a solid `var(--surface)` fallback declared first. Verified these changes don't regress Chromium rendering (only browser engine actually testable in this sandbox).
30. **Genuine limitations that cannot be closed from this environment** — logged here rather than silently left open:
    - No real Safari/iOS device or WebKit browser engine is available in-sandbox (only Chromium via Playwright). The hardening in #29 is defensive/best-practice, not verified against real WebKit.
    - No build has been shown to an actual client or tested on a physical phone — every pass in this repo is automated (Playwright + contrast script + console errors). This is real signal but not the same as human/device judgment.
    - Sound design, Rive, and the loaded-GLB 3D model viewer recipes remain undemonstrated — each requires a real authored asset file (audio, `.riv`, `.glb`) that can't be meaningfully fabricated and verified; graduating them needs a real project that calls for one.
    - The practice queue (`clients/_practice/`) is kept as a permanent regression set (not deleted) — re-run its 6 builds after any future starter-template change to catch regressions early. See its README for how.
