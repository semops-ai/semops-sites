# Stack Overview

A guide to understanding the technology stack for the semops-sites monorepo.

---

## The Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER                                   │
│  Renders HTML/CSS/JS, handles user interactions                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     VERCEL (Hosting)                             │
│  • Serves the website globally via CDN                           │
│  • Runs Next.js server-side code (serverless functions)          │
│  • Auto-deploys when code is pushed to GitHub                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SUPABASE (Database)                            │
│  • PostgreSQL database in the cloud                              │
│  • REST API auto-generated from your tables                      │
│  • Admin UI for data management (Supabase Studio)                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Concepts

### How Data Becomes a Web Page

**Historical approach (XML era):**
```
Database → XML export → XSLT stylesheet → HTML → Browser
```
Data was exported as XML, transformed via stylesheets, often on a separate application server.

**Modern approach (this stack):**
```
Database → JSON API → JavaScript renders HTML → Browser
```

There is no XML layer or transformation step. The flow is:

1. **PostgreSQL** stores structured data (tables, rows)
2. **Supabase** auto-generates a REST API that returns **JSON** (JavaScript Object Notation)
3. **Next.js** server-side code fetches that JSON
4. **React components** take JSON data and produce HTML directly
5. HTML is sent to the browser

The "backend" in this architecture means:
- **Database layer** - Supabase (PostgreSQL + auto-generated API)
- **Server-side rendering** - Next.js code running on Vercel's servers

There's no separate application server, no XML, no transformation engine. JavaScript itself produces HTML from data.

---

### Server-Side vs Client-Side Rendering

**The distinction:**
- **Server-side** - Code runs on Vercel's servers before sending HTML to browser
- **Client-side** - Code runs in the browser after page loads

**Why it matters:**
- Server-side rendering = search engines see complete content (good for SEO)
- Server-side rendering = users see content immediately (no loading spinners)
- Client-side = needed for interactivity (clicks, form input, animations)

**This project uses both:**
- **Server Components** (default) - Render on server, minimal JavaScript sent to browser
- **Client Components** (`'use client'`) - Interactive elements that need browser APIs

---

## Technology Layers

### 1. Next.js (Application Framework)

**Underlying concept:** Next.js is a **React framework** that provides structure, routing, and server-side capabilities that React alone doesn't have.

**Key patterns:**

**File-based routing** - The file system defines URL structure:
```
src/app/
├── page.tsx        → /
├── blog/
│   ├── page.tsx    → /blog
│   └── [slug]/
│       └── page.tsx → /blog/:slug (dynamic route)
```

**Layouts** - Shared UI that wraps child pages:
```tsx
// src/app/layout.tsx - wraps ALL pages
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Nav />          {/* Appears on every page */}
        {children}       {/* Page content inserted here */}
        <Footer />       {/* Appears on every page */}
      </body>
    </html>
  );
}
```

**Best practice:** Keep layouts lean. Heavy data fetching in layouts affects all child pages.

---

### 2. React (UI Library)

**Underlying concept:** React uses a **component model** - break UI into reusable, self-contained pieces. Each component manages its own state and renders based on that state.

**Core patterns:**

**Components** - Functions that return JSX (HTML-like syntax):
```tsx
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

// Usage: <Greeting name="Tim" />
```

**State** - Data that changes over time:
```tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

**Props** - Data passed from parent to child:
```tsx
// Parent passes data down
<Card item={item} isFirst={true} />

// Child receives it
function Card({ item, isFirst }) {
  return <div>{item.title}</div>;
}
```

**Best practice:** Data flows DOWN through props. If a child needs to change parent state, pass a callback function as a prop.

---

### 3. TypeScript (Type System)

**Underlying concept:** TypeScript adds **static typing** to JavaScript. Types are checked at compile time, catching errors before code runs.

**Why it matters:**
```typescript
// Without types - error discovered at runtime (in production!)
function greet(user) {
  return user.name.toUpperCase();  // crashes if user is null
}

