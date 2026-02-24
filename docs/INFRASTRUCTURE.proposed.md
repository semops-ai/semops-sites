# Sites Infrastructure (Proposed)

> **Status:** Proposed (WIP)
> **Date:** 2025-12-11
> **Related ADR:** [ADR-0001: Semantic-Ops Migration](https://github.com/semops-ai/semops-dx-orchestrator/blob/main/docs/decisions/ADR-0001-semops-organization-migration.md)

This document defines the **proposed** infrastructure after migration to the `semantic-ops` organization.

---

## Key Changes from Current Infrastructure

1. **GitHub URL:** `github.com/timjmitchell/resumator` → `github.com/semantic-ops/sites`
2. **Local path:** ` → `
3. **Vercel project:** May need reconfiguration after transfer

---

## Overview

Sites uses a serverless architecture with local development via Docker.

| Environment | Database | Hosting | Status |
|-------------|----------|---------|--------|
| **Development** | Local Supabase (Docker) | `npm run dev` | Active |
| **Production** | Supabase Cloud | Vercel | Deployed |

---

## Local Development

### Prerequisites

- Node.js 18+
- Docker Desktop
- Git

### Services (from `supabase/config.toml`)

| Service | Port | Purpose |
|---------|------|---------|
| Next.js Dev | 3000 | Application |
| Supabase API | 54321 | REST/GraphQL API |
| PostgreSQL | 54322 | Database (direct connection) |
| Supabase Studio | 54323 | Database UI |
| Inbucket | 54324 | Email testing UI |
| Analytics | 54327 | Local analytics backend |

### Quick Start

```bash
# Clone (after migration)
git clone https://github.com/semantic-ops/sites.git 
cd 

# Install dependencies
npm install

# Start local Supabase
npx supabase start

# Start dev server
npm run dev
```

### Database Commands

```bash
# Start/stop Supabase
npx supabase start
npx supabase stop

# Reset database (migrations + seed)
npx supabase db reset

# Create new migration
npx supabase migration new <name>

# View database status
npx supabase status
```

---

## Production (Vercel)

### Deployment

| Setting | Value |
|---------|-------|
| **Project** | sites (TBD - may change after transfer) |
| **Organization** | semantic-ops |
| **Production URL** | TBD after migration |
| **Custom Domain** | timjmitchell.com, semops.ai |
| **Node Version** | 24.x |
| **Framework** | Next.js (auto-detected) |

### Deployment Trigger

- Auto-deploy on push to `main` branch
- Preview deployments for pull requests

### Manual Deploy

```bash
vercel # Deploy to preview
vercel --prod # Deploy to production
```

---

## Environment Variables

### Local Development (`.env.local`)

Created automatically by `npx supabase start`:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<local-service-key>
```

### Production (Vercel Dashboard)

| Variable | Purpose | Public? |
|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Database API endpoint | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key (RLS enforced) | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key (bypasses RLS) | No |

**Note:** `NEXT_PUBLIC_` prefix exposes variables to browser code.

---

## Database (Supabase)

### Production Configuration

| Setting | Value |
|---------|-------|
| **Project** | TBD |
| **Region** | TBD |
| **Plan** | Free / Pro |

### Schema Management

Migrations are version-controlled in `supabase/migrations/`:

```text
supabase/
├── config.toml # Supabase configuration
├── migrations/ # SQL migration files
│ └── *.sql
└── seed.sql # Demo/test data
```

### Row Level Security

All tables use RLS:

```sql
-- Public read access
CREATE POLICY "Public read" ON positions FOR SELECT USING (true);

-- No INSERT/UPDATE/DELETE policies = denied by default
```

---

## Edge/CDN (Cloudflare)

### Configuration

| Setting | Value |
|---------|-------|
| **Domains** | timjmitchell.com, semops.ai |
| **SSL Mode** | Full (Strict) |
| **Bot Fight Mode** | On |
| **Security Level** | Medium |
| **Always Use HTTPS** | On |

### DNS Records

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | @ | cname.vercel-dns.com | Proxied |
| CNAME | www | cname.vercel-dns.com | Proxied |

---

## Monitoring

### Vercel

- **Analytics** - Page views, web vitals
- **Speed Insights** - Performance metrics
- **Logs** - Function logs, errors

### Supabase

- **Dashboard** - Query performance, API usage
- **Logs** - Database logs, auth events

---

## Security Headers

Configured in `next.config.ts`:

```typescript
const securityHeaders = [
 { key: 'X-DNS-Prefetch-Control', value: 'on' },
 { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
 { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
 { key: 'X-Content-Type-Options', value: 'nosniff' },
 { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
];
```

---

## Migration Checklist

### Pre-Migration

- [ ] Document current Vercel project settings
- [ ] Export environment variables
- [ ] Note any custom domain configurations

### During Migration

- [ ] Transfer repo to `semantic-ops` org
- [ ] Rename to `sites`
- [ ] Update local clone: `mv 
- [ ] Update git remote: `git remote set-url origin https://github.com/semantic-ops/sites.git`

### Post-Migration

- [ ] Verify Vercel auto-detects new repo location (or reconfigure)
- [ ] Update custom domain settings if needed
- [ ] Test deployment pipeline
- [ ] Update CI/CD if any

---

## Related Documents

- [INFRASTRUCTURE.md](INFRASTRUCTURE.md) - Current stable version
- [ARCHITECTURE.proposed.md](ARCHITECTURE.proposed.md) - Proposed architecture
- [STACK-OVERVIEW.md](STACK-OVERVIEW.md) - Technology details
