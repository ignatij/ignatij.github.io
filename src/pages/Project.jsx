import { Title } from "solid-meta";
import { useParams, A } from "@solidjs/router";
import { Show, createResource } from "solid-js";
import { loadProject } from "../utils/content";
export default function Project() {
  const params = useParams();
  const [project] = createResource(() => params.slug, loadProject);
  return <div class="container page">
    <Show when={!project.loading} fallback={<p role="status">Loading project…</p>}>
      <Show when={project()} fallback={<>
        <h1>Project not found</h1>
        <A href="/projects">Back to work</A>
      </>}>
        {p => <>
          <Title>{p().title} — Ignatij Gichevski</Title>
          <article>
            <header class="page-heading">
              <p class="metadata">{p().category === "client" ? `${p().employer} · Client project` : "Personal / open-source project"}</p>
              <h1>{p().title}</h1>
              <p>{p().excerpt}</p>
              <p class="metadata">{p().technologies?.join(" · ")}</p>
              <div class="link-row">
                <Show when={p().github}>
                  <a href={p().github}>GitHub ↗</a>
                </Show>
                <Show when={p().live}>
                  <a href={p().live}>Live demo ↗</a>
                </Show>
              </div>
            </header>
            <div class="prose" innerHTML={p().content} />
          </article>
          <nav class="back-link" aria-label="More work">
            <A href="/projects">← All work</A>
          </nav>
        </>}
      </Show>
    </Show>
  </div>;
}
