import { Title } from "solid-meta";
import { A } from "@solidjs/router";
import { For, createResource } from "solid-js";
import { loadProjects, loadBlogPosts } from "../utils/content";

export default function Home() {
  const [projects] = createResource(loadProjects);
  const [blogPosts] = createResource(loadBlogPosts);

  const downloadCV = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/Ignatij Gichevski CV.pdf';
    link.download = 'Ignatij Gichevski CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div class="min-h-screen">
      <Title>ignatij - Software Engineer & Developer</Title>

      {/* Hero Section */}
      <section class="py-12 sm:py-20">
        <div class="container">
          <div class="flex flex-col sm:flex-row items-center justify-center mb-8">
            <div class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
              {/* Left part - Avatar */}
              <div class="flex-shrink-0">
                <img
                  src="/avatar.png"
                  alt="ignatij"
                  class="w-20 h-24 sm:w-24 sm:h-32 border-2 border-border"
                />
              </div>

              {/* Right part - Name and Description */}
              <div class="text-center sm:text-left">
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-mono font-bold text-accent leading-none mb-4">
                  ignatij
                </h1>
                <p class="text-lg sm:text-xl lg:text-2xl text-text-secondary font-mono max-w-sm sm:max-w-none">
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
            <A href="#" onClick={downloadCV} class="btn">
              download cv
            </A>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section class="py-12 sm:py-16 border-t border-border">
        <div class="container">
          <h2 class="text-3xl sm:text-4xl font-mono font-bold text-text-primary mb-6 sm:mb-8">
            about
          </h2>
          <div class="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div>
              <p class="text-text-secondary leading-relaxed mb-6">
                i'm a software engineer passionate about building efficient,
                scalable systems. i specialize in modern backend technologies
                and enjoy exploring new programming paradigms.
              </p>
              <div class="flex flex-wrap gap-2">
                <span is="badge" variant="blue" class="font-mono text-sm">
                  golang
                </span>
                <span is="badge" variant="cyan" class="font-mono text-sm">
                  node.js
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
                  <span class="text-accent font-mono">8+ years</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-secondary font-mono">languages</span>
                  <span class="text-accent font-mono">5+</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-secondary font-mono">projects</span>
                  <span class="text-accent font-mono">10+</span>
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
      <section class="py-12 sm:py-16 border-t border-border">
        <div class="container">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 class="text-3xl sm:text-4xl font-mono font-bold text-text-primary">
              featured projects
            </h2>
            <A
              href="/projects"
              class="text-accent hover:text-accent-hover transition-colors duration-200 font-mono text-sm"
            >
              view all →
            </A>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <For each={projects()?.slice(0, 3)}>
              {(project) => (
                <A href={`/projects/${project.slug}`} class="card group">
                  <h3 class="text-xl font-mono font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p class="text-text-secondary mb-4 leading-relaxed">
                    {project.excerpt}
                  </p>
                  <div class="flex flex-wrap gap-2">
                    <For each={project.technologies}>
                      {(tech) => (
                        <span
                          is="badge"
                          variant="muted"
                          class="font-mono text-xs"
                        >
                          {tech}
                        </span>
                      )}
                    </For>
                  </div>
                </A>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section class="py-12 sm:py-16 border-t border-border">
        <div class="container">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 class="text-3xl sm:text-4xl font-mono font-bold text-text-primary">
              recent posts
            </h2>
            <A
              href="/blog"
              class="text-accent hover:text-accent-hover transition-colors duration-200 font-mono text-sm"
            >
              view all →
            </A>
          </div>
          <div class="space-y-6 sm:space-y-8">
            <For each={blogPosts()?.slice(0, 2)}>
              {(post) => (
                <article class="border-b border-border pb-8 last:border-b-0">
                  <A href={`/blog/${post.slug}`} class="group">
                    <h3 class="text-2xl font-mono font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p class="text-text-secondary mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div class="flex items-center space-x-4 text-text-muted font-mono text-sm">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime || "5 min read"}</span>
                      </div>
                      <div class="flex flex-wrap gap-2">
                        <For each={post.tags}>
                          {(tag) => (
                            <span
                              is="badge"
                              variant="muted"
                              class="font-mono text-xs"
                            >
                              {tag}
                            </span>
                          )}
                        </For>
                      </div>
                    </div>
                  </A>
                </article>
              )}
            </For>
          </div>
        </div>
      </section>
    </div>
  );
}
