# Awwwards / FWA Research — Round 2 (July 2026)

Follow-up to `awwwards-techniques.md` (7-studio breakdown). New techniques extracted from 2026 award-winner case studies, each rated for RNR use.

**Rating key**
- **Steal** = /10 how much this raises a site's score per hour spent
- **Fit** = which RNR tier it belongs in (LocalSite $350-band builds / AwardsSite $12k+ / Both)
- **Cost** = build effort

---

## 1. Single-Progress-Uniform Choreography — Steal 9/10 · Fit: AwardsSite · Cost: Low (if already using WebGL)

From "From Shader Uniforms to Clip-Path Wipes" (Codrops, May 2026). One 0→1 progress value lives in JS, tweened by a GSAP timeline with a custom ease, copied into a shader uniform each frame. The shader is stateless — GSAP owns the motion curve, so you can swap eases/timelines without touching GLSL.

```js
const state = { p: 0 };
gsap.to(state, { p: 1, duration: 1.2, ease: 'power3.inOut',
  onUpdate: () => { material.uniforms.uProgress.value = state.p; } });
```
Effects driven off that one uniform in the case study:
- **Block reveal mask**: pixelated UVs sampled against a static noise texture, `step(noise, uProgress)` → binary mask that grows block-by-block (no linear wipe).
- **Displacement**: second noise sample scrolled in time warps UVs; intensity follows a parabola peaking at 50% progress: `4.0 * p * (1.0 - p)`.
- **Chromatic aberration**: sample R and B channels with opposite offsets, same parabola.

This is the cleanest GSAP↔WebGL bridge pattern seen anywhere — adopt as the standard for our aura shader and any future transitions.

## 2. Parabola Easing for Transition Effects — Steal 9/10 · Fit: Both · Cost: Trivial

Same source. Any "distortion during movement" effect (blur, skew, chromatic offset, scale) should peak mid-transition and land clean: `intensity = 4 * p * (1 - p)`. Works in plain CSS/GSAP too — e.g. skew a card list by scroll velocity, ease back to 0. Instantly kills the "AI transition" feel of linear effects.

## 3. Scroll-Mode State Machine (GSAP Observer) — Steal 8/10 · Fit: AwardsSite · Cost: Medium

