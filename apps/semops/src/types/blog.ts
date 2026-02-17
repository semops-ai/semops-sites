// Blog post types for MDX content

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string; // Raw MDX content
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  category: string;
  author: string;
}

// Frontmatter structure expected in MDX files
export interface BlogFrontmatter {
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
}

// Page types for non-blog MDX content
export interface PageFrontmatter {
  title: string;
  description: string;
}

export interface Page {
  slug: string;
  title: string;
  description: string;
  content: string;
}

// Whitepaper types for long-form content
export interface WhitepaperFrontmatter {
  title: string;
  description: string;
  abstract?: string;
  author: string;
  date: string;
  version?: string;
  tags: string[];
}

export interface Whitepaper {
  slug: string;
  title: string;
  description: string;
  abstract?: string;
  author: string;
  date: string;
  version?: string;
  tags: string[];
  content: string;
}
