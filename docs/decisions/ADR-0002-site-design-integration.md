# ADR-0002: Site Design Integration

> **Status:** Complete
> **Date:** 2025-12-09 (updated 2025-12-11)
> **Related Issue:** 

## Executive Summary

Integrated design elements from Lovable prototypes into the Next.js site, established MDX blog functionality with syntax highlighting and diagram support, and defined a clean component architecture using Tailwind CSS with a forest green color palette.

## Context

The resumator site needed:
1. A cohesive visual design for the blog and landing pages
2. Working MDX blog with frontmatter support
3. A maintainable styling approach compatible with Next.js 16 and Tailwind 4
4. Code block syntax highlighting for technical content
5. Diagram support (Mermaid, future Excalidraw)

Two Lovable design prototypes were created:
- `timjmitchell/semops-design-v1` - Initial design exploration
- `timjmitchell/how-it-works` - Refined, minimal design (preferred)

## Decision

### Design System
Adopted the `how-it-works` design approach:
- **Fonts:** DM Sans (body) + JetBrains Mono (headings/code) via `next/font/google`
- **Color Palette:** Forest green primary (`hsl(152 32% 28%)`) with neutral foundation
- **Layout:** Clean prose container (`max-w-[680px]`) for readability
- **Components:** Minimal - `.tag`, `.meta`, `.divider` utility classes

### Architecture

- **Blog posts:** MDX files in `content/blog/*.mdx` with frontmatter
- **Styling:** CSS variables in `globals.css` with Tailwind utilities
- **Pages:** Server components with simple, readable markup

### Content Rendering

| Content Type | Approach | Why |
|--------------|----------|-----|
| **Code blocks** | `rehype-prism-plus` (build-time) | No client JS, fast rendering, standard Prism token classes |
| **Mermaid diagrams** | `<MermaidDiagram>` component (client) | Mermaid requires browser; component isolates client code |
| **Excalidraw** | SVG export via semops-publisher | Static output, no runtime dependency |

**Why not rehype-mermaid?** Requires Playwright (headless browser) - too heavy for this use case.

**Why not prism-react-renderer?** rehype-prism-plus works at build time with MDXRemote RSC, no client bundle.

### Key Files

```
src/
├── app/
│ ├── globals.css # Theme variables, Prism token colors
│ ├── layout.tsx # Font loading (DM Sans, JetBrains Mono)
│ ├── page.tsx # Home page
│ ├── blog/
│ │ ├── page.tsx # Blog listing
│ │ └── [slug]/page.tsx # Blog post (MDXRemote + rehype-prism)
│ ├── components/ # Component showcase (dev)
│ └── playground/ # Diagram/code testing (dev)
├── components/
│ ├── nav.tsx # Fixed header
│ ├── footer.tsx # Footer
│ ├── mermaid-diagram.tsx # Client-side Mermaid renderer
│ └── code-block.tsx # (unused - using rehype instead)
└── content/blog/
 ├── its-computers.mdx
 ├── sabbaticalism.mdx
 └── technical-playground.mdx # Test post with code/diagrams
```

## Consequences

### Positive

- Clean, maintainable codebase ("like 1998 again")
- MDX blog fully functional with syntax highlighting
- Code blocks render at build time (zero client JS for highlighting)
- Mermaid diagrams work in MDX with simple component syntax
- Design system is coherent and documented
- Easy to add new posts (just drop MDX files)

### Negative

- Tailwind 4 specificity required moving heading styles outside `@layer base`
- Some style drift between Lovable preview and Next.js render
- Font variable resolution required direct CSS instead of `@apply`
- Mermaid requires client-side JS (~200KB) - acceptable tradeoff for functionality

### Risks

- Future Lovable design updates may require manual reconciliation
- Tailwind 4 is newer, fewer community examples for edge cases
- semops-publisher must transform markdown to expected MDX format (see issue #33)

## Implementation Notes

### Color Variables (globals.css)

```css
:root {
 --primary: hsl(152 32% 28%); /* Forest green */
 --accent: hsl(152 20% 94%); /* Green tint for tags */
 --label: hsl(152 40% 38%); /* Section headers */
 --emphasis: hsl(0 45% 35%); /* Dark red accent */
 --muted-foreground: hsl(220 5% 46%); /* Secondary text */
}
```

### Utility Classes

```css
.tag { /* Category pills */ }
.meta { /* Date/author text */ }
.divider { /* Section separator */ }
.prose-container { /* max-w-[680px] centered */ }
```

### Syntax Highlighting Theme

GitHub-inspired light theme with site color integration:

| Token | Color | Example |
|-------|-------|---------|
| Strings | Forest green | `"hello"` |
| Keywords | Purple | `const`, `async` |
| Functions | Violet | `fetchUser` |
| Numbers | Red | `42`, `true` |
| Comments | Gray italic | `// note` |

### MDX Component Registration

```typescript
// src/app/blog/[slug]/page.tsx
const mdxOptions = {
 mdxOptions: {
 rehypePlugins: [[rehypePrism, { ignoreMissing: true }]],
 },
};

const mdxComponents = {
 MermaidDiagram, // <MermaidDiagram chart={`...`} />
};
```

## Future Work

- Add images to blog posts
- Build out career timeline page
- Connect semops-publisher pipeline for automated blog publishing (issue #33)
- Add copy button to code blocks
- Dark mode toggle

## References

- [Lovable GitHub integration](https://docs.lovable.dev/integrations/github)
- [how-it-works repo](https://github.com/timjmitchell/how-it-works)
- [Next.js App Router](https://nextjs.org/docs/app)
- [rehype-prism-plus](https://github.com/timlrx/rehype-prism-plus)
- [semops-publisher issue #33](https://github.com/semops-ai/semops-publisher/issues/33) - MDX output format specification
