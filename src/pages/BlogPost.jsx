import { Title } from "solid-meta";
import { useParams, A } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { loadBlogPost } from "../utils/content";

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = createSignal(null);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      const postData = await loadBlogPost(params.slug);
      setPost(postData);
    } catch (error) {
      console.error("Error loading blog post:", error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="min-h-screen py-16">
      {loading() ? (
        <div class="container text-center py-20">
          <p class="text-text-secondary font-mono">loading post...</p>
        </div>
      ) : post() ? (
        <>
          <Title>{post().title} - ignatij</Title>

          <div class="container">
            <article class="prose prose-lg max-w-none">
              {/* Header */}
              <header class="mb-16">
                <div class="flex items-center gap-2 text-text-muted font-mono text-sm mb-6">
                  <time>{post().date}</time>
                  <span>•</span>
                  <span>{post().readTime}</span>
                </div>

                <h1 class="text-5xl font-mono font-bold text-accent mb-6">
                  {post().title}
                </h1>

                <div class="flex gap-2 mb-8">
                  {post().tags &&
                    post().tags.map((tag) => (
                      <span class="px-3 py-1 bg-bg-secondary border border-border rounded text-accent font-mono text-sm">
                        {tag}
                      </span>
                    ))}
                </div>

                {post().thumbnail && (
                  <div class="w-full flex justify-center">
                    <img
                      src={post().thumbnail}
                      alt={`Cover art for ${post().title}`}
                      class="w-full max-w-2xl h-auto rounded-xl border border-border"
                      loading="lazy"
                    />
                  </div>
                )}
              </header>

              {/* Content */}
              <div
                class="prose prose-lg max-w-none"
                innerHTML={post().content}
              />
            </article>

            {/* Navigation */}
            <nav class="mt-16 pt-8 border-t border-border">
              <div class="flex justify-between items-center">
                <A
                  href="/blog"
                  class="text-accent hover:text-accent-hover transition-colors duration-200 font-mono text-sm"
                >
                  ← back to blog
                </A>
                <div class="text-text-secondary font-mono text-sm">
                  thanks for reading
                </div>
              </div>
            </nav>
          </div>
        </>
      ) : (
        <div class="container text-center py-20">
          <h1 class="text-4xl font-mono font-bold text-text-primary mb-6">
            post not found
          </h1>
          <p class="text-text-secondary mb-8">
            the blog post you're looking for doesn't exist.
          </p>
          <A href="/blog" class="btn btn-primary">
            back to blog
          </A>
        </div>
      )}
    </div>
  );
}
