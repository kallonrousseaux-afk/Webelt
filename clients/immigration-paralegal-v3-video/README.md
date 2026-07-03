# Immigration & Paralegal — v3 video-background variant

A duplicate of `clients/immigration-paralegal-v3/` — that build was left untouched per instruction. Same layout, palette, bento grid, and accordion. The only change: the WebGL 3D-primitives centerpiece was removed and replaced with a generated video hero background.

## The video
Generated via the Higgsfield connector (`kling3_0_turbo`, 5s, 1920×1080) after asking and getting explicit confirmation on concept and target build, per the standing "always ask before generating" rule (now also written into `SKILL.md` for 3D models specifically, and already existing for images).

Prompt: *"Abstract cinematic macro shot: soft warm light filtering through gently drifting sheer paper or fabric layers, slow graceful motion, subtle dust particles catching light, muted amber and deep charcoal tones, no people, no text, no logos, calm and dignified mood, seamless slow drift, shallow depth of field."* Cost: 10 credits.

**TODO before real launch**: the `<source>` tag currently hot-links Higgsfield's CDN URL. This sandbox's network egress policy blocks the CDN host (`d8j0ntlcm91z4.cloudfront.net`), so the file could not be downloaded and re-hosted locally from here — confirmed via the proxy's own diagnostic (`/root/.ccr/README.md`: 403 from the proxy means the destination isn't on the allowlist, not a bug to route around). Download the file from the CDN URL yourself and serve it from the real domain before shipping — a third-party generation CDN link is not a production-safe dependency (no guarantee of long-term availability).

## What changed from v3
- `<canvas id="gl3d">` (Three.js scene) → `<video id="heroVideo">` with a left-to-right opacity veil so hero copy stays readable over the footage.
- Three.js script tag removed (no longer needed).
- WebGL centerpiece IIFE replaced with a simple `IntersectionObserver` play/pause controller (video only plays when the hero is actually in view, matching the pause/play discipline already verified for background video in `build-gotchas.md` #44).
- Same guard set as everywhere else: `prefers-reduced-motion` and mobile (≤900px) both get the fully static veiled-paper hero with no video element loaded at all — never a frozen/broken video attempt.

## QA result
1440px and 375px: 0 overflow, 0 console errors, 0 axe-core violations. Verified the video element is present on desktop (motion-OK context) and cleanly removed from the DOM on mobile/reduced-motion. Because the video's own network fetch is blocked in this sandbox, its actual playback could only be confirmed to degrade gracefully (no broken layout, no console error) rather than screenshot-confirmed frame-by-frame — real playback needs to be checked in an actual browser session with real network access.

## TODOs before this could ship
Same as v1/v2/v3 (business facts, Supabase keys, domain) **plus** re-hosting the video file locally instead of hot-linking the generation CDN.
