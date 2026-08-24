# SEO / GEO checklist

## Next.js App Router

- `app/layout.tsx` — `metadata` export (not only client `<head>`)
- `app/sitemap.ts`, `app/robots.ts`
- Prefer `next/font` over CSS `@import` Google Fonts
- `generateMetadata` for localized routes if split by locale path

## JSON-LD shapes

- Organization: MotusDAO name, url, logo, sameAs
- WebPage: name, description, inLanguage
- FAQPage: only Q&As visible on page

## llms.txt shape

```markdown
# MotusDAO

> One-sentence institutional definition.

## Main
- [Home](https://www.motusdao.org/): Manifesto and product gateway
- [Users](...): ...
- [Professionals](...): ...
- [Community](...): ...

## Products
- [Hub](https://app.motusdao.org/): ...
- [Academia](https://app.motusdao.org/academia): ...
- [PsyChat](https://psychat.motusdao.org/): ...

## Agents
- [Motus Knowledge MCP](https://mcp.motusdao.org/mcp): Grounded MotusDAO docs
```

## GEO writing

- H2 as question when possible
- Lead with answer; then context
- Short paragraphs; named entities (MotusDAO, Hub, Academia)
- Freshness: update `dateModified` when manifesto changes
