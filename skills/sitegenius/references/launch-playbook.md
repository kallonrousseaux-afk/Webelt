# Launch Playbook — from approved build to live client site

**Why this exists**: the skill's builds have historically ended as files in git — nothing has ever gone live from this environment, and the last mile is where a $350 or $12k engagement succeeds or fails in the client's eyes. This playbook splits launch into what **Claude pre-stages** (everything automatable in the sandbox) and what **Kallon executes** (the steps that need real accounts/network).

**Environment facts (verified, don't re-test)**:
- This sandbox cannot deploy anywhere: Hostinger is unreachable, generated-asset CDNs are egress-blocked (gotcha #100), and Higgsfield's `create_website` returns 422 on this account — and is a React/Cloudflare app platform anyway, NOT a static-file host, so it's the wrong target for RNR's static client sites even if it worked (gotcha #127).
- RNR's real hosting is **Hostinger** (static upload / hPanel), per HANDOFF.md. Forms are **Supabase** (live pattern already proven on webelt.ca).
- **Artifacts** can give Kallon a real preview URL, but their CSP blocks ALL external hosts — a build previewed this way needs GSAP inlined, fonts subset+inlined, and images as data URIs. Use only when a browsable link matters more than fidelity; the primary preview channel stays SendUserFile.

## Part 1 — Claude pre-stages (every real client build, before handoff)

Produce a **deploy package**: a folder/zip containing exactly what gets uploaded, verified in this order:

1. **`index.html`** (+ any real additional pages) — final QA'd build.
2. **Meta/social layer** (in the HTML head — the starters already carry the slots; verify every one is filled, no `{{PLACEHOLDER}}`/`TODO-DOMAIN` left):
   - `<title>` + meta description (real, ≤155 chars)
   - Canonical URL with the real domain
   - OG: title/description/type/image + twitter card equivalents. **og:image must be a real 1200×630 file in the package** — generate it (Higgsfield still, or a styled screenshot of the hero at 1200×630) at build time; a dead og:image link renders as a blank card in every text message the client sends about their own site.
   - Favicon: inline SVG data-URI minimum (starters have one — recolor to client tokens); add `apple-touch-icon` 180×180 PNG for real clients.
3. **`404.html`** — on-brand (tokens + display font + "back home" link). Hostinger serves `404.html` from root automatically.
4. **`robots.txt` + `sitemap.xml`** — real domain swapped in, one `<url>` per real page.
5. **Generated assets re-hosted**: every Higgsfield CDN URL in the HTML must be replaced with a relative path to a file IN the package. Claude cannot download these (egress block) — so the package ships with a `ASSETS-TODO.md` listing each CDN URL → target filename, and the HTML pre-edited to the relative paths, so Kallon's only job is "download these N files into this folder." Never ship a client site pointing at a generation CDN (link rot + no cache control + zero SLA).
6. **Form wired to the real endpoint**: Supabase URL + anon key for the client's project (webelt.ca pattern: POST `/rest/v1/leads`, honeypot, RLS insert-only policy). If the client project doesn't exist yet, the form stays in demo mode and the handoff kit says so explicitly.
7. **Analytics** (if sold): plausible/GA snippet slot filled; otherwise omit — no placeholder scripts.
8. **Performance pass on the package**: images `.webp` ≤120KB hero / ≤60KB cards, `loading="lazy"` below fold, `fetchpriority="high"` on hero, fonts `display=swap`, video `preload="metadata"` + poster frame.
9. **Run the staging rig on the package** (`skills/sitegenius/staging-rig/` — see its README): serves the package Hostinger-style and runs the Part-2 verification list as automated checks, including JS-disabled readability, slow-CDN resilience, branded-404 behavior, share-card audit, and a form success-path rehearsal against a mock Supabase. All checks green (or each failure explained as a declared TODO) before the package ships.
10. **Zip it** and deliver via SendUserFile alongside the handoff kit.

## Part 2 — Kallon executes (the 15-minute go-live)

1. Download any `ASSETS-TODO.md` files into the package folder; delete the file.
2. hPanel → File Manager (or FTP) → upload package contents to `public_html/` (or the domain's subfolder).
3. Point the domain / confirm DNS; enable the free SSL cert in hPanel; force HTTPS redirect.
4. **Verify live, in this order** (each is a 30-second check):
   - Site loads over `https://` with no mixed-content warnings (padlock intact — a stray `http://` asset kills it)
   - Fonts render (not fallback serif), video hero plays, all images load
   - Submit the form for real → row appears in Supabase → (if wired) notification email arrives
   - Paste the URL into a WhatsApp/iMessage/Slack draft → the OG card shows image + title
   - Visit a garbage URL → branded 404 appears
   - Phone check: real device, both orientations — not just DevTools
   - `https://domain/robots.txt` and `/sitemap.xml` resolve
5. Google Search Console: add property, submit sitemap. Google Business Profile: set the website URL.
6. Send the client the live link + the handoff kit (`references/handoff-kit.md` output).

## Part 3 — After launch

- Add the site to the maintenance list if they bought the $19/mo plan; note renewal dates (domain, SSL auto-renews with Hostinger).
- Log any NEW launch-stage failure in `build-gotchas.md` — this playbook only carries paid-for lessons from the sandbox side; the live side's gotchas ledger starts with Kallon's first real launch. Bring back anything that broke and it gets folded in here.
