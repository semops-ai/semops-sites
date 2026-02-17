'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';
import { MermaidDiagram } from '@/components/mermaid-diagram';

export default function PlaygroundPage() {
  const typescriptExample = `interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}`;

  const pythonExample = `from dataclasses import dataclass
from datetime import datetime

@dataclass
class User:
    id: str
    name: str
    email: str
    created_at: datetime

async def fetch_user(user_id: str) -> User:
    """Fetch a user by ID from the API."""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"/api/users/{user_id}")
        response.raise_for_status()
        return User(**response.json())`;

  const flowchartExample = `flowchart TD
    A[User Request] --> B{Authenticated?}
    B -->|Yes| C[Process Request]
    B -->|No| D[Return 401]
    C --> E[Fetch Data]
    E --> F[Transform]
    F --> G[Return Response]`;

  const sequenceExample = `sequenceDiagram
    participant U as User
    participant A as API
    participant D as Database

    U->>A: POST /api/users
    A->>D: INSERT user
    D-->>A: user_id
    A-->>U: 201 Created`;

  const erDiagramExample = `erDiagram
    USER ||--o{ POST : writes
    USER {
        string id PK
        string name
        string email
    }
    POST {
        string id PK
        string title
        string content
        string user_id FK
    }`;

  return (
    <div className="container animate-fade-in">
      <article className="py-8 md:py-12 prose-container">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors no-underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Article header */}
        <header className="mb-8">
          <span className="tag mb-3">Playground</span>
          <h1 className="mb-2">Diagrams & Code Blocks</h1>
          <time className="meta">Experimental rendering components</time>
        </header>

        {/* Article content */}
        <div className="prose-content space-y-8 text-foreground">
          <p>
            This page demonstrates the syntax highlighting and diagram rendering
            capabilities using <strong>prism-react-renderer</strong> and{' '}
            <strong>Mermaid.js</strong>.
          </p>

          <div className="divider" />

          <h2>Code Blocks</h2>

          <p>
            Code blocks use prism-react-renderer with the VS Light theme for
            clean, readable syntax highlighting.
          </p>

          <h3>TypeScript</h3>
          <CodeBlock code={typescriptExample} language="typescript" />

          <h3>Python</h3>
          <CodeBlock code={pythonExample} language="python" />

          <div className="divider" />

          <h2>Mermaid Diagrams</h2>

          <p>
            Mermaid diagrams render flowcharts, sequence diagrams, ER diagrams,
            and more using a simple text-based syntax.
          </p>

          <h3>Flowchart</h3>
          <p className="text-sm text-muted-foreground">
            Shows decision trees and process flows:
          </p>
          <MermaidDiagram chart={flowchartExample} />

          <h3>Sequence Diagram</h3>
          <p className="text-sm text-muted-foreground">
            Illustrates interactions between components:
          </p>
          <MermaidDiagram chart={sequenceExample} />

          <h3>Entity Relationship Diagram</h3>
          <p className="text-sm text-muted-foreground">
            Documents data models and relationships:
          </p>
          <MermaidDiagram chart={erDiagramExample} />

          <div className="divider" />

          <h2>Usage in MDX</h2>

          <p>
            To use these components in MDX blog posts, you'll need to pass them
            as custom components to MDXRemote. The components are client-side
            rendered, so they work best as standalone elements rather than
            inline with server-rendered MDX content.
          </p>

          <blockquote>
            For production use, consider pre-rendering diagrams to SVG at build
            time or using a hybrid approach with dynamic imports.
          </blockquote>
        </div>
      </article>
    </div>
  );
}
