#!/usr/bin/env tsx
/**
 * Content Ingestion Script
 *
 * Transforms semops-publisher Markdown into semops-sites MDX.
 *
 * Usage:
 *   npm run ingest -- pages <hub-slug> --app <semops|timjmitchell>
 *   npm run ingest -- blog <slug> --app <semops|timjmitchell>
 *   npm run ingest -- whitepaper <slug> --app <semops|timjmitchell>
 *
 * Options:
 *   --app <app>         Target app (default: semops)
 *   --source <path>     Override semops-publisher path
 *   --category <cat>    Override derived category (blog only)
 *   --dry-run           Preview without writing files
 */

import { Command } from "commander";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

// Default semops-publisher location (sibling repo)
const DEFAULT_PUBLISHER_PR = path.resolve(__dirname, "../../semops-publisher");

// Hub route configuration: maps hub slugs to site routes
const HUB_ROUTE_CONFIG: Record<string, { route: string }> = {
  "what-is-semops": { route: "/framework/what-is-semops" },
  "why-semops": { route: "/framework/why-semops" },
  "how-i-got-here": { route: "/about/how-i-got-here" },
  framework: { route: "/framework" },
  "strategic-data": { route: "/framework/strategic-data" },
  "symbiotic-architecture": { route: "/framework/symbiotic-architecture" },
  "semantic-optimization": { route: "/framework/semantic-optimization" },
};

// Category derivation from tags (first match wins)
const CATEGORY_MAPPING: Record<string, string> = {
  semops: "Industry",
  "ai-integration": "Industry",
  career: "Industry",
  "product-management": "Industry",
  "mental-models": "Industry",
  testing: "Technical",
  mdx: "Technical",
  technical: "Technical",
  _default: "Industry",
};

// Types for semops-publisher frontmatter
interface PublisherPageFrontmatter {
  content_type: "page";
  doc_type: "hub" | "spoke";
  title: string;
  slug: string;
  author: string;
  description?: string;
  spokes?: string[];
  hub?: string;
  audience_tier: string;
  style_guide: string;
  status: string;
  date_created: string;
  date_updated: string;
  tags?: string[];
}

interface PublisherBlogFrontmatter {
  content_type: "blog";
  title: string;
  slug: string;
  author: string;
  description?: string;
  style_guide: string;
  audience_tier: string;
  status: string;
  date_created: string;
  date_updated: string;
  tags?: string[];
}

interface PublisherWhitepaperFrontmatter {
  content_type: "whitepaper";
  title: string;
  slug: string;
  author: string;
  description?: string;
  abstract?: string;
  version?: string;
  style_guide: string;
  audience_tier: string;
  status: string;
  date_created: string;
  date_updated: string;
  tags?: string[];
}

// Types for semops-sites frontmatter
interface SitesPageFrontmatter {
  title: string;
  description: string;
}

interface SitesBlogFrontmatter {
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
}

interface SitesWhitepaperFrontmatter {
  title: string;
  description: string;
  abstract?: string;
  author: string;
  date: string;
  version?: string;
  tags: string[];
}

interface IngestOptions {
  app: "semops" | "timjmitchell";
  source?: string;
  dryRun?: boolean;
  category?: string;
}

/**
 * Derive category from tags using the mapping config
 */
function deriveCategory(tags: string[]): string {
  for (const tag of tags) {
    const lower = tag.toLowerCase();
    if (CATEGORY_MAPPING[lower]) {
      return CATEGORY_MAPPING[lower];
    }
  }
  return CATEGORY_MAPPING["_default"];
}

/**
 * Transform Mermaid code blocks to MermaidDiagram JSX components
 */
