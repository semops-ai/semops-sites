# ADR-0003: Analytics Stack Evaluation and Implementation

> **Status:** Draft
> **Date:** 2025-12-17
> **Related Issue:** [#22 SEO and Analytics Plan](https://github.com/semops-ai/semops-sites/issues/22)

---

## Executive Summary

Implement **Google Analytics 4 (cookieless mode) + Google Search Console** as the analytics stack for timjmitchell.com. This research-driven ADR evaluated multiple options and concluded that GA4 in cookieless mode provides the best balance of capability and privacy - no consent banner required, with full event tracking, experiments, and UTM attribution available. GSC remains the primary driver for the agentic SEO workflow; GA4 provides supplementary traffic data and future flexibility.

---

## Research Questions

| Question | Why It Matters |
|----------|----------------|
| Does CF Web Analytics have API access? | Required for agentic workflow automation |
| What metrics are available? | Must support pattern detection (CTR, decay, etc.) |
| What is CF data retention? | Affects historical analysis capability |
| Can CF + GSC data be joined by URL? | Core requirement for the workflow |
| What are GSC API rate limits? | Constrains automation frequency |

---

## Research Findings

### Cloudflare Web Analytics Capabilities

**Available Metrics:**

- Page views, visits, unique visitors
- Referrers (host), browsers, operating systems
- Countries, paths
- Core Web Vitals (LCP, FID, CLS) - unique advantage over GA4

**API Access:** ✅ CONFIRMED

- GraphQL API: `https://api.cloudflare.com/client/v4/graphql`
- Requires API token with "Account Analytics" permission
- Key datasets:
 - `rumPageloadEventsAdaptiveGroups` - pageviews, paths, referrers
 - `rumPerformanceEventsAdaptiveGroups` - performance metrics
 - `rumWebVitalsEventsAdaptiveGroups` - Core Web Vitals
- Same data available via API as dashboard (no hidden limitations)

**Data Retention:** ✅ 6 MONTHS

- Sufficient for month-over-month trend analysis
- Can snapshot to Supabase for longer retention if needed

**Site Limits:**

| Setup | Limit |
|-------|-------|
| Proxied through CF | Unlimited |
| Not proxied (JS snippet) | 10 sites per account |

**Rules by Plan:**

| Plan | Rules |
|------|-------|
| Free | 0 (JS snippet on all subdomains) |
| Pro | 5 |
| Business | 20 |
| Enterprise | 100 |

**Known Limitations:**

- No event tracking (button clicks, form submissions) - custom events not supported yet
- No UTM parameter tracking (query strings excluded for privacy)
- No user journey/funnel analysis
- No custom dimensions or segments
- JS beacon blocked by some ad blockers (Brave, DuckDuckGo)
- Dashboard shows only top 15 items per dimension
- Data sampling applied for high-volume sites (not a concern for personal site)

**Privacy Advantages:**

- No cookies, no consent banners required
- GDPR/CCPA/PECR compliant by design
- Query strings deliberately excluded to protect sensitive data
- Cloudflare does not claim ownership of data

### Google Search Console API

**Available via API:** ✅ CONFIRMED

- Queries (search terms users typed)
- Impressions, clicks, CTR, average position
- Pages, countries, devices, search appearance
- Queryable dimensions: date, query, page, country, device, search type
- Date ranges up to 16 months of historical data

**API Access:**

- Endpoint: `searchanalytics.query` method
- Official Python client library available
- Service account authentication supported
- `google-searchconsole` wrapper simplifies queries
- Max 25,000 rows per request (can batch with `startRow` offset)

**Rate Limits:** ✅ SUFFICIENT FOR DAILY AUTOMATION

| Limit Type | Value |
|------------|-------|
| Per-user | 20 QPS, 200 QPM |
| Per-project | 100M queries/day |
| Per-site daily | 50,000 page+keyword pairs |
| Short-term quota | 10-minute chunks |
| Long-term quota | Daily |

**Query Cost Factors:**

- Grouping/filtering by `page` or `query` is expensive
- Grouping by both `page` AND `query` is most expensive
- Longer date ranges cost more than shorter ones
- 6-month query >> 1-day query in cost

**Data Freshness:**

- Data delayed 2-3 days (not real-time)
- Some dates may have no data - test before querying

### Data Joinability Assessment

**Common Key:** ✅ PAGE URL - JOINABLE

| Source | Dimension | Format |
|--------|-----------|--------|
| CF Web Analytics | `path` | Relative: `/blog/my-post` |
| GSC | `page` | Full URL: `https://timjmitchell.com/blog/my-post` |

**Join Logic:**

```python
# Normalization required
cf_full_url = f"https://timjmitchell.com{cf_path}"
joined = gsc_data.merge(cf_data, left_on='page', right_on='cf_full_url')
```

**Temporal Alignment:**

| Source | Freshness | Implication |
|--------|-----------|-------------|
| CF | Near real-time | Can see today's traffic |
| GSC | 2-3 day delay | Must query historical windows |

**Recommendation:** Join on weekly aggregates to smooth temporal misalignment.

**Grain Compatibility:**

| Source | Native Grain | Can Aggregate To |
|--------|--------------|------------------|
| CF | Path (page) | ✅ Page level |
| GSC | Query + Page | ✅ Page level (sum metrics) |

**Join Strategy:**

```sql
-- Conceptual join for pattern detection
SELECT
 gsc.page,
 gsc.query,
 gsc.impressions,
 gsc.clicks,
 gsc.ctr,
 gsc.position,
 cf.visits,
 cf.pageviews
FROM gsc_weekly gsc
LEFT JOIN cf_weekly cf
 ON gsc.page = CONCAT('https://timjmitchell.com', cf.path)
WHERE gsc.date_week = cf.date_week
```

**Verdict:** ✅ Data is joinable with standard ETL transformations (URL normalization, temporal bucketing). No fundamental incompatibility.

---

## Sample GraphQL Queries (CF)

### Page Views by Path

> Query structure based on CF GraphQL schema. Variables: `$accountTag`, `$siteTag`, `$start`, `$end` (ISO timestamps)

```graphql
{
 viewer {
 accounts(filter: { accountTag: $accountTag }) {
 rumPageloadEventsAdaptiveGroups(
 filter: {
 datetime_gt: $start
 datetime_lt: $end
 siteTag: $siteTag
 }
 limit: 100
 orderBy: [count_DESC]
 ) {
 count
 dimensions {
 path
 }
 }
 }
 }
}
```

### Referrer Breakdown

```graphql
{
 viewer {
 accounts(filter: { accountTag: $accountTag }) {
 rumPageloadEventsAdaptiveGroups(
 filter: {
 datetime_gt: $start
 datetime_lt: $end
 siteTag: $siteTag
 }
 limit: 50
 orderBy: [count_DESC]
 ) {
 count
 dimensions {
 refererHost
 }
 }
 }
 }
}
```

### Core Web Vitals

```graphql
{
 viewer {
 accounts(filter: { accountTag: $accountTag }) {
 rumPerformanceEventsAdaptiveGroups(
 filter: {
 datetime_gt: $start
 datetime_lt: $end
 siteTag: $siteTag
 }
 limit: 100
 ) {
 count
 avg {
 largestContentfulPaint
 firstInputDelay
 cumulativeLayoutShift
 }
 dimensions {
 path
 }
 }
 }
 }
}
```

---

## Validation Criteria

### GO (all must be true)

- [x] CF GraphQL API provides page-level traffic data ✅ **CONFIRMED** - `rumPageloadEventsAdaptiveGroups` with `path` dimension
- [x] GSC API provides query-level performance data joinable to pages ✅ **CONFIRMED** - `page` dimension available, joinable via URL
- [x] Combined stack can detect: high impressions/low CTR, ranking decay, cannibalization ✅ **CONFIRMED** - GSC provides impressions, CTR, position; CF provides pageviews
- [x] No cookies/consent banner required ✅ **CONFIRMED** - CF uses no cookies by design

### NO-GO (any blocks)

- [x] CF API requires paid tier beyond current plan ✅ **NOT A BLOCKER** - Free tier includes API access
- [x] GSC rate limits prevent reasonable automation (< daily pulls) ✅ **NOT A BLOCKER** - 200 QPM, 100M QPD sufficient
- [x] Data is fundamentally incompatible ✅ **NOT A BLOCKER** - URL is common key, grain is reconcilable

### ACCEPTABLE friction (present but not blocking)

- ✅ URL normalization needed (CF relative path → GSC full URL)
- ✅ Temporal alignment (join on weekly aggregates)
- ✅ Custom ETL required (standard Python/SQL transformations)
- ✅ Different native grains (aggregate GSC to page level)

### RECOMMENDATION: **GO** ✅

All validation criteria pass. The stack is technically viable for the agentic SEO workflow.

---

## Decision

**Chosen Stack:**

- Primary telemetry: **Google Analytics 4 (cookieless mode)**
- Search truth: Google Search Console
- Market intelligence: Ahrefs (periodic, manual)
- Data storage: BigQuery (GA4 native export) or Supabase for custom aggregations

### Why GA4 (Cookieless) over Cloudflare Web Analytics

| Factor | GA4 Cookieless | Cloudflare |
|--------|----------------|------------|
| **No consent banner** | ✅ Yes | ✅ Yes |
| **Event tracking** | ✅ Full support | ❌ Not supported |
| **UTM attribution** | ✅ Works | ❌ Query strings excluded |
| **Experiments/A/B** | ✅ Built-in | ❌ Not available |
| **Future flexibility** | ✅ Add cookies later | ⚠️ Would need migration |
| **GSC integration** | ✅ Native linking | ⚠️ Manual join only |
| **API maturity** | ✅ Well-documented | ⚠️ GraphQL, less ecosystem |

### What GA4 Cookieless Sacrifices (acceptable for now)

| Feature | Impact |
|---------|--------|
| Unique user count | Inflated (each visit = new user) |
| Return visitor % | Broken |
| Multi-session journeys | Single-session only |
| Multi-touch attribution | Last-touch only |

**Why acceptable:** GSC drives early SEO decisions. User-level tracking isn't needed until the site has meaningful traffic and conversion goals.

### Why NOT Alternatives

| Alternative | Reason Not Chosen |
|-------------|-------------------|
| Cloudflare Web Analytics | No event tracking, no experiments, would require migration later |
| Plausible/Fathom | Additional cost; GA4 is free |
| Vercel Analytics | Good complement but GA4 is more capable |
| Self-hosted Matomo | Operational overhead; against edge-first pattern |

---

## Consequences

### Positive

- No cookie consent banner required (cookieless mode)
- Full event tracking available when needed
- UTM campaign attribution works
- A/B experiments available via Google Optimize successor
- Native GSC linking in GA4 interface
- BigQuery export for custom analysis
- Mature API with extensive documentation
- Free tier sufficient for personal site scale
- Clear upgrade path: add cookies later for user-level tracking

### Negative

- User counts inflated in cookieless mode
- No return visitor analysis until cookies enabled
- Multi-session attribution limited
- Google ecosystem dependency
- More complex than CF (feature-heavy)

### Risks

- Google could change GA4 cookieless behavior
- Cookieless mode accuracy may vary by browser
- Future privacy regulations could affect cookieless tracking

---

## Implementation Plan

### Phase 1: GA4 Setup (Cookieless Mode)

**Goal:** Basic traffic visibility without consent banner

**Tasks:**

- [ ] Create GA4 property in Google Analytics
- [ ] Configure for cookieless mode (disable cookies in gtag config)
- [ ] Add gtag script to `src/app/layout.tsx` using Next.js Script component
- [ ] Add `NEXT_PUBLIC_GA_MEASUREMENT_ID` to `.env.example`
- [ ] Verify data in GA4 real-time view
- [ ] Link GSC property to GA4

**Implementation:**

```tsx
// src/app/layout.tsx
import Script from 'next/script'

// In RootLayout, add before </head>:
<Script
 src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
 strategy="afterInteractive"
/>
<Script id="gtag-init" strategy="afterInteractive">
 {`
 window.dataLayer = window.dataLayer || [];
 function gtag{dataLayer.push(arguments);}
 gtag('js', new Date);
 gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
 client_storage: 'none',
 anonymize_ip: true
 });
 `}
</Script>
```

