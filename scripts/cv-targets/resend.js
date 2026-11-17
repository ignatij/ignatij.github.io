import { formatYearsOfExperience } from "../../src/utils/experience.js";

export const RESEND_CV = {
  summary: `Senior Backend Engineer with ${formatYearsOfExperience()} of experience at Netcetera and Ludotech. Built and operated backend services, asynchronous workflows, APIs, and PostgreSQL-backed systems across client projects. Hands-on with Node.js, TypeScript, Go, message queues, cloud infrastructure, and infrastructure as code.`,
  projectsByEmployer: {
    Ludotech: ["quarzo-life", "j_plus_monitor", "share-of-search"],
    Netcetera: ["forward_publishing", "w_12", "usb", "rne"],
  },
  highlights: {
    "quarzo-life": [
      "Architected TypeScript/Bun backend services and PostgreSQL transaction boundaries for investment and insurance workflows.",
      "Built RabbitMQ workflows with transactional outbox/inbox patterns and idempotent consumers to handle retries and duplicate messages safely.",
      "Designed identity and authorization with Zitadel and provisioned reproducible environments with OpenTofu and Ansible.",
    ],
    "j_plus_monitor": [
      "Migrated a core message-processing service from Node.js to Go, reducing message-processing time by 33%.",
      "Helped move service communication from synchronous REST calls to event-driven processing with Google Pub/Sub.",
    ],
    "share-of-search": [
      "Led development of a competitive-intelligence product, building Python/FastAPI and PostgreSQL services and automated collection workflows with Prefect.",
    ],
    forward_publishing: [
      "Contributed to migrating a client-specific publishing system into a SaaS platform using Node.js, PostgreSQL, React, and CMS integrations.",
      "Worked across AWS, Kubernetes, and Terraform infrastructure for a platform handling about 700,000 requests per month.",
      "Documented the platform to support subsequent implementation work.",
    ],
    w_12: [
      "Led delivery and maintenance of an ERP system, staying hands-on with Go and Java services, PostgreSQL, CI/CD, and Kubernetes.",
      "Built generic PostgreSQL-backed data views in Go and supported financial reporting workflows that produced monthly statements within 1–5 days after month-end.",
    ],
    usb: [
      "Built reusable Java authentication, authorization, and integration libraries for four hospital applications; led work on a shared Angular component system.",
    ],
    rne: [
      "Developed Java/Spring services and TypeScript/Angular features for a rail-operations platform spanning 15 European countries.",
    ],
  },
  technologies: {
    "quarzo-life": ["TypeScript", "Bun", "PostgreSQL", "RabbitMQ", "Redis/Valkey", "OpenAPI", "OpenTofu", "Ansible"],
    "j_plus_monitor": ["Go", "Node.js", "Google Pub/Sub", "PostgreSQL", "GCP", "Pulumi"],
    "share-of-search": ["Python", "FastAPI", "PostgreSQL", "Prefect", "React"],
    forward_publishing: ["Node.js", "PostgreSQL", "React", "Amazon SQS", "AWS", "Kubernetes", "Terraform"],
    w_12: ["Go", "Java", "PostgreSQL", "Svelte", "Kubernetes"],
    usb: ["Java", "Spring", "TypeScript", "Angular"],
    rne: ["Java", "Spring", "TypeScript", "Angular", "GraphQL"],
  },
  openSourceSlugs: ["go_flow", "folio", "spotpilot"],
  skills: [
    { label: "Backend & APIs", value: "Node.js, TypeScript, Go, PostgreSQL, REST, OpenAPI, Java" },
    { label: "Async & reliability", value: "RabbitMQ, Google Pub/Sub, Amazon SQS, retries, idempotency, transactional outbox/inbox" },
    { label: "Cloud & delivery", value: "AWS, GCP, Docker, Kubernetes, Terraform, OpenTofu, Pulumi, CI/CD" },
    { label: "Product breadth", value: "React, Svelte, Angular, OAuth/OIDC, documentation, technical leadership" },
  ],
};
