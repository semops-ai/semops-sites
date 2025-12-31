# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role in Global Architecture

**Role:** Frontend (Product Delivery)

```
semops-sites [FRONTEND]
        │
        ├── Owns: Public-facing products
        │   - Public websites (semops.ai)
        │   - Deployed applications and APIs
        │   - Agentic endpoints (chatbots, data visualizations)
        │   - Static content and MDX pages
        │
        └── Depends on:
            - semops-core [INFRASTRUCTURE] - Schema, brand data
            - semops-publisher [PUBLISHING] - Blog content (MDX)
```

**Bounded Context:** Product Delivery - owns user-facing frontends and deployed applications.

## Quick Reference

```bash
# Development
npm run dev         # Start all apps via Turborepo
npm run build       # Production build
npm run lint        # ESLint check

# Local Supabase
npx supabase start  # Start local Supabase
npx supabase stop   # Stop local Supabase
npx supabase db reset  # Reset DB + run migrations + seed
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Monorepo | npm workspaces + Turborepo |
| Framework | Next.js (App Router) |
| UI | React, Tailwind CSS, ShadCN UI |
| Content | MDX (blog posts) |
| Database | Supabase PostgreSQL |
| Hosting | Vercel |

## Project Structure

```
semops-sites/
├── apps/
│   ├── timjmitchell/     # Personal site
│   └── semops/           # Product/consulting site
│       ├── src/
│       │   ├── app/      # Next.js App Router pages
│       │   ├── components/
│       │   └── lib/
│       ├── content/blog/ # MDX blog posts
│       └── public/
├── packages/
│   └── shared/           # Shared components (future)
├── supabase/
│   └── migrations/       # Schema changes
└── docs/
```

## Key Patterns

### Server vs Client Components

- **Server Components** (default): Fetch data, render HTML, no client JS
- **Client Components** (`'use client'`): Interactive elements, browser APIs

### MDX Blog Posts

```mdx
---
title: "Post Title"
date: "YYYY-MM-DD"
description: "Brief summary"
---

Markdown content with React components...
```

## Key Files

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - System architecture
- [docs/decisions/](docs/decisions/) - Architecture Decision Records

## Integration with semops-core

This repo consumes data from semops-core's Supabase instance:
- Brand/company data
- Resume schema
- Dynamic content

Ensure Supabase is running locally or configure production credentials.
