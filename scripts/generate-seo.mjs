import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import hljs from "highlight.js";
import {
  EMPLOYERS,
  FEATURED_PROJECT_SLUGS,
  FOCUS_AREAS,
  HOME_OPEN_SOURCE_SLUGS,
  PROFILE,
} from "../src/data/profile.js";
import { formatYearsOfExperience } from "../src/utils/experience.js";

const ROOT = process.cwd();
const DIST_DIR = path.join(ROOT, "dist");
const PROJECTS_DIR = path.join(ROOT, "content", "projects");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const SITE_URL = PROFILE.website.replace(/\/+$/, "");
const OG_IMAGE = `${SITE_URL}/avatar.png`;

// Match the marked + highlight.js configuration in src/utils/content.js
const renderer = new marked.Renderer();
renderer.code = function (code, lang) {
  const codeText = code.text || code;
  const codeLang = code.lang || lang;
  let highlightedCode = codeText;

  if (codeLang && hljs.getLanguage(codeLang)) {
    try {
      highlightedCode = hljs.highlight(codeText, { language: codeLang }).value;
    } catch {
      // fall back to raw text
    }
  } else {
    try {
      highlightedCode = hljs.highlightAuto(codeText).value;
    } catch {
      // fall back to raw text
    }
  }

  return `<pre tabindex="0" aria-label="Code example"><code class="hljs language-${
    escapeAttr(codeLang || "")
  }">${highlightedCode}</code></pre>`;
};

marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: false,
  mangle: false,
  pedantic: false,
  smartLists: false,
  smartypants: false,
  xhtml: false,
  renderer,
});

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttr(value = "") {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

function toCanonicalUrl(routePath) {
  if (!routePath || routePath === "/") {
    return `${SITE_URL}/`;
  }
  const normalized = routePath.startsWith("/") ? routePath : `/${routePath}`;
  return `${SITE_URL}${normalized.replace(/\/+$/, "")}/`;
}

function formatIsoDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function formatDisplayDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

async function readProjects() {
  const files = await fs.readdir(PROJECTS_DIR);
  const items = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
    const { data, content: markdown } = matter(raw);
    if (data.archived === true) continue;

    items.push({
      ...data,
      slug,
      html: marked(markdown),
      excerpt: data.excerpt || `${markdown.slice(0, 200)}...`,
      lastmod: formatIsoDate(data.end_date || data.start_date),
    });
  }

  return items.sort((a, b) => {
    const aHasDates = a.start_date || a.end_date;
    const bHasDates = b.start_date || b.end_date;
    if (aHasDates && !bHasDates) return -1;
    if (!aHasDates && bHasDates) return 1;
    if (aHasDates && bHasDates) {
      if (a.end_date && b.end_date) return new Date(b.end_date) - new Date(a.end_date);
      if (a.end_date && !b.end_date) return 1;
      if (!a.end_date && b.end_date) return -1;
      if (a.start_date && b.start_date) return new Date(b.start_date) - new Date(a.start_date);
    }
    const aOrder = Number.isFinite(a.personal_project_order)
      ? a.personal_project_order
      : Number.POSITIVE_INFINITY;
    const bOrder = Number.isFinite(b.personal_project_order)
      ? b.personal_project_order
      : Number.POSITIVE_INFINITY;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return (a.title || "").localeCompare(b.title || "");
  });
}

async function readBlogPosts() {
  const files = await fs.readdir(BLOG_DIR);
  const items = [];

  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
    const { data, content: markdown } = matter(raw);
    if (data.draft === true) continue;

    const wordCount = markdown.split(/\s+/).length;
    const readTime = `${Math.ceil(wordCount / 200)} min read`;
    const excerpt =
      data.excerpt ||
      `${markdown.split("\n").find((line) => line.trim() && !line.startsWith("#"))?.slice(0, 200) || markdown.slice(0, 200)}...`;

    items.push({
      ...data,
      slug,
      featured: data.featured !== false,
      topic: data.topic || null,
      readTime,
      excerpt,
      html: marked(markdown),
      lastmod: formatIsoDate(data.date),
    });
  }

  return items.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function renderShell(mainHtml) {
  const year = new Date().getUTCFullYear();
  return `<div>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header container">
    <a href="/" class="home-link">ignatij</a>
    <nav aria-label="Main navigation">
      <a href="/projects">Work</a>
      <a href="/blog">Writing</a>
      <a href="/Ignatij%20Gichevski%20CV.pdf" download>CV ↓</a>
    </nav>
  </header>
  <main id="main-content" tabindex="-1">${mainHtml}</main>
  <footer class="site-footer container">
    <p class="footer-availability">${escapeHtml(PROFILE.availability)}</p>
    <div class="footer-content">
      <div class="contact-line"><span>Let’s talk.</span><a href="mailto:${escapeAttr(PROFILE.email)}">${escapeHtml(PROFILE.email)}</a></div>
      <p class="metadata">© ${year} ${escapeHtml(PROFILE.name)}</p>
    </div>
  </footer>
</div>`;
}

