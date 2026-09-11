import { Title } from "solid-meta";
import { A } from "@solidjs/router";
import { For, Show, createResource } from "solid-js";
import { loadProjects, loadBlogPosts } from "../utils/content";
import { EMPLOYERS, FEATURED_PROJECT_SLUGS, PROFILE } from "../data/profile";
import { ProjectEntry, WritingEntry } from "../components/Entries";
export default function Home() {
  const [projects] = createResource(loadProjects);
  const [posts] = createResource(loadBlogPosts);
  const selected = () => FEATURED_PROJECT_SLUGS.map(slug => projects()?.find(p => p.slug === slug)).filter(Boolean);
  return <div class="container page home">
    <Title>Ignatij Gichevski — Senior Backend Engineer</Title>
    <section class="intro" aria-labelledby="intro-title">
      <img src="/avatar.png" alt="" width="104" height="104" class="avatar" />
      <div class="intro-body">
        <h1 id="intro-title">{PROFILE.name}</h1>
      <p class="role">{PROFILE.headline}</p>
      <p class="intro-copy">I build reliable backend systems and financial workflows with TypeScript, Node.js, and Go. Currently leading engineering work at Ludotech.</p>
      <p class="metadata location">{PROFILE.location}</p>
      <div class="link-row">
        <a href={`mailto:${PROFILE.email}`}>Email ↗</a>
        <a href="/Ignatij Gichevski CV.pdf" download>Download CV ↓</a>
        <a href={PROFILE.github}>GitHub ↗</a>
        <a href={PROFILE.linkedin}>LinkedIn ↗</a>
      </div>
      </div>
    </section>
    <Show when={selected().length}>
      <section aria-labelledby="work-title">
        <div class="section-heading">
          <h2 id="work-title">Selected work</h2>
          <A href="/projects">All work →</A>
        </div>
        <For each={selected()}>{project => <ProjectEntry project={project} />}</For>
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
        <p class="metadata">Projects: {employer.name === "Ludotech" ? "J+ Monitor, Share of Search/Model, Quarzo Life." : "RNE, USB, Forward Publishing, W12."}</p>
      </article>}</For>
    </section>
    <Show when={posts()?.length}>
      <section aria-labelledby="writing-title">
        <div class="section-heading">
          <h2 id="writing-title">Selected writing</h2>
          <A href="/blog">All writing →</A>
        </div>
        <For each={posts()?.slice(0, 3)}>{post => <WritingEntry post={post} />}</For>
      </section>
    </Show>
  </div>;
}
