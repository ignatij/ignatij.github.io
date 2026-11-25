import { Title } from "solid-meta";
import { A } from "@solidjs/router";
import { For, Show, createResource } from "solid-js";
import { loadProjects, loadBlogPosts } from "../utils/content";
import {
  EMPLOYERS,
  FEATURED_PROJECT_SLUGS,
  FOCUS_AREAS,
  HOME_OPEN_SOURCE_SLUGS,
  PROFILE,
} from "../data/profile";
import { formatYearsOfExperience } from "../utils/experience";
import { ProjectEntry, WritingEntry } from "../components/Entries";

export default function Home() {
  const [projects] = createResource(loadProjects);
  const [posts] = createResource(loadBlogPosts);
  const selectedSystems = () =>
    FEATURED_PROJECT_SLUGS.map(slug => projects()?.find(p => p.slug === slug)).filter(Boolean);
  const selectedOpenSource = () =>
    HOME_OPEN_SOURCE_SLUGS.map(slug => projects()?.find(p => p.slug === slug)).filter(Boolean);
  const employerProjects = employer =>
    employer.projectSlugs.map(slug => projects()?.find(p => p.slug === slug)).filter(Boolean);
  const featuredPosts = () =>
    (posts() || []).filter(post => post.featured !== false).slice(0, 3);

  return <div class="container page home">
    <Title>{PROFILE.name} — {PROFILE.headline}</Title>
    <section class="intro" aria-labelledby="intro-title">
      <img src="/avatar.png" alt="" width="104" height="104" class="avatar" />
      <div class="intro-body">
        <h1 id="intro-title">{PROFILE.name}</h1>
        <p class="role">{PROFILE.headline}</p>
        <p class="intro-copy">
          {formatYearsOfExperience()} designing reliable distributed and financial workflows, application security boundaries, and production AI/agent infrastructure across Go, TypeScript, Python, and PostgreSQL. Currently Team Lead at Ludotech; previously Technical Coordinator at Netcetera.
        </p>
        <p class="metadata location">{PROFILE.location}</p>
        <div class="link-row">
          <a href={`mailto:${PROFILE.email}`}>Email ↗</a>
          <a href="/Ignatij Gichevski CV.pdf" download>Download CV ↓</a>
          <a href={PROFILE.github}>GitHub ↗</a>
          <a href={PROFILE.linkedin}>LinkedIn ↗</a>
        </div>
      </div>
    </section>
    <section class="focus-section" aria-label="Focus areas">
      <ul class="focus-list">
        <For each={FOCUS_AREAS}>{area => <li><strong>{area.label}:</strong> {area.detail}</li>}</For>
      </ul>
    </section>
    <Show when={selectedSystems().length}>
      <section aria-labelledby="work-title">
        <div class="section-heading">
          <h2 id="work-title">Selected systems</h2>
          <A href="/projects">All work →</A>
        </div>
        <For each={selectedSystems()}>{project => <ProjectEntry project={project} />}</For>
      </section>
    </Show>
    <Show when={selectedOpenSource().length}>
      <section aria-labelledby="oss-title">
        <div class="section-heading">
          <h2 id="oss-title">Selected open source</h2>
          <A href="/projects#open-source">All open source →</A>
        </div>
        <For each={selectedOpenSource()}>{project => <ProjectEntry project={project} />}</For>
      </section>
    </Show>
    <section aria-labelledby="experience-title">
      <h2 id="experience-title">Experience</h2>
      <For each={EMPLOYERS}>{employer => <article class="experience-entry">
        <div class="employer-heading">
          <h3>{employer.name}</h3>
          <span class="metadata">{employer.period}</span>
        </div>
        <p class="progression">{employer.progression}</p>
        <p class="employer-summary">{employer.summary}</p>
        <Show when={employerProjects(employer).length}>
          <p class="metadata employer-projects">
            Projects:{" "}
            <For each={employerProjects(employer)}>{(project, index) => <>
              {index() > 0 ? ", " : ""}
              <A href={`/projects/${project.slug}`}>{project.title}</A>
            </>}</For>.
          </p>
        </Show>
      </article>}</For>
    </section>
    <Show when={featuredPosts().length}>
      <section aria-labelledby="writing-title">
        <div class="section-heading">
          <h2 id="writing-title">Selected writing</h2>
          <A href="/blog">All writing →</A>
        </div>
        <For each={featuredPosts()}>{post => <WritingEntry post={post} />}</For>
      </section>
    </Show>
  </div>;
}