function transformMermaid(content: string): string {
  const mermaidBlockRegex = /```mermaid\n([\s\S]*?)```/g;

  return content.replace(mermaidBlockRegex, (_match, chartContent: string) => {
    // Trim whitespace and escape backticks
    const trimmed = chartContent.trim();
    const escaped = trimmed.replace(/`/g, "\\`");
    return `<MermaidDiagram chart={\`${escaped}\`} />`;
  });
}

/**
 * Transform relative .md links to site routes
 */
function transformLinks(
  content: string,
  sourceDir: string,
  hubSlug: string
): string {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  return content.replace(linkRegex, (match, text: string, href: string) => {
    // Skip external links and anchors
    if (href.startsWith("http") || href.startsWith("#")) {
      return match;
    }

    // Skip deep cross-repo links (warn in console)
    if (href.includes("../") && href.split("../").length > 2) {
      console.warn(`  Warning: Deep cross-repo link found: ${href}`);
      return match;
    }

    // Handle .md links
    if (href.endsWith(".md") || href.includes(".md#")) {
      const [filename, anchor] = href.split("#");
      const targetSlug = path.basename(filename, ".md");

      // Look up hub config for the target
      const hubConfig = HUB_ROUTE_CONFIG[hubSlug] || { route: "/about" };

      // Check if target is the hub itself
      if (targetSlug === hubSlug) {
        const route = hubConfig.route;
        return `[${text}](${route}${anchor ? "#" + anchor : ""})`;
      }

      // Check if target is a different hub
      if (HUB_ROUTE_CONFIG[targetSlug]) {
        const route = HUB_ROUTE_CONFIG[targetSlug].route;
        return `[${text}](${route}${anchor ? "#" + anchor : ""})`;
      }

      // Otherwise, it's a spoke - all content pages live under /framework/
      const route = `/framework/${targetSlug}`;
      return `[${text}](${route}${anchor ? "#" + anchor : ""})`;
    }

    return match;
  });
}

/**
 * Extract first meaningful paragraph from content for description
 */
function extractDescription(content: string, fallback: string): string {
  const lines = content.split("\n");
  let paragraph = "";
  let inParagraph = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip empty lines before paragraph
    if (!trimmed && !inParagraph) continue;

    // Skip headers
    if (trimmed.startsWith("#")) continue;

    // Skip list items
    if (trimmed.startsWith("-") || trimmed.startsWith("*")) continue;

    // Skip blockquotes
    if (trimmed.startsWith(">")) continue;

    // Skip code blocks
    if (trimmed.startsWith("```")) continue;

    // Found start of paragraph
    if (trimmed && !inParagraph) {
      inParagraph = true;
      paragraph = trimmed;
      continue;
    }

    // Continue paragraph
    if (trimmed && inParagraph) {
      paragraph += " " + trimmed;
      continue;
    }

    // End of paragraph
    if (!trimmed && inParagraph) {
      break;
    }
  }

  if (!paragraph) {
    return fallback;
  }

  // Clean up: remove bold markers, limit length
  const cleaned = paragraph.replace(/\*\*/g, "").replace(/\*/g, "");
  return cleaned.length > 200 ? cleaned.slice(0, 197) + "..." : cleaned;
}

/**
 * Transform semops-publisher page frontmatter to semops-sites format
 */
function transformPageFrontmatter(
  fm: PublisherPageFrontmatter,
  content: string
): SitesPageFrontmatter {
  const description = fm.description || extractDescription(content, fm.title);

  return {
    title: fm.title,
    description,
  };
}

/**
 * Format date as YYYY-MM-DD string
 */
function formatDate(dateStr: string): string {
  // If already in YYYY-MM-DD format, return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  // Otherwise parse and format
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0];
}

/**
 * Transform semops-publisher blog frontmatter to semops-sites format
 */
function transformBlogFrontmatter(
  fm: PublisherBlogFrontmatter,
  categoryOverride?: string
): SitesBlogFrontmatter {
  const tags = fm.tags || [];
  const category = categoryOverride || deriveCategory(tags);

  return {
    title: fm.title,
    date: formatDate(fm.date_updated),
    author: fm.author,
    category,
    tags,
    excerpt: fm.description || fm.title,
  };
}

/**
 * Transform semops-publisher whitepaper frontmatter to semops-sites format
 */
function transformWhitepaperFrontmatter(
  fm: PublisherWhitepaperFrontmatter,
  content: string
): SitesWhitepaperFrontmatter {
  const description = fm.description || extractDescription(content, fm.title);

  return {
    title: fm.title,
    description,
    abstract: fm.abstract,
    author: fm.author,
    date: formatDate(fm.date_updated),
    version: fm.version,
    tags: fm.tags || [],
  };
}

/**
 * Generate MDX output with frontmatter
 */
function generateMdx(frontmatter: object, content: string): string {
  return matter.stringify(content, frontmatter);
}

/**
 * Ingest a hub/spoke page group
 */
