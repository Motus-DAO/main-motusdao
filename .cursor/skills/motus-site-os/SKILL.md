---
name: motus-site-os
description: >-
  Scaffolds and operates the Motus agentic website OS: reusable Next.js sites for
  MotusDAO canonical landing and psychologist tenants on {slug}.motusdao.org with
  agent chat, Motus MCP, claims, SEO/GEO, and VPS deploy. Use when creating a new
  Motus site, tenant site, Hermes/OpenClaw agent loop, subscription site product,
  or repeating LandingMotus patterns on another page. Prefer /motus-site-os.
disable-model-invocation: true
---

# Motus Site OS

This skill turns LandingMotus into a **repeatable OS** for Motus-operated sites.

**Read:** [`docs/AGENTIC_OS.md`](../../../../docs/AGENTIC_OS.md)

---

## Site types

| Type | Hostname | Content job |
|------|----------|-------------|
| Canonical | `motusdao.org` / www | Manifesto + ecosystem gateway |
| Audience LP | paths on canonical | Users / Professionals / Community |
| Tenant | `{slug}.motusdao.org` | Psychologist practice site + agent editor |

## New site workflow

1. Confirm type (canonical slice vs tenant)
2. Copy reference stack: Next.js 15 + TypeScript + Tailwind
3. Attach locks: STYLE_LOCK or tenant lock file
4. Enable skills: design (or tenant-design), seo-geo, claims, mcp-context, protocol-copy
5. Wire Motus MCP for Motus facts; tenant content store for practice facts
6. Ship SSR home + `llms.txt` + schema
7. (Later) Agent chat API that proposes diffs under claims rules
8. Deploy VPS + TLS for `{slug}.motusdao.org`
9. Optional: custom domain when subscription tier includes sub-rent

## Agent loop (Hermes / OpenClaw)

```
User message
  → motus-mcp-context (if Motus fact)
  → motus-claims-guardrails (on proposed copy)
  → apply file/content change
  → motus-landing-seo-geo (if new route)
  → preview / publish
```

Agents must not deploy clinical outcome claims or invent credentials.

## Psychologist tenant MVP pages

See [`docs/PSYCHOLOGIST_CUSTOMER_JOBS.md`](../../../../docs/PSYCHOLOGIST_CUSTOMER_JOBS.md) — who I am, who I help, how to start, privacy, FAQ.

## Do not

- Fork Motus manifesto voice into tenant hype ads without a separate tone lock
- Share one DB of clinical notes on the marketing site
- Skip claims review on agent-applied edits
