# Runbook

> **Repo:** `semops-sites`
> **Status:** ACTIVE
> **Version:** 1.0.0
> **Last Updated:** 2025-12-17

## Quick Reference

| Task | Command |
|------|---------|
| Install dependencies | `npm install` |
| Start dev server | `npm run dev` |
| Start Supabase | `npx supabase start` |
| Stop Supabase | `npx supabase stop` |
| Reset database | `npx supabase db reset` |
| Deploy preview | `vercel` |
| Deploy production | `vercel --prod` |

## Local Development

### Starting the Environment

```bash
# 1. Install dependencies
npm install

# 2. Start local Supabase (creates .env.local automatically)
npx supabase start

# 3. Start dev server
npm run dev

# Access at http://localhost:3000
```

### Stopping Services

```bash
# Stop Supabase
npx supabase stop

# Stop with volume removal (clean slate)
npx supabase stop --no-backup
```

### Database Operations

```bash
# Check status
npx supabase status

# Reset (rerun migrations + seed)
npx supabase db reset

# Create new migration
npx supabase migration new <name>

# Apply migrations
npx supabase db push
```

## Deployment

### Preview Deployment

```bash
vercel
# Returns preview URL
```

### Production Deployment

```bash
vercel --prod
```

### Auto-Deploy

- Push to `main` → auto-deploys to production
- Pull requests → create preview deployments

## Common Issues

### Issue: Supabase won't start

**Symptoms:**
- `npx supabase start` hangs or fails
- Port conflicts

**Cause:**
- Docker not running
- Ports already in use (54321-54327)

**Fix:**
```bash
# Check Docker is running
docker info

# Check for port conflicts
lsof -i :54321

# Stop any existing Supabase
npx supabase stop

# Start fresh
npx supabase start
```

### Issue: Database connection failed

**Symptoms:**
- "Connection refused" errors
- Empty data on page

**Cause:**
- Supabase not running
- Wrong environment variables

**Fix:**
```bash
# Check Supabase status
npx supabase status

# Verify .env.local exists and has correct values
cat .env.local
```

### Issue: Build fails on Vercel

**Symptoms:**
- Deployment fails
- Type errors in build

**Cause:**
- TypeScript errors
- Missing environment variables in Vercel

**Fix:**
```bash
# Test build locally
npm run build

# Check Vercel environment variables in dashboard
# Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Issue: Styles not loading

**Symptoms:**
- Unstyled content
- Tailwind classes not applied

**Cause:**
- Build cache issues
- Tailwind config problems

**Fix:**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run dev
```

## External Service Notes

### Vercel

**Dashboard:**
- Project: resumator
- Team: tim-mitchells-projects-eb4a3d20

**Gotchas:**
- Node version must be 18+ (set in project settings)
- Environment variables must be set in dashboard for production
- `NEXT_PUBLIC_` prefix exposes variables to browser

### Supabase (Local)

**Ports:**
| Port | Service |
|------|---------|
| 54321 | API |
| 54322 | PostgreSQL |
| 54323 | Studio UI |
| 54324 | Inbucket (email testing) |

**Gotchas:**
- Local vs production databases are separate
- `npx supabase start` creates `.env.local` automatically
- Migrations in `supabase/migrations/` are version-controlled

### Supabase (Cloud - TBD)

**Setup required:**
- [ ] Create Supabase Cloud project
- [ ] Configure production environment variables in Vercel
- [ ] Set up connection pooling

### Cloudflare (TBD)

**Planned configuration:**
- Custom domain: timjmitchell.com
- SSL: Full (Strict)
- Bot Fight Mode: On

## Environment Variables

### Local (`.env.local`)

Auto-created by `npx supabase start`:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<local-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<local-service-key>
```

### Production (Vercel Dashboard)

| Variable | Required | Public |
|----------|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | No |

## Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [INFRASTRUCTURE.md](INFRASTRUCTURE.md) - Services and deployment
- [STACK-OVERVIEW.md](STACK-OVERVIEW.md) - Technology details
