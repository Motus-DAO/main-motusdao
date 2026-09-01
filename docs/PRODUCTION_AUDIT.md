# LandingMotus — production audit (CTO)

Status: **decision pending** · Date: 2026-08-31  
Sources: partner home feedback, ChatGPT complement, `STYLE_LOCK.md`, Motus Knowledge MCP (`brand`, `product`, `clinical-policy`), current `HomeView` / `messages.ts`.

This document structures partner feedback into **keep / change / later**, maps it onto the locked IA, and lists what is still missing before a production launch. It does **not** unlock `STYLE_LOCK.md`. IA copy and section order wait for explicit approval.

---

## Verdict

The site already does job A well: **people understand what MotusDAO is and feel the brand**.

It does not yet do job B well enough for conversion: **a visitor who arrived to do something knows where to go in the first 10 seconds**.

It is also **not legally or operationally production-complete** (privacy, crisis boundary, OG image, SSR of manifesto copy).

Do not strip the manifesto. Do not turn the home hero into a psychologist ad funnel. Add a **simple door layer** on top of the locked identity, then close production hygiene.

---

## Two jobs on one page (the real tension)

| Job | Status | Owner |
|-----|--------|--------|
| A. Understand MotusDAO | Strong | Protect. Protocol voice, three doors, living-network language. |
| B. Act in ~10 seconds | Weak | Improve. Surface Hub / Academia / Agents as jobs, earlier, and more than once. |

Partner + ChatGPT agree with STYLE_LOCK on identity. They disagree with the **order and density** of conceptual scroll before action.

Institutional fact (MCP `brand/motusdao-version-publica-gitbook.md`): MotusDAO is clinical, community, and technological infrastructure for living networks of care — not a marketplace. That line stays. The doors in front of it can get simpler.

---

## Partner feedback → decisions

### Keep (no debate)

- Warm, colorful first impression and Motus identity.
- ES / EN toggle.
- Morph / carousel personality (below-fold WebGL already locked).
- Conceptual depth: why care needs infrastructure around a session.
- Three doors as the conversion mechanic (Users → Hub, Professionals → Academia, Community/investors → Agents).
- Primary CTA remains **Explora el ecosistema**.

### Change — needs STYLE_LOCK unlock (IA §6 + copy only)

Visual lock stays. This is order, labels, and CTA repetition.

| Feedback | CTO recommendation | Risk if we ignore |
|----------|--------------------|-------------------|
| Repeat Hub / Academia in more places | Repeat **after Red viva** and keep final CTA. Hero already has Hub. Do not spray buttons on every paragraph. | Seekers bounce after reading “why” without a door. |
| Need-oriented nav: formación / teleterapia / bienestar | Relabel tri-path as **jobs**, keep same three URLs. Do **not** add a fourth door. | Identity labels (“Usuarios”) force the visitor to classify themselves. |
| Put chooser much higher | Move `#explora` to immediately after the answer block. Sticky definition coda becomes **after** doors, not before. | Current path: morph → answer pin → definition pin → doors. Action is too late. |
| Soften “territorio” | Proposed: **Tres caminos. Una misma red de cuidado.** EN twin required. | Abstract poetry without a verb. |
| “Qué estás buscando?” as first experience | **Compromise:** keep manifesto hero (lock). Make doors the first *action* after a short definition, not the first *viewport*. | Replacing the hero with a chooser kills protocol identity. |

### Soften or reject (claims / lock)

| Suggestion | Why not as written |
|------------|--------------------|
| “Busco cuidado / teleterapia” | Teletherapy as Hub promise is unverified for this landing. Safer: **Necesito apoyo** → Wellness Hub. |
| “Encuentra acompañamiento” | Sounds like guaranteed matching. Safer: **Entra al Wellness Hub**. |
| Invert entire page to “need first, Motus never” | Identity is the differentiator. Depth stays; it moves down. |
| Psychologist-only hero | STYLE_LOCK: home speaks to all three audiences. |

### Later (not required for first production paint)

Per `docs/INFORMATION_ARCHITECTURE.md`: `/para-ti`, `/profesionales`, `/comunidad`, `/inversores` are planned audience landings, not first-paint. Site OS tenants are out of band for v1 UI.

---

## Proposed home order (unlock candidate)

Current (as shipped):

```
Hero morph (CTAs appear after ~66% of morph track)
  → Answer reveal (pinned)
  → Sticky definition coda (pinned)
  → Tri-path #explora
  → Red viva + layer sequence
  → Ecosystem bento
  → #ecosistema-3d
  → FAQ
  → Final CTA (Explora + Hub)
```

Proposed (if approved):

```
Hero morph — manifesto + Explora + Ir al Hub visible earlier
  → Answer block (SEO/GEO, keep 40–80 words)
  → Tri-path #explora — job labels, same three URLs
  → Sticky definition + Red viva (depth for who wants it)
  → After Red viva: three text links (Hub / Academia / Agents)
  → Ecosystem bento
  → #ecosistema-3d (unchanged)
  → FAQ
  → Final CTA → tri-path + Hub
```

Primary CTA unchanged. Tri-path still Users / Professionals / Community·Investors as **audiences**, with job subheads:

| Door | Job line (ES, claims-safe) | Surface |
|------|----------------------------|---------|
| Usuarios | Necesito apoyo | `https://app.motusdao.org/` |
| Profesionales | Quiero formarme | `https://app.motusdao.org/academia` |
| Comunidad e inversores | Quiero construir con la red | `https://agents.motusdao.org/` |

---

## Claims review (partner + current copy)

Run again on any new strings before publish.

### Blockers (do not ship as written)

