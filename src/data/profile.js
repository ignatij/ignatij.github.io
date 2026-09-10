import { formatYearsOfExperience } from "../utils/experience.js";

export const PROFILE = {
  name: "Ignatij Gichevski",
  headline: "Senior Backend Engineer",
  location: "Skopje, North Macedonia",
  email: "ignatij.gichevski@gmail.com",
  website: "https://ignatij.github.io",
  github: "https://github.com/ignatij",
  linkedin: "https://linkedin.com/in/ignatij",
  summary: `Senior Backend Engineer with ${formatYearsOfExperience()} of experience owning backend systems, reliable financial workflows, and performance-sensitive services. Hands-on across Node.js, TypeScript, Go, and cloud infrastructure, with technical leadership experience and full-stack breadth when delivery calls for it.`,
};

export const EMPLOYERS = [
  {
    name: "Ludotech",
    period: "June 2024–present",
    progression: "Senior Software Engineer → Team Lead",
    projectSlugs: ["quarzo-life", "share-of-search", "j_plus_monitor"],
  },
  {
    name: "Netcetera",
    period: "October 2016–May 2024",
    progression:
      "Software Engineer → Senior Software Engineer → Technical Coordinator",
    projectSlugs: ["w_12", "forward_publishing", "usb", "rne"],
  },
];

export const FEATURED_PROJECT_SLUGS = [
  "quarzo-life",
  "j_plus_monitor",
  "forward_publishing",
];

export const FEATURED_OPEN_SOURCE_SLUGS = [
  "go_flow",
  "spotpilot",
  "dependency_management_metrics_maven_plugin",
  "data-grid-angular",
];

export const SKILLS = [
  {
    label: "Backend",
    value: "Node.js, TypeScript, Deno, Go, Python, Java, REST, OpenAPI",
  },
  {
    label: "Data & messaging",
    value: "PostgreSQL, RabbitMQ, Redis/Valkey, Google Pub/Sub, Amazon SQS",
  },
  {
    label: "Reliability & architecture",
    value:
      "Domain-Driven Design, Hexagonal Architecture, event-driven systems, transactional outbox/inbox, idempotency",
  },
  {
    label: "Cloud & delivery",
    value:
      "Docker, Kubernetes, GCP, AWS, OpenTofu, Terraform, Pulumi, Ansible, Proxmox",
  },
  {
    label: "Supporting breadth",
    value: "React, Svelte, Angular, GraphQL, OAuth/OIDC, Zitadel, Keycloak",
  },
];

export const EDUCATION = {
  institution: "Faculty of Computer Science and Engineering, Skopje",
  period: "September 2013–November 2018",
  degree: "Bachelor of Computer Science and Engineering (8.5)",
};