function renderProjectEntry(project) {
  const techs = (project.home_technologies || project.technologies || []).slice(0, 4).join(" · ");
  return `<article class="work-entry">
  <h3><a href="/projects/${escapeAttr(project.slug)}">${escapeHtml(project.title)}<span aria-hidden="true"> ↗</span></a></h3>
  ${project.listing_subtitle ? `<p class="entry-subtitle">${escapeHtml(project.listing_subtitle)}</p>` : ""}
  <p>${escapeHtml(project.home_summary || project.excerpt)}</p>
  <p class="metadata">${escapeHtml(techs)}</p>
</article>`;
}

function renderWritingEntry(post) {
  const iso = formatIsoDate(post.date) || "";
  return `<article class="writing-entry">
  <h3><a href="/blog/${escapeAttr(post.slug)}">${escapeHtml(post.title)}</a></h3>
  <p class="metadata"><time datetime="${escapeAttr(iso)}">${escapeHtml(formatDisplayDate(post.date))}</time>${post.topic ? ` · ${escapeHtml(post.topic)}` : ""}</p>
</article>`;
}

function renderHomeBody(projects, posts) {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const selectedSystems = FEATURED_PROJECT_SLUGS.map((s) => bySlug.get(s)).filter(Boolean);
  const selectedOpenSource = HOME_OPEN_SOURCE_SLUGS.map((s) => bySlug.get(s)).filter(Boolean);
  const featuredPosts = posts.filter((p) => p.featured !== false).slice(0, 3);

  const focusItems = FOCUS_AREAS.map(
    (area) => `<li><strong>${escapeHtml(area.label)}:</strong> ${escapeHtml(area.detail)}</li>`,
  ).join("");

  const employerBlocks = EMPLOYERS.map((employer) => {
    const linked = employer.projectSlugs
      .map((slug) => bySlug.get(slug))
      .filter(Boolean)
      .map((p) => `<a href="/projects/${escapeAttr(p.slug)}">${escapeHtml(p.title)}</a>`)
      .join(", ");
    return `<article class="experience-entry">
      <div class="employer-heading"><h3>${escapeHtml(employer.name)}</h3><span class="metadata">${escapeHtml(employer.period)}</span></div>
      <p class="progression">${escapeHtml(employer.progression)}</p>
      <p class="employer-summary">${escapeHtml(employer.summary)}</p>
      ${linked ? `<p class="metadata employer-projects">Projects: ${linked}.</p>` : ""}
    </article>`;
  }).join("");

  return `<div class="container page home">
  <section class="intro" aria-labelledby="intro-title">
    <img src="/avatar.png" alt="" width="104" height="104" class="avatar" />
    <div class="intro-body">
      <h1 id="intro-title">${escapeHtml(PROFILE.name)}</h1>
      <p class="role">${escapeHtml(PROFILE.headline)}</p>
      <p class="intro-copy">${escapeHtml(formatYearsOfExperience())} designing reliable distributed and financial workflows, application security boundaries, and production AI/agent infrastructure across Go, TypeScript, Python, and PostgreSQL. Currently Team Lead at Ludotech; previously Technical Coordinator at Netcetera.</p>
      <p class="metadata location">${escapeHtml(PROFILE.location)}</p>
      <div class="link-row">
        <a href="mailto:${escapeAttr(PROFILE.email)}">Email ↗</a>
        <a href="/Ignatij%20Gichevski%20CV.pdf" download>Download CV ↓</a>
        <a href="${escapeAttr(PROFILE.github)}">GitHub ↗</a>
        <a href="${escapeAttr(PROFILE.linkedin)}">LinkedIn ↗</a>
      </div>
    </div>
  </section>
  <section class="focus-section" aria-label="Focus areas"><ul class="focus-list">${focusItems}</ul></section>
  <section aria-labelledby="work-title">
    <div class="section-heading"><h2 id="work-title">Selected systems</h2><a href="/projects">All work →</a></div>
    ${selectedSystems.map(renderProjectEntry).join("")}
  </section>
  <section aria-labelledby="oss-title">
    <div class="section-heading"><h2 id="oss-title">Selected open source</h2><a href="/projects#open-source">All open source →</a></div>
    ${selectedOpenSource.map(renderProjectEntry).join("")}
  </section>
  <section aria-labelledby="experience-title">
    <h2 id="experience-title">Experience</h2>
    ${employerBlocks}
  </section>
  ${featuredPosts.length ? `<section aria-labelledby="writing-title"><div class="section-heading"><h2 id="writing-title">Selected writing</h2><a href="/blog">All writing →</a></div>${featuredPosts.map(renderWritingEntry).join("")}</section>` : ""}
</div>`;
}

