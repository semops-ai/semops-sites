# ADR-0006: Content Ingestion Pipeline

> **Status:** Complete
> **Date:** 2026-02-08
> **Related Issue:** [#52](https://github.com/semops-ai/semops-sites/issues/52)
> **Consolidates:** #50 (ingestion script), #51 (content type contracts)

---

## Context

Publisher-pr produces clean Markdown with embedded YAML frontmatter (the "content manifest" - see semops-publisher ADR-0014). Sites-pr needs to transform this content into MDX with surface-specific frontmatter for rendering on websites.

Previously, content transformation was either:
1. Manual MDX conversion (error-prone, inconsistent)
2. Publisher-pr's `generate_mdx.py` which baked in semops-sites concerns (tight coupling)

We needed a clear ownership boundary where:
- **Publisher-pr** owns content-level metadata (title, author, tags, status, etc.)
- **Sites-pr** owns surface-specific concerns (category, excerpt, MDX components, URL routing)

## Decision

Create a content ingestion script in semops-sites that transforms semops-publisher Markdown into semops-sites MDX.

### Ownership Boundary

| Concern | Publisher-PR | Sites-PR |
|---------|--------------|----------|
| Title, slug, author | Owns | Consumes |
| Tags, description | Owns | Consumes |
| Status, dates | Owns | Consumes (date_updated → date) |
| Hub/spoke structure | Owns | Consumes for routing |
| Category | — | Derives from tags |
| Excerpt | — | Maps from description |
| MDX components | — | Transforms (Mermaid → JSX) |
| URL routing | — | Owns |

### Frontmatter Mapping

**Blog posts:**
- `title` → `title`
- `author` → `author`
- `date_updated` → `date`
- `description` → `excerpt`
- `tags` → `tags`
- (derived from tags) → `category`

**Pages:**
- `title` → `title`
- `description` → `description` (or extracted from first paragraph)

### Content Transforms

1. **Mermaid code blocks** → `<MermaidDiagram chart={...} />` JSX component
2. **Relative .md links** → Site routes (e.g., `[text](why-semops.md)` → `[text](/about/why-semops)`)

### Category Derivation

Since `category` is required in semops-sites but not in semops-publisher, we derive it from tags:

```typescript
const CATEGORY_MAPPING = {
 'semops': 'Industry',
 'ai-integration': 'Industry',
 'career': 'Industry',
 'testing': 'Technical',
 'mdx': 'Technical',
 '_default': 'Industry',
};
```

First matching tag wins; CLI override available (`--category`).

### Hub/Spoke Routing

Pages use a hub/spoke pattern configured in the script:

```typescript
const HUB_ROUTE_CONFIG = {
 "what-is-semops": { route: "/about" },
 "framework": { route: "/framework" },
};
```

- Hub pages map to their configured route
- Spoke pages map to `{hubRoute}/{spokeSlug}`

## Consequences

### Positive

- **Clear ownership boundary** - Publisher-pr doesn't need to know about semops-sites's MDX requirements
- **Single source of truth** - Content authored once in semops-publisher, transformed as needed
- **Consistent transforms** - Mermaid and link conversion automated, reducing errors
- **Extensible** - New content types can be added by extending the script
- **Dry-run mode** - Preview changes before writing files

### Negative

- **Configuration in code** - Hub routes and category mappings are in the script, not a config file
- **Manual trigger** - Ingestion must be run manually (no CI/CD automation yet)
- **Overwrites existing files** - Running ingestion replaces manually-edited MDX files

### Risks

- **Drift between repos** - If semops-publisher changes manifest format, ingestion script needs updating
- **Category mapping maintenance** - New tags may not map to expected categories

## Implementation

- Script: `scripts/ingest-content.ts`
- Documentation: `docs/CONTENT_TYPES.md`
- CLI: `npm run ingest -- pages|blog <slug> --app <app> [--dry-run]`

## References

- [Publisher-pr ADR-0014: Content Manifest Conventions](https://github.com/semops-ai/semops-publisher/blob/main/docs/decisions/ADR-0014-content-manifest-conventions.md)
- [CONTENT_TYPES.md](../CONTENT_TYPES.md) - Detailed content type contracts
