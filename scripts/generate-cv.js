import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import puppeteer from 'puppeteer';

const ROOT = process.cwd();
const PROJECTS_DIR = path.join(ROOT, 'content', 'projects');
const OUTPUT_PATH = path.join(ROOT, 'public', 'Ignatij Gichevski CV.pdf');

const PROFILE = {
  name: 'Ignatij Gichevski',
  title: 'Software Engineer & Builder',
  location: 'Skopje, North Macedonia',
  email: 'hello@ignatij.dev',
  website: 'https://ignatij.dev',
  summary:
    'Senior software engineer with a focus on Go, Deno, and event-driven architectures. I build resilient platforms with strong developer experience, automation, and measurable product impact.',
};

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

async function loadProjects() {
  const files = await fs.readdir(PROJECTS_DIR);
  const markdownFiles = files.filter((file) => file.endsWith('.md'));

  const projects = await Promise.all(
    markdownFiles.map(async (file) => {
      const fullPath = path.join(PROJECTS_DIR, file);
      const content = await fs.readFile(fullPath, 'utf8');
      const { data } = matter(content);
      return { ...data, slug: file.replace(/\.md$/, '') };
    })
  );

  return projects.sort((a, b) => {
    const aDate = a.start_date ? new Date(a.start_date).getTime() : 0;
    const bDate = b.start_date ? new Date(b.start_date).getTime() : 0;
    return bDate - aDate;
  });
}

function buildHtml(projects) {
  const projectSections = projects
    .map((project) => {
      const period = project.start_date ? formatDate(project.start_date) : '';
      const techs = Array.isArray(project.technologies)
        ? project.technologies.map((tech) => `<span class="tag">${tech}</span>`).join('')
        : '';

      return `
        <div class="project">
          <div class="project-header">
            <h3>${project.title || project.slug}</h3>
            ${period ? `<span class="project-period">${period}</span>` : ''}
          </div>
          ${project.description ? `<p class="project-desc">${project.description}</p>` : ''}
          ${project.excerpt ? `<p class="project-excerpt">${project.excerpt}</p>` : ''}
          ${techs ? `<div class="tags">${techs}</div>` : ''}
        </div>
      `;
    })
    .join('\n');

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${PROFILE.name} – CV</title>
      <style>
        * { box-sizing: border-box; }
        body {
          font-family: 'Inter', 'JetBrains Mono', 'Segoe UI', sans-serif;
          margin: 0;
          padding: 40px 52px;
          color: #1e1e2e;
          background: #f7f7fb;
          font-size: 12px;
          line-height: 1.5;
        }
        header {
          border-bottom: 2px solid #d0d2f0;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        h1 {
          margin: 0;
          font-size: 28px;
          color: #11111b;
        }
        .subtitle {
          margin: 6px 0 12px;
          color: #6c7086;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          color: #4c4f69;
          font-family: 'JetBrains Mono', monospace;
        }
        section { margin-bottom: 24px; }
        section h2 {
          font-size: 16px;
          margin-bottom: 8px;
          color: #1e1e2e;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .summary {
          font-size: 13px;
          color: #303446;
          margin-bottom: 12px;
        }
        .project {
          padding: 12px 0;
          border-bottom: 1px solid #e0e2ec;
        }
        .project:last-child { border-bottom: none; }
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 16px;
        }
        .project-header h3 {
          margin: 0;
          font-size: 14px;
          color: #1e1e2e;
        }
        .project-period {
          font-size: 12px;
          color: #6c7086;
        }
        .project-desc, .project-excerpt {
          margin: 6px 0;
          color: #4c4f69;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 6px;
        }
        .tag {
          background: #e6e9ff;
          color: #1e1e2e;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>${PROFILE.name}</h1>
        <div class="subtitle">${PROFILE.title}</div>
        <div class="meta">
          <span>${PROFILE.location}</span>
          <span>${PROFILE.email}</span>
          <span>${PROFILE.website}</span>
        </div>
      </header>

      <section>
        <h2>Summary</h2>
        <p class="summary">${PROFILE.summary}</p>
      </section>

      <section>
        <h2>Selected Projects</h2>
        ${projectSections}
      </section>
    </body>
  </html>`;
}

async function ensureOutputDir() {
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
}

async function generatePdf(html) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: OUTPUT_PATH,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
  });
  await browser.close();
}

async function main() {
  try {
    const projects = await loadProjects();
    if (!projects.length) {
      console.warn('No projects found.');
      return;
    }
    const html = buildHtml(projects);
    await ensureOutputDir();
    await generatePdf(html);
    console.log(`CV generated at ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('Failed to generate CV:', error);
    process.exitCode = 1;
  }
}

main();
