# ADR-0005: Design System Asset Ownership

> **Status:** Complete
> **Date:** 2026-01-14
> **Related Issue:** [](https://github.com/semops-ai/semops-sites/issues/37)

## Executive Summary

Design system assets (fonts, PDF templates, color tokens, etc.) should live in semops-sites regardless of which repo consumes them. This establishes semops-sites as the owner of "how things look" while other repos own workflow and content.

## Context

PDF export functionality was implemented in semops-publisher (#48). The LaTeX templates currently live in `semops-publisher/templates/`, but they define:

- Brand typography (DM Sans, Inter, Lora, JetBrains Mono)
- Color palettes (forest green, sky blue, neutral technical)
- Layout and spacing conventions

Per GLOBAL_ARCHITECTURE.md:

- **semops-sites** owns: design system, fonts, visual identity
- **semops-publisher** owns: content workflow, processing scripts

The templates are design system assets, not content workflow assets.

## Decision

**All design system assets live in semops-sites**, organized by type:

```
semops-sites/packages/
├── fonts/ # Font files + manifest (existing)
├── pdf-templates/ # LaTeX templates (new)
│ ├── semops.latex
│ ├── timjmitchell.latex
│ └── technical.latex
└── (future)
 ├── email-templates/ # React Email templates
 └── design-tokens/ # Exported CSS variables, JSON tokens
```

Consumer repos reference these assets by path or symlink.

## Consequences

### Positive

- **Single source of truth** for brand styling
- **Consistency** - web and PDF output share the same design tokens
- **Clear ownership** - semops-sites owns visual identity, period
- **Cross-repo reuse** - any repo can consume design assets

### Negative

- **Cross-repo dependency** - semops-publisher script must reference external path
- **Coordination required** - changes need awareness across repos

### Risks

- Breaking changes to templates could affect semops-publisher without notice
- Path assumptions could break in Docker containers 

### Mitigations

- Document template paths in both repos
- For Docker: mount templates volume or copy at build time
- Consider publishing to npm package for versioned consumption (future)

## Implementation Plan

1. Create `packages/pdf-templates/` in semops-sites
2. Move templates from semops-publisher
3. Update semops-publisher's `export_pdf.py` to use new path
4. Update ARCHITECTURE.md in both repos
5. Test all three templates work
6. Update semops-publisher Docker setup (Issue #50)

## Session Log

### 2026-01-14

- Created ADR based on Issue #37 requirements
- Reviewed existing templates: semops, timjmitchell, technical
- Templates define fonts, colors, spacing - clearly design system assets
- Established pattern for future assets (email-templates, design-tokens)
- Created `packages/pdf-templates/` with README
- Moved templates from semops-publisher
- Updated `export_pdf.py` to use new path
- Added Pandoc Shaded environment support for syntax highlighting
- Updated ARCHITECTURE.md in both repos
- Tested all three templates successfully

## References

- [Issue #37](https://github.com/semops-ai/semops-sites/issues/37) - Move PDF templates
- [](https://github.com/semops-ai/semops-publisher/issues/48) - PDF export implementation
- [ADR-0002](ADR-0002-site-design-integration.md) - Site design system
- [GLOBAL_ARCHITECTURE.md](https://github.com/semops-ai/semops-dx-orchestrator/blob/main/docs/GLOBAL_ARCHITECTURE.md) - System landscape
