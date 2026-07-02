# LocalSite Starter Template

Production base for every $350-band build. Everything from the reference files is pre-wired:

- Fluid type scale (`clamp`, rem-based) · layered warm shadows · grain overlay · 60-30-10 token block
- Sticky shrink header with click-to-call · hero structured for the 10-second test (problem/trust/contact above the fold)
- Bento services grid (anchor ≥2×, collapses ≤900px) · proof quote · dark CTA band
- 3-field form + honeypot + Supabase handler (placeholder creds) with loading/success/error states
- NAP footer with RNR credit link · LocalBusiness JSON-LD · OG tags · skip link, focus-visible, reduced-motion, 16px inputs (no iOS zoom)

## Use
1. Copy `index.html`, replace every `{{PLACEHOLDER}}` (searchable), swap the `:root` token block to the client palette + fonts.
2. Pick schema `@type` (Restaurant / Electrician / HairSalon / …) and validate with Google Rich Results Test.
3. Write copy per `references/seo-copy-playbook.md`; images per `references/imagery-direction.md`.
4. Paste real Supabase URL + anon key.
5. QA: 375 / 768 / 1280 screenshots, `getBoundingClientRect()` overlap check at 375, contrast, zero console errors.

Motion beyond the built-in reveals (cursor, tilt, magnetic CTAs, SplitText) comes from the SiteGenius Phase 4/5 references — add only what the intake menu chose.
