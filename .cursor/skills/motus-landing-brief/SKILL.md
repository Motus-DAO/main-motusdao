---
name: motus-landing-brief
description: >-
  Generates a MotusDAO landing brief (sections, CTAs, trust, metrics) before
  coding. Use when starting a new page, audience landing, campaign LP, or when
  the user asks for a brief, outline, or section plan. Invoke explicitly with
  /motus-landing-brief.
disable-model-invocation: true
---

# Motus Landing Brief

Produce a brief **before** UI implementation. Then hand off to `motus-landing-design` + `motus-protocol-copy`.

## Defaults for Motus home

- Job: manifesto + product clarity
- CTA: Explora el ecosistema → Users / Professionals / Community·Investors
- Voice: protocol-level
- Lang: ES primary + EN twin

## Output template

```markdown
# Landing brief: [name]

## Goal
## Primary audience (home = all; or one audience LP)
## Traffic source
## Main promise (claims-safe)
## Primary CTA / Secondary CTA
## Section list (ordered)
## Copy blocks (ES + EN stubs)
## Trust / boundaries
## Claims to review
## SEO/GEO answer block
## Metrics
## Open questions
```

For psychologist acquisition LPs, also pull jobs from [`docs/PSYCHOLOGIST_CUSTOMER_JOBS.md`](../../../../docs/PSYCHOLOGIST_CUSTOMER_JOBS.md) and Motus marketing-lab section list (hero → problem → route → proof → FAQ → CTA).

After brief approval → implement; run `motus-claims-guardrails` on final copy.