From "More Than a Portfolio" (Codrops, Apr 2026; three months' work). GSAP `Observer` unifies wheel/touch/pointer input; a state machine switches between free scroll and snap-block scroll depending on the scene. Sections that need to be *read* lock into place; connective tissue scrolls freely. Pattern:

```js
Observer.create({ type: 'wheel,touch,pointer',
  onDown: () => mode === 'snap' ? snapNext() : null,
  onUp:   () => mode === 'snap' ? snapPrev() : null,
  preventDefault: () => mode === 'snap' });
```
Note: RNR native-scroll rule stands — use this only for AwardsSite hero sequences, never site-wide scrolljacking. CSS `scroll-snap-type` covers the LocalSite version for free.

## 4. Texture Compression + Instancing as Score Insurance — Steal 8/10 · Fit: AwardsSite · Cost: Low

Same case study: KTX2/Basis Universal texture compression (decompresses directly on GPU) was "the difference between scenes that crawled on mid-range hardware and ones that ran smoothly"; GPU instancing collapsed repeated meshes into single draw calls. Awwwards usability = 30% of score — perf IS the score. For us: `KTX2Loader` + `InstancedMesh` whenever an AwardsSite has 3D assets; keep using .webp + instancing already covered in awwwards-techniques.md §7.

## 5. Sketch-to-Color Hover Painting — Steal 7/10 · Fit: Both (CSS version) · Cost: Low–Medium

From "Sketching the Impossible" (Codrops, Jun 2026; FWA of the Day, source on GitHub). Every clickable element starts as a black-and-white sketch and "paints" with color on hover via a custom shader. No 3D models at all — flat planes + hand-drawn textures. Two takeaways:
- **CSS-only version for LocalSite**: grayscale→color is a strong, cheap affordance: `filter: grayscale(1) → grayscale(0)` with a clip-path or mask sweep. Signals "clickable" without a tooltip.
- **Proof that award-level 3D ≠ modeling skill**: primitives + strong art direction beat mediocre models. Fits our no-Blender reality.

## 6. Themed Navigation Metaphor — Steal 7/10 · Fit: AwardsSite · Cost: High (concept, not code)

From San Rita's topographic site (Codrops, Mar 2026): the whole site is a top-down 3D vintage-map you drag to explore; the projects page is an infinite scroll styled as a trekking journey; scroll acts as "a camera lens traversing a landscape." The reusable idea: pick ONE metaphor from the client's world and make navigation itself express it (restaurant = table service flow, trades = job-site walkthrough). This is the concept-level version of the OFF+BRAND continuity element.

## 7. Native-First Motion Stack — Steal 8/10 · Fit: Both · Cost: Trivial

From the Adrien Vanderpotte interview (Codrops, May 2026): CSS for performance-first transitions, GSAP only for complex choreography, Three.js/OGL only for shaders. Also: he "sounds out" animations (whoosh/snap) before coding — punchy in-out timing, not uniform ease. Validates the RNR stack exactly; the addition is **CSS `view-timeline`** (now in stable browsers) for simple scroll reveals with zero JS — worth adopting for LocalSite reveals.

## 8. OGL as Three.js Alternative — Steal 5/10 · Fit: AwardsSite · Cost: Medium (new lib)

Adrián Gubrica (OFF+BRAND) now ships commercial work on **ogl.js** — much smaller bundle than Three.js, strong with multiple render targets. Watch-list, not adopt-now: our fBm aura is fine on pinned three@0.158.0. Revisit if a build only needs a fullscreen shader quad (OGL would cut ~120KB).

## 9. Video Texture Pooling — Steal 6/10 · Fit: AwardsSite · Cost: Low

From the shader-uniforms case study: in a video carousel, only the two textures involved in a transition get `needsUpdate = true`; all others fall back to native playback. General rule: never update GPU resources that aren't on screen — same family as our pause-offscreen rule.

## 10. Reduced-Motion as Parallel Design — Steal 8/10 · Fit: Both · Cost: Low

Multiple 2026 winners treat `prefers-reduced-motion` as a *designed alternate experience* (static compositions with strong type/layout), not a stripped fallback. Judges check this. For us: when killing WebGL/motion, substitute a deliberate static hero (big Fraunces headline + image crop), don't just hide things.

---

## Trend notes (2026)

- **Scroll storytelling dominates** — scroll position as narrative timeline is the defining award pattern; typography moving from legibility to storytelling (oversized, layered, kinetic).
- **CSS `view-timeline` / scroll-driven animations API is stable** — simple reveals no longer need GSAP. Use for LocalSite; keep GSAP for choreography.
- **WebGPU is emerging** on winners for compute-heavy scenes; Three.js remains dominant. No action for RNR yet — our tier doesn't need it.
- **Lenis still everywhere** in the community (incl. GSAP+Lenis infinite-scroll tutorials) — RNR rule unchanged: native scroll only.
- **Awwwards scoring reminder**: Design 40%, Usability 30%, Creativity 20%, Content 10%. Perf and a11y failures cost more than a missing wow-effect.

## Adoption order for RNR

1. Parabola easing (§2) + native-first stack w/ view-timeline (§7) — into every build now.
2. Reduced-motion parallel design (§10) — QA checklist item.
3. Grayscale→color hover painting, CSS version (§5) — LocalSite interaction library.
4. Single-progress-uniform pattern (§1) + video pooling (§9) — refactor standard for AwardsSite shaders.
5. Scroll-mode state machine (§3) + KTX2/instancing (§4) — next AwardsSite with 3D.
6. Themed navigation metaphor (§6) — pitch tool for $12k+ clients.

## Sources

- https://tympanus.net/codrops/2026/05/06/from-shader-uniforms-to-clip-path-wipes-how-gsap-drives-my-portfolio/
- https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/
- https://tympanus.net/codrops/2026/06/11/sketching-the-impossible-a-3d-portfolio-built-without-a-single-3d-model/
- https://tympanus.net/codrops/2026/03/24/digital-craft-wild-soul-building-san-ritas-topographic-web-experience/
- https://tympanus.net/codrops/2026/05/27/whooshes-snaps-and-shaders-adrien-vanderpotte-and-the-feeling-of-the-interface/
- https://tympanus.net/codrops/2025/12/05/from-illusions-to-optimization-the-creative-webgl-worlds-of-adrian-gubrica/
- https://www.awwwards.com/websites/sites_of_the_year/ · https://www.utsubo.com/blog/award-winning-website-design-guide
- https://svilenkovic.com/3d/scrollytelling-trends-2026 · https://www.figma.com/resource-library/web-design-trends/
