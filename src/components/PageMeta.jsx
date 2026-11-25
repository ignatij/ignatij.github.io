import { Title, Meta, Link } from "solid-meta";
import { Show } from "solid-js";
import { PROFILE } from "../data/profile";

export function buildCanonicalUrl(path = "/") {
  const base = PROFILE.website.replace(/\/+$/, "");
  if (!path || path === "/") {
    return `${base}/`;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized.replace(/\/+$/, "")}/`;
}

export default function PageMeta(props) {
  const canonical = () => buildCanonicalUrl(props.path);
  const ogType = () => props.type || "website";
  const image = () => `${PROFILE.website.replace(/\/+$/, "")}/avatar.png`;

  return (
    <>
      <Title>{props.title}</Title>
      <Meta name="description" content={props.description} />
      <Link rel="canonical" href={canonical()} />
      <Show when={props.noindex}>
        <Meta name="robots" content="noindex, follow" />
      </Show>
      <Meta property="og:type" content={ogType()} />
      <Meta property="og:url" content={canonical()} />
      <Meta property="og:title" content={props.title} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:image" content={image()} />
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:url" content={canonical()} />
      <Meta name="twitter:title" content={props.title} />
      <Meta name="twitter:description" content={props.description} />
      <Meta name="twitter:image" content={image()} />
    </>
  );
}
