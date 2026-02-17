# Design System Reference

> **Purpose:** Living reference for responsive design patterns, breakpoints, and component conventions.

---

## Breakpoints

Using Tailwind's default breakpoints with mobile-first approach:

| Breakpoint | Min-width | Usage |
|------------|-----------|-------|
| (default)  | 0px       | Mobile phones (base styles) |
| `sm:`      | 640px     | Large phones, small tablets |
| `md:`      | 768px     | Tablets, small laptops (primary breakpoint) |
| `lg:`      | 1024px    | Laptops, desktops |
| `xl:`      | 1280px    | Large desktops |
| `2xl:`     | 1536px    | Extra large screens |

**Primary breakpoint: `md:`** - Most responsive changes happen here.

---

## Mobile-First Patterns

Always start with mobile styles, then add breakpoint modifiers:

### Text Sizing

```tsx
// Good: Mobile-first
className="text-lg md:text-xl lg:text-2xl"

// Bad: Desktop-first (harder to maintain)
className="lg:text-2xl md:text-xl text-lg"
```

### Spacing

```tsx
// Responsive padding
className="px-4 md:px-6 lg:px-8"
className="py-8 md:py-12"

// Responsive gaps
className="gap-4 md:gap-6 lg:gap-8"
```

### Grid Columns

```tsx
// Stack on mobile, columns on larger screens
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### Flex Direction

```tsx
// Column on mobile, row on desktop
className="flex flex-col md:flex-row"
```

### Hidden/Shown Elements

```tsx
// Hide on mobile, show on tablet+
className="hidden md:block"

// Show on mobile, hide on tablet+
className="block md:hidden"
```

---

## Spacing Scale

Using Tailwind's default spacing (1 unit = 0.25rem = 4px):

| Class | Size | Use Case |
|-------|------|----------|
| `p-2` / `m-2` | 0.5rem (8px) | Tight spacing, inline elements |
| `p-4` / `m-4` | 1rem (16px) | Standard component padding |
| `p-6` / `m-6` | 1.5rem (24px) | Card padding, section gaps |
| `p-8` / `m-8` | 2rem (32px) | Section padding (mobile) |
| `p-12` / `m-12` | 3rem (48px) | Section padding (desktop) |
| `p-16` / `m-16` | 4rem (64px) | Large section gaps |

**Vertical rhythm pattern:**

```tsx
// Section spacing
className="py-8 md:py-12"

// Component margin
className="mb-6 md:mb-8"
```

---

## Container Strategy

### Base Pattern

```tsx
// Standard container with horizontal padding
className="container mx-auto px-4"
```

### Width Variants

| Variant | Class | Width | Use Case |
|---------|-------|-------|----------|
| Narrow | `max-w-2xl` | ~672px | Blog posts, focused reading |
| Default | `max-w-4xl` | ~896px | Most pages |
| Wide | `max-w-6xl` | ~1152px | Dashboards, galleries |
| Full | `max-w-none` | 100% | Full-width sections |

### Implementation

```tsx
// PageLayout component pattern
<div className={cn(
  'container mx-auto px-4 py-12 md:py-16',
  width === 'narrow' && 'max-w-2xl',
  width === 'default' && 'max-w-4xl',
  width === 'wide' && 'max-w-6xl',
)}>
  {children}
</div>
```

---

## Typography

### Heading Hierarchy

```css
h1 { @apply text-2xl md:text-3xl font-bold tracking-tight; }
h2 { @apply text-xl md:text-2xl font-semibold; }
h3 { @apply text-lg md:text-xl font-semibold; }
h4 { @apply text-base md:text-lg font-medium; }
```

### Body Text

```css
body { @apply text-base leading-relaxed; }
p { @apply text-foreground; }
.text-muted { @apply text-muted-foreground; }
```

---

## Component Classes

### .tag

Small pill/badge for categories:

```css
.tag {
  @apply inline-flex w-fit text-xs font-medium px-2 py-0.5
         bg-accent text-accent-foreground rounded;
}
```

### .meta

Secondary text for dates, authors, metadata:

```css
.meta {
  @apply text-sm text-muted-foreground;
}
```

### .divider

Horizontal separator:

```css
.divider {
  @apply h-px bg-border my-8;
}
```

### .prose-container

Optimal reading width:

```css
.prose-container {
  @apply max-w-[680px] mx-auto;
}
```

---

## Common Responsive Patterns

### Fixed Header with Blur

```tsx
<header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
  <div className="container mx-auto px-4 flex h-16 md:h-20 items-center justify-between">
    {/* Nav content */}
  </div>
</header>
```

### Responsive Footer Grid

```tsx
<footer className="border-t py-12">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">{/* Brand */}</div>
      <div>{/* Links */}</div>
      <div>{/* Contact */}</div>
    </div>
  </div>
</footer>
```

### Card with Responsive Padding

```tsx
<div className="border rounded-lg p-4 md:p-6 hover:border-foreground/50 transition-colors">
  {/* Card content */}
</div>
```

### Flex to Grid Switch

```tsx
// Flex on mobile (stack), grid on desktop
<div className="flex flex-col md:grid md:grid-cols-2 gap-6">
  {/* Items */}
</div>
```

---

## DevTools Workflow

### Testing Responsive Behavior

1. Start dev server: `npm run dev:timjmitchell` or `npm run dev:semops`
2. Open browser DevTools (Cmd+Shift+I / Ctrl+Shift+I)
3. Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
4. Test at key breakpoints:
   - **375px** - iPhone SE (mobile baseline)
   - **768px** - iPad (tablet, `md:` breakpoint)
   - **1024px** - Laptop (`lg:` breakpoint)
   - **1440px** - Desktop

### What to Verify

- No horizontal scroll at any breakpoint
- Text remains readable (not too small on mobile, not too large on desktop)
- Touch targets are adequate (min 44x44px for buttons/links)
- Layout transitions smoothly between breakpoints
- No content clipping or overflow

### Viewport Indicator (Dev Mode)

Add to root layout for quick breakpoint visibility:

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

## Learning Resources

### How to Research Layouts

1. **Identify reference sites** - Find sites with similar purpose (portfolios, consulting sites)
2. **Use DevTools** - Inspect how they handle responsive behavior
3. **Document patterns** - Note what works and why, add to this file

### Key Questions When Reviewing Reference Sites

- How does the nav behave on mobile? (hamburger menu? simplified? always visible?)
- What's the max content width?
- How do cards/grids stack on mobile?
- What spacing is used between sections?
- How do they handle images responsively?

### Tailwind Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Container](https://tailwindcss.com/docs/container)

---

## App-Specific Notes

### timjmitchell.com

- **Tone:** Warm/personal
- **Primary color:** Sky blue (`hsl(199 89% 48%)`)
- **Typography:** Inter (body), Lora (serif headings), Plus Jakarta Sans (display)
- **Nav height:** `h-14 md:h-16` (slightly smaller, personal feel)

### semops.ai

- **Tone:** Professional/technical
- **Primary color:** Forest green (`hsl(152 32% 28%)`)
- **Typography:** DM Sans (body), JetBrains Mono (headings/code)
- **Nav height:** `h-16 md:h-20`

---

**Last Updated:** 2026-01-03
