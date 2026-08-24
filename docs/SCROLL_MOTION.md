# Home scroll motion — rules and budget

Status: adopted 2026-08-24. Applies to `LandingMotus` home and any tenant that
inherits the pinned-section pattern.

The home page drives four scroll-linked sections: the hero morph, the answer
reveal, the definition coda, and the layer sequence. Pinned sections are the
most fragile pattern on the page — they take control of the viewport away from
the reader — so they get explicit rules rather than per-component judgement.

## 1. Pin geometry (non-negotiable)

A pinned element must be **exactly** as tall as the space under the site header:

- `--pin-stage: calc(100svh - var(--pin-top))` in `app/globals.css`
- `SCROLL_PIN_OFFSET` / `SCROLL_PIN_TOP` in `lib/scroll-trigger.ts`

Both must describe the same offset (72px). Two failure modes, both of which
readers describe as "the sections are on top of each other":

| Mistake | Symptom |
|---|---|
| Pinned element **shorter** than the stage | A strip of the neighbouring section, or of the empty pin-spacer, stays on screen for the whole pin — reads as dead space |
| Pinned element **taller** than the stage | The bottom of the section hangs below the fold and is never readable |
| Trigger element **taller** than the pinned child | The pin parks partway down the viewport (we shipped this: the definition coda pinned at y=178) |

If a section has a header that should stay visible during the pin, put the
header *inside* the pinned element and pin the whole section — do not pin an
inner stage and leave the header above it.

The pinned node must also carry its own **opaque background**. Section wrappers
keep their fill in the pin-spacer; the fixed element does not inherit it. Without
a fill on the pinned node, later sections (e.g. the layer sequence) scroll up
*through* the coda and read as “the next beat popped early.”

Verify with `node scripts/diagnose-scroll.mjs` against `npm run dev`. Every
stage must report `[72..<viewport height>]`.

## 2. Scroll budget

Distances live in `lib/scroll-budget.ts`, not in components, so the total stays
visible in one place. Two limits:

- Total pinned spend under ~7 viewports
- The primary CTA (tri-path, `#explora`) reachable within ~6 viewports

Current spend: hero 0.8 + answer 1.6 + definition 1.8 + sequence 2.2 ≈ 6.4.

## 3. Motion must not re-render React

Scroll-linked values stay in motion values or GSAP. Never write scroll progress
into React state: `ScrollMorphHero` used to push three `setState` calls per
frame, re-rendering nineteen spring-animated cards on every scroll event.
Transforms come off `useTransform` and are applied via `style`.

## 4. Resting opacity by beat

- **Answer reveal** (`RESTING_OPACITY = 0`): words stay unreadable until scroll
  scrub lights them. Intentional — the beat is a reveal, not a pre-lit paragraph.
- **Definition coda** (`INACTIVE_OPACITY`): inactive nouns stay dim so the list
  structure is visible while focus cycles.
- **Sequence keyhole**: opens over the first tenth of its pin and stays open.
  Closing it at the end left a masked, mostly-empty frame on screen while the
  section scrolled away.

## 5. Refresh discipline

- One import site for the plugin: `lib/scroll-trigger.ts` re-exports `ScrollTrigger`
- `ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })`
- Refresh through `scheduleScrollTriggerRefresh()` (debounced); note that GSAP's
  `refresh(true)` itself defers via a 0.2s `delayedCall`, so callers must not
  fire it in a loop
- Resize handling goes through `onViewportWidthChange` — height-only resizes are
  the mobile URL bar, and re-measuring three pins on each one fights the scroll
- **Refresh order** via `refreshPriority`: answer (30) → definition (20) →
  sequence (10). Downstream pins must measure *after* upstream pin-spacers exist.
  If sequence measures first, its start lands too early — it scrubs during the
  coda / tri-path, then jumps to the real range with a broken mid-timeline state.
- Sequence must not `render()` on every refresh while inactive; reset to resting
  when `progress === 0` and not active. Do not re-refresh on every image decode.

## 6. Below-the-fold media

Sequence frames are `loading="lazy"` and their warm-up preload is gated behind
an `IntersectionObserver` at `rootMargin: 100%`. Eight full-size remote frames
must not compete with the hero on first paint.
