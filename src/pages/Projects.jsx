import { Title } from "solid-meta";
import { A } from "@solidjs/router";
import { For, createSignal, onMount } from "solid-js";
import { loadProjects } from "../utils/content";
import { EMPLOYERS } from "../data/profile";

function ProjectCard(props) {
  return (
    <A href={`/projects/${props.project.slug}`} class="card group">
      <p class="font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
        {props.project.category === "client" ? "client project" : "open source / personal"}
      </p>
      <h3 class="text-xl font-mono font-semibold text-text-primary mb-3 mt-0 group-hover:text-accent transition-colors duration-200">
        {props.project.title}
      </h3>
      <p class="text-text-secondary leading-relaxed mb-4">{props.project.excerpt}</p>
      <div class="flex flex-wrap gap-2 mb-5">
        <For each={props.project.technologies}>
          {(tech) => (
            <span class="px-2 py-1 bg-bg-tertiary border border-border rounded text-accent font-mono text-xs">
              {tech}
            </span>
          )}
        </For>
      </div>
      {props.project.github && <span class="text-accent font-mono text-sm">github →</span>}
    </A>
  );
}

export default function Projects() {
  const [projects, setProjects] = createSignal([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    try {
      setProjects(await loadProjects());
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div class="min-h-screen py-12 sm:py-16">
      <Title>Experience & Projects — Ignatij Gichevski</Title>
      <div class="container">
        <header class="mb-12 sm:mb-16">
          <h1 class="text-4xl sm:text-6xl font-mono font-bold text-accent mb-6">
            experience & projects
          </h1>
          <p class="text-text-secondary max-w-3xl">
            Client work is grouped under the employer where I delivered it;
            personal and open-source work is listed separately.
          </p>
        </header>

        {loading() ? (
          <div class="text-center py-12">
            <p class="text-text-secondary font-mono">loading projects...</p>
          </div>
        ) : (
          <>
            <For each={EMPLOYERS}>
              {(employer) => (
              <section class="mb-14">
                <div class="mb-5 border-b border-border pb-4">
                  <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h2 class="text-2xl font-mono font-semibold text-text-primary m-0">
                      {employer.name}
                    </h2>
                    <span class="font-mono text-sm text-text-muted">
                      {employer.period}
                    </span>
                  </div>
                  <p class="font-mono text-sm text-accent mt-2 mb-0">
                    {employer.progression}
                  </p>
                </div>
                <div class="grid md:grid-cols-2 gap-6">
                  <For
                    each={employer.projectSlugs
                      .map((slug) => projects().find((project) => project.slug === slug))
                      .filter(Boolean)}
                  >
                    {(project) => <ProjectCard project={project} />}
                  </For>
                </div>
              </section>
              )}
            </For>

            <section>
              <div class="mb-5 border-b border-border pb-4">
                <h2 class="text-2xl font-mono font-semibold text-text-primary m-0">
                  personal & open-source projects
                </h2>
              </div>
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <For each={projects().filter((project) => project.category !== "client")}>
                  {(project) => <ProjectCard project={project} />}
                </For>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
