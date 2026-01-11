import { jsPDF } from "jspdf";
import { loadProjects } from "./content";

const PROFILE = {
  name: "Ignatij Gichevski",
  title: "Senior Software Engineer",
  location: "Skopje, North Macedonia",
  email: "ignatij.gichevski@gmail.com",
  website: "https://ignatij.github.io",
  summary:
    "Senior Software Engineer with 8+ years of experience building scalable backend systems and distributed platforms. Strong background in Go, TypeScript, JavaScript, and cloud architectures. Experienced in leading teams, designing high-performance systems, and delivering production-grade software at scale.",
};

const PAGE = {
  marginX: 48,
  startY: 92,
  lineHeight: 16,
};

const EDUCATION = [
  {
    institution:
      "Faculty of Computer Science and Engineering - Skopje, North Macedonia",
    period: "Sep 2013 - Nov 2018",
    degree: "(8.5) Bachelor of Computer Science and Engineering",
  },
];

const SKILLS = [
  { label: "Languages", value: "Go, TypeScript, JavaScript, Python, Java" },
  { label: "Backend", value: "Node.js, Deno, FastAPI, Spring" },
  { label: "Frontend", value: "React, Svelte, Solid.js, Angular" },
  { label: "Databases", value: "PostgreSQL" },
  {
    label: "Cloud & DevOps",
    value: "Docker, Kubernetes, GCP, AWS, Pulumi, Terraform",
  },
  {
    label: "Messaging & Infra",
    value: "RabbitMQ, Google Pub/Sub, Prefect",
  },
  { label: "Auth & Security", value: "Keycloak, Vault" },
];

const COLORS = {
  background: { r: 17, g: 17, b: 27 }, // #11111b
  surface: { r: 30, g: 30, b: 46 }, // #1e1e2e
  accent: { r: 242, g: 180, b: 135 }, // #f2b487
  textPrimary: { r: 205, g: 214, b: 244 }, // #cdd6f4
  textSecondary: { r: 166, g: 176, b: 207 }, // #a6adc8
};

const GITHUB_ICON =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC2UlEQVR4nOxazU7jMBAeB47wIOzedrXnLU8GPBnd8wpuwIPAlYZ8Vh0cZyYzduy2SHxSZTV1k/k8/9Oe0xfHOX1xVCPw/+V10+1o4zr3N1zre9pgdY62/v2u/4d119H2z9XllirA0QpA6DNyN0HQbPT9HZbfPy9vqRBFBFYLnmIFkSwC1QVPMRDJJWEm4G28d/d0CGQQ6SybHp5ebw8mPODcDZ5p2aoS8DcabkiHhpHEIoGjCR9gICH6wNGFj7Bz/bWUN2QNSMLDwX5cOB/69uFvDZDkIGB4cXvgfwgi7Pe5i0un74WPEDJwuj9k34A09OLzd+rv0pN9eH7riRN02P/r6uJaJaCZTkqAIiJYtRJB2/f48nYv5RnOlKrVQtbaZk0NhCQ6LNv42sQHTslxOUAzqS+YElkMyZlqQStT9loYMSVgOP1aZbCE1PlTpARHAqaTrRA2NSAyaXtiWUcCPhQuoaBSLAE0rGkhljXbBw4BTQtx19dxFzmgDaQThFkDrZ239FljImvWZTVALKtZA63jfyk+fcCdjo3nHJZZA2qYrQjtWfFhm4s5LUodC6MGwtRMAldINYNS0sSyjgQscT4tpFrA0sjHsk6aE6kbmqBhSWEt5+OmauLEpkiUMbPJgbkXSQrKCQGuBgGpGTGQGLRVgwj8Cm1kaSM1629nPWlkMlK/CoLBsTTzisfwudmfa+xneWCmhchkuKkA4AUxnmCYYJSULlykZCcM3EmHicDSkFeaWFjur0IIHmwm5nwhhFCQAJmZXzTu1iTTZAn4cjYRKE5k+BzmhBMHGaw5oVVLmvMvyIcj1kJeoDRkMSO+5n2CkncWizmJBJw6EMHarMQwJE21GuVIIIp4IkMuwBpIUU0YM76pnGZJtETtn5gA3HAcqzdCGLXnBITs4S5uPpgLlWRSCdKo3YKi6XQ4oWD3ezJmoBw+I/INUqngAat+qT8FfP/Z49j4AAAA//+OIubeAAAABklEQVQDACm3xDAiBkGpAAAAAElFTkSuQmCC";

function setFill(doc, color) {
  doc.setFillColor(color.r, color.g, color.b);
}

function setText(doc, color) {
  doc.setTextColor(color.r, color.g, color.b);
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function drawPageChrome(doc) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  setFill(doc, COLORS.background);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  setFill(doc, COLORS.surface);
  doc.rect(
    PAGE.marginX - 24,
    PAGE.marginX - 52,
    pageWidth - (PAGE.marginX - 24) * 2,
    pageHeight - (PAGE.marginX - 40),
    "F",
  );

  setFill(doc, COLORS.surface);
  doc.rect(0, 0, pageWidth, 150, "F");
}

function ensureSpace(doc, currentY) {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (currentY > pageHeight - 60) {
    doc.addPage();
    drawPageChrome(doc);
    return PAGE.startY;
  }
  return currentY;
}

