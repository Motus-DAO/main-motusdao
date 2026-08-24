# Information Architecture

Pattern reference: [Web3Privacy Now](https://web3privacy.info/) — dense ecosystems stay navigable by **orienting on home** and **shipping depth via gateways** (projects, docs, portal, academy), not one infinite scroll of everything.

## Home (`/`)

Job: manifesto + product clarity + **Explora el ecosistema**.

```
Hero (morph cards: hybrid line → manifesto + CTA on scroll)
  → Answer block (what MotusDAO is)
       └ sticky definition coda (MotusDAO es / is + protocol nouns)
  → Tri-path gateway
       ├─ Users / seekers
       ├─ Mental health professionals
       └─ Community / investors
  → Living network / layers (protocol copy + scroll-synced sequence)
  → Product map (outbound links)
  → Principles (privacy, consent, hybrid care)
  → Optional #ecosistema-3d (InfiniteMenu)
  → FAQ
  → Final CTA → tri-path
```

## Planned audience landings (not required for first paint)

| Path (proposed) | Audience | Job |
|-----------------|----------|-----|
| `/para-ti` | Users | How to start care / Hub |
| `/profesionales` | Psychologists | Community, Academia, practice tools |
| `/comunidad` | Builders / members | Participate, govern |
| `/inversores` | Investors / partners | Mission, model, contact (claims-safe) |

Exact slugs may change; keep tri-path labels stable in UX.

## Linked Motus surfaces (subdomains / apps)

Do not rebuild these inside the landing; **link**:

| Surface | URL (canonical) |
|---------|-----------------|
| Hub | https://app.motusdao.org/ |
| Academia | https://app.motusdao.org/academia |
| PsyChat | https://psychat.motusdao.org/ |
| Metaverso | WorkAdventure Motus map |
| Gobernanza / institutional | motusdao.org governance content |
| Knowledge MCP | https://mcp.motusdao.org/mcp |

## Machine entry points

| Path | Purpose |
|------|---------|
| `/llms.txt` | Curated map for agents |
| `/robots.txt` | Crawler policy |
| `/sitemap.xml` | Index |
| `/api/ecosystem` or `/ecosystem.json` | Machine-readable product catalog (when added) |

## Content distribution rule

If a section needs more than ~one screen of depth → **own route or external docs**, link from home. Home stays the manifesto + gateway.
