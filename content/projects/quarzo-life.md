---
title: "Quarzo Life"
home_summary: "Greenfield investment and insurance backend (5+ engineers, 10+ bounded contexts) built as a modular monolith with RabbitMQ outbox/inbox, Zitadel authorization, and envelope encryption."
home_technologies: ["TypeScript / Bun", "PostgreSQL", "RabbitMQ", "Zitadel"]
category: "client"
employer: "Ludotech"
description: "End-to-end investment and insurance platform spanning onboarding, funding, investment execution, portfolio management, settlements, recurring investments, and withdrawals"
excerpt: "Greenfield investment and insurance platform architected as a modular monolith across 10+ bounded contexts with transactional outbox/inbox messaging, Zitadel authorization, and envelope encryption."
technologies:
  [
    "TypeScript",
    "Bun",
    "PostgreSQL",
    "RabbitMQ",
    "Redis / Valkey",
    "Docker",
    "Hono",
    "Zod",
    "OpenAPI",
    "Zitadel",
    "OpenTofu",
    "Ansible",
    "Proxmox",
  ]
start_date: 2025-10-01
my_role: "Lead backend architect for a greenfield investment and insurance platform (team of 5+ engineers). Designed a single-service modular monolith across 10+ bounded contexts with PostgreSQL transaction boundaries, RabbitMQ transactional outbox/inbox, Zitadel identity and authorization, envelope encryption, and four reproducible Proxmox environments via OpenTofu and Ansible."
cv_highlights:
  - "Architected a greenfield TypeScript/Bun modular monolith (10+ bounded contexts, team of 5+ engineers) for investment/insurance lifecycles."
  - "Built PostgreSQL transaction boundaries and self-hosted RabbitMQ transactional outbox/inbox workflows with idempotent consumers and traceable correlation context."
  - "Designed Zitadel authorization and KEK/DEK envelope encryption, isolating external banking, e-signing, and transactional email providers behind hexagonal adapters."
  - "Provisioned four reproducible Proxmox environments (demo, staging, sandbox, prod) using OpenTofu and Ansible."
---

## Context & risk

Quarzo Life is a greenfield investment and insurance platform covering onboarding, funding, investment execution, portfolio management, settlements, recurring investments, and withdrawals. In money-movement and settlement lifecycles, partial writes, duplicate deliveries, leaked PII, or tightly coupled external financial providers create direct operational and compliance risk.

The platform was built from day zero for a team of **5+ engineers**.

## Architecture & key tradeoffs

- **Single-service modular monolith across 10+ bounded contexts:** Enforced explicit Domain-Driven Design and Hexagonal Architecture boundaries inside a single deployable service rather than splitting prematurely into microservices. This preserves strict module isolation and domain ownership while avoiding distributed-deployment overhead and cross-service schema coordination early in the product lifecycle.
- **Self-hosted RabbitMQ with transactional outbox/inbox:** Selected RabbitMQ over managed workflow SaaS platforms to avoid vendor lock-in and keep recurring infrastructure costs and operational surface area low, while still decoupling cross-domain workflows cleanly.
- **Adapter-isolated third-party providers:** Isolated external **banking, e-signing, and transactional email providers** alongside **Zitadel** (identity and authorization) behind application-owned hexagonal ports and adapters so provider changes and failure modes stay outside the core domain model.
- **Validated service contracts:** Built HTTP APIs and internal boundaries with **TypeScript, Bun, Hono, Zod, and OpenAPI**.

## Security & reliability mechanics

- **Transactional consistency & idempotency:** Paired PostgreSQL repository and unit-of-work transaction boundaries with transactional outbox and inbox tables so state transitions and published domain events commit atomically. Consumers are idempotent so retries and redeliveries cannot duplicate money-movement or settlement side effects.
- **Traceable distributed flows:** Propagated correlation and causation metadata across message hops so multi-domain financial operations remain auditable end to end.
- **Identity & fine-grained authorization:** Built authentication and authorization on **Zitadel**, covering end users, machine identities, service accounts, token validation, and service-to-service access controls.
- **Envelope encryption:** Protected sensitive customer data by separating key-encryption keys (KEKs) from data-encryption keys (DEKs) with explicit key-lifecycle control.
- **Reproducible infrastructure:** Automated **four isolated environments** (`demo`, `staging`, `sandbox`, `prod`) on **Proxmox** using **OpenTofu** and **Ansible**, backed by automated tests spanning domain rules, persistence, messaging, partner adapters, and end-to-end investment workflows.

## Role & outcome

- Led backend architecture and a team of **5+ engineers** from day zero across **10+ bounded contexts**.
- Delivered shared foundations for persistence, reliable messaging, identity, encryption, execution context, and hexagonal third-party provider adapters.
- Provisioned four reproducible Proxmox environments (`demo`, `staging`, `sandbox`, `prod`) using OpenTofu and Ansible.

## Technology

**Stack:** TypeScript, Bun, PostgreSQL, RabbitMQ, Zitadel, Redis/Valkey, Docker, Hono, Zod, OpenAPI, OpenTofu, Ansible, Proxmox

**Patterns:** Modular Monolith, Domain-Driven Design, Hexagonal Architecture, Transactional Outbox/Inbox, Idempotent Consumers, OAuth/OIDC, Envelope Encryption, Infrastructure as Code
