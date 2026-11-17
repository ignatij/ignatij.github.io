import { formatYearsOfExperience } from "../../src/utils/experience.js";

export const DUALENTRY_CV = {
  summary: `Senior Backend Engineer with ${formatYearsOfExperience()} of experience at Netcetera and Ludotech. Lead backend architecture for an investment and insurance platform and previously led delivery of an ERP system with financial reporting. Hands-on across PostgreSQL, TypeScript, Python/FastAPI, Go, Java, APIs, cloud infrastructure, and reliable distributed workflows.`,
  projectsByEmployer: {
    Ludotech: ["quarzo-life", "share-of-search", "j_plus_monitor"],
    Netcetera: ["w_12", "forward_publishing", "usb", "rne"],
  },
  highlights: {
    "quarzo-life": [
      "Lead backend architecture for an investment and insurance platform, defining domain boundaries and PostgreSQL transaction rules for funding, investment execution, settlements, and withdrawals.",
      "Built TypeScript/Bun services and RabbitMQ workflows with transactional outbox/inbox patterns and idempotent consumers to make retries safe for financial operations.",
      "Designed validated REST APIs and isolated banking, identity, and document-signing integrations behind service adapters.",
      "Supported production and other isolated environments with OpenTofu and Ansible; added tests across domain logic, persistence, messaging, integrations, and end-to-end workflows.",
    ],
    "share-of-search": [
      "Led full-stack development of a competitive-intelligence product, building Python/FastAPI and PostgreSQL APIs, React interfaces, and automated collection workflows with Prefect.",
    ],
    "j_plus_monitor": [
      "Migrated a core message-processing service from Node.js to Go, reducing message-processing time by 33%.",
    ],
    w_12: [
      "Led development and maintenance of an internal ERP system and served as the main client contact for requirements and delivery.",
      "Worked directly with controllers on income statements, balance sheets, and accruals; supported system-derived monthly financial statements delivered within 1–5 days after month-end.",
      "Contributed hands-on to Go and Java services, PostgreSQL-backed data views, CI/CD, and Kubernetes deployments.",
    ],
    forward_publishing: [
      "Contributed to migrating a client-specific publishing system into a SaaS platform, working across Node.js services, PostgreSQL, React, and CMS integrations.",
      "Worked on AWS and Kubernetes infrastructure provisioned with Terraform; the platform handled about 700,000 requests per month.",
    ],
    usb: [
      "Built reusable Java libraries for authentication, authorization, and third-party service integration across four hospital applications.",
    ],
    rne: [
      "Developed Java/Spring and TypeScript/Angular features for a rail-operations platform spanning 15 European countries.",
    ],
  },
  technologies: {
    "quarzo-life": ["TypeScript", "Bun", "PostgreSQL", "RabbitMQ", "OpenAPI", "OpenTofu", "Ansible"],
    "share-of-search": ["Python", "FastAPI", "PostgreSQL", "Prefect", "React", "Kubernetes"],
    "j_plus_monitor": ["Go", "Node.js", "Google Pub/Sub", "PostgreSQL", "GCP"],
    w_12: ["Go", "Java", "PostgreSQL", "Svelte", "Kubernetes", "CI/CD"],
    forward_publishing: ["Node.js", "PostgreSQL", "React", "AWS", "Kubernetes", "Terraform"],
    usb: ["Java", "Spring", "TypeScript", "Angular"],
    rne: ["Java", "Spring", "TypeScript", "Angular"],
  },
  openSourceSlugs: ["go_flow", "folio", "dependency_management_metrics_maven_plugin"],
  skills: [
    { label: "Backend & data", value: "PostgreSQL, SQL, TypeScript, Python, FastAPI, Go, Java, REST, OpenAPI" },
    { label: "Financial workflows", value: "Transaction boundaries, event-driven systems, RabbitMQ, transactional outbox/inbox, idempotency" },
    { label: "Integration & delivery", value: "Third-party APIs, Docker, Kubernetes, AWS, GCP, CI/CD, OpenTofu, Terraform" },
    { label: "Leadership", value: "Backend architecture, domain modeling, technical coordination, stakeholder collaboration" },
  ],
};
