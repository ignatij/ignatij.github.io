import { Title } from 'solid-meta';
import { A } from '@solidjs/router';

export default function Home() {
  return (
    <div class="min-h-screen">
      <Title>ignatij - Software Engineer & Developer</Title>
      
      {/* Hero Section */}
      <section class="py-20">
        <div class="container">
          <div class="flex items-center justify-center mb-8">
            <div class="flex items-start space-x-8">
              {/* Left part - Avatar */}
              <div class="flex-shrink-0">
                <img 
                  src="/avatar.png" 
                  alt="ignatij" 
                  class="w-24 h-32 border-2 border-border"
                />
              </div>
              
              {/* Right part - Name and Description */}
              <div class="text-left">
                <h1 class="text-6xl font-mono font-bold text-accent leading-none mb-4">
                  ignatij
                </h1>
                <p class="text-2xl text-text-secondary font-mono">
                  software engineer & developer. building things that matter.
                </p>
              </div>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <A href="/projects" class="btn btn-primary">
              view projects
            </A>
            <A href="/blog" class="btn">
              read blog
            </A>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section class="py-16 border-t border-border">
        <div class="container">
          <h2 class="text-4xl font-mono font-bold text-text-primary mb-8">
            about
          </h2>
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p class="text-text-secondary leading-relaxed mb-6">
                i'm a software engineer passionate about building efficient, scalable systems. 
                i specialize in modern web technologies and enjoy exploring new programming paradigms.
              </p>
              <p class="text-text-secondary leading-relaxed mb-6">
                currently working on distributed systems and exploring the intersection of 
                performance and developer experience.
              </p>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-bg-secondary border border-border rounded text-accent font-mono text-sm">
                  solid.js
                </span>
                <span class="px-3 py-1 bg-bg-secondary border border-border rounded text-accent font-mono text-sm">
                  typescript
                </span>
                <span class="px-3 py-1 bg-bg-secondary border border-border rounded text-accent font-mono text-sm">
                  rust
                </span>
                <span class="px-3 py-1 bg-bg-secondary border border-border rounded text-accent font-mono text-sm">
                  go
                </span>
              </div>
            </div>
            <div class="bg-bg-secondary border border-border rounded-lg p-6">
              <h3 class="text-xl font-mono font-semibold text-text-primary mb-4">
                quick stats
              </h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-text-secondary font-mono">experience</span>
                  <span class="text-accent font-mono">5+ years</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-secondary font-mono">languages</span>
                  <span class="text-accent font-mono">8+</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-secondary font-mono">projects</span>
                  <span class="text-accent font-mono">20+</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-secondary font-mono">coffee</span>
                  <span class="text-accent font-mono">∞</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section class="py-16 border-t border-border">
        <div class="container">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-4xl font-mono font-bold text-text-primary">
              featured projects
            </h2>
            <A href="/projects" class="text-accent hover:text-accent-hover transition-colors duration-200 font-mono text-sm">
              view all →
            </A>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "competitive intelligence tool",
                description: "real-time brand visibility analysis across search engines and LLMs for early-stage companies.",
                tech: ["typescript", "go", "gcp", "kubernetes"],
                link: "/projects/competitive-intelligence-tool"
              },
              {
                title: "data grid - angular",
                description: "open-source grid component for angular with over 7000 downloads, providing powerful data visualization.",
                tech: ["angular", "typescript", "web-components"],
                link: "/projects/data-grid-angular"
              },
              {
                title: "portfolio builder",
                description: "fully-featured product for building portfolio websites with working example at jaxt.dev.",
                tech: ["react", "typescript", "graphql", "docker"],
                link: "/projects/portfolio-builder"
              }
            ].map(project => (
              <A href={project.link} class="card group">
                <h3 class="text-xl font-mono font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
                <p class="text-text-secondary mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div class="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span class="px-2 py-1 bg-bg-tertiary border border-border rounded text-accent font-mono text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </A>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section class="py-16 border-t border-border">
        <div class="container">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-4xl font-mono font-bold text-text-primary">
              recent posts
            </h2>
            <A href="/blog" class="text-accent hover:text-accent-hover transition-colors duration-200 font-mono text-sm">
              view all →
            </A>
          </div>
          <div class="space-y-8">
            {[
              {
                title: "building competitive intelligence tools",
                excerpt: "lessons learned from developing real-time brand visibility analysis across search engines and LLMs for early-stage companies.",
                date: "2024-12-20",
                readTime: "15 min read",
                tags: ["python", "ai", "analytics"],
                slug: "competitive-intelligence-tools"
              },
              {
                title: "monorepo architecture with yarn workspaces",
                excerpt: "best practices for building scalable applications using modern JavaScript/TypeScript technologies in a monorepo structure.",
                date: "2024-11-15",
                readTime: "12 min read",
                tags: ["node.js", "typescript", "monorepo", "yarn"],
                slug: "monorepo-architecture"
              }
            ].map(post => (
              <article class="border-b border-border pb-8 last:border-b-0">
                <A href={`/blog/${post.slug}`} class="group">
                  <h3 class="text-2xl font-mono font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p class="text-text-secondary mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4 text-text-muted font-mono text-sm">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div class="flex gap-2">
                      {post.tags.map(tag => (
                        <span class="px-2 py-1 bg-bg-tertiary border border-border rounded text-accent font-mono text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </A>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 