function renderProjectsBody(projects) {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const openSource = projects.filter((p) => p.category !== "client");

  const employerSections = EMPLOYERS.map((employer) => {
    const items = employer.projectSlugs.map((slug) => bySlug.get(slug)).filter(Boolean);
    if (!items.length) return "";
    return `<section>
      <div class="employer-heading"><h2>${escapeHtml(employer.name)}</h2><span class="metadata">${escapeHtml(employer.period)}</span></div>
      <p class="progression">${escapeHtml(employer.progression)}</p>
      ${items.map(renderProjectEntry).join("")}
    </section>`;
  }).join("");

  return `<div class="container page">
  <header class="page-heading">
    <h1>Work</h1>
    <p>Production systems built across Ludotech and Netcetera, followed by selected open-source tools and libraries.</p>
  </header>
  ${employerSections}
  ${openSource.length ? `<section id="open-source"><h2>Open source &amp; tooling</h2>${openSource.map(renderProjectEntry).join("")}</section>` : ""}
</div>`;
}

function renderProjectDetailBody(project) {
  const links = [
    project.github ? `<a href="${escapeAttr(project.github)}">GitHub ↗</a>` : "",
    project.live ? `<a href="${escapeAttr(project.live)}">Live demo ↗</a>` : "",
  ].filter(Boolean).join("");

  return `<div class="container page">
  <article>
    <header class="page-heading">
      <p class="metadata">${escapeHtml(project.category === "client" ? `${project.employer} · Client project` : "Personal / open-source project")}</p>
      <h1>${escapeHtml(project.title)}</h1>
      <p>${escapeHtml(project.excerpt)}</p>
      <p class="metadata">${escapeHtml((project.technologies || []).join(" · "))}</p>
      ${links ? `<div class="link-row">${links}</div>` : ""}
    </header>
    <div class="prose">${project.html}</div>
  </article>
  <nav class="back-link" aria-label="More work"><a href="/projects">← All work</a></nav>
</div>`;
}

function renderBlogBody(posts) {
  return `<div class="container page">
  <header class="page-heading">
    <h1>Writing</h1>
    <p>Technical notes on distributed workflows, application security, and production systems.</p>
  </header>
  ${posts.map(renderWritingEntry).join("")}
</div>`;
}

function renderBlogPostBody(post) {
  const iso = formatIsoDate(post.date) || "";
  return `<div class="container page">
  <article>
    <header class="page-heading">
      <p class="metadata"><time datetime="${escapeAttr(iso)}">${escapeHtml(formatDisplayDate(post.date))}</time>${post.topic ? ` · ${escapeHtml(post.topic)}` : ""} · ${escapeHtml(post.readTime)}</p>
      <h1>${escapeHtml(post.title)}</h1>
    </header>
    <div class="prose">${post.html}</div>
  </article>
  <nav class="back-link" aria-label="More writing"><a href="/blog">← All writing</a></nav>
</div>`;
}

function buildMetaBlock({ title, description, canonical, type = "website" }) {
  const t = escapeHtml(title);
  const d = escapeAttr(description);
  const c = escapeAttr(canonical);
  const img = escapeAttr(OG_IMAGE);

  return [
    `<title data-sm="">${t}</title>`,
    `<meta data-sm="" name="description" content="${d}" />`,
    `<link data-sm="" rel="canonical" href="${c}" />`,
    `<meta data-sm="" property="og:type" content="${escapeAttr(type)}" />`,
    `<meta data-sm="" property="og:url" content="${c}" />`,
    `<meta data-sm="" property="og:title" content="${escapeAttr(title)}" />`,
    `<meta data-sm="" property="og:description" content="${d}" />`,
    `<meta data-sm="" property="og:image" content="${img}" />`,
    `<meta data-sm="" name="twitter:card" content="summary" />`,
    `<meta data-sm="" name="twitter:url" content="${c}" />`,
    `<meta data-sm="" name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta data-sm="" name="twitter:description" content="${d}" />`,
    `<meta data-sm="" name="twitter:image" content="${img}" />`,
  ].join("\n    ");
}

