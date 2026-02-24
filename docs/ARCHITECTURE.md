# Architecture

> **Repo:** `semops-sites`
> **Role:** Frontend/Deployment - Public-facing products and deployed applications
> **Status:** ACTIVE
> **Version:** 2.0.0
> **Last Updated:** 2026-02-13
> **Infrastructure:** [INFRASTRUCTURE.md](INFRASTRUCTURE.md)

## Role

Sites-pr is the **Product Delivery** system in SemOps. It owns public websites (timjmitchell.com, semops.ai), deployed applications, and design system assets (fonts, PDF templates). This is where private operational work becomes public product.

**Key distinction:** Sites-pr delivers content and renders data — it does not author content (semops-publisher) or define schema (semops-core).

## DDD Classification

> Source: [REPOS.yaml](https://github.com/semops-ai/semops-dx-orchestrator/blob/main/docs/REPOS.yaml)

| Property | Value |
| -------- | ----- |
| **Layer** | `domain-application` |
| **Context Type** | `supporting` |
| **Integration Patterns** | `customer-supplier` |
| **Subdomains** | `content-publishing` |

## Capabilities

> Source: [STRATEGIC_DDD.md](https://github.com/semops-ai/semops-core/blob/main/docs/STRATEGIC_DDD.md)

| Capability | Description |
| ---------- | ----------- |
| Web Publishing | Public websites via Next.js + Vercel (timjmitchell.com, semops.ai) |
| Font Infrastructure | Centralized font management, conversion, and cross-repo distribution |
| PDF Templates | LaTeX templates for branded PDF export via Pandoc |

## Ownership

What this repo owns (source of truth for):

- Public website code and deployment (timjmitchell.com, semops.ai)
- Design system assets: fonts (`packages/fonts/`), PDF templates (`packages/pdf-templates/`)
- Content rendering pipeline (MDX → HTML)
- Resume data visualization components
- Site information architecture and routing

What this repo does NOT own (consumed from elsewhere):

- Content authoring and ingestion scripts (semops-publisher)
- Schema definitions and shared database (semops-core)
- Resume seed data (semops-publisher via `corpus_to_sql.py`)

**Ubiquitous Language conformance:** This repo follows definitions in [UBIQUITOUS_LANGUAGE.md](https://github.com/semops-ai/semops-core/blob/main/schemas/UBIQUITOUS_LANGUAGE.md). Domain terms used in code and docs must match.

## Key Components

| Component | Purpose |
|-----------|---------|
| `apps/timjmitchell/` | timjmitchell.com — personal site, blog, career timeline |
| `apps/semops/` | semops.ai — SemOps framework, blog, whitepapers |
| `packages/fonts/` | Centralized font infrastructure (manifest, WOFF2, CSS) |
| `packages/pdf-templates/` | LaTeX templates for branded PDF export |
| `packages/shared/` | Shared React components and utilities |
| `supabase/` | Database migrations and seed data |
| `docs/decisions/` | Architecture Decision Records |

### Monorepo Structure

```text
semops-sites/
├── apps/
│ ├── timjmitchell/ # timjmitchell.com (port 3100)
│ │ ├── src/app/ # Next.js App Router pages
│ │ ├── content/blog/ # MDX blog posts
│ │ └── supabase/ # Database migrations
│ │
│ └── semops/ # semops.ai (port 3101)
│ ├── src/app/ # Next.js App Router pages
│ │ ├── about/ # About hub (what + why SemOps, founder story)
│ │ ├── framework/ # Framework hub + pillar pages
│ │ └── playground/ # Interactive playground (dev-only)
│ ├── content/
│ │ ├── blog/ # MDX blog posts
│ │ ├── pages/ # MDX pages (hub/spoke)
│ │ └── whitepapers/# MDX whitepapers
│ └── public/
│ ├── images/ # Content images (diagrams, figures)
│ └── logos/ # Brand assets
│
└── packages/
 ├── fonts/ # Centralized font infrastructure
 ├── pdf-templates/ # LaTeX templates for PDF export
 └── shared/ # Shared components and utilities
```

### Applications

| App | Port | Domain | Purpose |
| --- | ---- | ------ | ------- |
| timjmitchell | 3100 | timjmitchell.com (Vercel + Cloudflare) | Personal brand, blog, career timeline |
| semops | 3101 | semops.ai (planned) | SemOps framework, blog, whitepapers |

## Information Architecture

> Decided in [ADR-0007: Semops.ai Information Architecture](decisions/ADR-0007-semops-information-architecture.md)

### Navigation

Three items plus logo-as-home:

```text
[SemOps logo → /] Framework Blog About
```

### Site Map (semops.ai)

```text
/ Home (cold-read pitch + framework preview)
/framework Framework hub (3 pillars overview)
 /framework/[pillar] Pillar pages (strategic-data, symbiotic-architecture, semantic-optimization)
/blog Blog listing
 /blog/[slug] Blog post
/about About hub (what + why SemOps, merged)
 /about/how-i-got-here Founder's journey
/whitepapers/[slug] Whitepapers (no nav, linked contextually)
```

### Design Principles

1. **Home page does the cold-read job.** A first-time visitor understands what SemOps is and where to go without clicking.
2. **Framework is the substance.** Three pillars, each with its own page. Semantic Funnel is woven as context, not a peer section.
3. **About is the explainer + origin story.** "What is SemOps?" and "Why SemOps?" merged into one canonical page.
4. **GitHub is referenced contextually** (home page, framework pages, footer) — not a nav destination. Labs removed.

### Content Patterns

| Pattern | Description |
| ------- | ----------- |
| Hub/Spoke | Hierarchical pages via ingestion pipeline route mapping. See [CONTENT_TYPES.md](CONTENT_TYPES.md) |
| GitHub Cross-Link | Framework pillar pages link to corresponding GitHub docs. Home page showcases key repos. Footer links to org |
| Content Formality | GitHub docs (most formal) → GitHub READMEs → semops.ai pages → semops.ai blog (least formal) |

### timjmitchell.com Site Map

```text
/ Home (personal brand landing)
/blog Blog listing
 /blog/[slug] Blog post
/career Career timeline + resume data visualization
```

## Dependencies

### Upstream Systems

| System | What We Consume | Integration |
|--------|-----------------|-------------|
| **semops-core** | Schema, Brand table, Entity data | Supabase shared database |
| **semops-publisher** | Blog content (MDX files), resume seed.sql | Git-based publishing |

### Downstream Consumers

| Consumer | What We Provide |
|----------|-----------------|
| Public visitors | Website content, blog posts, career data |
| Search engines | SEO-optimized pages, structured data |
| semops-publisher | Fonts, PDF templates |

## Data Flows

### Career Timeline Data

```text
semops-publisher (resume corpus)
 │
 ▼ corpus_to_sql.py
seed.sql
 │
 ▼
Supabase PostgreSQL
 ├── resume_job (fact table)
 ├── resume_job_bullet (experience atoms)
 ├── resume_role, resume_skill (dimensions)
 ├── bridge tables (job_role, job_skill, etc.)
 └── SQL views (v_duration_by_role, etc.)
 │
 ▼
Next.js Server Components
 │
 ▼
React renders HTML → Browser
```

### Content Ingestion

```text
semops-publisher (Markdown + content manifest)
 │
 ├─ content/pages/<hub>/*.md (hub/spoke pages)
 ├─ posts/<slug>/final.md (blog posts)
 └─ content/whitepapers/<slug>/*.md (whitepapers)
 │
 ▼ npm run ingest
┌─────────────────────────────────────────────┐
│ scripts/ingest-content.ts │
│ • Transforms frontmatter (rename fields) │
│ • Derives category from tags │
│ • Converts Mermaid blocks → JSX components │
│ • Converts relative .md links → site routes │
└─────────────────────────────────────────────┘
 │
 ├─ apps/<app>/content/pages/*.mdx
 ├─ apps/<app>/content/blog/*.mdx
 └─ apps/<app>/content/whitepapers/*.mdx
 │
 ▼ gray-matter (frontmatter)
MDXRemote (next-mdx-remote/rsc)
 │
 ├── rehype-prism-plus (syntax highlighting)
 ├── MermaidDiagram (client component)
 │
 ▼
Site pages (/about, /blog/[slug])
```

See [CONTENT_TYPES.md](CONTENT_TYPES.md) for content type contracts.

## Related Documentation

- [INFRASTRUCTURE.md](INFRASTRUCTURE.md) - Services, ports, deployment, and operational commands
- [STACK-OVERVIEW.md](STACK-OVERVIEW.md) - Detailed technology guide
- [CONTENT_TYPES.md](CONTENT_TYPES.md) - Content type contracts
- [VERCEL_RUNBOOK.md](VERCEL_RUNBOOK.md) - Vercel deployment patterns and troubleshooting
- [GLOBAL_ARCHITECTURE.md](https://github.com/semops-ai/semops-dx-orchestrator/blob/main/docs/GLOBAL_ARCHITECTURE.md) - System landscape
- [DIAGRAMS.md](https://github.com/semops-ai/semops-dx-orchestrator/blob/main/docs/DIAGRAMS.md) - Visual diagrams (context map, data flows, DDD model)
- [REPOS.yaml](https://github.com/semops-ai/semops-dx-orchestrator/blob/main/docs/REPOS.yaml) - Structured repo registry
- `docs/decisions/` - Architecture Decision Records for this repo

---

## Versioning Notes

**Status values:**

- `ACTIVE` - Current implemented state (one per doc type)
- `PLANNED-A`, `PLANNED-B`, `PLANNED-C` - Alternative future states

**File naming for planned versions:**

- `ARCHITECTURE.PLANNED-A.md`
- `ARCHITECTURE.PLANNED-B.md`

**When to create a PLANNED version:**

- Significant architectural changes under consideration
- Alternative approaches being evaluated
- Future state design for upcoming work
