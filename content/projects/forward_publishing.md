---
title: "Forward Publishing"
home_summary: "Re-architected a single-client publishing system into a multi-site AWS/Kubernetes SaaS platform handling ~700,000 monthly requests with Cloudflare DDoS mitigation."
home_technologies: ["Node.js", "PostgreSQL", "AWS / K8s", "Cloudflare"]
category: "client"
employer: "Netcetera"
description: "Multi-site digital publishing SaaS platform for importing, managing, and delivering content across websites"
excerpt: "Multi-site Node.js publishing platform migrated from a single-client deployment into a SaaS offering handling ~700,000 monthly requests across AWS, Kubernetes, Terraform, and Cloudflare."
technologies: ["Node.js", "PostgreSQL", "AWS", "Kubernetes", "Terraform", "Cloudflare", "Amazon SQS", "Docker", "React", "NX", "Livingdocs CMS", "Digital Ocean"]
start_date: 2022-01-01
end_date: 2023-07-30
my_role: "Worked across application services, data layer, and cloud infrastructure to migrate a single-client publishing system into a multi-site SaaS platform (~700,000 monthly requests) and harden edge delivery under DDoS traffic."
cv_highlights:
  - "Migrated a single-client publishing stack into a multi-site AWS/Kubernetes SaaS platform (Node.js, Aurora PostgreSQL, SQS, Terraform; ~700,000 monthly requests) with Cloudflare DDoS mitigation and rollout docs."
---

## Context & risk

Forward Publishing started as a publishing stack built for a single customer and needed to evolve into a multi-site SaaS platform. It had to ingest content from multiple upstream sources, support editorial workflows in Livingdocs CMS, publish across separate reader-facing sites, and stay available under traffic spikes and public-facing DDoS attacks.

## Architecture & key tradeoffs

- **Shared monorepo and decoupled services:** Structured related Node.js services and React applications inside an **NX** monorepo, using **Amazon SQS** for asynchronous inter-service messaging, **Aurora PostgreSQL** for relational state, and **S3** for article storage.
- **Portable, IaC-driven runtime:** Containerized workloads on **Kubernetes** across **Digital Ocean and AWS**, provisioned via **Terraform** with autoscaling to absorb traffic swings across publications.
- **Operational documentation as a scaling lever:** Documented platform conventions, deployment topology, and integration patterns so subsequent tenant implementations did not require reverse-engineering the stack.

## Security & reliability mechanics

- **Edge DDoS response:** Configured and operated **Cloudflare** edge protections while responding to live DDoS attacks against reader-facing delivery properties.
- **Managed persistence & queue buffering:** Isolated public read traffic from editorial/import spikes through SQS buffering, managed Aurora PostgreSQL, and Kubernetes autoscaling.

## Role & outcome

- Worked across the Node.js services, PostgreSQL data layer, Livingdocs CMS integration, React interfaces, and Kubernetes/Terraform delivery infrastructure during the SaaS migration.
- Supported a production SaaS platform operating at roughly **700,000 requests per month** (operating context, not a synthetic throughput benchmark), with documented patterns for new rollouts.
