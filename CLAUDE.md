# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role in Global Architecture

**Bounded Context:** Product Delivery (Frontend/Deployment)

```text
semops-sites [DELIVERY]
 │
 ├── Owns: Public-facing products
 │ - Public websites (timjmitchell.com, future semops.ai)
 │ - Deployed applications and APIs
 │ - Agentic endpoints (chatbots, data visualizations)
 │ - Static content and MDX pages
 │
 └── Coordinates with:
 - semops-core [MODEL] - Schema, Brand table (via shared Supabase)
 - semops-publisher [CONTENT] - Blog content (MDX via Git)
```

## Session Notes

Document work sessions tied to GitHub Issues in `docs/session-notes/`:

- **Format:** `ISSUE-NN-description.md` (one file per issue, append-forever)
- **Structure:** Date sections within file for chronological tracking
- **Index:** Update `docs/SESSION_NOTES.md` with new entries
- **When:** Working on any GitHub Issue, or ad-hoc exploratory sessions

## Quick Reference

```bash
# Development (from repo root)
npm run dev # Start all apps via Turborepo
npm run dev:timjmitchell # Start timjmitchell.com (port 3000)
npm run dev:semops # Start semops.ai (port 3001)
npm run build # Production build all apps
npm run lint # ESLint check all apps

# Content Ingestion (from semops-publisher)
npm run ingest -- pages <hub-slug> --app semops # Ingest page group
npm run ingest -- blog <slug> --app semops # Ingest blog post
npm run ingest -- whitepaper <slug> --app semops # Ingest whitepaper
npm run ingest -- <type> <slug> --dry-run # Preview without writing

# Local Supabase
npx supabase start # Start local Supabase (Studio: http://127.0.0.1:54323)
npx supabase stop # Stop local Supabase
npx supabase db reset # Reset DB + run migrations + seed

# Database
npx supabase migration new <name> # Create new migration
npx supabase db push # Push to production (when configured)
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Monorepo | npm workspaces + Turborepo |
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, ShadCN UI |
| Content | MDX (blog posts in `apps/*/content/blog/`) |
| Database | Supabase PostgreSQL (local dev) |
| Hosting | Vercel |

## Project Structure

```text
semops-sites/
├── apps/
│ ├── timjmitchell/ # timjmitchell.com (personal site)
│ │ └── ... # Minimal Next.js app
│ └── semops/ # semops.ai (product/consulting)
│ ├── src/
│ │ ├── app/ # Next.js App Router pages
│ │ ├── components/ # React components
│ │ └── lib/ # Utilities
│ ├── content/blog/ # MDX blog posts
│ └── public/ # Static assets
├── packages/
│ └── shared/ # Shared components, utils (future)
├── supabase/
│ ├── migrations/ # Schema changes (version controlled)
│ └── seed.sql # Demo/test data
├── docs/ # Shared documentation
├── turbo.json # Turborepo config
└── package.json # Workspace root
```

## Key Patterns

### Server vs Client Components

- **Server Components** (default): Fetch data, render HTML, no client JS
- **Client Components** (`'use client'`): Interactive elements, browser APIs

### Supabase Data Fetching

```typescript
// Server component
const supabase = await createClient;
const { data } = await supabase
 .from('positions')
 .select('*, company:companies(*), bullets:position_bullets(*)')
 .order('start_date', { ascending: false });
```

### MDX Blog Posts

```mdx
---
title: "Post Title"
date: "YYYY-MM-DD"
description: "Brief summary"
---

Markdown content with React components...
```

## Design System

- **Fonts:** DM Sans (body) + Space Mono (headings)
- **Colors:** Forest green primary (`hsl(152 32% 28%)`)
- **Layout:** Prose container (`max-w-[680px]`)

See [ADR-0002](docs/decisions/ADR-0002-site-design-integration.md) for details.

## Data Model

Resume data uses dimensional schema with Job as the atomic fact:

- `resume_job` - Fact table (one row per distinct role)
- `resume_job_bullet` - Experience atoms (composable content units)
- `resume_role`, `resume_skill`, `resume_platform` - Dimensions
- Bridge tables for many-to-many relationships

See [ADR-0001](docs/decisions/ADR-0001-resume-schema-design.md) for full schema.

## Deployment

See [docs/VERCEL_RUNBOOK.md](docs/VERCEL_RUNBOOK.md) for Vercel deployment patterns.

**Quick deploy:**

```bash
cd apps/[app-name]
vercel --prod --yes
```

Note: Use CLI for initial deploys - the Vercel web UI has issues detecting monorepo app directories.

## Key Files

- [docs/INFORMATION_ARCHITECTURE_SEMOPS.md](docs/INFORMATION_ARCHITECTURE_SEMOPS.md) - Semops.ai site map and routing
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - System architecture
- [docs/CONTENT_TYPES.md](docs/CONTENT_TYPES.md) - Content type contracts
- [docs/STACK-OVERVIEW.md](docs/STACK-OVERVIEW.md) - Detailed tech guide
- [docs/VERCEL_RUNBOOK.md](docs/VERCEL_RUNBOOK.md) - Vercel deployment patterns
- [docs/decisions/](docs/decisions/) - Architecture Decision Records
- [docs/session-notes/](docs/session-notes/) - Session logs by issue
