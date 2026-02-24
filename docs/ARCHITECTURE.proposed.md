# Sites Architecture (Proposed)

> **Status:** Proposed (WIP)
> **Date:** 2025-12-11
> **Related ADR:** [ADR-0001: Semantic-Ops Migration](https://github.com/semops-ai/semops-dx-orchestrator/blob/main/docs/decisions/ADR-0001-semops-organization-migration.md)

This document defines the **proposed** architecture after migration to the `semantic-ops` organization. Changes here are being evaluated before promotion to the stable [ARCHITECTURE.md](ARCHITECTURE.md).

---

## Key Changes from Current Architecture

1. **Repo rename:** `resumator` → `sites`
2. **Organization:** `timjmitchell` → `semantic-ops`
3. **Local path:** ` → `
4. **Dependencies updated:** References to other repos use new names

---

## System Role

**Bounded Context:** Product Delivery
**Job:** Public-facing products, deployed applications, websites

Sites is where private operational work becomes public product. It owns:

- Public websites (timjmitchell.com, semops.ai)
- Deployed applications and APIs
- Agentic endpoints (chatbots, data visualizations)
- Static content and MDX pages

---

## Architecture Overview

```text
┌─────────────────────────────────────────────────────────────────┐
│ BROWSER │
│ Renders HTML/CSS/JS, handles user interactions │
└─────────────────────────────────────────────────────────────────┘
 │
 ▼
┌─────────────────────────────────────────────────────────────────┐
│ VERCEL (Hosting) │
│ • Serves the website globally via CDN │
│ • Runs Next.js server-side code (serverless functions) │
│ • Auto-deploys when code is pushed to GitHub │
└─────────────────────────────────────────────────────────────────┘
 │
 ▼
┌─────────────────────────────────────────────────────────────────┐
│ SUPABASE (Database) │
│ • PostgreSQL database in the cloud │
│ • REST API auto-generated from tables │
│ • Row Level Security (RLS) for access control │
└─────────────────────────────────────────────────────────────────┘
```

---

## Dependencies

### Upstream Systems

| System | Repo | What We Consume | Integration |
|--------|------|-----------------|-------------|
| **Orchestrator** | `semantic-ops/orchestrator` | Schema, Brand table, Entity data | Supabase shared database |
| **Publisher** | `semantic-ops/publisher` | Blog content (MDX files) | Git-based publishing pipeline |
| **DX** | `semantic-ops/dx` | Templates, slash commands | CLI tooling |

### Downstream Consumers

| Consumer | What We Provide |
|----------|-----------------|
| Public visitors | Website content, blog posts, career data |
| Search engines | SEO-optimized pages, structured data |

---

## Data Flows

### Career Timeline Data

```text
semantic-ops/orchestrator (Brand table)
 │
 ▼
Supabase PostgreSQL
 ├── resume_job (fact table)
 ├── resume_job_bullet (experience atoms)
 ├── resume_role, resume_skill (dimensions)
 └── bridge tables (job_role, job_skill, etc.)
 │
 ▼
Next.js Server Components
 │
 ▼
React renders HTML → Browser
```

### Blog Content

```text
semantic-ops/publisher (content pipeline)
 │
 ▼ Git push
content/blog/*.mdx (frontmatter + markdown)
 │
 ▼
MDX processing (lib/mdx.ts)
 │
 ▼
Blog pages (/blog, /blog/[slug])
```

---

## Repository Location

| Environment | Path |
|-------------|------|
| **GitHub** | `semantic-ops/sites` |
| **Local** | ` |

---

## Key Directories

```text
semops-sites/
├── src/
│ ├── app/ # Next.js App Router pages
│ │ ├── blog/ # Blog listing and posts
│ │ ├── career/ # Career timeline
│ │ └── page.tsx # Home page
│ ├── components/ # React components
│ │ └── ui/ # ShadCN base components
│ ├── lib/ # Utilities
│ │ ├── supabase/ # Database clients (server + browser)
│ │ └── mdx.ts # Content loading
│ ├── content/blog/ # MDX blog posts
│ └── types/ # TypeScript definitions
├── supabase/
│ ├── migrations/ # Schema changes (version controlled)
│ └── seed.sql # Demo/test data
├── public/ # Static assets
└── docs/ # Architecture, ADRs
```

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 16 (App Router) | React framework with SSR |
| **UI** | React 19 | Component library |
| **Styling** | Tailwind CSS 4 | Utility-first CSS |
| **Components** | ShadCN UI + Radix | Accessible UI primitives |
| **Content** | MDX | Markdown + React components |
| **Database** | Supabase (PostgreSQL) | Data storage + auto-generated API |
| **Hosting** | Vercel | Serverless deployment |
| **Edge** | Cloudflare | DDoS protection, SSL, CDN |

For detailed technology explanations, see [STACK-OVERVIEW.md](STACK-OVERVIEW.md).

---

## Design System

Defined in [ADR-0002: Site Design Integration](decisions/ADR-0002-site-design-integration.md):

- **Fonts:** DM Sans (body) + Space Mono (headings)
- **Colors:** Forest green primary (`hsl(152 32% 28%)`)
- **Layout:** Prose container (`max-w-[680px]`)

---

## Security Model

```text
User Request
 │
 ▼
┌─────────────────────────────────────┐
│ CLOUDFLARE │
│ • DDoS protection │
│ • Bot management │
│ • WAF rules │
│ • SSL/TLS termination │
└─────────────────────────────────────┘
 │
 ▼
┌─────────────────────────────────────┐
│ VERCEL │
│ • Edge middleware │
│ • Security headers │
│ • Preview deployment auth │
└─────────────────────────────────────┘
 │
 ▼
┌─────────────────────────────────────┐
│ SUPABASE │
│ • Row Level Security (RLS) │
│ • API key scoping (anon vs service) │
└─────────────────────────────────────┘
```

---

## Migration Checklist

- [ ] Transfer repo to `semantic-ops` org
- [ ] Rename to `sites`
- [ ] Update local directory to `
- [ ] Update git remote URLs
- [ ] Update Vercel project settings
- [ ] Update all internal references to other repos

---

## Related Documents

- [ARCHITECTURE.md](ARCHITECTURE.md) - Current stable version
- [STACK-OVERVIEW.md](STACK-OVERVIEW.md) - Detailed technology guide
- [ADR-0001: Resume Schema Design](decisions/ADR-0001-resume-schema-design.md) - Data model
- [ADR-0002: Site Design Integration](decisions/ADR-0002-site-design-integration.md) - Design system
- [GLOBAL_ARCHITECTURE.md](https://github.com/semantic-ops/dx/blob/main/docs/GLOBAL_ARCHITECTURE.md) - System landscape (future URL)
