# Infrastructure

> **Repo:** `semops-sites`
> **Owner:** This repo owns and operates these services
> **Status:** ACTIVE
> **Version:** 2.0.0
> **Last Updated:** 2026-02-13

## Services

| Service | Purpose |
| ------- | ------- |
| timjmitchell.com (Next.js) | Personal site |
| semops.ai (Next.js) | SemOps site |
| Supabase API | REST/GraphQL API |
| PostgreSQL | Database (direct) |
| Supabase Studio | Database UI |
| Inbucket | Email testing |
| Analytics | Local analytics |

## Docker Configuration

semops-sites uses Docker only for local Supabase development (no custom Docker Compose).

### Starting Services

```bash
# Start local Supabase (includes PostgreSQL, API, Studio, Inbucket)
npx supabase start

# Stop local Supabase
npx supabase stop

# Reset database (runs migrations + seed)
npx supabase db reset

# Create new migration
npx supabase migration new <name>

# View status
npx supabase status
```

### Schema Management

Migrations in `apps/timjmitchell/supabase/migrations/`:

```text
supabase/
├── config.toml        # Supabase configuration
├── migrations/        # SQL migration files
│   └── *.sql
└── seed.sql           # Demo/test data
```

Row Level Security — all tables use RLS for public read access:

```sql
CREATE POLICY "Public read" ON positions FOR SELECT USING (true);
```

## Environment Variables

### Local Development (`.env.local`)

Created automatically by `npx supabase start`:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:<supabase-api>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<local-service-key>
```

### Production (Vercel Dashboard)

| Variable | Purpose | Public? |
| -------- | ------- | ------- |
| `NEXT_PUBLIC_SUPABASE_URL` | Database API endpoint | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key (RLS enforced) | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key (bypasses RLS) | No |

## Connection Patterns

How this repo connects to shared infrastructure:

| Service | Method | Details |
| ------- | ------ | ------- |
| Supabase (local) | Local dev server | Via `NEXT_PUBLIC_SUPABASE_*` env vars. Auto-configured by `npx supabase start` |
| Supabase (prod) | Supabase Cloud | Via Vercel env vars. RLS enforced for public access |
| semops-publisher | Git-based | Content ingested via `npm run ingest` from semops-publisher working copy |

## Node.js / TypeScript Stack

| Property | Value |
| -------- | ----- |
| **Node.js version** | 22.x |
| **Package manager** | npm workspaces + Turborepo |
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19, Tailwind CSS 4, ShadCN UI + Radix |
| **Content** | MDX via next-mdx-remote |
| **Charts** | Recharts |
| **Linter** | ESLint |
| **Test framework** | (not yet configured) |

### Key Dependencies

| Library | Purpose |
| ------- | ------- |
| `next-mdx-remote` | MDX processing for React Server Components |
| `rehype-prism-plus` | Build-time syntax highlighting (zero client JS) |
| `mermaid` | Diagram rendering (client-side, ~200KB) |
| `gray-matter` | Frontmatter parsing |
| `@supabase/supabase-js` | Database client |
| `recharts` | Data visualization |

### Setup

```bash
npm install        # Install all workspace dependencies
npm run dev        # Start all apps via Turborepo
npm run build      # Production build all apps
npm run lint       # ESLint check all apps
```

## Deployment (Vercel)

| App | Vercel Project | Domain | Status |
| --- | -------------- | ------ | ------ |
| timjmitchell | timjmitchell | timjmitchell.com | Active |
| semops | semops | semops.ai | Planned |

- Auto-deploy on push to `main` branch
- Preview deployments for pull requests

```bash
# Manual deploy (from app directory)
cd apps/[app-name]
vercel              # Preview
vercel --prod       # Production
```

## Edge/CDN (Cloudflare)

| Domain | Status |
| ------ | ------ |
| timjmitchell.com | Cloudflare DNS + SSL |
| semops.ai | Pending configuration |

| Setting | Value |
| ------- | ----- |
| SSL Mode | Full (Strict) |
| Bot Fight Mode | On |
| Security Level | Medium |
| Always Use HTTPS | On |

## Security

Security headers configured in `next.config.ts`:

| Header | Value |
| ------ | ----- |
| X-DNS-Prefetch-Control | on |
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload |
| X-Frame-Options | SAMEORIGIN |
| X-Content-Type-Options | nosniff |
| Referrer-Policy | origin-when-cross-origin |

Supabase access control: Row Level Security (RLS) on all tables, API key scoping (anon vs service role).

## Health Checks

| Service | Check | Command |
| ------- | ----- | ------- |
| Next.js (dev) | HTTP response | `curl <timjmitchell-dev>` / `curl <semops-dev>` |
| Supabase | Status output | `npx supabase status` |
| Vercel (prod) | Deployment status | `vercel ls` |

## Monitoring

### Vercel

- Analytics — Page views, web vitals
- Speed Insights — Performance metrics
- Logs — Function logs, errors

### Supabase

- Dashboard — Query performance, API usage
- Logs — Database logs, auth events

## Consumed By

| Repo | Services Used |
| ---- | ------------- |
| semops-publisher | Fonts (`packages/fonts/`), PDF templates (`packages/pdf-templates/`) |

## Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - This repo's architecture
- [STACK-OVERVIEW.md](STACK-OVERVIEW.md) - Detailed technology guide
