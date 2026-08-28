# MotusDAO Public Landing — Style Lock

Status: **locked** (2026-08-23). Change only with explicit approval.

This is the source of truth for `LandingMotus` (canonical MotusDAO public site). Audience landings and tenant sites inherit unless overridden.

---

## 1. Site job

| Field | Lock |
|-------|------|
| Primary job | **Manifesto + product clarity** — anyone can understand MotusDAO |
| Pattern | Hybrid clarity landing (SSR prose first; interactive ecosystem later) |
| Reference IA | Protocol / ecosystem sites like [web3privacy.info](https://web3privacy.info/) — home orients; depth lives in linked surfaces |
| Primary CTA | **Explora el ecosistema** → tri-path chooser |
| Tri-path | **Users** · **Mental Health Professionals** · **Community / Investors** |
| Secondary surfaces | Audience landings, docs, Hub, Academia, PsyChat, Metaverso (linked, not crammed into hero) |

## 2. Audiences

Main page speaks to **all** without picking a single funnel.

| Audience | Main page role | Dedicated later |
|----------|----------------|-----------------|
| Users / seekers | Understand care infrastructure exists | `/para-ti` (or similar) |
| Psychologists (PSM) | See professional path + ecosystem | `/profesionales` |
| Community / investors | See mission, governance, living network | `/comunidad` / `/inversores` |

Do not turn the home hero into a psychologist-only ad funnel.

## 3. Language

| Field | Lock |
|-------|------|
| Default | **Spanish (`es`)** |
| Secondary | English (`en`) |
| UX | Language toggle; persist preference |
| Copy voice | Protocol-level (see skill `motus-protocol-copy`) — not startup hype |

## 4. Visual direction

**Source of truth:** MotusDAO Operational Design System — Main Site  
`deliverables/Design system/docs/04-design-system-operativo.md`

| Field | Lock |
|-------|------|
| Concept | Motus Main Site: dark chrome + ambient brand gradients + living-network content structure |
| Themes | **Dark-first** (Motus default). Light mode allowed for content surfaces; **nav + footer always dark** |
| Brand | Purple `#9333EA` → pink `#EC4899` (`--grad-brand`). No cyan / no terminal aesthetic on Main Site |
| Atmosphere | `--grad-bg-ambient` (indigo / pink / purple radials on black) |
| Typography | **Jura** headings · **Inter** body (`next/font`) |
| Surfaces | Glass panels (`--glass-*`) where interaction/grouping needs a container |
| Hero budget | Brand + one headline + one support sentence + CTA group + one visual plane — no proof/metric strip on home |

### Avoid

- Teal/organic “wellness” palettes that are not Motus tokens
- Cyan / Orbitron / terminal (Psychat-only)
- Stats strips, pill clusters, floating badges on hero media
- WebGL / InfiniteMenu as the first thing landers see

## 5. InfiniteMenu (WebGL)

| Field | Lock |
|-------|------|
| Placement | **Hidden / below-fold interactive section** (e.g. “Explorar en 3D” or deep link `#ecosistema-3d`) |
| Role | Optional delight after manifesto + tri-path |
| Never | Full-viewport first paint; sole content source for crawlers |

## 6. Information architecture (home)

Inspired by [Web3Privacy Now](https://web3privacy.info/): mission first, then structured gateways into depth.

1. **Hero** — MotusDAO brand + manifesto-grade line + CTA *Explora el ecosistema*
2. **Answer block** (SEO/GEO) — 40–80 word definition of MotusDAO
3. **Tri-path** — Users / Professionals / Community·Investors
4. **What MotusDAO is** — layers / living network (protocol copy)
5. **Ecosystem map** — bento of outbound surfaces (Wellness Hub, Academia, PsyChat / MotusAI, Metaverso, Agents)
6. **Optional 3D explore** — InfiniteMenu
7. **FAQ** — extractable Q&A
8. **Final CTA** — return to tri-path / Hub

Depth (docs, research, events, long essays) lives on **linked routes / subdomains**, not in the first viewport.

## 7. SEO / GEO / agentic (non-negotiable)

- Server-rendered HTML for all primary copy
- Metadata, OG, sitemap, robots
- JSON-LD (Organization + WebPage + FAQ)
- `/llms.txt` map + optional ecosystem JSON
- Point agents to Motus Knowledge MCP where appropriate

## 8. Claims

All public copy passes `motus-claims-guardrails`. No guaranteed patients, income, cures, fake certification, or AI replacing clinical judgment.

## 9. Future product (site OS) — out of band for v1 UI, in-band for skills

Tenant pattern (later): `{slug}.motusdao.org` → psychologist site + agent chat → subscription. This repo is the **canonical MotusDAO site** and the **reference implementation** for the site OS skill (`motus-site-os`).
