import { MermaidDiagram } from '@/components/mermaid-diagram';
import { Wide } from '@/components/mdx/wide';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm] as any,
    rehypePlugins: [[rehypePrism, { ignoreMissing: true }]] as any,
  },
};

export const mdxComponents = {
  MermaidDiagram,
  Wide,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="table-wrapper">
      <table {...props} />
    </div>
  ),
};
