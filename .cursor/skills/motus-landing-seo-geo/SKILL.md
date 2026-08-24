---
name: motus-landing-seo-geo
description: >-
  Implements SEO, GEO/AEO, and agentic surfaces for MotusDAO LandingMotus and
  reusable Motus site-OS tenants. Use when adding metadata, sitemap, robots,
  JSON-LD, llms.txt, answer blocks, Open Graph, ecosystem.json, or making pages
  crawlable for search and AI agents.
---

# Motus Landing SEO · GEO · Agentic

Discoverability stack for this site and future `{slug}.motusdao.org` tenants.

**IA:** [`docs/INFORMATION_ARCHITECTURE.md`](../../../../docs/INFORMATION_ARCHITECTURE.md)

---

## Priority order (do in this order)

1. **SSR semantic HTML** — primary copy visible without JS
2. **Answer block** — 40–80 words defining the entity near top of page
3. **Metadata** — title, description, canonical, `lang`, OG/Twitter
4. **`sitemap.ts` + `robots.ts`**
5. **JSON-LD** — Organization, WebPage, FAQPage (match visible text)
6. **`/llms.txt`** — curated map (optional `/llms-full.txt` later)
7. **Ecosystem machine catalog** — `/ecosystem.json` or `/api/ecosystem`
8. **Link Motus MCP** in llms.txt for grounded Q&A

`llms.txt` helps agents/tooling; it is **not** a Google ranking hack. Still ship it.

---

## MotusDAO home answer block (ES — draft from MCP; verify before ship)

> MotusDAO es una infraestructura clínica, comunitaria y tecnológica para construir redes vivas de cuidado en salud mental. Integra privacidad por diseño, coordinación distribuida, educación clínica y herramientas AI-human hybrid. No es solo un marketplace: es arquitectura de cuidado.

EN twin required when toggle is EN.

---

## Agentic checklist

- [ ] No primary facts only inside WebGL/canvas
- [ ] FAQ headings as questions; first sentence = direct answer
- [ ] AI crawlers not blocked unintentionally in robots
- [ ] `llms.txt` lists tri-path + product links + MCP URL
- [ ] Tenant sites: Organization schema = practice, not MotusDAO corp (unless Motus-owned)

Details: [references/checklist.md](references/checklist.md)