async function ingestPages(hubSlug: string, options: IngestOptions) {
  const publisherPr = options.source || DEFAULT_PUBLISHER_PR;
  const sourceDir = path.join(publisherPr, "content/pages", hubSlug);

  console.log(`\nIngesting pages from: ${sourceDir}`);
  console.log(`Target app: ${options.app}`);
  console.log(`Dry run: ${options.dryRun ? "yes" : "no"}\n`);

  if (!fs.existsSync(sourceDir)) {
    console.error(`Error: Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith(".md"));

  if (files.length === 0) {
    console.error(`Error: No .md files found in ${sourceDir}`);
    process.exit(1);
  }

  const targetDir = path.resolve(
    __dirname,
    "..",
    "apps",
    options.app,
    "content",
    "pages"
  );

  // Ensure target directory exists
  if (!options.dryRun && !fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const rawContent = fs.readFileSync(sourcePath, "utf-8");
    const { data, content } = matter(rawContent);
    const fm = data as PublisherPageFrontmatter;

    console.log(`Processing: ${file} (${fm.doc_type})`);

    // Transform content
    let transformed = transformMermaid(content);
    transformed = transformLinks(transformed, sourceDir, hubSlug);

    // Transform frontmatter
    const newFrontmatter = transformPageFrontmatter(fm, content);

    // Generate output
    const output = generateMdx(newFrontmatter, transformed);
    const targetPath = path.join(targetDir, `${fm.slug}.mdx`);

    if (options.dryRun) {
      console.log(`  Would create: ${targetPath}`);
      console.log(`  Frontmatter: ${JSON.stringify(newFrontmatter)}`);
    } else {
      fs.writeFileSync(targetPath, output);
      console.log(`  Created: ${targetPath}`);
    }
  }

  console.log(`\nDone. Processed ${files.length} files.`);
}

/**
 * Ingest a single blog post
 */
async function ingestBlog(slug: string, options: IngestOptions) {
  const publisherPr = options.source || DEFAULT_PUBLISHER_PR;
  const sourcePath = path.join(publisherPr, "posts", slug, "final.md");

  console.log(`\nIngesting blog from: ${sourcePath}`);
  console.log(`Target app: ${options.app}`);
  console.log(`Dry run: ${options.dryRun ? "yes" : "no"}\n`);

  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: Source file not found: ${sourcePath}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(sourcePath, "utf-8");
  const { data, content } = matter(rawContent);
  const fm = data as PublisherBlogFrontmatter;

  console.log(`Processing: ${fm.title}`);

  // Transform content (no link transforms for blog - different context)
  let transformed = transformMermaid(content);

  // Transform frontmatter
  const newFrontmatter = transformBlogFrontmatter(fm, options.category);

  // Generate output
  const output = generateMdx(newFrontmatter, transformed);

  const targetDir = path.resolve(
    __dirname,
    "..",
    "apps",
    options.app,
    "content",
    "blog"
  );
  const targetPath = path.join(targetDir, `${fm.slug}.mdx`);

  // Ensure target directory exists
  if (!options.dryRun && !fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  if (options.dryRun) {
    console.log(`  Would create: ${targetPath}`);
    console.log(`  Frontmatter: ${JSON.stringify(newFrontmatter, null, 2)}`);
  } else {
    fs.writeFileSync(targetPath, output);
    console.log(`  Created: ${targetPath}`);
  }

  console.log("\nDone.");
}

/**
 * Ingest a single whitepaper
 */
async function ingestWhitepaper(slug: string, options: IngestOptions) {
  const publisherPr = options.source || DEFAULT_PUBLISHER_PR;
  const sourcePath = path.join(
    publisherPr,
    "content/whitepapers",
    slug,
    `${slug}.md`
  );

  console.log(`\nIngesting whitepaper from: ${sourcePath}`);
  console.log(`Target app: ${options.app}`);
  console.log(`Dry run: ${options.dryRun ? "yes" : "no"}\n`);

  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: Source file not found: ${sourcePath}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(sourcePath, "utf-8");
  const { data, content } = matter(rawContent);
  const fm = data as PublisherWhitepaperFrontmatter;

  console.log(`Processing: ${fm.title}`);

  // Transform content
  let transformed = transformMermaid(content);

  // Transform frontmatter
  const newFrontmatter = transformWhitepaperFrontmatter(fm, content);

  // Generate output
  const output = generateMdx(newFrontmatter, transformed);

  const targetDir = path.resolve(
    __dirname,
    "..",
    "apps",
    options.app,
    "content",
    "whitepapers"
  );
  const targetPath = path.join(targetDir, `${fm.slug}.mdx`);

  // Ensure target directory exists
  if (!options.dryRun && !fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  if (options.dryRun) {
    console.log(`  Would create: ${targetPath}`);
    console.log(`  Frontmatter: ${JSON.stringify(newFrontmatter, null, 2)}`);
  } else {
    fs.writeFileSync(targetPath, output);
    console.log(`  Created: ${targetPath}`);
  }

  console.log("\nDone.");
}

// CLI setup
const program = new Command();

program
  .name("ingest-content")
  .description("Transform semops-publisher Markdown into semops-sites MDX")
  .version("1.0.0");

program
  .command("pages <hubSlug>")
  .description("Ingest a hub/spoke page group")
  .option("--app <app>", "Target app (semops or timjmitchell)", "semops")
  .option("--source <path>", "Override semops-publisher path")
  .option("--dry-run", "Preview without writing files")
  .action((hubSlug: string, opts) => {
    ingestPages(hubSlug, {
      app: opts.app as "semops" | "timjmitchell",
      source: opts.source,
      dryRun: opts.dryRun,
    });
  });

program
  .command("blog <slug>")
  .description("Ingest a single blog post")
  .option("--app <app>", "Target app (semops or timjmitchell)", "semops")
  .option("--source <path>", "Override semops-publisher path")
  .option("--category <category>", "Override derived category")
  .option("--dry-run", "Preview without writing files")
  .action((slug: string, opts) => {
    ingestBlog(slug, {
      app: opts.app as "semops" | "timjmitchell",
      source: opts.source,
      category: opts.category,
      dryRun: opts.dryRun,
    });
  });

program
  .command("whitepaper <slug>")
  .description("Ingest a single whitepaper")
  .option("--app <app>", "Target app (semops or timjmitchell)", "semops")
  .option("--source <path>", "Override semops-publisher path")
  .option("--dry-run", "Preview without writing files")
  .action((slug: string, opts) => {
    ingestWhitepaper(slug, {
      app: opts.app as "semops" | "timjmitchell",
      source: opts.source,
      dryRun: opts.dryRun,
    });
  });

program.parse();