- “Busco teleterapia” / guaranteed psychologist matching on this page.
- Any line that makes MotusDAO an “AI therapist” (clinical policy: do not market as a therapist; AI does not diagnose, treat, or handle crisis independently).

### Soften

- “Encuentra acompañamiento” → “Entra al Wellness Hub para herramientas de cuidado y continuidad.”
- Hero “Cuidado mental híbrido humano–IA” is acceptable if FAQ continues to state judgment stays with the professional (already true).

### OK as written

- Institutional definition / answer block (aligned with MCP brand).
- FAQ: not a marketplace; no patient/income guarantee; AI does not replace the psychologist.
- Academia: formación, not cédula (sequence cue already says this).

### Missing for a health-adjacent public site

- Crisis routing: Motus is not a crisis service; point to local emergency / existing Motus Hub crisis copy when we have a canonical line from clinical policy.
- Privacy / terms links in footer.

---

## Production gap list

### P0 — ship blockers

| ID | Gap | Why it blocks |
|----|-----|----------------|
| P0-1 | No `/privacidad`, `/terminos`, or footer legal | Public site that talks care + identity + payments without a privacy notice. |
| P0-2 | No crisis / “not emergency care” line | Clinical policy: do not automate crisis; do not hide boundaries. |
| P0-3 | No Open Graph / Twitter image | Shares look unbranded. Metadata exists; image does not. |
| P0-4 | No `app/icon` / favicon in the App Router | Browser tab identity. `public/logo.svg` exists but is not wired as icon. |
| P0-5 | Entire `HomeView` is `"use client"` | STYLE_LOCK: SSR manifesto and product copy. Crawlers and GEO see a JS shell. |
| P0-6 | Layer sequence uses Unsplash URLs | License, availability, and no `images.remotePatterns` in `next.config.ts`. Replace with owned assets. |
| P0-7 | Hero CTAs gated at `INTERACTIVE_AT = 0.66` | First viewport is motion, not action. Conflicts with “CTA group on hero.” |

### P1 — conversion (after unlock)

| ID | Gap | Notes |
|----|-----|--------|
| P1-1 | Two pinned conceptual sections before `#explora` | Biggest partner complaint. |
| P1-2 | Tri-path titles are identity, not jobs | Relabel, do not add doors. |
| P1-3 | `triPathTitle` “territorio” | Copy-only. |
| P1-4 | No Hub/Academia/Agents repeat after Red viva | Partner + ChatGPT. |
| P1-5 | Header: both `navExplore` and `navPrinciples` = “Ecosistema”; no Academia; nav hidden below `lg` | Mobile seeker only gets morph + language toggle. |
| P1-6 | InfiniteMenu fallback `"Loading…"` | Spanish default. |

### P1 — ops / trust

| ID | Gap | Notes |
|----|-----|--------|
| P1-7 | Footer: brand + MCP only | Add legal, contact, Hub, Academia. |
| P1-8 | No `app/not-found.tsx` | Broken deep links. |
| P1-9 | JSON-LD Organization missing `logo` / incomplete `sameAs` | SEO skill checklist. |
| P1-10 | Template leftovers | `CUSTOMIZATION.md`, `QUICKSTART.md`, `PROJECT_SUMMARY.md`, `public/home.png` (~1.4 MB), ChatGPT-named PNGs under `public/hero/morph/`. |
| P1-11 | i18n: both hreflang point at `/` | Acceptable for v1 toggle; not a true EN URL. |

### P2 — after v1 paint

| ID | Item |
|----|------|
| P2-1 | Audience landings `/para-ti`, `/profesionales`, `/comunidad` |
| P2-2 | Privacy-respecting analytics |
| P2-3 | Performance budget (19 hero WebPs + GSAP pins + WebGL) |
| P2-4 | Contact / alliance path that is not only Agents |
| P2-5 | Honest beta labels on Hub surfaces if still beta |
| P2-6 | Tests: lint in CI, scroll diagnose in CI, claims checklist in PR |

### Out of band

Site OS tenants, psychologist GTM ads, pricing, `/inversores` long form. See `docs/AGENTIC_OS.md` and `docs/PSYCHOLOGIST_CUSTOMER_JOBS.md`.

---

## What is already production-grade

- Locked visual system (dark-first, Jura/Inter, brand gradient, glass).
- Answer block + FAQ + JSON-LD FAQPage matching visible questions.
- `sitemap.ts`, `robots.ts`, `public/llms.txt`, `public/ecosystem.json`.
- Canonical outbound URLs in `lib/site.ts`.
- InfiniteMenu below-fold (`#ecosistema-3d`).
- Claims-safe FAQ (marketplace, income, AI).
- `prefers-reduced-motion` on pinned sections.
- ES default, EN twin in `lib/messages.ts`.

---

## Suggested sequence of work

1. **Partner decision** on the IA unlock (this doc, proposed order + job labels).
2. **P0 hygiene** (legal, crisis line, OG, icons, SSR split, Unsplash, hero CTA timing) — no lock change except CTA visibility in hero.
3. **P1 conversion** after unlock (move `#explora`, job subheads, copy, header/footer repeats).
4. **P2** audience landings + analytics.

Until step 1 is approved, do not reorder home sections.

---

## Decisions needed from founders

1. Approve IA unlock as specified above? (yes / yes with tweaks / no — keep current order).
2. Job labels vs identity-only titles on the three doors?
3. Who supplies privacy/terms + crisis canonical line (legal / Hub copy / clinical policy)?
4. Is Hub matching/teletherapy live enough to mention “teleterapia” at all? (CTO default: **no** on this page.)
