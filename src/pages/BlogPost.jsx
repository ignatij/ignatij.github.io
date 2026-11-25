import { useParams, A } from "@solidjs/router";
import { Show, createResource } from "solid-js";
import { loadBlogPost } from "../utils/content";
import PageMeta from "../components/PageMeta";
export default function BlogPost() {
  const params = useParams();
  const [post] = createResource(() => params.slug, loadBlogPost);
  return <div class="container page">
    <Show when={!post.loading} fallback={<p role="status">Loading article…</p>}>
      <Show when={post()} fallback={<>
        <PageMeta
          title="Article not found — Ignatij Gichevski"
          description="The requested article could not be found."
          path={`/blog/${params.slug}`}
          noindex
        />
        <h1>Article not found</h1>
        <A href="/blog">Back to writing</A>
      </>}>
        {p => <>
          <PageMeta
            title={`${p().title} — Ignatij Gichevski`}
            description={p().excerpt}
            path={`/blog/${p().slug}`}
            type="article"
          />
          <article>
            <header class="page-heading">
              <p class="metadata">
                <time dateTime={String(p().date)}>{new Date(p().date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>{p().topic ? ` · ${p().topic}` : ""} · {p().readTime}</p>
              <h1>{p().title}</h1>
            </header>
            <div class="prose" innerHTML={p().content} />
          </article>
          <nav class="back-link" aria-label="More writing">
            <A href="/blog">← All writing</A>
          </nav>
        </>}
      </Show>
    </Show>
  </div>;
}
