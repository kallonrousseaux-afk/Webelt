# Multi-page real-build test (Ironclad Roofing)

Extends `ironclad-roofing/` into a real 3-page site (home + 2 service pages, matching the trades page-structure recommendation in `seo-copy-playbook.md`), wired with real Barba.js SPA-style page transitions — the first time this session the recipe was tested inside an actual full site rather than a synthetic 2-page throwaway.

## What's verified here (not in the earlier synthetic Barba test)
- Full 4-step navigation flow (home → storm-damage → roof-replacement → back home): URL updates correctly, content swaps correctly, confirmed via Playwright's `load` event that **no real page reload occurs** — genuine SPA behavior
- Custom cursor **re-binds correctly on swapped content** — hover after a Barba transition grows the cursor ring with the correct per-page label
- `document.body.classList.remove('lock')` on `enter` so the intro doesn't replay on internal navigation (intended UX: intro plays once per session, not once per click)

## Bugs found and fixed during this build
1. **`home.html`'s own nav was never updated to link to the new service pages** — only the generated service-page templates had correct links. Real oversight, not a template defect; fixed directly.
2. **Shared script assumed every page has `#lead-form`** — the lean service pages intentionally don't duplicate the full contact form (they link to `home.html#contact` instead, the realistic pattern for multi-page trades sites). Fixed by guarding the form-wiring script with `if (form) { … }` rather than forcing every page to carry a redundant form.
3. **A false-positive contrast violation traced to a QA-script timing race**, not a real bug — the lean service pages' GSAP reveal timeline (missing several later-section targets like `.marquee-track`/`.quote`/`.cta` that don't exist on these simpler pages) took longer to settle than the standard 2200ms wait used elsewhere. Confirmed by direct DOM inspection (`opacity` briefly 0 mid-scan, correctly 1 once settled) and by re-scanning with a longer wait — 0 violations. See `build-gotchas.md` for the durable lesson on this pattern.

## QA result
All 3 pages, both viewports (375px/1280px): 0 overflow, 0 broken images, 0 axe-core violations, 0 console errors.

## Second pass: real browser back/forward through Barba (see build-gotchas #74-77)
A real Playwright `goBack()`/`goForward()` test — never run before — found and fixed 3 more real bugs:
1. **A committed file referenced `node_modules/@barba/core/...` as a live script `src`** (leftover from local test tooling, never reverted). Fixed to the CDN URL.
2. **`document.title` never updated on internal navigation** — Barba swaps `[data-barba="container"]`, not `<head>`. Fixed by extracting the title from `next.html` in the `enter` hook.
3. **`storm-damage-repair.html` and `roof-replacement.html` had fully duplicate `<title>`/description/canonical/OG/Twitter tags**, copy-pasted from `home.html` and never made page-specific. Fixed with unique metadata per page, sourced from each page's actual `<h1>`.

Re-verified: title correctly updates on click, reverts on Back, re-updates on Forward; `navCount` stays at 1 throughout every step (genuine SPA, no reload).
