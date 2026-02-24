# Semops.ai Information Architecture

> **Source of truth** for semops.ai site structure, routing, and content organization.
> Supersedes the site map in [ADR-0007](decisions/ADR-0007-semops-information-architecture.md).

## Navigation

Three items plus logo-as-home:

```
[SemOps logo → /] Framework Blog About
```

Footer mirrors nav, adds GitHub org and LinkedIn in "Connect" section.

## Site Map

```
/ HOME
 Hero: elevator pitch + CTA
 Three pillar cards → /framework/*
 Recent blog posts → /blog
 GitHub repos (external links)
 Email signup

/framework FRAMEWORK HUB (custom layout)
 Pillar overview cards
 Semantic Funnel (woven as context, not a section)
 Coming Soon / Core Insights teaser
 /framework/what-is-semops Landing page: "What is SemOps?"
 /framework/why-semops Landing page: "Why SemOps?"
 /framework/strategic-data Pillar page
 /framework/symbiotic-architecture Pillar page
 /framework/semantic-optimization Pillar page

/blog BLOG LISTING
 /blog/[slug] Blog post (MDX)

/about ABOUT (TBD — founder bio, contact)
 /about/how-i-got-here Origin story (future)
 /about/tim Bio, contact (future)

/whitepapers/[slug] WHITEPAPERS (no nav, no listing)
 Linked contextually from framework/blog
```

## Content Sources

| Route | Content Source | Type |
|-------|---------------|------|
| `/framework` | `apps/semops/src/app/framework/page.tsx` | Custom React page |
| `/framework/[slug]` | `content/pages/{slug}.mdx` | MDX via `getPage` |
| `/blog/[slug]` | `content/blog/{slug}.mdx` | MDX via `getPost` |
| `/whitepapers/[slug]` | `content/whitepapers/{slug}.mdx` | MDX via `getWhitepaper` |
| `/about` | `content/pages/what-is-semops.mdx` | MDX via `getPage` |

### Valid Framework Slugs

Defined in `apps/semops/src/app/framework/[pillar]/page.tsx`:

```typescript
const VALID_SLUGS = [
 'strategic-data',
 'symbiotic-architecture',
 'semantic-optimization',
 'what-is-semops',
 'why-semops',
] as const;
```

## Publisher-pr Hub/Spoke Mapping

Content authored in semops-publisher maps to semops-sites routes:

| Publisher-pr slug | Hub | Sites-pr route |
|-------------------|-----|----------------|
| `what-is-semops` | what-is-semops | `/framework/what-is-semops` |
| `why-semops` | what-is-semops | `/framework/why-semops` |
| `how-i-got-here` | what-is-semops | `/about/how-i-got-here` |
| `framework` | what-is-semops | `/framework` |
| `semantic-funnel` | what-is-semops | `/framework` (woven into hub) |
| `strategic-data` | — | `/framework/strategic-data` |
| `symbiotic-architecture` | — | `/framework/symbiotic-architecture` |
| `semantic-optimization` | — | `/framework/semantic-optimization` |

## Key Decisions

- **"What is" and "Why" are landing pages under `/framework/`**, not merged into `/about`. They're flat siblings of the pillar pages, accessible by URL and linkable from any module on the site.
- **`/about` is reserved for founder/personal content** (bio, origin story, contact). Currently still renders `what-is-semops.mdx` — needs migration.
- **Semantic Funnel is context, not a section.** It appears on the framework hub page as part of the overview, not as its own route.
- **No listing page for whitepapers.** Linked contextually from framework pages and blog posts.
- **GitHub is linked contextually** (home, framework pages, footer) — not a nav destination.

## Cross-Linking Convention

- **Framework pillar pages** → "Explore the technical docs →" linking to `github.com/semops-ai/semops-docs/...`
- **Home page** → GitHub module showcases key repos
- **Footer** → GitHub org link
