# Vercel Deployment Runbook

Deployment patterns and troubleshooting for Vercel, especially with monorepos.

## Quick Deploy (CLI)

```bash
# Single-app repo
vercel --prod --yes

# Monorepo - from app directory
cd apps/[app-name]
vercel --prod --yes
```

First deploy links the project. Subsequent deploys are faster with cached dependencies.

## Monorepo Structure Issue

**Problem:** Vercel's web UI monorepo picker may not show certain subdirectories (e.g., `apps/`) when creating a new project.

**Cause:** Unknown - possibly framework detection or Turborepo config issue.

**Solution:** Use the Vercel CLI instead of the web UI for initial project setup.

```bash
# From the app directory (not repo root)
cd apps/my-app
vercel --prod --yes
```

The CLI:

1. Auto-detects framework from config files
2. Creates the project in Vercel
3. Links it locally (creates `.vercel/` directory)
4. Deploys to production

After initial CLI setup, the project appears in the Vercel dashboard and can be managed via UI.

## Project Configuration

For explicit framework detection, add a `vercel.json`:

```json
{
 "framework": "nextjs"
}
```

## Git Integration

After CLI deployment, you can optionally connect Git for auto-deploys:

1. Go to Vercel Dashboard > Project > Settings > Git
2. Connect repository
3. Set Root Directory to `apps/[app-name]` (for monorepos)

Or continue using CLI deploys - both work fine.

## Environment Variables

Set via Vercel Dashboard or CLI:

```bash
vercel env add VARIABLE_NAME production
```

## Troubleshooting

### 401 on Preview URLs

Vercel's deployment protection may block preview URLs. Use the main alias (e.g., `project-name.vercel.app`) or disable protection in project settings.

### Build Failures

Check logs:

```bash
vercel inspect [deployment-url] --logs
```

### Redeploy

```bash
vercel redeploy [deployment-url]
```

Or from the app directory:

```bash
vercel --prod --yes
```

## Related

- [RUNBOOK.md](RUNBOOK.md) - Project-specific operations
