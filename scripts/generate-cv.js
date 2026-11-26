import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import puppeteer from "puppeteer";
import { RESEND_CV } from "./cv-targets/resend.js";
import { DUALENTRY_CV } from "./cv-targets/dualentry.js";
import {
  EDUCATION,
  EMPLOYERS,
  FEATURED_OPEN_SOURCE_SLUGS,
  PROFILE,
  SKILLS,
} from "../src/data/profile.js";

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "content", "projects");
const target = process.argv[2] || "general";
const TARGETS = { resend: RESEND_CV, dualentry: DUALENTRY_CV };
if (target !== "general" && !(target in TARGETS)) {
  throw new Error(`Unknown CV target: ${target}`);
}
const tailored = TARGETS[target] || null;
const OUTPUT_PATH = tailored
  ? path.join(ROOT, "content", "cv", `Ignatij Gichevski CV - ${target === "resend" ? "Resend" : "DualEntry"}.pdf`)
  : path.join(ROOT, "public", "Ignatij Gichevski CV.pdf");
const ARCHIVE_PATH = path.join(ROOT, "content", "cv", "Ignatij Gichevski CV.pdf");

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const cleanBullet = (value = "") => String(value).replace(/^\s*[•*-]\s+/, "");

async function loadProjects() {
  const files = await fs.readdir(PROJECTS_DIR);
  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const source = await fs.readFile(path.join(PROJECTS_DIR, file), "utf8");
        return {
          ...matter(source).data,
          slug: file.replace(/\.md$/, ""),
        };
      }),
  );
  return new Map(entries.map((project) => [project.slug, project]));
}

function projectEntry(project, { openSource = false } = {}) {
  const highlights = (
    tailored?.highlights?.[project.slug] ||
    project.cv_highlights ||
    [project.my_role || project.description]
  ).map(cleanBullet);
  const link = openSource && project.github
    ? `<a class="project-link" href="${escapeHtml(project.github)}">GitHub</a>`
    : "";
  const technologies = tailored?.technologies?.[project.slug] || project.technologies;
  const tech = technologies?.length
    ? `<p class="tech"><strong>Technology:</strong> ${technologies.map(escapeHtml).join(", ")}</p>`
    : "";

  return `<article class="project">
    <div class="project-heading"><h3>${escapeHtml(project.title)}</h3>${link}</div>
    <ul>${highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    ${tech}
  </article>`;
}

function employerSection(employer, projectMap) {
  const projects = (tailored?.projectsByEmployer?.[employer.name] || employer.projectSlugs)
    .map((slug) => projectMap.get(slug))
    .filter(Boolean)
    .map((project) => projectEntry(project))
    .join("");
  const progression = employer.progression.replaceAll("→", "->");

  return `<section class="employer">
    <div class="employer-heading">
      <div class="employer-row">
        <h2>${escapeHtml(employer.name)}</h2>
        <span class="employer-period">${escapeHtml(employer.period)}</span>
      </div>
      <p class="employer-progression">${escapeHtml(progression)}</p>
    </div>
    ${tailored ? `<p class="project-label">Selected projects at ${escapeHtml(employer.name)}</p>` : ""}
    ${projects}
  </section>`;
}

function pageHeader() {
  return `<header>
    <h1>${escapeHtml(PROFILE.name)}</h1>
    <p class="headline">${escapeHtml(PROFILE.headline)}</p>
    <div class="contact">
      <span>${escapeHtml(PROFILE.location)}</span>
      <a href="mailto:${escapeHtml(PROFILE.email)}">${escapeHtml(PROFILE.email)}</a>
      <a href="${escapeHtml(PROFILE.website)}">${escapeHtml(PROFILE.website.replace("https://", ""))}</a>
      <a href="${escapeHtml(PROFILE.linkedin)}">LinkedIn</a>
      <a href="${escapeHtml(PROFILE.github)}">GitHub</a>
    </div>
  </header>`;
}

