import { Title } from "solid-meta";
import { For, Show, createResource } from "solid-js";
import { loadProjects } from "../utils/content";
import { EMPLOYERS } from "../data/profile";
import { ProjectEntry } from "../components/Entries";

export default function Projects() {
  const [projects] = createResource(loadProjects);
  const employerProjects = employer =>
    employer.projectSlugs.map(slug => projects()?.find(p => p.slug === slug)).filter(Boolean);
  const openSource = () =>
    projects()?.filter(p => p.category !== "client" && !p.archived) || [];

  return <div class="container page">
    <Title>Work — Ignatij Gichevski</Title>
    <header class="page-heading">
      <h1>Work</h1>
      <p>Production systems built across Ludotech and Netcetera, followed by selected open-source tools and libraries.</p>
    </header>
    <Show when={projects.loading}>
      <p role="status">Loading work…</p>
    </Show>
    <For each={EMPLOYERS}>{employer => <Show when={employerProjects(employer).length}>
      <section>
        <div class="employer-heading">
          <h2>{employer.name}</h2>
          <span class="metadata">{employer.period}</span>
        </div>
        <p class="progression">{employer.progression}</p>
        <For each={employerProjects(employer)}>{project => <ProjectEntry project={project} />}</For>
      </section>
    </Show>}</For>
    <Show when={openSource().length}>
      <section id="open-source">
        <h2>Open source &amp; tooling</h2>
        <For each={openSource()}>{project => <ProjectEntry project={project} />}</For>
      </section>
    </Show>
  </div>;
}
