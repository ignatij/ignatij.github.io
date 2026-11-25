import { formatYearsOfExperience } from "../utils/experience.js";

export const PROFILE = {
  name: "Ignatij Gichevski",
  headline: "Senior Backend & Systems Engineer",
  location: "Skopje, North Macedonia",
  email: "ignatij.gichevski@gmail.com",
  website: "https://ignatij.github.io",
  github: "https://github.com/ignatij",
  linkedin: "https://linkedin.com/in/ignatij",
  summary: `Senior Backend & Systems Engineer with ${formatYearsOfExperience()} of experience at Ludotech and Netcetera. Designs reliable distributed and financial workflows, application security boundaries, and production AI/agent infrastructure across Go, TypeScript, Python, and PostgreSQL.`,
  availability:
    "Open to Senior/Staff backend, platform, and security-minded roles—and selective architecture or security reviews.",
};

export const FOCUS_AREAS = [
  {
    label: "Distributed & financial workflows",
    detail:
      "Domain boundaries, PostgreSQL transactions, outbox/inbox messaging, idempotent consumers, and low-latency Go/TypeScript services.",
  },
  {
    label: "Application security & identity",
    detail:
      "Zitadel OAuth/OIDC and service-to-service authorization, envelope encryption, reusable auth libraries, and edge hardening.",
  },
  {
    label: "Production AI & agent infrastructure",
    detail:
      "Deterministic CLI/tool execution boundaries, Prefect LLM collection pipelines, streaming Google ADK agents, and bounded auth recovery.",
  },
];

export const EMPLOYERS = [
  {
    name: "Ludotech",
    period: "June 2024–present",
    progression: "Senior Software Engineer → Team Lead",
    summary:
      "Leading greenfield backend architecture, security boundaries, Go performance migrations, and AI/data workflows across client products.",
    projectSlugs: ["quarzo-life", "share-of-search", "j_plus_monitor"],
  },
  {
    name: "Netcetera",
    period: "October 2016–May 2024",
    progression:
      "Software Engineer → Senior Software Engineer → Technical Coordinator",
    summary:
      "Built and coordinated regulated European financial reporting, healthcare, rail operations, and multi-site SaaS publishing systems.",
    projectSlugs: ["w_12", "forward_publishing", "usb", "rne"],
  },
];

export const FEATURED_PROJECT_SLUGS = [
  "quarzo-life",
  "share-of-search",
  "j_plus_monitor",
  "forward_publishing",
];

export const HOME_OPEN_SOURCE_SLUGS = ["spotpilot", "go_flow", "folio"];

export const FEATURED_OPEN_SOURCE_SLUGS = [
  "spotpilot",
  "go_flow",
  "folio",
  "dependency_management_metrics_maven_plugin",
];

export const SKILLS = [
  {
    label: "Backend",
    value: "Go, TypeScript, Node.js, Bun, Python, FastAPI, Java, REST, OpenAPI",
  },
  {
    label: "Data & workflows",
    value:
      "PostgreSQL, RabbitMQ, Redis/Valkey, Google Pub/Sub, Amazon SQS, transactional outbox/inbox, idempotency",
  },
  {
    label: "Security & identity",
    value:
      "Zitadel, OAuth/OIDC, Keycloak, envelope encryption, service-to-service authorization, Cloudflare",
  },
  {
    label: "Architecture & AI",
    value:
      "Domain-Driven Design, Hexagonal Architecture, modular monoliths, Prefect, Google ADK, agent CLI tooling",
  },
  {
    label: "Cloud & delivery",
    value:
      "Docker, Kubernetes, AWS, GCP, OpenTofu, Terraform, Pulumi, Ansible, Proxmox",
  },
];

export const EDUCATION = {
  institution: "Faculty of Computer Science and Engineering, Skopje",
  period: "September 2013–November 2018",
  degree: "Bachelor of Computer Science and Engineering (8.5)",
};