function drawSectionTitle(doc, text, y) {
  const safeY = ensureSpace(doc, y + 8);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  setText(doc, COLORS.accent);
  doc.text(text.toUpperCase(), PAGE.marginX, safeY);
  setText(doc, COLORS.textPrimary);
  doc.setDrawColor(COLORS.accent.r, COLORS.accent.g, COLORS.accent.b);
  doc.setLineWidth(1);
  doc.line(
    PAGE.marginX,
    safeY + 4,
    doc.internal.pageSize.getWidth() - PAGE.marginX,
    safeY + 4,
  );
  return safeY + PAGE.lineHeight;
}

function drawParagraph(doc, text, y, fontSize = 11, fontStyle = "normal") {
  if (!text) return y;
  const safeY = ensureSpace(doc, y);
  const maxWidth = doc.internal.pageSize.getWidth() - PAGE.marginX * 2;
  doc.setFont("helvetica", fontStyle);
  doc.setFontSize(fontSize);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, PAGE.marginX, safeY);
  return safeY + lines.length * (fontSize + 2);
}

function formatPeriod(project) {
  const start = project.start_date ? formatDate(project.start_date) : "";
  const end = project.end_date
    ? formatDate(project.end_date)
    : project.start_date
      ? "Present"
      : "";
  if (!start && !end) return "";
  return end ? `${start} - ${end}` : start;
}

function drawProject(doc, project, y) {
  let cursorY = ensureSpace(doc, y + 4);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  const period = formatPeriod(project);
  const header = period ? `${project.title} — ${period}` : project.title;
  doc.text(header, PAGE.marginX, cursorY);
  if (project.github) {
    const iconSize = 12;
    const textWidth = doc.getTextWidth(header);
    const iconX = PAGE.marginX + textWidth + 6;
    const iconY = cursorY - iconSize + 4;
    doc.addImage(
      GITHUB_ICON,
      "PNG",
      iconX,
      iconY,
      iconSize,
      iconSize,
      undefined,
      "FAST",
    );
    doc.link(iconX, iconY, iconSize, iconSize, { url: project.github });
  }
  cursorY += PAGE.lineHeight;
  doc.setFont("helvetica", "normal");
  cursorY = drawParagraph(doc, project.description, cursorY, 10, "normal");
  if (project.my_role) {
    cursorY = drawParagraph(
      doc,
      `My role: ${project.my_role}`,
      cursorY,
      10,
      "normal",
    );
  }
  if (project.technologies?.length) {
    const techText = `Tech: ${project.technologies.join(", ")}`;
    cursorY = drawParagraph(doc, techText, cursorY, 9, "normal");
  }
  return cursorY + 2;
}

export async function generateClientCv() {
  const allProjects = (await loadProjects()).filter(
    (project) => project.show_in_cv !== false,
  );
  const projects = allProjects.filter(
    (project) => project.start_date || project.end_date,
  );
  const sideProjects = allProjects.filter(
    (project) => !project.start_date && !project.end_date,
  );
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  drawPageChrome(doc);

  setText(doc, COLORS.textPrimary);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  let cursorY = 88;
  doc.text(PROFILE.name, PAGE.marginX, cursorY);
  cursorY += 26;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  setText(doc, COLORS.accent);
  doc.text(PROFILE.title, PAGE.marginX, cursorY);
  cursorY += PAGE.lineHeight + 6;

  setText(doc, COLORS.textSecondary);
  doc.setFontSize(10);
  const meta = [PROFILE.location, PROFILE.email, PROFILE.website]
    .filter(Boolean)
    .join("  •  ");
  doc.text(meta, PAGE.marginX, cursorY);
  cursorY += 24;

  setText(doc, COLORS.textPrimary);
  cursorY = drawSectionTitle(doc, "Summary", cursorY + 6);
  cursorY = drawParagraph(doc, PROFILE.summary, cursorY, 12, "normal");
  cursorY += 4;

  cursorY = drawSectionTitle(doc, "Education", cursorY);
  EDUCATION.forEach((entry) => {
    cursorY = ensureSpace(doc, cursorY + 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(
      `${entry.institution} ${entry.period ? `— ${entry.period}` : ""}`,
      PAGE.marginX,
      cursorY,
    );
    cursorY += PAGE.lineHeight - 4;
    doc.setFont("helvetica", "normal");
    cursorY = drawParagraph(doc, entry.degree, cursorY, 10, "normal");
    cursorY += 4;
  });

  cursorY = drawSectionTitle(doc, "Skills", cursorY);
  SKILLS.forEach((skill) => {
    cursorY = ensureSpace(doc, cursorY + 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const label = `${skill.label}:`;
    const labelWidth = doc.getTextWidth(label) + 6;
    doc.text(label, PAGE.marginX, cursorY);

    doc.setFont("helvetica", "normal");
    const availableWidth =
      doc.internal.pageSize.getWidth() - PAGE.marginX * 2 - labelWidth;
    const lines = doc.splitTextToSize(skill.value, availableWidth);
    if (lines.length > 0) {
      doc.text(lines[0], PAGE.marginX + labelWidth, cursorY);
      for (let i = 1; i < lines.length; i += 1) {
        cursorY += PAGE.lineHeight - 6;
        ensureSpace(doc, cursorY);
        doc.text(lines[i], PAGE.marginX + labelWidth, cursorY);
      }
    }
    cursorY += PAGE.lineHeight - 4;
  });

  if (projects.length) {
    cursorY = drawSectionTitle(doc, "Projects", cursorY);
    projects.forEach((project) => {
      cursorY = drawProject(doc, project, cursorY);
    });
  }

  if (sideProjects.length) {
    cursorY = drawSectionTitle(doc, "Open Source & Side Projects", cursorY);
    sideProjects.forEach((project) => {
      cursorY = drawProject(doc, project, cursorY);
    });
  }

  doc.save("Ignatij Gichevski CV.pdf");
}
