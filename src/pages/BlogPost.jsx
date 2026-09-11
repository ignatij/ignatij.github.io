import { Title } from "solid-meta";
import { useParams, A } from "@solidjs/router";
import { Show, createResource } from "solid-js";
import { loadBlogPost } from "../utils/content";
export default function BlogPost() {
  const params = useParams();
  const [post] = createResource(() => params.slug, loadBlogPost);
  return <div class="container page">
    <Show when={!post.loading} fallback={<p role="status">Loading article…</p>}>
      <Show when={post()} fallback={<>
        <h1>Article not found</h1>
        <A href="/blog">Back to writing</A>
      </>}>
        {p => <>
          <Title>{p().title} — Ignatij Gichevski</Title>
          <article>
            <header class="page-heading">
              <p class="metadata">
                <time dateTime={String(p().date)}>{new Date(p().date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time> · {p().readTime}</p>
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
