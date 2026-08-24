# MotusDAO Landing (LandingMotus)

Canonical MotusDAO public site: **manifesto + product gateway** (Next.js 15, TypeScript). Interactive WebGL ecosystem explorer is a **below-fold** section, not the first paint.

Primary CTA: **Explora el ecosistema** → Users · Mental Health Professionals · Community/Investors.

## Docs (start here)

| Doc | Purpose |
|-----|---------|
| [docs/STYLE_LOCK.md](./docs/STYLE_LOCK.md) | Locked design, IA, i18n, CTA |
| [docs/INFORMATION_ARCHITECTURE.md](./docs/INFORMATION_ARCHITECTURE.md) | Home + gateways (protocol-site pattern) |
| [docs/AGENTIC_OS.md](./docs/AGENTIC_OS.md) | Repeatable agentic site OS / tenants |
| [docs/PSYCHOLOGIST_CUSTOMER_JOBS.md](./docs/PSYCHOLOGIST_CUSTOMER_JOBS.md) | Psychologist customer jobs (claims-safe) |
| [docs/README.md](./docs/README.md) | Index + Cursor skills |

## Agent setup

1. Open this folder in Cursor (skills + rules load from `.cursor/`).
2. Reload MCP so `motusdao-knowledge` connects (`.cursor/mcp.json` → `https://mcp.motusdao.org/mcp`).
3. Slash skills: `/motus-landing-brief`, `/motus-site-os`.

## Dev

```bash
npm install
npm run dev
```

```bash
npm run build && npm start
```

## Stack

Next.js 15 · React 18 · TypeScript · Tailwind · WebGL2 (`InfiniteMenu`, optional section)

## License

MIT