**Validation:** Traffic appears in GA4 real-time view

### Phase 2: Google Search Console Integration

**Goal:** Programmatic access to search performance data

**Tasks:**

- [ ] Verify site ownership in GSC
- [ ] Create Google Cloud project for API access
- [ ] Generate service account credentials
- [ ] Write Python script to pull GSC data (in `semops-data` repo)
- [ ] Validate data retrieval matches dashboard

### Phase 3: Agentic SEO Workflow

**Goal:** Automated pattern detection and GitHub issue creation

**Tasks:**

- [ ] Design joined data schema (CF + GSC)
- [ ] Build ETL script for pattern detection
- [ ] Implement detection rules:
 - High impressions / low CTR (opportunity pages)
 - Position 11-20 with high impressions (on-the-cusp keywords)
 - Position decay > X positions over Y days (ranking alerts)
 - Multiple pages ranking for same query (cannibalization)
- [ ] Create GitHub issue templates for each pattern type
- [ ] Add human-in-the-loop review before issue creation
- [ ] Schedule automation (weekly via n8n or GitHub Actions)

---

## Session Log

### 2025-12-17: Research Complete - Decision: GA4 Cookieless

**Completed:**

- Analyzed Issue #22 vision and requirements
- Explored current codebase analytics setup (none exists)
- Reviewed ADR conventions from ADR-0001 and ADR-0002
- Researched CF Web Analytics capabilities and API
- Researched GSC API rate limits and data availability
- Documented data joinability strategy
- Compared CF vs GA4 tradeoffs
- **Decision: GA4 (cookieless mode)** - better long-term flexibility

