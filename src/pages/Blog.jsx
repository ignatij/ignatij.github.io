import { For, Show, createResource } from "solid-js";
import { loadBlogPosts } from "../utils/content";
import { WritingEntry } from "../components/Entries";
import PageMeta from "../components/PageMeta";

export default function Blog() {
  const [posts] = createResource(loadBlogPosts);
  return <div class="container page">
    <PageMeta
      title="Writing — Ignatij Gichevski"
      description="Technical notes on distributed workflows, application security, performance, and production systems by Ignatij Gichevski."
      path="/blog"
    />
    <header class="page-heading">
      <h1>Writing</h1>
      <p>Technical notes on distributed workflows, application security, and production systems.</p>
    </header>
    <Show when={posts.loading}>
      <p role="status">Loading writing…</p>
    </Show>
    <For each={posts()}>{post => <WritingEntry post={post} />}</For>
  </div>;
}
