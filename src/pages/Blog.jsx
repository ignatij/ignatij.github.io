import { Title } from "solid-meta";
import { For, Show, createResource } from "solid-js";
import { loadBlogPosts } from "../utils/content";
import { WritingEntry } from "../components/Entries";
export default function Blog() {
  const [posts] = createResource(loadBlogPosts);
  return <div class="container page">
    <Title>Writing — Ignatij Gichevski</Title>
    <header class="page-heading">
      <h1>Writing</h1>
      <p>Notes on programming, problem solving, and things I learn along the way.</p>
    </header>
    <Show when={posts.loading}>
      <p role="status">Loading writing…</p>
    </Show>
    <For each={posts()}>{post => <WritingEntry post={post} />}</For>
  </div>;
}
