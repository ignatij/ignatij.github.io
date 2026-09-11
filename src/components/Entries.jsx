import { A } from "@solidjs/router";
export function ProjectEntry(props) {
  return <article class="work-entry">
    <h3>
      <A href={`/projects/${props.project.slug}`}>{props.project.title}<span aria-hidden="true"> ↗</span>
      </A>
    </h3>
    {props.project.listing_subtitle && <p class="entry-subtitle">{props.project.listing_subtitle}</p>}
    <p>{props.project.home_summary || props.project.excerpt}</p>
    <p class="metadata">{(props.project.home_technologies || props.project.technologies || []).slice(0, 4).join(" · ")}</p>
  </article>;
}
export function WritingEntry(props) {
  return <article class="writing-entry">
    <h3>
      <A href={`/blog/${props.post.slug}`}>{props.post.title}</A>
    </h3>
    <time class="metadata" dateTime={String(props.post.date)}>{new Date(props.post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>
  </article>;
}
