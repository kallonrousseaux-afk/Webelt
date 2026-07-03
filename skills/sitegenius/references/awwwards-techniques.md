# Awwwards-Level Techniques — AwardsSite Mode Reference

Extracted from technical breakdowns of 7 top studios (Lusion, Active Theory, Abeto, OFF+BRAND, Locomotive, Resn, dogstudio). Use in AwardsSite builds only. All WebGL techniques obey the standard guards: desktop + `(hover:hover)` + motion-on only, hard-disabled ≤900px and under `prefers-reduced-motion`, DPR capped at 1.5, render loop paused offscreen, static CSS fallback if the lib fails.

---

## Cross-Studio Architecture (apply to every AwardsSite)

- **GSAP for all DOM animation** (scroll reveals, text, SVG). Three.js / custom WebGL for 3D — none of these studios use Spline.
- **Defer heavy assets** (3D models, videos) until just before they enter the viewport (`IntersectionObserver` with `rootMargin: '200px'`).
- **`prefers-reduced-motion` kills the entire WebGL layer** — not just tweens.
- **Strict design tokens before any code.** Every studio locks a token system first.

```js
const motionOK = matchMedia('(prefers-reduced-motion: no-preference)').matches;
const desktopGL = motionOK && matchMedia('(hover:hover)').matches && innerWidth > 900;
if (desktopGL && window.THREE) initGL(); // else: static CSS hero
```

---

## 1. Continuity Element (OFF+BRAND) — DOM/GSAP, no WebGL needed

One visual motif (geometric shape, color mass, or typographic element) persists and morphs across every section as the user scrolls. Cheapest technique here with the highest identity payoff — usable even in LocalSite.

```html
<div class="thread" aria-hidden="true"></div>
```
```css
.thread {
  position: fixed; top: 50%; left: 50%; z-index: 1;
  width: 120px; height: 120px; border-radius: 50%;
  background: var(--accent); pointer-events: none;
  will-change: transform, border-radius;
}
```
```js
// One timeline, scrubbed across the whole page. Morph per section.
gsap.timeline({
  scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 0.6 }
})
.to('.thread', { xPercent: -220, scale: 2.4, borderRadius: '18%' })   // section 2: becomes a panel
.to('.thread', { xPercent: 180, yPercent: -30, scale: 0.6 })          // section 3: shrinks to a bullet
.to('.thread', { xPercent: 0, scale: 5, opacity: 0.12 });             // footer: becomes a wash
```
Rules: only `transform`/`opacity`/`border-radius`; keep it behind text (`z-index` below content, above bg); hide at ≤900px if it ever overlaps text.

## 2. Variable Font Scroll Animation (Locomotive)

Drive a variable font's `wght` axis from scroll position — kinetic typography tied to scroll momentum.

```css
h1.kinetic { font-variation-settings: 'wght' 400; will-change: font-variation-settings; }
```
```js
// Requires a variable font (e.g. Fraunces supports wght + opsz + SOFT/WONK axes)
const el = document.querySelector('h1.kinetic');
let target = 400, current = 400;
addEventListener('scroll', () => {
  const p = Math.min(1, scrollY / innerHeight);
  target = 400 + p * 500; // 400 → 900
}, { passive: true });
(function tick() {
  current += (target - current) * 0.12; // lerp = momentum feel
  el.style.fontVariationSettings = `'wght' ${current.toFixed(1)}`;
  requestAnimationFrame(tick);
})();
```
Note: `font-variation-settings` re-rasterizes glyphs — apply to ONE hero headline, never body text. Skip under reduced motion.

## 3. Scene-Through-Cutout Masking (Resn-style) — render-target composite

Mask one 3D scene through a cutout shape from another; hidden pixels are discarded, not overdrawn.

**⚠️ correction (verified 2026-07):** the original version of this recipe interleaved raw `gl.stencilFunc`/`colorMask` calls between `renderer.render()` calls. Tested against a real build — it does not work with Three.js's high-level renderer: `THREE.WebGLRenderer` keeps its own internal GL state cache and doesn't know about state changes made via raw `gl.*` calls outside it, so a subsequent `render()` silently leaves stale `colorMask`/stencil state in effect (confirmed via `renderer.autoClear = false` and `renderer.state.reset()`, neither fixed it). **Use the render-target composite approach below instead** — verified working end-to-end (screenshot-confirmed: a blue scene cleanly masked inside a red scene, exact cutout shape, zero bleed).

