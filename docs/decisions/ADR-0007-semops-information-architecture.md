# ADR-0007: Semops.ai Information Architecture

> **Status:** Complete
> **Date:** 2026-02-13
> **Related Issue:** [#57](https://github.com/semops-ai/semops-sites/issues/57)

---

## Context

Semops.ai launched with a flat, expedient navigation structure: 5 hardcoded nav items (Home, Framework, Labs, Blog, About) with no content hierarchy, no hub/spoke depth beyond a single About sub-page, and several orphaned routes (/career, /components, /playground). The "Labs" section was a placeholder. The Framework page was a single flat page with no sub-pages for individual pillars.

As content matures — particularly the three framework pillars with 30+ source documents in semops-docs — the site needs a deliberate information architecture that:

1. Serves a cold reader who has never heard of SemOps
2. Provides depth for engaged readers exploring the framework
3. Cross-links to the technical depth on github.com/semops-ai
4. Positions Tim Mitchell as the framework's creator
5. Scales as content grows without requiring nav redesign

### Key Inputs

- **Brand positioning:** Two entities — Tim Mitchell (founder) and SemOps (framework brand). See semops-publisher `docs/drafts/what-is-semops-why.md/brand-positioning.md`.
- **Content style hierarchy (most → least formal):** GitHub docs → GitHub READMEs → semops.ai pages → semops.ai blog
- **Content depth:** Strategic Data (14 docs), Symbiotic Architecture (13 docs), Semantic Optimization (6 docs) in semops-docs. Semops.ai gets curated narrative versions; GitHub carries technical depth.
- **Semantic Funnel:** A mental model that runs throughout the framework, not a fourth pillar.

## Decision

### Design Principles

1. **Home page does the cold-read job.** A first-time visitor understands what SemOps is and where to go without clicking.
2. **Framework is the substance.** Three pillars, each with its own page. Semantic Funnel is woven as context, not a peer section.
3. **Labs is removed.** GitHub is referenced contextually (home page, framework pages, footer) — not a nav destination.
4. **About is the explainer + origin story.** "What is SemOps?" and "Why SemOps?" merge into one canonical page. The founder's journey lives as a spoke.

### Navigation

Three items plus logo-as-home:

```
[SemOps logo → /] Framework Blog About
```

Footer mirrors nav items, adds GitHub org and LinkedIn in a "Connect" section.

### Site Map

```
/ HOME
 Hero: elevator pitch + CTA
 Framework: 3 pillar cards → /framework/*
 Blog: 2-3 recent posts → /blog
 GitHub: showcase key repos (external)
 Contact

/framework FRAMEWORK HUB
 Overview: what the framework is, how pillars relate
 Semantic Funnel woven as context (not its own section)
 Cards/links → pillar pages
 /framework/strategic-data Pillar page (overview + link to GitHub docs)
 /framework/symbiotic-architecture Pillar page
 /framework/semantic-optimization Pillar page

/blog BLOG LISTING
 /blog/[slug] Blog post

/about ABOUT HUB
 "What is SemOps?" + "Why" (merged, single page)
 /about/how-i-got-here Founder's journey / origin story
 /about/tim Bio, contact (future spoke)

/whitepapers/[slug] WHITEPAPERS (no nav, no listing page)
 Linked contextually from framework/blog
```

### What Changed from Previous Structure

| Content | Previous | New | Rationale |
|---------|----------|-----|-----------|
| What is SemOps? | `/about` (hub) | `/about` (hub, merged with Why) | Merge what + why into one canonical explainer |
| Why SemOps? | `/about/why-semops` | Merged into `/about` | Not distinct enough to warrant its own page |
| Framework overview | `/framework` (flat page) | `/framework` (hub) | Now links to pillar sub-pages |
| Framework pillars | Anchors on `/framework` | `/framework/[pillar]` | Each pillar earns its own page |
| Labs | `/labs` (placeholder) | Removed | Concept retired; GitHub linked contextually |
| How I Got Here | `/blog/how-i-got-here` | `/about/how-i-got-here` | Founder narrative, not a blog post |
| Career | `/career` (orphaned) | Stays orphaned | Not nav-worthy; linked from /about/tim when ready |
| Components, Playground | Orphaned routes | Unchanged | Dev-only pages, not public nav |
| Whitepapers | `/whitepapers/[slug]` | `/whitepapers/[slug]` | Route preserved, no nav/listing; linked contextually |

### GitHub Cross-Linking Convention

- **Framework pillar pages** link to relevant GitHub docs (e.g., `/framework/strategic-data` → `github.com/semops-ai/semops-docs/.../STRATEGIC_DATA/`)
- **Home page** GitHub module showcases 2-3 key repos with descriptions
- **Footer** links to GitHub org
- **Pattern:** Consistent across all framework pages — "Explore the technical docs →" linking to the corresponding GitHub directory

### Hub/Spoke Pattern

The existing hub/spoke infrastructure (ingestion pipeline route mapping, MDX content loading) supports this architecture. Hub route config in `scripts/ingest-content.ts` will need updates:

```typescript
const HUB_ROUTE_CONFIG = {
 "what-is-semops": { route: "/about" }, // existing, kept
 "framework": { route: "/framework" }, // existing, kept
 "strategic-data": { route: "/framework/strategic-data" }, // new
 "symbiotic-architecture": { route: "/framework/symbiotic-architecture" }, // new
 "semantic-optimization": { route: "/framework/semantic-optimization" }, // new
};
```

### Content Type Summary

| Type | Location | Nav | Listing Page | Source |
|------|----------|-----|--------------|--------|
| Pages | `content/pages/*.mdx` | Via hub routes | No | semops-publisher ingestion |
| Blog | `content/blog/*.mdx` | `/blog` | Yes | semops-publisher ingestion |
| Whitepapers | `content/whitepapers/*.mdx` | No | No | semops-publisher ingestion |

## Consequences

### Positive

- Clean 3-item nav that scales (no redesign needed as content grows)
- Clear audience journey: Home (pitch) → About (explainer) → Framework (depth) → GitHub (technical)
- Pillar sub-pages create room for the 30+ semops-docs source documents to surface as curated narratives
- Removes placeholder content (Labs) that signals incompleteness
- Hub/spoke pattern reused from existing infrastructure

### Negative

- Breaking change: `/about/why-semops` becomes a redirect or merged into `/about`
- Breaking change: `/labs` removed (needs redirect or 404 handling)
- Framework page needs redesign from flat content to hub layout
- Home page needs significant redesign to fulfill its cold-read role

### Risks

- Content for three pillar pages doesn't exist yet on semops.ai — framework section will feel thin until semops-publisher content is ingested
- "About" doing double duty (framework explainer + personal brand) could feel disjointed if not well-structured

## Implementation Plan

1. Document IA strategy (this ADR)
2. Update nav component (3 items)
3. Create framework pillar route structure (`/framework/[pillar]`)
4. Merge what-is-semops + why-semops into consolidated `/about` page
5. Redesign home page to fulfill cold-read role
6. Remove `/labs` route
7. Update ingestion pipeline hub route config
8. Add redirects for changed routes

## References

- [Issue #57: Semops.ai Navigation](https://github.com/semops-ai/semops-sites/issues/57)
- [ADR-0006: Content Ingestion Pipeline](ADR-0006-content-ingestion-pipeline.md)
- [CONTENT_TYPES.md](../CONTENT_TYPES.md)
- [semops-publisher brand positioning](https://github.com/semops-ai/semops-publisher/blob/main/docs/drafts/what-is-semops-why.md/brand-positioning.md)
- [semops-docs SEMOPS_DOCS](https://github.com/semops-ai/semops-docs/tree/main/docs/SEMOPS_DOCS/SEMANTIC_OPERATIONS_FRAMEWORK)