**Key Insight:**

GSC is the actual value driver for the agentic SEO workflow. Site analytics (CF or GA4) are supplementary. Given this:
- CF's privacy advantage is marginal (GA4 cookieless also requires no consent)
- GA4's event tracking, experiments, and UTM support provide meaningful upside
- Migration cost from CF → GA4 later is avoidable by starting with GA4

**Next Steps:**

1. Create GA4 property in Google Analytics
2. Configure cookieless mode
3. Add gtag script to layout.tsx
4. Link GSC property to GA4
5. Verify real-time data flow

---

## References

**Cloudflare Documentation:**

- [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/)
- [Datasets (tables)](https://developers.cloudflare.com/analytics/graphql-api/features/data-sets/)
- [Getting Started](https://developers.cloudflare.com/analytics/graphql-api/getting-started/)
- [Web Analytics Limits](https://developers.cloudflare.com/analytics/web-analytics/understanding-web-analytics/limits/)
- [Web Analytics FAQ](https://developers.cloudflare.com/analytics/faq/web-analytics/)

**Google Search Console:**

- [Search Analytics API](https://developers.google.com/webmaster-tools/v1/how-tos/search_analytics)
- [Usage Limits](https://developers.google.com/webmaster-tools/limits)
- [Python Quickstart](https://developers.google.com/webmaster-tools/v1/quickstart/quickstart-python)
- [Python Client Library](https://developers.google.com/webmaster-tools/v1/libraries)

**Comparison Resources:**

- [Cloudflare Web Analytics vs Plausible](https://plausible.io/vs-cloudflare-web-analytics)

**Related ADRs:**

- [ADR-0001: Resume Schema Design](ADR-0001-resume-schema-design.md)
- [ADR-0002: Site Design Integration](ADR-0002-site-design-integration.md)

**Architecture:**

- [Edge-First Web Stack Pattern](../domain-patterns/edge-first-web-stack.md)
