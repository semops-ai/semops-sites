import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type {
  BlogPost,
  BlogPostMeta,
  BlogFrontmatter,
  Page,
  PageFrontmatter,
  Whitepaper,
  WhitepaperFrontmatter,
} from '@/types/blog';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const PAGES_DIR = path.join(process.cwd(), 'content', 'pages');
const WHITEPAPERS_DIR = path.join(process.cwd(), 'content', 'whitepapers');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

/**
 * Auto-resolve a hero image for a blog post by slug.
 * Looks for public/blog/{slug}.{png,jpg,jpeg,webp}
 */
function resolveBlogImage(slug: string): string | undefined {
  for (const ext of IMAGE_EXTENSIONS) {
    const imagePath = path.join(PUBLIC_DIR, 'blog', `${slug}${ext}`);
    if (fs.existsSync(imagePath)) {
      return `/blog/${slug}${ext}`;
    }
  }
  return undefined;
}

/**
 * Get all blog posts with metadata (for listing page)
 */
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  // Ensure directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace('.mdx', '');
      const filePath = path.join(BLOG_DIR, filename);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContents);
      const frontmatter = data as BlogFrontmatter;

      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt,
        tags: frontmatter.tags || [],
        category: frontmatter.category,
        author: frontmatter.author,
        featured: frontmatter.featured ?? false,
        image: resolveBlogImage(slug),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Get a single blog post by slug (for individual post page)
 */
export async function getPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);
  const frontmatter = data as BlogFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    author: frontmatter.author,
    category: frontmatter.category,
    tags: frontmatter.tags || [],
    excerpt: frontmatter.excerpt,
    content,
    image: resolveBlogImage(slug),
  };
}

/**
 * Get all post slugs (for static generation)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  return files
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => filename.replace('.mdx', ''));
}

/**
 * Get a single page by slug (for non-blog content pages)
 */
export async function getPage(slug: string): Promise<Page | null> {
  const filePath = path.join(PAGES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);
  const frontmatter = data as PageFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    content,
  };
}

/**
 * Get a single whitepaper by slug
 */
export async function getWhitepaper(slug: string): Promise<Whitepaper | null> {
  const filePath = path.join(WHITEPAPERS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContents);
  const frontmatter = data as WhitepaperFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    abstract: frontmatter.abstract,
    author: frontmatter.author,
    date: frontmatter.date,
    version: frontmatter.version,
    tags: frontmatter.tags || [],
    content,
  };
}

/**
 * Get all whitepaper slugs (for static generation)
 */
export async function getAllWhitepaperSlugs(): Promise<string[]> {
  if (!fs.existsSync(WHITEPAPERS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(WHITEPAPERS_DIR);

  return files
    .filter((filename) => filename.endsWith('.mdx'))
    .map((filename) => filename.replace('.mdx', ''));
}