function applyRouteToTemplate(templateHtml, route) {
  // Strip existing data-sm="" tags from dist/index.html before injecting route-specific tags
  const strippedHead = templateHtml
    .replace(/<title\b[^>]*data-sm=""[^>]*>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<(?:meta|link)\b[^>]*data-sm=""[^>]*\/?>\s*/gi, "");

  const metaBlock = buildMetaBlock(route);
  const withHead = strippedHead.replace(
    /<\/head>/i,
    `    ${metaBlock}\n  </head>`,
  );

  return withHead.replace(
    /<div id="root"><\/div>/i,
    `<div id="root">${renderShell(route.bodyHtml)}</div>`,
  );
}

function buildSitemapXml(routes) {
  const entries = routes
    .map((route) => {
      const lastmodTag = route.lastmod ? `\n    <lastmod>${route.lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${escapeHtml(route.canonical)}</loc>${lastmodTag}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

async function main() {
  const templateHtml = await fs.readFile(path.join(DIST_DIR, "index.html"), "utf8");
  const [projects, posts] = await Promise.all([readProjects(), readBlogPosts()]);

  const latestBlogDate = posts.map((p) => p.lastmod).filter(Boolean).sort().at(-1) || null;
  const latestProjectDate = projects.map((p) => p.lastmod).filter(Boolean).sort().at(-1) || null;
  const latestOverallDate = [latestBlogDate, latestProjectDate].filter(Boolean).sort().at(-1) || null;

  const routes = [
    {
      path: "/",
      canonical: toCanonicalUrl("/"),
      title: `${PROFILE.name} — ${PROFILE.headline}`,
      description: PROFILE.summary,
      type: "website",
      lastmod: latestOverallDate,
      bodyHtml: renderHomeBody(projects, posts),
    },
    {
      path: "/projects",
      canonical: toCanonicalUrl("/projects"),
      title: `Work — ${PROFILE.name}`,
      description:
        "Production systems built across Ludotech and Netcetera, plus selected open-source tools and libraries in Go, TypeScript, Python, and Java.",
      type: "website",
      lastmod: latestProjectDate,
      bodyHtml: renderProjectsBody(projects),
    },
    {
      path: "/blog",
      canonical: toCanonicalUrl("/blog"),
      title: `Writing — ${PROFILE.name}`,
      description:
        "Technical notes on distributed workflows, application security, performance, and production systems by Ignatij Gichevski.",
      type: "website",
      lastmod: latestBlogDate,
      bodyHtml: renderBlogBody(posts),
    },
    ...projects.map((project) => ({
      path: `/projects/${project.slug}`,
      canonical: toCanonicalUrl(`/projects/${project.slug}`),
      title: `${project.title} — ${PROFILE.name}`,
      description: project.excerpt || project.description || PROFILE.summary,
      type: "article",
      lastmod: project.lastmod,
      bodyHtml: renderProjectDetailBody(project),
    })),
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      canonical: toCanonicalUrl(`/blog/${post.slug}`),
      title: `${post.title} — ${PROFILE.name}`,
      description: post.excerpt || PROFILE.summary,
      type: "article",
      lastmod: post.lastmod,
      bodyHtml: renderBlogPostBody(post),
    })),
  ];

  // Write sitemap.xml into dist/
  const sitemapXml = buildSitemapXml(routes);
  await fs.writeFile(path.join(DIST_DIR, "sitemap.xml"), sitemapXml, "utf8");

  // Write prerendered HTML for / and every subroute into dist/<route>/index.html
  for (const route of routes) {
    const html = applyRouteToTemplate(templateHtml, route);
    const outFile =
      route.path === "/"
        ? path.join(DIST_DIR, "index.html")
        : path.join(DIST_DIR, route.path.replace(/^\/+/, ""), "index.html");
    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, html, "utf8");
  }

  console.log(`Generated sitemap.xml and ${routes.length} static route HTML files in dist/`);
}

main().catch((error) => {
  console.error("Failed to generate SEO artifacts:", error);
  process.exitCode = 1;
});
