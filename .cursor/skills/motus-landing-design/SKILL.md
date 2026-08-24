---
name: motus-landing-design
description: >-
  Designs and builds UI for MotusDAO public LandingMotus (manifesto + product
  gateway). Living-network aesthetic, light/dark, ES/EN toggle, tri-path CTA
  Explora el ecosistema, InfiniteMenu below-fold only. Use when editing app/,
  components/, globals.css, hero, sections, theme, i18n UI, MotusDAO branding,
  or any marketing UI in this repository. Takes precedence over generic landing
  skills for this project.
paths:
  - "app/**"
  - "components/**"
  - "data/**"
  - "public/**"
  - "tailwind.config.ts"
  - "docs/STYLE_LOCK.md"
---

# MotusDAO Landing Design

Build the **canonical MotusDAO public site**: manifesto + product clarity for anyone (users, psychologists, community/investors). Not a psychologist-only ad funnel.

**Locks (read first):** [`docs/STYLE_LOCK.md`](../../../../docs/STYLE_LOCK.md) · [`docs/INFORMATION_ARCHITECTURE.md`](../../../../docs/INFORMATION_ARCHITECTURE.md)

**Copy:** use skill `motus-protocol-copy`. **Claims:** `motus-claims-guardrails`. **Facts:** `motus-mcp-context`.

---

## Before writing code

1. Confirm change matches STYLE_LOCK (hero budget, CTA, InfiniteMenu placement).
2. Prefer SSR / server components for text; client only for theme, i18n toggle, motion, WebGL.
3. ES default strings; EN via toggle (keys in a single dictionary module).
4. One section = one job, one headline, short support line.

---

## Visual system (Motus Operational DS — Main Site)

| Token | Direction |
|-------|-----------|
| Source | `deliverables/Design system/docs/04-design-system-operativo.md` |
| Themes | Dark-first; light content optional; **nav/footer always dark** |
| Brand | Purple→pink `--grad-brand`; no cyan/terminal on Main Site |
| Type | Jura headings + Inter body |
| Surfaces | Glass panels + ambient brand radials |
| Motion | Ambient shift + fade-up; reduced-motion respected |

---

## Home section order (locked)

1. Hero — brand MotusDAO, manifesto line, CTA **Explora el ecosistema**
2. GEO answer block — 40–80 words “Qué es MotusDAO”
3. Tri-path — Users · Mental Health Professionals · Community/Investors
4. Living network / layers (protocol copy)
5. Product map — outbound Hub, Academia, PsyChat, Metaverso, Gobernanza
6. Principles — privacy, consent, hybrid care
7. Optional `#ecosistema-3d` — InfiniteMenu (hidden until scrolled / linked)
8. FAQ
9. Final CTA → tri-path

---

## Hero rules

- Brand is hero-level (not nav-only)
- Max: brand + headline + one support sentence + CTA group + one visual plane
- No stats, schedules, floating badges, or WebGL in first viewport
- Primary CTA label: **Explora el ecosistema** (ES) / **Explore the ecosystem** (EN)

---

## InfiniteMenu

- Remains in repo; mount only in below-fold section or `#ecosistema-3d`
- Loading/fallback text must be crawlable elsewhere (product map)
- `ssr: false` OK for canvas; never make it the only content

---

## Anti-patterns

- Purple-on-black neon “AI crypto” default
- Entire page `'use client'`
- Psychologist funnel copy as the only home narrative
- Decorative card grids
- Inventing Motus facts without MCP

---

## Related skills

| Skill | Role |
|-------|------|
| `motus-protocol-copy` | Voice |
| `motus-landing-seo-geo` | Discoverability |
| `motus-claims-guardrails` | Safe claims |
| `motus-mcp-context` | Grounded Motus |
| `motus-site-os` | Tenant / repeat sites |
