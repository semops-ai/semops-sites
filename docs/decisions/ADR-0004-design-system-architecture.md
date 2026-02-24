# ADR-0004: Design System Architecture

> **Status:** Complete
> **Date:** 2026-01-03
> **Related Issue:** [#26](https://github.com/semops-ai/semops-sites/issues/26)

---

## Executive Summary

Keep design systems app-specific rather than sharing via `packages/shared`. Each app (timjmitchell, semops) maintains its own components with distinct brand identity. Pattern sharing happens through documentation, not code coupling.

---

## Strategic Context: What Am I Trying to Do Here?

This project (SemOps / Project Ike) is driven by Tim Mitchell with multi-faceted goals:

### Professional Goals

1. **Credibility building**: 20+ years PM experience with deep data/ML expertise, now becoming an expert and leader in the AI/agentic space with a real point of view (not just random skills)

2. **Thought leadership potential**: As the project progressed, developed insights and solutions at the edge of current thinking - possibly novel - which could elevate profile and turn into something more

3. **Learning through building**: Create hypotheses and test them by:
 - Building solutions in a private multi-repo architecture
 - Getting feedback from professional community
 - Continuously acquiring and processing new information

### Web Property Strategy

The web properties serve different but complementary purposes:

| Property | Role | Audience |
|----------|------|----------|
| **timjmitchell.com** | Personal brand + career showcase | Recruiters, peers, curious visitors |
| **semops.ai** | SemOps methodology platform | Companies interested in the approach |
| **GitHub/SemOps-ai** | Technical proof + open source | Anyone wanting to verify "can he build?" |
| **LinkedIn** | Professional network + distribution | Connections, recruiters |

### Desired Outcomes (keeping optionality)

- **Path A**: SemOps establishes credibility → lands great full-time executive role
- **Path B**: SemOps methodology gains traction → consulting business thrives
- **Path C**: SemOps becomes recognized concept → thought leadership position

The goal is **optionality** - credibility creates leverage, leverage creates choice.

---

## Technical Context

The semops-sites monorepo contains two distinct web properties:

| App | Purpose | Brand Identity |
|-----|---------|----------------|
| **timjmitchell** | Personal brand + career showcase | Warm/personal, sky blue, serif headings |
| **semops** | SemOps methodology platform | Professional/technical, forest green, mono headings |

Both apps need similar structural components (nav, footer, page layouts) but with different visual treatments.

### Options Considered

1. **Shared components via `packages/shared`** - Single source of truth, parameterized by theme
2. **App-specific components** - Each app owns its components, patterns documented
3. **Hybrid** - Share utilities only, keep visual components app-specific

---

## Decision

**Option 3: Hybrid approach**

- **Share via `packages/shared`**: Pure utilities with no visual dependencies
 - `cn` function (class name merger)
 - Date formatting utilities
 - MDX utilities

- **Keep app-specific**: All visual components
 - Layout components (PageLayout, PageHeader, Section)
 - Navigation (nav.tsx)
 - Footer (footer.tsx)
 - CSS tokens and globals

- **Document patterns**: Living reference in `docs/DESIGN_SYSTEM.md`

---

## Rationale

### Why not share visual components?

1. **Different brand identities require different treatments**
 - Colors: Sky blue (TJM) vs forest green (semops)
 - Typography: Serif headings (TJM) vs mono headings (semops)
 - Tone: Warm/personal vs professional/technical

2. **Low duplication cost**
 - Components are simple (nav, footer, layout wrappers)
 - Copying 100 lines is cheaper than abstraction complexity
 - No version coordination needed between apps

3. **Independent evolution**
 - Each site can evolve without breaking the other
 - No shared component API to maintain
 - A/B testing and experimentation are simpler

### Why share utilities?

1. **No visual dependencies** - Pure functions don't carry brand baggage
2. **DRY for logic** - `cn` is identical everywhere
3. **Single test suite** - Utility behavior is consistent

---

## Implementation

### Pattern Sharing via Documentation

Instead of code abstraction, document patterns in `docs/DESIGN_SYSTEM.md`:

- Breakpoint strategy (mobile-first, `md:` as primary)
- Spacing scale (Tailwind defaults)
- Container approach (`container mx-auto px-4` + max-width)
- Responsive patterns (flex-col → flex-row, hidden/shown)

Developers copy patterns and adapt to app's brand system.

### Component Showcase

Each app maintains a `/components` dev route showing:

- Typography at all levels
- Color palette swatches
- Custom CSS classes (`.tag`, `.meta`, `.divider`)
- Layout component demos
- Responsive behavior examples

This provides living documentation without Storybook overhead.

### Viewport Indicator (Dev Mode)

Add a fixed indicator showing current breakpoint:

```tsx
{process.env.NODE_ENV === 'development' && (
 <div className="fixed bottom-4 right-4 bg-black text-white text-xs px-2 py-1 rounded z-50">
 <span className="sm:hidden">XS</span>
 <span className="hidden sm:inline md:hidden">SM</span>
 <span className="hidden md:inline lg:hidden">MD</span>
 <span className="hidden lg:inline xl:hidden">LG</span>
 <span className="hidden xl:inline 2xl:hidden">XL</span>
 <span className="hidden 2xl:inline">2XL</span>
 </div>
)}
```

---

## Consequences

### Positive

- Clean separation of brand identities
- Simple mental model (each app is self-contained)
- No abstraction overhead or version coordination
- Easy to delete one app without affecting the other
- Component showcase serves as living documentation

### Negative

- Some code duplication (layout structure, responsive patterns)
- Improvements in one app don't automatically propagate
- Must manually keep documentation in sync

### Mitigations

- Document patterns clearly so copying is easy
- Review both apps when updating shared patterns
- Keep component showcase up to date

---

## Related Documents

- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) - Pattern reference
- [ADR-0002: Site Design Integration](ADR-0002-site-design-integration.md) - Original design decisions

---

**Document Status:** Complete
**Maintainer:** Tim Mitchell
