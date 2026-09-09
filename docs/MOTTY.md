# Motty — public ecosystem guide

Status: **slices 1–2** (FAB + knowledge loop). Slices 3–4 (lead / offer / checkout / handoff) are stubbed, not enabled.

Motty is a **lightweight public guide** on the canonical landing. It is **not** MotusAI, PsyChat, a therapist, or an OpenClaw agent.

STYLE_LOCK exception (approved 2026-09-08): delayed FAB on home. Hero, tri-path, and InfiniteMenu stay untouched. FAB is not first paint (`z-index` 90, below header `100`).

---

## Runtime split

| Surface | Who | Runtime |
|---------|-----|---------|
| **Motty public** (this widget) | Anonymous visitors | In-process tool loop on `POST /api/motty/chat` |
| **Motty Personal** (later) | Provisioned operator / member | May use the Motus **OpenClaw launcher** |
| **OpenClaw / Hermes** | Site operators / Site OS | Never mounted on this public widget |

`lib/motty/runtime.ts` keeps the seam. Public Motty always returns `in-process-loop` / provisioner `none`.

---

## Architecture

```
Visitor FAB (delayed)
  → POST /api/motty/chat
       signed httpOnly cookie session
       Venice (OpenAI-compatible) + allowlisted tools
         searchKnowledge → MCP HTTP https://mcp.motusdao.org/mcp
                           public namespaces only: brand, product
```

The browser sends text. Tools run on the server. No Hub DB, shell, filesystem, Docker, or secrets in the client.

Checkout v1 (when enabled): **deep links**, not a payments API. Handoff: **configurable adapter** (`MOTTY_HANDOFF_KIND` / `MOTTY_HANDOFF_URL`) — no hardcoded WhatsApp.

---

## Knowledge allowlist

`searchKnowledge` enforces namespaces **server-side** in `lib/motty/namespaces.ts`.

| Allowed | Denied |
|---------|--------|
| `brand`, `product` | `engineering`, `clinical-policy`, `customer-journey`, anything else |

If the model omits `namespace`, Motty searches **only** the allowlist. Internal names return `namespace_not_allowed` and are not retried against MCP.

---

## Tools

| Tool | Slice | Public enabled |
|------|-------|----------------|
| `searchKnowledge` | 2 | yes |
| `updateCurrentLead` | 3 | no |
| `getRecommendedOffer` | 3 | no |
| `createCheckout` | 4 | no (deep link when enabled) |
| `createAccount` | 4 | no (deep link when enabled) |
| `handoffToHuman` | 4 | no (uses `getHandoffAdapter()`) |

Enable later by adding names to `PUBLIC_MOTTY_ENABLED_TOOLS` in `lib/motty/tools.ts`. The loop does not need a rewrite.

---

## Files

```
components/motty/MottyWidget.tsx
components/motty/MottyAvatar.tsx
components/motty/MottyMarkdown.tsx
public/motty/motty.gif
app/api/motty/chat/route.ts
lib/motty/agent-loop.ts
lib/motty/tools.ts
lib/motty/mcp.ts
lib/motty/namespaces.ts
lib/motty/session.ts
lib/motty/system-prompt.ts
lib/motty/handoff.ts
lib/motty/offers.ts
lib/motty/runtime.ts
```

---

## Env

See `.env.example`. Inference matches Hermes Venice:

- API: `https://api.venice.ai/api/v1`
- Model: `deepseek-v4-flash-0731`
- Key: `VENICE_API_KEY` (or `MOTTY_AI_API_KEY`)

Public Motty does **not** use the Hermes RootRouter proxy (`127.0.0.1:8787`) or `x-rootrouter-agent-id`. Without a key, Motty still answers from MCP (grounded fallback). Production requires `MOTTY_SESSION_SECRET`.

---

## Claims (Motty copy)

- Motty is a guide, not a therapist / MotusAI.
- Clinical judgment stays with professionals.
- Crisis: MotusDAO is not emergency care.
- No guaranteed patients, income, matching, or licenses.
