import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import puppeteer from "puppeteer";
import {
  EDUCATION,
  EMPLOYERS,
  FEATURED_OPEN_SOURCE_SLUGS,
  PROFILE,
  SKILLS,
} from "../src/data/profile.js";

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, "content", "projects");
const OUTPUT_PATH = path.join(ROOT, "public", "Ignatij Gichevski CV.pdf");
const ARCHIVE_PATH = path.join(ROOT, "content", "cv", "Ignatij Gichevski CV.pdf");

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

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
  const highlights = project.cv_highlights || [project.my_role || project.description];
  const link = openSource && project.github
    ? `<a class="project-link" href="${escapeHtml(project.github)}">GitHub ↗</a>`
    : "";
  const tech = project.technologies?.length
    ? `<p class="tech"><strong>Technology:</strong> ${project.technologies.map(escapeHtml).join(", ")}</p>`
    : "";

  return `<article class="project">
    <div class="project-heading"><h3>${escapeHtml(project.title)}</h3>${link}</div>
    <ul>${highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    ${tech}
  </article>`;
}

function employerSection(employer, projectMap) {
  const projects = employer.projectSlugs
    .map((slug) => projectMap.get(slug))
    .filter(Boolean)
    .map((project) => projectEntry(project))
    .join("");

  return `<section class="employer">
    <div class="employer-heading">
      <div><h2>${escapeHtml(employer.name)}</h2><p>${escapeHtml(employer.progression)}</p></div>
      <span>${escapeHtml(employer.period)}</span>
    </div>
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
  const openSourceSections = FEATURED_OPEN_SOURCE_SLUGS.map((slug) => projectMap.get(slug))
    .filter(Boolean)
    .map((project) => projectEntry(project, { openSource: true }))
    .join("");
  const skillRows = SKILLS.map(
    (skill) => `<div class="skill"><strong>${escapeHtml(skill.label)}</strong><span>${escapeHtml(skill.value)}</span></div>`,
  ).join("");

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(PROFILE.name)} — CV</title>
  <style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #e8e8ec; color: #20212a; font-family: Arial, Helvetica, sans-serif; }
    .page { width: 210mm; min-height: 297mm; padding: 13mm 16mm 12mm; background: #fff; page-break-after: always; }
    .page:last-child { page-break-after: auto; break-before: page; }
    header { border-bottom: 1.5px solid #cc6f52; padding-bottom: 4.5mm; margin-bottom: 4.5mm; }
    h1 { margin: 0; font-size: 25pt; line-height: 1.05; letter-spacing: -0.4px; color: #171820; }
    .headline { margin: 1.5mm 0 2.5mm; color: #a34d34; font-size: 12pt; font-weight: 700; }
    .contact { display: flex; flex-wrap: wrap; gap: 1.3mm 4mm; font-size: 8.7pt; color: #555762; }
    a { color: #88412d; text-decoration: none; }
    .section-label { margin: 0 0 2.5mm; color: #a34d34; text-transform: uppercase; font-size: 8.5pt; letter-spacing: 1.3px; }
    .summary { margin: 0 0 5mm; font-size: 9.8pt; line-height: 1.42; color: #333540; }
    .employer { margin: 0 0 4.2mm; break-inside: avoid; }
    .employer-heading { display: flex; justify-content: space-between; gap: 8mm; border-bottom: 1px solid #dedee4; padding-bottom: 1.4mm; margin-bottom: 1.8mm; }
    .employer-heading h2 { margin: 0; font-size: 12pt; color: #171820; }
    .employer-heading p { margin: 0.7mm 0 0; font-size: 8.5pt; color: #a34d34; font-weight: 700; }
    .employer-heading span { flex: 0 0 auto; font-size: 8.7pt; color: #555762; padding-top: 0.5mm; }
    .project { margin: 0 0 2.5mm; break-inside: avoid; }
    .project-heading { display: flex; align-items: baseline; gap: 2mm; }
    .project h3 { margin: 0; font-size: 9.6pt; color: #242630; }
    .project-link { font-size: 7.8pt; }
    ul { margin: 0.7mm 0 0; padding-left: 4.2mm; }
    li { margin: 0 0 0.5mm; font-size: 8.5pt; line-height: 1.28; color: #3d3f49; }
    .tech { margin: 0.8mm 0 0; font-size: 7.5pt; line-height: 1.25; color: #666873; break-inside: avoid; }
    .second header { margin-bottom: 6mm; }
    .second .project { padding: 0 0 4mm; margin: 0 0 4mm; border-bottom: 1px solid #dedee4; }
    .second .project h3 { font-size: 11pt; }
    .second .project li { font-size: 9pt; line-height: 1.38; }
    .second .tech { font-size: 8pt; }
    .skills { margin: 0 0 5mm; }
    .skill { display: grid; grid-template-columns: 36mm 1fr; gap: 4mm; padding: 1.5mm 0; border-bottom: 1px solid #ececf0; font-size: 8.8pt; line-height: 1.32; break-inside: avoid; }
    .skill strong { color: #292b35; }
    .skill span { color: #50525d; }
    .education { break-inside: avoid; }
    .education h3 { margin: 0 0 1mm; font-size: 10pt; }
    .education p { margin: 0.8mm 0; font-size: 8.8pt; color: #50525d; }
  </style></head><body>
    <main class="page">
      ${pageHeader()}
      <section><h2 class="section-label">Summary</h2><p class="summary">${escapeHtml(PROFILE.summary)}</p></section>
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
  await fs.mkdir(path.dirname(ARCHIVE_PATH), { recursive: true });
  await fs.copyFile(OUTPUT_PATH, ARCHIVE_PATH);
  console.log(`CV generated at ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error("Failed to generate CV:", error);
  process.exitCode = 1;
});