```js
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);

// Render each layer to its own offscreen target — no shared GL state to fight over
const rtA = new THREE.WebGLRenderTarget(w, h);
renderer.setRenderTarget(rtA); renderer.render(sceneA, camera);   // e.g. the "outside" scene

const rtB = new THREE.WebGLRenderTarget(w, h);
renderer.setRenderTarget(rtB); renderer.render(sceneB, camera);   // e.g. the scene that bleeds through

const rtMask = new THREE.WebGLRenderTarget(w, h);
renderer.setRenderTarget(rtMask); renderer.render(maskScene, camera); // white cutout shape on black

// Final pass: one fullscreen quad, mix(A, B, mask) — no stencil buffer needed at all
renderer.setRenderTarget(null);
const composite = new THREE.ShaderMaterial({
  uniforms: { tA: {value: rtA.texture}, tB: {value: rtB.texture}, tMask: {value: rtMask.texture} },
  vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }`,
  fragmentShader: `varying vec2 vUv; uniform sampler2D tA,tB,tMask;
    void main(){ float m = texture2D(tMask, vUv).r; gl_FragColor = mix(texture2D(tA,vUv), texture2D(tB,vUv), m); }`
});
const compositeScene = new THREE.Scene();
compositeScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2), composite));
renderer.render(compositeScene, camera);
```
Resn pairs this with **SDF (signed distance field) textures** for logo morphing — an SDF stays crisp at any resolution and lets you animate the shape by shifting the alpha threshold in the mask's fragment shader: `smoothstep(0.5 - u_soft, 0.5 + u_soft, texture2D(u_sdf, vUv).a)`. Swap `rtMask`'s content for an SDF-rendered shape to get morphing for free — same composite pass, no other changes.

## 4. three-mesh-bvh (Abeto) — fast raycast/collision on complex meshes

BVH acceleration makes per-frame raycasting against dense meshes interactive. GitHub: `gkjohnson/three-mesh-bvh`.

```js
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

mesh.geometry.computeBoundsTree();          // once, after load
raycaster.firstHitOnly = true;              // big speedup for hover/pick
const hit = raycaster.intersectObject(mesh)[0]; // now cheap per frame
```
Abeto's asset path: Houdini → binary buffers + VDB volumes → decoded into Three.js `BufferGeometry` at load. The takeaway for us: precompute everything offline; runtime only decodes and renders.

## 5. Vertex Animation Textures — VATs (Lusion) — concept, not copy-paste

Pre-bake Houdini fluid/cloth/particle sims into PNG texture atlases (one row per frame, XYZ encoded in RGB). A vertex shader reads `texture2D(posTex, vec2(vertexId, uTime))` and reconstructs positions per frame — zero runtime physics, GPU-only, complex sims at 60fps on mid-range hardware. Requires Houdini (Labs "Vertex Animation Textures" ROP) to author; only reach for this when a client budget covers a Houdini pipeline.

## 6. Hydra-style Single-Scene Transitions (Active Theory)

No page reloads — every "page" is a canvas state change. During transitions, render scene A and scene B to separate render targets simultaneously (ping-pong), then blend at shader level:

```glsl
// fragment shader of a fullscreen quad
uniform sampler2D uSceneA, uSceneB;
uniform float uProgress; // 0→1, driven by GSAP
void main() {
  vec4 a = texture2D(uSceneA, vUv);
  vec4 b = texture2D(uSceneB, vUv + (1.0 - uProgress) * 0.05 * vec2(0.0, 1.0));
  gl_FragColor = mix(a, b, smoothstep(0.2, 0.8, uProgress));
}
```
For multi-page HTML we approximate with Barba.js + GSAP; full Hydra-style is single-page-app territory.

## 7. Single Draw Call Batching (dogstudio / AstroGL)

Batch multiple animated 3D characters into one draw call (merged geometry + per-instance attributes, or `InstancedMesh`) — 6–8 interactive characters with no perf hit. Practical Three.js version:

```js
const inst = new THREE.InstancedMesh(geometry, material, 8);
const m = new THREE.Matrix4();
for (let i = 0; i < 8; i++) { m.setPosition(i * 2 - 7, 0, 0); inst.setMatrixAt(i, m); }
scene.add(inst); // one draw call
// animate: update matrices + inst.instanceMatrix.needsUpdate = true
```

---

## Selection Guide

| Want | Reach for | Cost |
|---|---|---|
| Identity thread through the page | Continuity element (§1) | Free — DOM/GSAP |
| Kinetic hero type | Variable font scroll (§2) | Free — needs variable font |
| Scene-through-logo transition | Stencil masking (§3) | WebGL, moderate |
| Hover/pick on dense 3D | three-mesh-bvh (§4) | +1 lib |
| Baked fluid/cloth spectacle | VATs (§5) | Houdini pipeline — high |
| App-like page transitions | Hydra pattern (§6) / Barba.js | High / low |
| Many animated 3D objects | Instanced batching (§7) | WebGL, low |

Default order of adoption for RNR AwardsSites: §1 → §2 → §7 → §3. §5/§6 only with matching budget.
