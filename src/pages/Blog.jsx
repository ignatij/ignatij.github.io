import { Title } from "solid-meta";
import { A } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { loadBlogPosts } from "../utils/content";

export default function Blog() {
  const [blogPosts, setBlogPosts] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const posts = await loadBlogPosts();
      setBlogPosts(posts);
    } catch (error) {
      console.error("Error loading blog posts:", error);
      // Fallback to static data if markdown loading fails
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="min-h-screen py-16">
      <Title>blog - ignatij</Title>

      <div class="container">
        <header class="mb-16">
          <h1 class="text-6xl font-mono font-bold text-accent mb-6">blog</h1>
          <p class="text-xl text-text-secondary font-mono max-w-2xl">
            thoughts on software engineering, performance, and building things
            that matter.
          </p>
        </header>

        <div class="space-y-12">
          {loading() ? (
            <div class="text-center py-12">
              <p class="text-text-secondary font-mono">loading posts...</p>
            </div>
          ) : (
            blogPosts().map((post) => (
              <article class="border-b border-border pb-12 last:border-b-0">
                <A href={`/blog/${post.slug}`} class="group block">
                  <div class="flex flex-col lg:flex-row gap-6">
                    <div class="lg:w-64 w-full">
                      <img
                        src={post.thumbnail}
                        alt={`Thumbnail for ${post.title}`}
                        class="w-full h-56 object-cover rounded-lg border border-border transition-transform duration-200 group-hover:scale-[1.01]"
                        loading="lazy"
                      />
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center gap-2 text-text-muted font-mono text-sm mb-4">
                        <time>{post.date}</time>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h2 class="text-3xl font-mono font-semibold text-text-primary mb-4 group-hover:text-accent transition-colors duration-200">
                        {post.title}
                      </h2>

                      <p class="text-text-secondary leading-relaxed mb-6 max-w-3xl">
                        {post.excerpt}
                      </p>

                      <div class="flex gap-2 flex-wrap">
                        {post.tags &&
                          post.tags.map((tag) => (
                            <span class="px-3 py-1 bg-bg-secondary border border-border rounded text-accent font-mono text-sm">
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </A>
              </article>
            ))
          )}
        </div>

        <div class="mt-16 pt-8 border-t border-border">
          <p class="text-text-secondary font-mono text-center">
            more posts coming soon. subscribe to stay updated.
          </p>
        </div>
      </div>
    </div>
  );
}
