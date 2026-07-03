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
