# semops-sites

[![GitHub](https://img.shields.io/badge/org-semops--ai-blue)](https://github.com/semops-ai)
[![Website](https://img.shields.io/badge/web-semops.ai-green)](https://semops.ai)

**Public-facing websites and deployed applications** for the SemOps ecosystem.

## What is This?

`semops-sites` is the **frontend/deployment layer** for SemOps. It contains public websites, deployed applications, and agentic endpoints that make semantic operations accessible to users.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Monorepo | npm workspaces + Turborepo |
| Framework | Next.js (App Router) |
| UI | React, Tailwind CSS, ShadCN UI |
| Content | MDX (blog posts) |
| Database | Supabase PostgreSQL |
| Hosting | Vercel |

## Quick Start

```bash
# Setup
npm install
npx supabase start  # Start local Supabase

# Development
npm run dev         # Start all apps via Turborepo

# Build
npm run build       # Production build
npm run lint        # ESLint check
```

## Project Structure

```
semops-sites/
├── apps/
│   ├── timjmitchell/     # Personal site
│   └── semops/           # Product/consulting site
│       ├── src/
│       │   ├── app/      # Next.js App Router
│       │   ├── components/
│       │   └── lib/
│       ├── content/blog/ # MDX posts
│       └── public/
├── packages/
│   └── shared/           # Shared components
├── supabase/
│   └── migrations/       # Schema changes
└── docs/
```

## Role in Architecture

```
semops-dx-orchestrator [PLATFORM/DX]
        │
        ▼
semops-core [SCHEMA/INFRASTRUCTURE]
        │
        │  Provides: Schema, brand data, entities
        │
        ├───────────────────────┐
        │                       │
        ▼                       ▼
semops-publisher           semops-sites  ← This repo
        │                       │
        │  Provides: Content    │  Owns: Deployed frontends
        └───────────────────────┘
```

## Key Features

- **Server-Side Rendering** - Fast initial loads, SEO-friendly
- **MDX Blog** - Markdown with React components
- **Supabase Integration** - Dynamic data from shared schema
- **Monorepo Architecture** - Shared code across sites

## Documentation

- [CLAUDE.md](CLAUDE.md) - AI agent instructions
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - System architecture
- [docs/decisions/](docs/decisions/) - Architecture Decision Records

## Related Repositories

| Repository | Role | Description |
|------------|------|-------------|
| [semops-dx-orchestrator](https://github.com/semops-ai/semops-dx-orchestrator) | Platform/DX | Process, global architecture |
| [semops-core](https://github.com/semops-ai/semops-core) | Schema/Infrastructure | Knowledge base, shared services |
| [semops-publisher](https://github.com/semops-ai/semops-publisher) | Publishing | Content workflow |
| [semops-docs](https://github.com/semops-ai/semops-docs) | Documents | Theory, framework docs |
| [semops-data](https://github.com/semops-ai/semops-data) | Product | Data utilities |

## Contributing

This is currently a personal project by Tim Mitchell. Contributions are welcome once the public release is complete.

## License

[TBD - License to be determined for public release]
