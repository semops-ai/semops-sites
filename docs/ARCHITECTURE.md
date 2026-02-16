# Architecture

> **Repo:** `semops-sites`
> **Role:** Frontend/Deployment - Public-facing products and deployed applications
> **Status:** ACTIVE
> **Version:** 2.0.0
> **Last Updated:** 2026-02-13
> **Infrastructure:** [INFRASTRUCTURE.md](INFRASTRUCTURE.md)

## Role

semops-sites is the **Product Delivery** system in SemOps. It owns public websites (timjmitchell.com, semops.ai), deployed applications, and design system assets (fonts, PDF templates). This is where private operational work becomes public product.

**Key distinction:** semops-sites delivers content and renders data — it does not author content (semops-publisher) or define schema (semops-core).

## DDD Classification

| Property | Value |
| -------- | ----- |
| **Layer** | `domain-application` |
| **Context Type** | `supporting` |
| **Integration Patterns** | `customer-supplier` |
| **Subdomains** | `content-publishing` |

## Capabilities

| Capability | Description |
| ---------- | ----------- |
| Web Publishing | Public websites via Next.js + Vercel (timjmitchell.com, semops.ai) |
| Font Infrastructure | Centralized font management, conversion, and cross-repo distribution |
| PDF Templates | LaTeX templates for branded PDF export via Pandoc |

## Ownership

What this repo owns (source of truth for):

- Public website code and deployment (timjmitchell.com, semops.ai)
- Design system assets: fonts (`packages/fonts/`), PDF templates (`packages/pdf-templates/`)
- Content rendering pipeline (MDX to HTML)
- Site information architecture and routing

What this repo does NOT own (consumed from elsewhere):

- Content authoring and ingestion scripts (semops-publisher)
- Schema definitions and shared database (semops-core)

## Key Components

| Component | Purpose |
|-----------|---------|
| `apps/timjmitchell/` | timjmitchell.com — personal site, blog |
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
│   ├── timjmitchell/       # timjmitchell.com
│   │   ├── src/app/        # Next.js App Router pages
│   │   ├── content/blog/   # MDX blog posts
│   │   └── supabase/       # Database migrations
│   │
│   └── semops/             # semops.ai
│       ├── src/app/        # Next.js App Router pages
│       │   ├── about/      # About hub (what + why SemOps, founder story)
│       │   ├── framework/  # Framework hub + pillar pages
│       │   └── playground/ # Interactive playground (dev-only)
│       ├── content/
│       │   ├── blog/       # MDX blog posts
│       │   ├── pages/      # MDX pages (hub/spoke)
│       │   └── whitepapers/# MDX whitepapers
│       └── public/
│           ├── images/     # Content images (diagrams, figures)
│           └── logos/      # Brand assets
│
└── packages/
    ├── fonts/              # Centralized font infrastructure
    ├── pdf-templates/      # LaTeX templates for PDF export
    └── shared/             # Shared components and utilities
```

### Applications

| App | Domain | Purpose |
| --- | ------ | ------- |
| timjmitchell | timjmitchell.com (Vercel + Cloudflare) | Personal brand, blog |
| semops | semops.ai (planned) | SemOps framework, blog, whitepapers |

## Information Architecture

### Navigation

Three items plus logo-as-home:

```text
[SemOps logo → /]    Framework    Blog    About
```

### Site Map (semops.ai)

```text
/                           Home (cold-read pitch + framework preview)
/framework                  Framework hub (3 pillars overview)
  /framework/[pillar]       Pillar pages (strategic-data, symbiotic-architecture, semantic-optimization)
/blog                       Blog listing
  /blog/[slug]              Blog post
/about                      About hub (what + why SemOps, merged)
  /about/how-i-got-here     Founder's journey
/whitepapers/[slug]         Whitepapers (no nav, linked contextually)
```

### Design Principles

1. **Home page does the cold-read job.** A first-time visitor understands what SemOps is and where to go without clicking.
2. **Framework is the substance.** Three pillars, each with its own page. Semantic Funnel is woven as context, not a peer section.
3. **About is the explainer + origin story.** "What is SemOps?" and "Why SemOps?" merged into one canonical page.
4. **GitHub is referenced contextually** (home page, framework pages, footer) — not a nav destination.

### Content Patterns

| Pattern | Description |
| ------- | ----------- |
| Hub/Spoke | Hierarchical pages via ingestion pipeline route mapping. See [CONTENT_TYPES.md](CONTENT_TYPES.md) |
| GitHub Cross-Link | Framework pillar pages link to corresponding GitHub docs. Home page showcases key repos. Footer links to org |
| Content Formality | GitHub docs (most formal) → GitHub READMEs → semops.ai pages → semops.ai blog (least formal) |

### timjmitchell.com Site Map

```text
/                           Home (personal brand landing)
/blog                       Blog listing
  /blog/[slug]              Blog post
```

## Dependencies

### Upstream Systems

| System | What We Consume | Integration |
|--------|-----------------|-------------|
| **semops-core** | Schema, Brand table, Entity data | Supabase shared database |
| **semops-publisher** | Blog content (MDX files) | Git-based publishing |

### Downstream Consumers

| Consumer | What We Provide |
|----------|-----------------|
| Public visitors | Website content, blog posts |
| Search engines | SEO-optimized pages, structured data |
| semops-publisher | Fonts, PDF templates |

## Data Flows

### Content Ingestion

```text
semops-publisher (Markdown + content manifest)
         │
         ├─ content/pages/<hub>/*.md          (hub/spoke pages)
         ├─ posts/<slug>/final.md             (blog posts)
         └─ content/whitepapers/<slug>/*.md   (whitepapers)
         │
         ▼ npm run ingest
┌─────────────────────────────────────────────┐
│  scripts/ingest-content.ts                   │
│  • Transforms frontmatter (rename fields)    │
│  • Derives category from tags                │
│  • Converts Mermaid blocks → JSX components  │
│  • Converts relative .md links → site routes │
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

- [INFRASTRUCTURE.md](INFRASTRUCTURE.md) - Services, deployment, and operational commands
- [STACK-OVERVIEW.md](STACK-OVERVIEW.md) - Detailed technology guide
- [CONTENT_TYPES.md](CONTENT_TYPES.md) - Content type contracts
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Responsive design patterns and component conventions
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
