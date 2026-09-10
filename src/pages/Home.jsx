import { Title } from "solid-meta";
import { A } from "@solidjs/router";
import { For, createResource } from "solid-js";
import { loadProjects } from "../utils/content";
import { formatYearsOfExperience } from "../utils/experience";
import {
  EMPLOYERS,
  FEATURED_PROJECT_SLUGS,
  PROFILE,
} from "../data/profile";

export default function Home() {
  const [projects] = createResource(loadProjects);
  const featuredProjects = () =>
    FEATURED_PROJECT_SLUGS.map((slug) =>
      projects()?.find((project) => project.slug === slug),
    ).filter(Boolean);

  return (
    <div class="min-h-screen">
      <Title>Ignatij Gichevski — Senior Backend Engineer</Title>

      {/* Hero Section */}
      <section class="py-12 sm:py-20">
        <div class="container">
          <div class="flex flex-col sm:flex-row items-center justify-center mb-8">
            <div class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
              {/* Left part - Avatar */}
              <div class="flex-shrink-0">
                <img
                  src="/avatar.png"
                  alt="Ignatij Gichevski"
                  class="w-20 h-24 sm:w-24 sm:h-32 border-2 border-border"
                />
              </div>

              {/* Right part - Name and Description */}
              <div class="text-center sm:text-left">
                <h1 class="text-3xl sm:text-5xl lg:text-6xl font-mono font-bold text-accent leading-none mb-4">
                  {PROFILE.name}
                </h1>
                <p class="text-lg sm:text-xl lg:text-2xl text-text-secondary font-mono max-w-sm sm:max-w-none">
                  {PROFILE.headline}
                </p>
                <p class="text-sm text-text-muted font-mono mb-0">
                  {PROFILE.location}
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/Ignatij Gichevski CV.pdf"
              download
              class="btn btn-primary"
            >
              download cv
            </a>
            <a href={`mailto:${PROFILE.email}`} class="btn">
              contact me
            </a>
            <A href="/projects" class="btn">view work</A>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section class="py-12 sm:py-16 border-t border-border">
        <div class="container">
          <h2 class="text-3xl sm:text-4xl font-mono font-bold text-text-primary mb-6 sm:mb-8">
            backend focus
          </h2>
          <div class="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
            <div>
              <p class="text-text-secondary leading-relaxed mb-6">
                I own backend work from domain modelling and API design through
                persistence, messaging, production reliability, and delivery. My
                recent work centres on consistency-critical financial workflows,
                event-driven systems, and practical performance engineering.
              </p>
              <p class="text-text-secondary leading-relaxed mb-6">
                I stay hands-on while providing technical direction, reviews,
                and delivery leadership. Full-stack experience helps me work
                across product boundaries without losing the backend focus.
              </p>
              <div class="flex flex-wrap gap-2">
                <span is="badge" variant="blue" class="font-mono text-sm">
                  node.js
                </span>
                <span is="badge" variant="cyan" class="font-mono text-sm">
                  typescript
                </span>
                <span is="badge" variant="blue" class="font-mono text-sm">
                  go
                </span>
              </div>
            </div>
            <div class="bg-bg-secondary border border-border rounded-lg p-6">
              <h3 class="text-xl font-mono font-semibold text-text-primary mb-4">
                professional context
              </h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-text-secondary font-mono">experience</span>
                  <span class="text-accent font-mono">
                    {formatYearsOfExperience()}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-secondary font-mono">current</span>
                  <span class="text-accent font-mono text-right">Team Lead</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-secondary font-mono">focus</span>
                  <span class="text-accent font-mono text-right">backend ownership</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-secondary font-mono">location</span>
                  <span class="text-accent font-mono text-right">Skopje, North Macedonia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section class="py-12 sm:py-16 border-t border-border">
        <div class="container">
          <h2 class="text-3xl sm:text-4xl font-mono font-bold text-text-primary mb-8">
            professional experience
          </h2>
          <div class="grid md:grid-cols-2 gap-4 sm:gap-6">
            <For each={EMPLOYERS}>
              {(employer) => (
                <div class="card">
                  <div class="flex flex-col sm:flex-row sm:justify-between gap-1 mb-3">
                    <h3 class="text-xl font-mono font-semibold text-text-primary m-0">
                      {employer.name}
                    </h3>
                    <span class="text-text-muted font-mono text-sm">
                      {employer.period}
                    </span>
                  </div>
                  <p class="text-accent font-mono text-sm mb-3">
                    {employer.progression}
                  </p>
                  <p class="text-text-secondary mb-0">
                    {employer.name === "Ludotech"
                      ? "Backend ownership and technical leadership across J+ Monitor, Share of Search/Model, and Quarzo Life."
                      : "Engineering and coordination across RNE, USB, Forward Publishing, and W12."}
                  </p>
                </div>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Featured Client Work */}
      <section class="py-12 sm:py-16 border-t border-border">
        <div class="container">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <h2 class="text-3xl sm:text-4xl font-mono font-bold text-text-primary">
              selected client work
            </h2>
            <A
              href="/projects"
              class="text-accent hover:text-accent-hover transition-colors duration-200 font-mono text-sm"
            >
              view all →
            </A>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <For each={featuredProjects()}>
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

    </div>
  );
}
