# Motus Site OS — Agentic Website System

This repo is the **reference MotusDAO public site** and the prototype for a repeatable **agentic website OS**: one stack, many sites, agent-editable, sold as a subscription.

## Vision

| Layer | What it is |
|-------|------------|
| Canonical site | `motusdao.org` (this project) — manifesto + product + ecosystem |
| Tenant sites | `{slug}.motusdao.org` — psychologist / practice sites |
| Agent runtime | Hermes / OpenClaw (or similar) talking to Motus MCP + site tools |
| Operator UI | Chat (and later controls) so the owner edits their site themselves |
| Billing | Subscription; optional custom domain sub-rent when they pay |

**Build order:** make this Motus landing excellent → extract OS patterns → spin a second page with the same skills → then tenant provisioning.

## What “documentation through the repo” means

Yes — but **layered**, not essay-spam in every folder.

| Layer | Location | Audience |
|-------|----------|----------|
| Locks & IA | `docs/STYLE_LOCK.md`, `docs/INFORMATION_ARCHITECTURE.md` | Humans + agents |
| Jobs / GTM | `docs/PSYCHOLOGIST_CUSTOMER_JOBS.md` | Product + copy |
| Agent workflows | `.cursor/skills/**` | Cursor / Hermes / OpenClaw |
| Always-on invariants | `.cursor/rules/**` | Every agent turn |
| Grounded Motus facts | Motus Knowledge MCP (`mcp.motusdao.org`) | Never invent Motus |
| Machine map | `public/llms.txt`, ecosystem JSON (when shipped) | External agents |

**Rule:** if a decision must survive the next chat, put it in `docs/` or a skill — not only in chat history.

## Repeatability checklist (new site)

Use skill `/motus-site-os` (or auto when scaffolding):

1. Copy or generate Next.js TypeScript shell from this reference
2. Load STYLE_LOCK (or a tenant override lock)
3. Wire Motus MCP + claims guardrails
4. SSR manifesto/home or funnel landing
5. SEO/GEO surfaces (`llms.txt`, schema, sitemap)
6. Optional: agent chat endpoint that can propose/apply content edits
7. Deploy to VPS under `{slug}.motusdao.org`

## Agent interface (target)

Psychologist (or Motus operator) talks to an agent that can:

- Update copy / sections within claims rules
- Toggle theme, language defaults
- Add FAQ, CTAs, booking links
- Preview + publish
- Never invent clinical outcomes or fake credentials

Site OS agents **must** load: `motus-mcp-context`, `motus-claims-guardrails`, `motus-protocol-copy` (or tenant tone override), `motus-landing-seo-geo`.

## Relationship to MotusDAO Knowledge MCP

- Motus institutional facts → MCP `search_knowledge`
- Tenant-specific practice facts → tenant content store (future), not Motus MCP
- Claims review → always before publish