function buildHtml(projectMap) {
  const employerSections = EMPLOYERS.map((employer) =>
    employerSection(employer, projectMap),
  ).join("");
  const openSourceSections = (tailored?.openSourceSlugs || FEATURED_OPEN_SOURCE_SLUGS).map((slug) => projectMap.get(slug))
    .filter(Boolean)
    .map((project) => projectEntry(project, { openSource: true }))
    .join("");
  const skillRows = (tailored?.skills || SKILLS).map(
    (skill) => `<div class="skill"><strong>${escapeHtml(skill.label)}</strong><span>${escapeHtml(skill.value)}</span></div>`,
  ).join("");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(PROFILE.name)} — CV</title>
  <style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #e8e8ec; color: #20212a; font-family: Arial, Helvetica, sans-serif; font-kerning: none; font-variant-ligatures: none; }
    .page { width: 210mm; min-height: 297mm; padding: 11mm 15mm 10mm; background: #fff; page-break-after: always; }
    .page:last-child { page-break-after: auto; break-before: page; }
    header { border-bottom: 1.5px solid #cc6f52; padding-bottom: 3.5mm; margin-bottom: 3.5mm; }
    h1 { margin: 0; font-size: 24pt; line-height: 1.05; letter-spacing: -0.2px; color: #171820; }
    .headline { margin: 1.2mm 0 2mm; color: #a34d34; font-size: 11.5pt; font-weight: 700; }
    .contact { display: flex; flex-wrap: wrap; gap: 1.2mm 4mm; font-size: 8.6pt; color: #555762; }
    a { color: #88412d; text-decoration: none; }
    .section-label { margin: 0 0 2mm; color: #a34d34; text-transform: uppercase; font-size: 8.3pt; letter-spacing: 0.9px; }
    .summary { margin: 0 0 3.8mm; font-size: 9.3pt; line-height: 1.38; color: #333540; }
    .employer { margin: 0 0 3.2mm; break-inside: avoid; }
    .employer-heading { border-bottom: 1px solid #dedee4; padding-bottom: 1.2mm; margin-bottom: 1.6mm; }
    .employer-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8mm; }
    .employer-heading h2 { margin: 0; font-size: 11.5pt; color: #171820; }
    .employer-period { flex: 0 0 auto; font-size: 8.5pt; color: #555762; font-weight: 600; }
    .employer-progression { margin: 0.6mm 0 0; font-size: 8.3pt; color: #a34d34; font-weight: 700; }
    .project-label { margin: 0 0 1.4mm; font-size: 8pt; color: #555762; }
    .project { margin: 0 0 2mm; break-inside: avoid; }
    .project:last-child { margin-bottom: 0; }
    .project-heading { display: flex; align-items: baseline; gap: 2mm; }
    .project h3 { margin: 0; font-size: 9.3pt; color: #242630; }
    .project-link { font-size: 7.8pt; }
    ul { margin: 0.6mm 0 0; padding-left: 4.2mm; list-style-type: disc; }
    li { margin: 0 0 0.4mm; font-size: 8.2pt; line-height: 1.25; color: #3d3f49; }
    .tech { margin: 0.6mm 0 0; font-size: 7.3pt; line-height: 1.22; color: #666873; break-inside: avoid; }
    .second .project { padding: 0 0 3.6mm; margin: 0 0 3.6mm; border-bottom: 1px solid #dedee4; }
    .second .project:last-child { margin-bottom: 4.5mm; }
    .second .project h3 { font-size: 10.6pt; }
    .second .project li { font-size: 8.8pt; line-height: 1.36; }
    .second .tech { font-size: 7.9pt; }
    .skills { margin: 0 0 5mm; }
    .skill { display: grid; grid-template-columns: 36mm 1fr; gap: 4mm; padding: 1.5mm 0; border-bottom: 1px solid #ececf0; font-size: 8.7pt; line-height: 1.32; break-inside: avoid; }
    .skill strong { color: #292b35; }
    .skill span { color: #50525d; }
    .education { break-inside: avoid; }
    .education h3 { margin: 0 0 1mm; font-size: 10pt; }
    .education p { margin: 0.8mm 0; font-size: 8.7pt; color: #50525d; }
  </style></head><body>
    <main class="page">
      ${pageHeader()}
      <section><h2 class="section-label">Summary</h2><p class="summary">${escapeHtml(tailored?.summary || PROFILE.summary)}</p></section>
      <h2 class="section-label">Professional experience</h2>
      ${employerSections}
    </main>
    <main class="page second">
      <section><h2 class="section-label">Selected open-source projects</h2>${openSourceSections}</section>
      <section class="skills"><h2 class="section-label">Focused skills</h2>${skillRows}</section>
      <section class="education"><h2 class="section-label">Education</h2><h3>${escapeHtml(EDUCATION.institution)}</h3><p>${escapeHtml(EDUCATION.degree)}</p><p>${escapeHtml(EDUCATION.period)}</p></section>
    </main>
  </body></html>`;
}

async function main() {
  const projectMap = await loadProjects();
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(buildHtml(projectMap), { waitUntil: "networkidle0" });
    await page.pdf({
      path: OUTPUT_PATH,
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    });
  } finally {
    await browser.close();
  }
  if (!tailored) {
    await fs.mkdir(path.dirname(ARCHIVE_PATH), { recursive: true });
    await fs.copyFile(OUTPUT_PATH, ARCHIVE_PATH);
  }
  console.log(`CV generated at ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error("Failed to generate CV:", error);
  process.exitCode = 1;
});
