# RNR Solutions — Session Handoff

Live site: https://webelt.ca/#top

## Who
Kallon Rousseaux — kallon.rousseaux@gmail.com
RNR Solutions — 2-person web agency, Winnipeg, MB. Goal: 500 websites in 6 months.
Sales: Apollo/Clay lead gen → cold call → Zoom close.

## Pricing
| Service | Price |
|---|---|
| Landing page | $150 (option only — never lead with it) |
| 3-page site | $350 (main sell / headline price) |
| Security audit | $300 (anchor/upsell) |
| Contact form / booking / mailing list | $125–$175 each |
| SEO | $75 |
| Maintenance | $19/mo or $149/yr |

Tools: Figma, Cursor, Supabase, Hostinger, Claude, Apollo (free plan — people search locked), Clay (enriches by domain/LinkedIn URL).

## User preferences (read first)
- Terse responses. No over-explaining. No trailing summaries.
- "Just do it for me" = fully autonomous.
- Very visual — judge quality in the browser, screenshot at 375px and 1280px before calling anything done.
- Production-quality only. SVG icons only, never emoji.
- Don't re-push things declined ("9.5 is good" — do NOT offer 10/10 again).
- Design first, always. No deploy/ops talk during design phase.

## Hard rules
1. **No mobile overlap** — zero tolerance at 375px. Test with `getBoundingClientRect()` on all absolute elements; hide/reflow decorative elements ≤900px. Ship blocker.
2. **Design-first sequencing** — perfect design before deploy/connector work.
3. **Image generation** — always ask first (AskUserQuestion: user specifies vs Claude chooses). Every image must explain the business or show craft. No laptop/desk stock clichés. The café-in-browser mock works because it reads as real client work.
4. **Adobe ↔ Higgsfield never cross** — Adobe rejects external CDN URLs. Finish inside the connector that made it: Higgsfield upscale/remove-bg by job_id; film grain via CSS `.grain` overlay (~7% opacity); palette via prompt at generation time. Adobe image tools only on Adobe-native assets.
5. **Native scroll only** — Lenis was tried and removed. `scroll-behavior: smooth` + `scroll-padding-top: 90px`. Ignore Lenis in SiteGenius SKILL.md for RNR builds.

## RNR landing page (webelt.ca)
Source on user's machine: `C:\Users\Owner\rnr-landing\` — `index.html` (AwardsSite 9.5/10, WebGL fBm aura), `index-localsite.html` (LocalSite 9/10), `hero-cafe.webp` (49KB, in use), `hero-cafe-2k.webp` (2K master, unused), `server.js` (port 4321). Deploy zip: `C:\Users\Owner\Desktop\rnr-site.zip` (Hostinger).

Palette: `--bg:#EFE9DE; --surface:#FAF6EF; --surface-2:#F1EADC; --ink:#1A150F; --accent:#B0492A; --accent-deep:#893821; --gold:#A8854C;`
Fonts: Fraunces (display) + Hanken Grotesk (body).
Three.js pinned: `cdn.jsdelivr.net/npm/three@0.158.0/build/three.min.js` (three.min.js deprecated r160+).
WebGL aura: fBm domain-warped, gold shimmer, vignette, cursor-reactive (`uMouse`), canvas `#gl`, aria-hidden, pointer-events none.

In the site: café hero in browser mock, count-up metrics, pricing ($350 headline), magnetic CTAs, custom difference-cursor, hover tilt, horizontal scroll process section (desktop only).

**Supabase form is LIVE** on webelt.ca (done 2026-07). POSTs to `/rest/v1/leads`, honeypot `_gotcha`. Note: the `index.html` in this repo predates that and still has placeholder credentials — it's a design/pattern reference, not the deployed file.

Design signed off 2026-06-24. Do not push 10/10 upgrades.

## SAAP Thai Curry (second project)
`C:\Users\Owner\saap-thai-curry` — Next.js 14 App Router, TS, Tailwind, Vercel Analytics. Founders: Layla McCurdy & Kallon Rousseaux. FoodFare Corydon, Winnipeg. saapthaicurry@gmail.com. Plant-based Thai Red Curry; email/in-person ordering only.
Colors: cream #F6F0E6 / red #C63B1E / green #173C2B / gold #D8A14B / charcoal #2D2D2D. Fonts: Playfair Display italic 700 + Inter.
Remaining: fix focus-ring contrast on green button (use `outline: 3px solid #FFF; outline-offset: 3px`), Vercel deploy (domain not registered), Resend API setup, confirm founders photo.

## SiteGenius skill (7-phase pipeline)
Local: `C:\Users\Owner\.claude\skills\sitegenius\`. Two modes: **LocalSite** (premium 9/10, GSAP, lean, $2.5k–$8k — default) and **AwardsSite** (immersive 9.5/10, + Three.js WebGL, $12k+). AwardsSite WebGL rules: desktop + hover:hover + motion-on only, off ≤900px and reduced-motion, DPR ≤1.5, pause offscreen, mask shader away from text, `if(!window.THREE) return` fallback.
Phases: 0 brief → 1 tokens/fonts (avoid Inter/Roboto; use Fraunces/Playfair/Syne/etc.) → 2 Figma → 3 AI assets (Higgsfield, ask first) → 4 motion (GSAP+SplitText+ScrollTrigger, transform/opacity only) → 5 luxury CSS (blend modes, clip-path reveals, tilt ≤12deg, horizontal scroll desktop-only) → 6 components (React only) → 7 QA/ship (375/768/1280/1920 screenshots, CWV green, zero console errors).
Awwwards techniques reference: `skills/sitegenius/references/awwwards-techniques.md` in this repo (copy to local skill dir).

## Known bugs / lessons
| Problem | Fix |
|---|---|
| three.min.js deprecated r160+ | Pin three@0.158.0 |
| Adobe rejects Higgsfield CDN URLs | Never cross connectors |
| WebGL rAF stalls screenshot tools | Fresh preview server before capture |
| Horizontal scroll breaks mobile | ≤900px CSS + JS guards |
| font_recommend errors | user_query ≤ 150 chars |

## Pending tasks (priority)
1. ~~Write awwwards-techniques.md~~ — done, in this repo.
2. ~~Supabase setup~~ — done, live on webelt.ca.
3. ~~RNR site edits~~ — none needed; site is up. This repo is reference material for future client sites.
4. SAAP contrast fix — green button focus ring.
5. SAAP deploy — after saapthaicurry.com registered.
