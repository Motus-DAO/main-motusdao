---
name: motus-mcp-context
description: >-
  Loads grounded MotusDAO facts via Motus Knowledge MCP before inventing product,
  brand, clinical, or journey claims. Use at the start of Motus landing, Hub,
  copy, or architecture tasks; when user mentions MotusDAO positioning, Hub,
  Academia, PsyChat, PSM, or manifesto content.
---

# Motus MCP Context

**Never invent MotusDAO.** Query Motus Knowledge first.

## Endpoint

- Live: `https://mcp.motusdao.org/mcp`
- Tools: `search_knowledge`, `list_namespaces`, `get_clinical_policy`
- Namespaces: `brand`, `product`, `engineering`, `customer-journey`, `clinical-policy`

If MCP is not connected in Cursor, call the HTTP gateway (initialize → tools/call with session) or ask the user to enable `motusdao-knowledge` in `.cursor/mcp.json`.

## When to search

| Task | Namespace / query |
|------|-------------------|
| Manifesto / what is MotusDAO | `brand` — institutional message, versión pública |
| Hub / Academia / PsyChat | `product` |
| Technical positioning | `engineering` |
| Psychologist funnel language | `brand` + claims |
| Crisis / clinical AI | `get_clinical_policy` |

## Rules

1. Prefer MCP chunks over memory.
2. If MCP and STYLE_LOCK conflict on **product facts**, trust MCP; if on **UI locks**, trust STYLE_LOCK.
3. Quote or paraphrase with source path when making strong claims.
4. After retrieval, still run `motus-claims-guardrails` on outbound marketing copy.
