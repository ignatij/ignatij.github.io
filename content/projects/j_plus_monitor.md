---
title: "J+ Monitor"
home_summary: "Cut message-processing latency by 33% and reduced container memory and cloud costs by migrating the core event-processing system from Node.js to Go on Google Pub/Sub."
home_technologies: ["Go", "Node.js", "Google Pub/Sub", "Kubernetes"]
category: "client"
employer: "Ludotech"
description: "Rule-based website monitoring platform whose core event-processing system was migrated from Node.js to Go"
excerpt: "Rule-based website monitoring platform where migrating the core event-processing system from Node.js to compiled Go workers cut message-processing time by 33% while lowering memory usage and cloud costs."
technologies:
  [
    "Go",
    "Node.js",
    "Google Pub/Sub",
    "PostgreSQL",
    "GCP",
    "Kubernetes",
    "Pulumi",
    "Docker",
    "React",
  ]
start_date: 2024-06-01
end_date: 2024-11-30
my_role: "Migrated the core message-processing system from Node.js to Go, reducing message-processing latency by 33% and lowering container memory usage and cloud hosting costs while decoupling services onto Google Pub/Sub."
cv_highlights:
  - "Migrated the core event-processing system from Node.js to compiled Go workers on Google Pub/Sub (GCP, Pulumi, K8s), cutting message-processing latency by 33% while lowering container memory and cloud costs."
---

## Context & risk

J+ Monitor is a rule-based website monitoring platform that executes user-defined checks against target sites, generates alert events on rule violations, and aggregates overview data. As rule evaluations and event volume grew, running the core processing workers in Node.js introduced cold-start and runtime overhead, while synchronous REST calls tightly coupled upstream and downstream services.

## Architecture & key tradeoffs

- **Compiled Go workers replacing Node.js:** Rebuilt the core event-processing system as compiled **Go** binaries instead of continuing to tune or scale out the Node.js workers. Eliminating Node.js cold-start and runtime overhead cut processing time and lowered per-container memory footprint.
- **Synchronous REST to event-driven Pub/Sub:** Replaced direct HTTP calls between services with asynchronous message delivery over **Google Pub/Sub**, decoupling check execution from downstream event generation and overview aggregation.
- **Infrastructure & delivery:** Operated containerized services on **GCP and Kubernetes** with infrastructure defined in **Pulumi**, backed by **PostgreSQL** and a **React** rule-management interface.

## Role & outcome

- Led the migration of the core monitoring and event-processing system from Node.js to Go and contributed to the Google Pub/Sub decoupling effort.
- Reduced message-processing time by **33%** while lowering container memory usage and cloud hosting costs.