// With types - error caught during development
function greet(user: User | null) {
  return user.name.toUpperCase();
  // TS Error: 'user' is possibly 'null'
}
```

**Key patterns:**

**Interfaces** - Define the shape of objects:
```typescript
interface Item {
  id: string;
  title: string;
  start_date: string;
  end_date: string | null;  // Union type: string OR null
}
```

**Generics** - Reusable type patterns:
```typescript
// Array of items
const items: Item[] = [];

// Supabase returns { data, error } with typed data
const { data } = await supabase.from('items').select('*');
```

**Best practice:** Define types in dedicated files (`src/types/`) and import where needed. Avoid `any` type - it defeats the purpose of TypeScript.

---

### 4. Tailwind CSS (Styling)

**Underlying concept:** **Utility-first CSS** - Instead of writing custom CSS classes, compose styles from small, single-purpose utilities.

**Traditional CSS approach:**
```css
/* styles.css */
.card {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```
```html
<div class="card">Content</div>
```

**Utility-first approach:**
```html
<div class="p-4 mb-4 rounded-lg bg-white shadow">Content</div>
```

**Common utilities:**
| Utility | CSS Property |
|---------|-------------|
| `p-4` | padding: 1rem |
| `mb-4` | margin-bottom: 1rem |
| `text-lg` | font-size: 1.125rem |
| `font-bold` | font-weight: 700 |
| `rounded-lg` | border-radius: 0.5rem |
| `bg-white` | background-color: white |
| `hover:bg-gray-100` | background on hover |
| `md:text-xl` | larger text on medium+ screens |

**Responsive design:** Prefix with breakpoint (`sm:`, `md:`, `lg:`, `xl:`):
```html
<div class="text-base md:text-lg lg:text-xl">
  <!-- Small: 16px, Medium: 18px, Large: 20px -->
</div>
```

**Best practice:** Use the design system tokens (spacing scale, colors) rather than arbitrary values. This maintains consistency.

---

### 5. Supabase (Backend-as-a-Service)

**Underlying concept:** Supabase provides a **PostgreSQL database** with an auto-generated REST API. Instead of building a backend, query the database directly from your app.

**How it works:**
```
Your App  ──▶  Supabase API  ──▶  PostgreSQL Database
             (auto-generated)
```

**Query patterns:**

```typescript
const supabase = await createClient();

// Simple select
const { data } = await supabase
  .from('items')
  .select('*');

// With joins (foreign key relationships)
const { data } = await supabase
  .from('items')
  .select(`
    *,
    category:categories(*),
    details:item_details(*)
  `);

// With filters
const { data } = await supabase
  .from('items')
  .select('*')
  .eq('is_active', true)
  .order('created_at', { ascending: false });
```

**Row Level Security (RLS):**
PostgreSQL feature that controls access at the row level. Example policies:
```sql
-- Anyone can read
CREATE POLICY "Public read" ON items FOR SELECT USING (true);

-- No policy for INSERT/UPDATE/DELETE = denied
```

**Best practice:** Always enable RLS on tables. Even for public data, explicit policies document your security model.

---

### 6. Component Libraries (ShadCN UI + Radix)

**Underlying concepts:**

**Headless UI** - Components that handle behavior (keyboard navigation, focus management, ARIA attributes) without styling. You add the visual design.

**Radix UI** provides headless primitives:
- Accessible by default (screen readers, keyboard navigation)
- Handles complex interactions (dropdowns, modals, tooltips)
- No opinions on styling

**ShadCN UI** adds:
- Pre-styled versions of Radix components
- Tailwind-based styling
- Copy-paste into your codebase (you own the code)

**Why copy-paste instead of npm install?**
- Full control over component code
- No version conflicts
- Customize without fighting the library

**Location:** `src/components/ui/` contains the base components

---

### 7. MDX (Content Format)

**Underlying concept:** MDX combines **Markdown** (simple content formatting) with **JSX** (React components), allowing rich interactive content in documentation or blog posts.

**Standard Markdown:**
```markdown
# Heading
This is a paragraph with **bold** and *italic*.
- List item
```

**MDX extends this:**
```mdx
# Heading

<CustomChart data={someData} />

Regular markdown continues...

<Callout type="warning">
  This is a React component embedded in markdown
</Callout>
```

**Frontmatter** - Metadata at the top of MDX files:
```mdx
---
title: "Post Title"
date: "2025-01-15"
description: "Brief summary"
---

Content starts here...
```

**Best practice:** Keep MDX files focused on content. Complex logic belongs in components, not inline in MDX.

---

## Project Structure

```
semops-sites/
├── apps/
│   ├── timjmitchell/              # timjmitchell.com
│   │   ├── src/
│   │   │   ├── app/               # Next.js routes (pages)
│   │   │   │   ├── layout.tsx     # Root layout
│   │   │   │   ├── page.tsx       # Homepage (/)
│   │   │   │   ├── globals.css    # Global styles
│   │   │   │   └── blog/
│   │   │   │       ├── page.tsx       # /blog
│   │   │   │       └── [slug]/page.tsx # /blog/:slug
│   │   │   │
│   │   │   ├── components/        # React components
│   │   │   │   ├── ui/            # Base UI components (ShadCN)
│   │   │   │   └── *.tsx          # Feature components
│   │   │   │
│   │   │   ├── lib/               # Utility functions
│   │   │   │   ├── utils.ts       # General helpers
│   │   │   │   ├── mdx.ts         # Content loading
│   │   │   │   └── supabase/      # Database clients
│   │   │   │
│   │   │   ├── content/blog/      # MDX blog posts
│   │   │   │
│   │   │   └── types/             # TypeScript definitions
│   │   │
│   │   └── supabase/
│   │       ├── config.toml        # Local dev config
│   │       ├── migrations/        # Schema changes (version controlled)
│   │       └── seed.sql           # Initial/test data
│   │
│   └── semops/                    # semops.ai
│       ├── src/app/               # Next.js routes
│       ├── content/               # MDX content (blog, pages, whitepapers)
│       └── public/                # Static assets
│
├── packages/
│   ├── fonts/                     # Centralized font infrastructure
│   ├── pdf-templates/             # LaTeX templates for PDF export
│   └── shared/                    # Shared components and utilities
│
├── public/                        # Static assets (images)
├── package.json                   # Dependencies
├── next.config.ts                 # Next.js config
└── tsconfig.json                  # TypeScript config
```

---

## Data Flow

### Content Rendering Flow

```
1. User visits /blog/[slug]
           │
           ▼
2. Next.js runs page component on SERVER
           │
           ▼
3. Component loads MDX content from filesystem
           │
           ▼
4. gray-matter parses frontmatter
           │
           ▼
5. MDXRemote renders content with custom components
           │
           ▼
6. Server sends complete HTML to browser
           │
           ▼
7. React "hydrates" - attaches event handlers
           │
           ▼
8. Interactive components (MermaidDiagram, etc.) activate
```

---

## Environment Configuration

**Environment variables** separate configuration from code:

| Variable | Purpose | Public? |
|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Database API endpoint | Yes (in browser) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key | Yes (in browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key | No (server only) |

**Naming convention:** `NEXT_PUBLIC_` prefix exposes to browser code.

**Local development:** `.env.local` (gitignored)
**Production:** Vercel Dashboard → Settings → Environment Variables

**Best practice:** Never commit secrets. Use `.env.local` for local development and platform environment variables for production.

---

## Deployment Pipeline

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Develop    │    │    GitHub    │    │    Vercel    │
│              │    │              │    │              │
│ Edit code    │───▶│ Push commit  │───▶│ Detect push  │
│ npm run dev  │    │ to main      │    │ Run build    │
│ Test locally │    │              │    │ Deploy       │
└──────────────┘    └──────────────┘    └──────────────┘
```

**Vercel build process:**
1. Clone repo
2. Install dependencies (`npm install`)
3. Run build (`npm run build`)
4. Deploy to global CDN

**Rollback:** Previous deployments are preserved. One click to revert.

---

## Database Migrations

**Underlying concept:** **Migrations** are version-controlled schema changes. Instead of manually altering the database, write SQL files that can be applied consistently across environments.

```
migrations/
├── 001_initial_schema.sql    # Initial tables
├── 002_add_skills.sql         # Add skills table
└── 003_add_projects.sql       # Add projects table
```

**Commands:**
```bash
# Create new migration
npx supabase migration new add_skills

# Apply migrations locally
npx supabase db reset

# Push to production
npx supabase db push
```

**Best practice:** Never edit the database schema manually in production. Always use migrations so changes are tracked and reproducible.

---

## Data Visualization (Plotly)

This project includes Plotly for interactive data visualization, designed to integrate with Python/Jupyter data science workflows.

### Components Available

**`InteractiveChart`** - For charts with dimension switching:
```tsx
import { InteractiveChart } from '@/components/charts';

<InteractiveChart
  data={myData}
  xField="date"
  yDimensions={[
    { value: 'revenue', label: 'Revenue ($)' },
    { value: 'users', label: 'Active Users' },
  ]}
  title="Growth Metrics"
  chartType="line"
/>
```

**`PlotlyChart`** - For direct Python-exported figures:
```tsx
import { PlotlyChart } from '@/components/charts';
import chartSpec from '@/data/my-chart.json';

<PlotlyChart data={chartSpec.data} layout={chartSpec.layout} />
```

### Python to Web Workflow

**1. Create visualization in Python:**
```python
import plotly.express as px
import json

# Create your figure
fig = px.line(df, x='date', y='value', title='My Analysis')

# Export to JSON
fig_dict = fig.to_dict()
with open('my-chart.json', 'w') as f:
    json.dump({
        'data': fig_dict['data'],
        'layout': fig_dict['layout']
    }, f)
```

**2. Place JSON in project:**
```
src/data/my-chart.json
```

**3. Use in MDX blog post:**
```mdx
---
title: "My Data Analysis"
date: "2025-01-15"
description: "Interactive analysis of..."
---

import { PlotlyChart } from '@/components/charts';
import chartSpec from '@/data/my-chart.json';

# Analysis Results

Here's what I found:

<PlotlyChart data={chartSpec.data} layout={chartSpec.layout} />

The data shows...
```

### Interactive Features (Built-in)

Plotly provides these interactions automatically:
- **Zoom** - Click and drag to zoom, double-click to reset
- **Pan** - Shift + drag to pan
- **Hover** - See data values on hover
- **Export** - Download as PNG from toolbar
- **Select** - Box or lasso select data points

### Adding Custom Controls

For user-controlled dimension switching, filtering, etc.:

```tsx
'use client';
import { useState } from 'react';
import { PlotlyChart } from '@/components/charts';

export function MyCustomViz({ data }) {
  const [metric, setMetric] = useState('revenue');
  const [timeRange, setTimeRange] = useState('1Y');

  const filteredData = filterByTimeRange(data, timeRange);

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <select value={metric} onChange={e => setMetric(e.target.value)}>
          <option value="revenue">Revenue</option>
          <option value="users">Users</option>
        </select>
        <select value={timeRange} onChange={e => setTimeRange(e.target.value)}>
          <option value="1M">1 Month</option>
          <option value="1Y">1 Year</option>
          <option value="ALL">All Time</option>
        </select>
      </div>
      <PlotlyChart data={buildPlotData(filteredData, metric)} />
    </div>
  );
}
```

---

## Security Configuration

This site uses a layered security approach with Cloudflare at the edge and Vercel at the application layer.

### Architecture Overview

```
User Request
     │
     ▼
┌─────────────────────────────────────┐
│           CLOUDFLARE                 │
│  • DDoS protection (automatic)       │
│  • Bot management                    │
│  • WAF rules                         │
│  • Rate limiting                     │
│  • SSL/TLS termination               │
└─────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│             VERCEL                   │
│  • Edge middleware                   │
│  • Serverless function limits        │
│  • Environment variable protection   │
│  • Preview deployment auth           │
└─────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│            SUPABASE                  │
│  • Row Level Security (RLS)          │
│  • API key scoping                   │
│  • Connection pooling                │
└─────────────────────────────────────┘
```

### Cloudflare Settings (Edge Protection)

| Setting | Recommended Value | Purpose |
|---------|-------------------|---------|
| SSL/TLS Mode | Full (Strict) | End-to-end encryption with certificate validation |
| Bot Fight Mode | On | Challenge known bot signatures |
| Security Level | Medium | Adjusts CAPTCHA threshold based on threat score |
| Browser Integrity Check | On | Blocks requests with suspicious headers |
| Always Use HTTPS | On | Redirect HTTP to HTTPS |

**Rate Limiting Rules:**
```
Path: /api/*
Rate: 100 requests/minute per IP
Action: Challenge (CAPTCHA)
```

**WAF Rules (Managed Rules):**
- OWASP Core Ruleset - blocks SQL injection, XSS, etc.
- Cloudflare Managed Ruleset - known attack patterns

### Vercel Settings (Application Layer)

**Project Settings:**
- Enable "Vercel Authentication" for preview deployments
- Configure allowed deployment domains

**Security Headers (next.config.ts):**
```typescript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

// In next.config.ts:
async headers() {
  return [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ];
}
```

### Supabase Security

**Row Level Security (RLS)** - Controls database access:
```sql
-- Public tables: explicit read policy
CREATE POLICY "Public read" ON items FOR SELECT USING (true);

-- No INSERT/UPDATE/DELETE policies = denied by default

-- Authenticated-only example:
CREATE POLICY "Auth read" ON private_data
  FOR SELECT USING (auth.role() = 'authenticated');
```

**API Key Scoping:**
| Key Type | Exposed To | Capabilities |
|----------|------------|--------------|
| `anon` key | Browser | Only operations allowed by RLS policies |
| `service_role` key | Server only | Bypasses RLS (admin access) |

**Best practice:** Never expose `service_role` key to the browser. Use it only in server-side code.

### Content Security Policy (CSP)

For sites with interactive content (charts, embeds), configure CSP carefully:

```typescript
{
  key: 'Content-Security-Policy',
  value: `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.plot.ly;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob:;
    font-src 'self';
    connect-src 'self' *.supabase.co;
    frame-ancestors 'none';
  `.replace(/\s{2,}/g, ' ').trim()
}
```

Note: Plotly requires `unsafe-eval` for chart rendering. This is a known tradeoff.

### Checklist Before Launch

- [ ] Cloudflare SSL mode set to Full (Strict)
- [ ] Bot Fight Mode enabled
- [ ] Rate limiting configured for API routes
- [ ] Security headers configured in next.config.ts
- [ ] Vercel preview deployments password-protected
- [ ] No secrets in client-side code (check for `NEXT_PUBLIC_` prefix misuse)
- [ ] RLS enabled on all Supabase tables
- [ ] Service role key only used server-side

---

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Create production build |
| `npm run start` | Run production build locally |
| `npm run lint` | Check code style |
| `npx supabase start` | Start local database |
| `npx supabase stop` | Stop local database |
| `npx supabase db reset` | Reset DB + run migrations + seed |

---

## External Integrations

### Vercel (Hosting & Deployment)

**Deployment Model:**
- Auto-deploy on push to `main` branch
- Preview deployments for PRs
- Serverless functions for API routes
- Edge network for static assets

**CLI Access:**
```bash
vercel whoami        # Check auth status
vercel ls            # List deployments
vercel --prod        # Manual production deploy
```

**Environment Variables:** Set in Vercel Dashboard → Settings → Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)

---

### semops-publisher (Content Pipeline)

**Integration:** Git-based publishing pipeline

**Workflow:**
1. Draft content in semops-publisher using AI agents
2. Generate MDX with frontmatter
3. Ingest into semops-sites via `npm run ingest`
4. Vercel auto-deploys

**MDX Format Required:**
```mdx
---
title: "Post Title"
date: "YYYY-MM-DD"
description: "Brief summary for SEO and previews"
---

Markdown content here...
```

---

## Further Reading

- **Next.js App Router:** https://nextjs.org/docs/app
- **React Documentation:** https://react.dev
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Supabase Documentation:** https://supabase.com/docs
- **MDX:** https://mdxjs.com/docs/
- **Vercel Documentation:** https://vercel.com/docs
