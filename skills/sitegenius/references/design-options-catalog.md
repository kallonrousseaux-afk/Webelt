# Design Options Catalog — pick-list for client builds

Quick-reference menu of every technique in the bundle. ✅ = already coded in a starter template (transplantable). Tier: L = LocalSite, A = AwardsSite, B = both.

## Scroll & motion
| Option | Tier | Status |
|---|---|---|
| Staggered scroll reveals (GSAP ScrollTrigger) | B | ✅ both starters |
| Line-by-line hero headline reveal | B | ✅ awardssite |
| Intro/preloader brand reveal (word rises, curtain lifts) | A | ✅ awardssite |
| Parallax scroll (decorative layers at different speeds) | B | ✅ awardssite (orbs, quote mark, rings) |
| Pinned horizontal-scroll section (scrub) | A | ✅ awardssite (process) |
| Continuity element (orb/shape morphing across whole page) | A | ✅ awardssite (orbit) |
| Infinite marquee strip | B | ✅ awardssite |
| Count-up numbers on scroll | B | ✅ verified — easeOut counter confirmed reaching target (build-gotchas #42) |
| Clip-path wipe reveals (inset 100%→0) | B | ✅ verified — computed clip-path confirmed transitioning to full reveal (build-gotchas #42) |
| Variable-font weight driven by scroll | A | code in awwwards-research-2026 §2 |
| Scroll-snap storytelling (GSAP Observer state machine) | A | pattern in awwwards-research-2026 §3 |
| CSS view-timeline reveals (zero-JS) | L | pattern in functional/design refs |
| Smart-sticky header (hide down, reveal up) | B | ✅ awardssite |
| Scroll-scrubbed video/image sequence (frame = scroll position) | A | ✅ verified via pixel-checksum test (build-gotchas #22) |
| Full page transitions (Barba.js + GSAP, no reload) | A | ✅ verified via standalone 2-page test (build-gotchas #27) |
| Morphing/sliding menu overlay (full-screen nav takeover) | B | ✅ verified — clip-path toggle confirmed (build-gotchas #36) |
| Draggable horizontal gallery (pointer-drag, momentum) | B | ✅ verified — practice build 3 (`trattoria-awardssite/`) |
| SVG line-draw-on (stroke-dashoffset for logos/signatures) | B | already in awwwards-techniques §3 (SDF note) |
| Looping background video (hero or full-section) | B | ⚠️ JS pause/play + fallback logic verified (build-gotchas #43); the .webm/.mp4 ENCODING itself is unverifiable in this sandbox (no ffmpeg/video encoder available) — needs a real production test |

## Cursor & hover
| Option | Tier | Status |
|---|---|---|
| Custom cursor: dot + trailing labeled ring ("View"/"Book") | B | ✅ awardssite |
| mix-blend-mode difference cursor | B | ✅ verified in production (immigration-paralegal build, live cursor-ring tracking confirmed) |
| Magnetic buttons (pull toward cursor) | B | ✅ awardssite |
| 3D hover tilt on cards (≤12deg) | B | ✅ verified in production (multiple practice builds use this pattern) |
| Editorial list hover (row shifts, bg fills, arrow rotates) | B | ✅ awardssite (services) |
| Grayscale→color "paint" hover | B | ✅ verified — filter resolves correctly on hover state (build-gotchas #36) |
| Nav underline slide (scaleX origin swap) | B | ✅ awardssite |
| Cursor trail / particle emitter (canvas, sparse points following pointer) | A | ✅ verified — real mouse tracking confirmed (build-gotchas #37) |
| Spotlight cursor (circular reveal mask over hidden content) | A | ✅ verified — practice build 4 (`ironclad-roofing/`), build-gotchas #19 |
| Squiggly/displaced text on hover (SVG turbulence filter) | B | ✅ verified — visible displacement confirmed (build-gotchas #36) |

## WebGL / spectacle (desktop + motion-on only)
| Option | Tier | Status |
|---|---|---|
| fBm living aura shader (breathing, cursor-reactive, palette-graded) | A | ✅ awardssite + webelt.ca |
| Single-progress-uniform shader transitions (block reveal, displacement, chromatic aberration) | A | ✅ verified — block-reveal confirmed 0%→50%→100% via screenshots (build-gotchas #46) |
| Stencil-buffer scene masking / SDF logo morph | A | ✅ FIXED and verified — render-target composite approach, screenshot-confirmed clean mask (build-gotchas #49); recipe corrected in awwwards-techniques.md §3 |
| Instanced 3D objects (single draw call) | A | ✅ verified — 8 instances measured at exactly 1 draw call (build-gotchas #39) |
| three-mesh-bvh interactive raycasting | A | ✅ FIXED and verified — pin `three-mesh-bvh@0.5.24` (predates the BatchedMesh dependency) for compatibility with three@0.158.0; correct hit/miss + intersection point confirmed on a 1408-triangle mesh (build-gotchas #49) |
| Loaded 3D model viewer (GLB/GLTF, scroll- or drag-rotated) | A | ✅ verified against a real hand-authored GLB (build-gotchas #33) |
| 3D product configurator (swap materials/colors on a model) | A | ✅ verified — material.color.set() confirmed visually (build-gotchas #39) |
| Floating/orbiting 3D icon set (lightweight primitives, not modeled assets) | A | ✅ verified via render-loop + screenshot test (build-gotchas #28) |

## Layout & editorial
| Option | Tier | Status |
|---|---|---|
| Bento grid (anchor tile ≥2×) | B | ✅ localsite |
| Editorial numbered list layout (01/02 index rows) | B | ✅ awardssite |
| Oversized outlined display word (text-stroke) | B | ✅ awardssite (step numerals) |
| Giant italic serif accent words in headings | B | ✅ both |
| Full-viewport type-led hero | A | ✅ awardssite |
| Photo/device-mock hero (work shown in browser frame) | B | ✅ localsite + webelt.ca |
| Asymmetric 60/40 · 7/5 grids | B | premium-craft rules |
| Section background rhythm (dark→light→dark→cream) | B | ✅ awardssite |
| Horizontal → vertical collapse ≤900px | B | ✅ awardssite |

## Texture & depth
| Option | Tier | Status |
|---|---|---|
| Film grain overlay (SVG noise, 5–7%) | B | ✅ both starters |
| Layered tinted shadows (3–4 layers, never pure black) | B | ✅ localsite |
| 1px border + soft shadow card treatment | B | ✅ both |
| Glassmorphism header (backdrop blur) | B | ✅ awardssite |
| Gradient veil over hero media for text legibility | B | ✅ awardssite |
| Decorative concentric rings / orbs | B | ✅ awardssite |

## Forms & conversion furniture
| Option | Tier | Status |
|---|---|---|
| Lined editorial form (fields as rows, focus tint) | B | ✅ awardssite |
| Card form with focus ring glow | L | ✅ localsite |
| 3-field + honeypot + Supabase handler | B | ✅ both |
| Click-to-call sticky header · NAP footer · schema JSON-LD | B | ✅ both |
| Drip scroll-cue indicator | A | ✅ awardssite |

Pairing guidance: pick 1 spectacle item + 2–3 scroll/hover items + the texture stack per build. Everything obeys the standing guards (reduced-motion, ≤900px, transform/opacity only). When Kallon asks for options on a build, present choices from this catalog via AskUserQuestion.

---

## New recipes (not yet in a starter — copy-paste, then wire into the build)

All obey standing guards: desktop `(hover:hover)` + `prefers-reduced-motion:no-preference` + ≤900px off unless noted.

### Scroll-scrubbed image sequence
**Kallon declined this as a centerpiece for the immigration/paralegal build ("that square is gross, don't use that again")** — a square canvas rendering a document/stamp sequence. The recipe itself is still verified and fine for genuinely product-shaped content (rotation views, before/after), but don't default to a square canvas as a centerpiece for editorial/trust-first registers going forward — try a different technique (pinned panel stack, line-draw, etc.) unless a client specifically wants a rotating-object view.

Pre-render N frames (e.g. product rotation, a process unfolding) as a sprite sequence; draw the frame matching scroll progress to a canvas.
```js
const frames = 90, imgs = []; for (let i=0;i<frames;i++){ const im=new Image(); im.src=`seq/${String(i).padStart(3,'0')}.webp`; imgs.push(im); }
const ctx = canvas.getContext('2d');
ScrollTrigger.create({ trigger:'.seq-section', start:'top top', end:'bottom bottom', scrub:true,
  onUpdate: self => { const i = Math.min(frames-1, Math.floor(self.progress*frames)); ctx.clearRect(0,0,canvas.width,canvas.height); ctx.drawImage(imgs[i],0,0); } });
```
Cost: N images (use .webp, ~40-80KB each, lazy-load ahead of viewport). Best for product/process reveals, not decoration.

### Full page transitions (Barba.js + GSAP)
```js
barba.init({ transitions: [{
  leave({ current }) { return gsap.to(current.container, { opacity: 0, y: -20, duration: .4 }); },
  enter({ next }) { return gsap.from(next.container, { opacity: 0, y: 20, duration: .5 }); }
}]});
```
Multi-page HTML only; re-run all init scripts (cursor, reveals) on `barba:after` since the DOM swaps. Skip for single-page LocalSite builds — not worth the complexity under 3 pages.

### Morphing full-screen nav overlay
```css
.nav-overlay{position:fixed;inset:0;background:var(--bg);clip-path:circle(0% at 100% 0%);transition:clip-path .6s var(--ease);z-index:110}
.nav-overlay.open{clip-path:circle(150% at 100% 0%)}
```
Toggle `.open` on hamburger click; stagger-reveal the nav links inside with GSAP once open. Good mobile replacement for a plain dropdown on AwardsSite builds.

### Draggable horizontal gallery
```js
const track = document.querySelector('.drag-track');
let isDown=false, startX, scrollStart;
track.addEventListener('pointerdown', e => { isDown=true; startX=e.pageX; scrollStart=track.scrollLeft; track.setPointerCapture(e.pointerId); });
track.addEventListener('pointermove', e => { if(!isDown) return; track.scrollLeft = scrollStart - (e.pageX - startX); });
track.addEventListener('pointerup', () => isDown=false);
```
`.drag-track{overflow-x:auto;scroll-snap-type:x proximity;cursor:grab}` + `cursor:grabbing` on `:active`. Use for portfolio/gallery sections instead of the pinned-scroll pattern when you want user-driven pacing.

**Accessibility (required — found missing by a real axe-core scan, a genuine WCAG "serious" violation):** the scrollable container needs `tabindex="0" role="region" aria-label="…scroll horizontally"` in the markup, or keyboard users cannot reach or scroll it at all:
```html
<div class="drag-track" tabindex="0" role="region" aria-label="Gallery, scroll horizontally">…</div>
```

### Cursor trail / particle emitter
```js
const pts = []; const N = 14;
addEventListener('mousemove', e => { pts.unshift({x:e.clientX,y:e.clientY}); if(pts.length>N) pts.pop();
  pts.forEach((p,i) => { const dot = trailDots[i]; dot.style.transform = `translate(${p.x}px,${p.y}px)`; dot.style.opacity = 1-i/N; }); });
```
14 small fixed-position dots pre-created in DOM, updated per mousemove — cheap, no canvas needed for a subtle trail. Use sparingly; it reads as playful/creative-agency, wrong for legal/medical/trades clients.

### Spotlight cursor (reveal mask)
```css
.spotlight-section{position:relative}
.spotlight-mask{position:absolute;inset:0;background:var(--bg);mask:radial-gradient(160px at var(--mx) var(--my), transparent 60%, black 100%);pointer-events:none}
```
```js
section.addEventListener('mousemove', e => { const r=section.getBoundingClientRect();
  section.style.setProperty('--mx', e.clientX-r.left+'px'); section.style.setProperty('--my', e.clientY-r.top+'px'); });
```
Reveals hidden content/image under a circular cursor-following cutout — strong for "before/after" or "see the difference" sections.

### Squiggly hover text (SVG turbulence)
```html
<filter id="squiggle"><feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves="2" result="noise" seed="2"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="0"><animate attributeName="scale" values="0;6;0" dur="1.2s" begin="indefinite" fill="freeze" id="wig"/></feDisplacementMap></filter>
```
`style="filter:url(#squiggle)"` on the text element; trigger `document.getElementById('wig').beginElement()` on hover. Playful accent for a single hero word — never body text.

### Looping background video
Yes — very doable, and it's the #1 requested "trend" feature. Full recipe:
```html
<div class="video-hero">
  <video class="bg-video" autoplay muted loop playsinline preload="metadata" poster="hero-poster.webp">
    <source src="hero-loop.webm" type="video/webm">
    <source src="hero-loop.mp4" type="video/mp4">
  </video>
  <div class="video-veil" aria-hidden="true"></div>
  <div class="hero-content"><!-- headline, CTA — always OVER a veil, never raw --></div>
</div>
```
```css
.video-hero{position:relative;overflow:hidden}
.bg-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0}
.video-veil{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,.15) 40%,rgba(0,0,0,.55) 100%)}
.hero-content{position:relative;z-index:2}
@media(prefers-reduced-motion:reduce),(max-width:900px){.bg-video{display:none} .video-hero{background:url(hero-poster.webp) center/cover}}
```
```js
// Pause when offscreen — same discipline as the WebGL rule
const v = document.querySelector('.bg-video');
new IntersectionObserver(es => { v.paused ? null : (es[0].isIntersecting ? v.play() : v.pause()); }, {threshold:0}).observe(v.closest('.video-hero'));
// Respect data saver / slow connections
if (navigator.connection?.saveData || navigator.connection?.effectiveType?.includes('2g')) { v.remove(); }
```
Rules (non-negotiable, this is where background video usually goes wrong):
- `muted` + `playsinline` are mandatory or autoplay is blocked on mobile/Safari entirely.
- **Always static poster/image on mobile and reduced-motion** — never autoplay video on a phone (data cost + battery + most browsers won't autoplay unmuted anyway, and looping video is a known mobile-perf killer).
- **Always a veil/gradient behind the text** — raw video under a headline usually fails contrast in some frame even if it passes in others.
- Encode short (6–15s), silent, `.webm` primary + `.mp4` fallback, ≤3-4MB for a hero loop — compress hard (CRF 30-32, 1080p max, no audio track at all).
- Source footage: same rule as every other asset — real business footage (storefront, craft, product in motion) or Higgsfield-generated, never stock. Ask before generating, same as images.
- `preload="metadata"` not `auto` — don't force the whole file to download before first paint.
- Pause via IntersectionObserver when scrolled past — same battery/perf discipline as the WebGL canvas.

### Loaded 3D model viewer (GLB/GLTF)
Real 3D objects — a product, a mascot, an architectural piece — dropped into the page and rotated by scroll or drag. This is the single most-requested "3D" feature and is fully within reach.
```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
const draco = new DRACOLoader(); draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
const loader = new GLTFLoader(); loader.setDRACOLoader(draco);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, w/h, 0.1, 100); camera.position.set(0,0.4,4);
scene.add(new THREE.HemisphereLight(0xffffff,0x444444,1.2));
const key = new THREE.DirectionalLight(0xffffff,1.4); key.position.set(3,4,2); scene.add(key);

let model;
loader.load('model.glb', gltf => {
  model = gltf.scene;
  model.traverse(n => { if(n.isMesh){ n.castShadow=true; } });
  scene.add(model);
});

// Scroll-driven rotation
ScrollTrigger.create({ trigger:'.model-section', start:'top bottom', end:'bottom top', scrub:1,
  onUpdate: self => { if(model) model.rotation.y = self.progress * Math.PI * 2; } });

// OR drag-to-rotate (mutually exclusive with scroll-drive, pick one)
let dragging=false, lastX=0;
canvas.addEventListener('pointerdown', e => { dragging=true; lastX=e.clientX; });
addEventListener('pointermove', e => { if(dragging && model){ model.rotation.y += (e.clientX-lastX)*0.005; lastX=e.clientX; } });
addEventListener('pointerup', () => dragging=false);
```
Rules:
- **Compress with Draco or Meshopt** — an unoptimized GLB can be 20-50MB; compressed, the same model is often <2MB. Never ship an uncompressed export.
- Bake lighting where possible; keep live lights to 2-3 max (perf).
- Same guard set as every other WebGL feature: desktop + hover:hover + motion-on + pause offscreen (`IntersectionObserver`) + `if(!window.THREE) return` fallback to a static rendered image of the model.
- Mobile: swap to a pre-rendered image/video turntable of the same model — do NOT load Three.js + GLTFLoader + a multi-MB model on a phone connection.
- Getting the model: client-supplied CAD/product scan, a freelance 3D artist, or (for simple geometric brand marks) built directly in Three.js primitives — never claim a "3D scan" that's actually a stock asset.

### 3D product configurator
Same viewer as above, plus swappable materials:
```js
function setColor(hex) { model.traverse(n => { if(n.isMesh && n.name === 'Body') n.material.color.set(hex); }); }
// wire to swatch buttons: setColor('#B0492A')
```
Only worth building when the client actually sells a configurable physical product (furniture, vehicles, custom goods) — it's a $12k+ AwardsSite feature, not a default.

### Floating/orbiting 3D icon set (no modeled assets needed)
Cheaper 3D touch using only Three.js primitives — no model files, no artist needed. Good middle ground for AwardsSite builds without a product to show.
```js
const geo = new THREE.IcosahedronGeometry(0.6, 0);
const mat = new THREE.MeshStandardMaterial({ color: 0xC9A96A, roughness: .3, metalness: .6 });
const shapes = [0,1,2].map(i => { const m = new THREE.Mesh(geo, mat); m.position.set((i-1)*2.2, Math.sin(i)*0.6, 0); scene.add(m); return m; });
function loop(t){ requestAnimationFrame(loop); shapes.forEach((s,i)=>{ s.rotation.x = t*0.0002*(i+1); s.rotation.y = t*0.00015*(i+1); s.position.y += Math.sin(t*0.001+i)*0.002; }); renderer.render(scene,camera); }
```
Reads as premium/technical (good for tech-ish or "AwardsSite default" clients), not appropriate for warm local-business builds — pair with the techno-futurist aesthetic camp, not editorial.

## Sound, loading & vector motion (Sites of the Year staples — genuine gaps)

| Option | Tier | Status |
|---|---|---|
| Percentage-counter preloader (branded, real asset progress) | A | ✅ verified — real image files, correct 33/67/100% sequence (build-gotchas #37) |
| Rive interactive vector animation (icons, mascots, state machines) | B | new — see recipe below |
| Lottie vector animation (After Effects export, lightweight) | B | ✅ verified against hand-authored Lottie JSON (build-gotchas #38) |
| Ambient/spatial sound design (directional hover/interaction audio) | A | ✅ verified — AudioContext resume + StereoPannerNode confirmed against a real WAV + real gesture (build-gotchas #50), use sparingly |
| UI micro-sound (click/hover blips) | A | ✅ verified against a real WAV + real user-gesture click (build-gotchas #34) |
| Custom animated 404 page | B | pattern reuses already-verified components — no separate test needed |

### Percentage-counter preloader
Real progress, not a fake spinner — count actual asset bytes loaded, not a timer.
```js
let loaded = 0; const assets = [...document.images, ...document.querySelectorAll('video')];
const total = assets.length || 1;
const tick = () => { loaded++; document.getElementById('pct').textContent = Math.round(loaded/total*100) + '%';
  if (loaded >= total) gsap.to('.preloader', { yPercent:-100, duration:.8, ease:'power4.inOut', onComplete:()=>document.body.classList.remove('lock') }); };
assets.forEach(a => a.complete ? tick() : a.addEventListener('load', tick, {once:true}));
```
Pair with the existing `.intro` word-reveal pattern in the AwardsSite starter — percentage counter for image-heavy/3D-heavy builds, word-reveal for lighter ones. Never block longer than ~2.5s of perceived wait; if real load time exceeds that, the intro animation itself should carry the time (don't just freeze on 94%).

### Rive (interactive vector, state-machine driven)
Best for a logo mark, mascot, or icon that needs to *react* (hover, click, scroll state) rather than just play once. Export from Rive editor as `.riv`, then:
```html
<script src="https://unpkg.com/@rive-app/canvas@latest"></script>
<canvas id="rive-canvas" width="400" height="400"></canvas>
<script>
  const r = new rive.Rive({ src:'mark.riv', canvas:document.getElementById('rive-canvas'), autoplay:true,
    stateMachines:'State Machine 1',
    onLoad: () => { const inputs = r.stateMachineInputs('State Machine 1');
      const hoverInput = inputs.find(i=>i.name==='hover');
      document.getElementById('rive-canvas').addEventListener('mouseenter', ()=> hoverInput.value = true);
      document.getElementById('rive-canvas').addEventListener('mouseleave', ()=> hoverInput.value = false); } });
</script>
```
Requires an artist/designer to build the `.riv` file in the Rive editor — same sourcing reality as a 3D model. Worth it for a client's animated logo mark; not a DIY-from-code feature.

### Lottie (After Effects → JSON vector animation)
Cheaper than Rive, no interactivity/state machine, just plays — good for onboarding illustrations, icon reveals, success-state animations.
```html
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<lottie-player src="success.json" autoplay loop speed="1" style="width:120px"></lottie-player>
```
Source `.json` files from LottieFiles marketplace (free/licensed) or a designer's After Effects export — never claim a marketplace Lottie as custom-made for the client.

### Ambient/spatial sound design
Bruno Simon-style directional audio (birds, ambient loops, positional interaction sounds) is real and effective, but it's a rare, high-craft feature — reserve for AwardsSite portfolios/experiences, essentially never for local-business or professional-services clients (a lawyer's site making noise is a liability, not a delight).
```js
const ctx = new (window.AudioContext||window.webkitAudioContext)();
const panner = new StereoPannerNode(ctx, { pan: 0 });
fetch('ambient-loop.mp3').then(r=>r.arrayBuffer()).then(b=>ctx.decodeAudioData(b)).then(buf=>{
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true; src.connect(panner).connect(ctx.destination);
  // must start on user gesture — browsers block autoplay audio
  document.body.addEventListener('click', ()=>{ ctx.resume(); src.start(0); }, {once:true});
});
```
Rules: NEVER autoplay audio (blocked by every browser anyway, and rude even where allowed); always an explicit, visible mute/unmute toggle, default OFF; pan/volume tied to cursor position or scroll section for the "spatial" effect.

### UI micro-sound (hover/click blips)
Subtle click confirmation sounds on primary CTAs only — the restrained version of the above.
```js
const blip = new Audio('click.mp3'); blip.volume = .15;
document.querySelectorAll('.btn').forEach(b => b.addEventListener('click', () => { blip.currentTime=0; blip.play().catch(()=>{}); }));
```
Same rule: opt-in via a visible toggle, default off, never on by default for a client site — this is a "wow" feature for portfolio/agency/creative clients, not a default add.

### Custom animated 404 page
Reuses whatever is already in the build (continuity orb, aura shader, GSAP) rather than inventing new motion — cheap polish for AwardsSite builds.
```html
<!-- 404.html: same header/footer/tokens as the site, hero-style panel -->
<h1>Lost the trail.</h1>
<p>That page doesn't exist — but your consultation still does.</p>
<a class="btn magnetic" href="/">Back home</a>
```
Low effort, disproportionate "someone cared about this" signal — add to every AwardsSite build as a default, LocalSite as a nice-to-have.

## Sources (this round)
https://www.awwwards.com/annual-awards-2025/ · https://www.awwwards.com/websites/lottie/ · https://futurists.in/10-best-award-winning-websites-of-2026/ · https://htmlburger.com/blog/website-preloaders/ · https://www.awwwards.com/awwwards/collections/loading-page/
https://www.awwwards.com/websites/scrolling/ · https://muffingroup.com/blog/parallax-scrolling-websites/ · https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/ · https://blog.hubspot.com/website/animated-cursor · https://speckyboy.com/css-javascript-cursor-effects/
