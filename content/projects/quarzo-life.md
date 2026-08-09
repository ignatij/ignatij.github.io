---
title: "Quarzo Life"
description: "End-to-end investment and insurance platform spanning onboarding, funding, investment execution, portfolio management, settlements, recurring investments, and withdrawals"
excerpt: "An end-to-end investment and insurance platform built around secure, reliable workflows for the complete customer and investment lifecycle."
technologies:
  [
    "TypeScript",
    "Deno",
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
my_role: "Architected the backend using Domain-Driven Design and Hexagonal Architecture. Built reliable RabbitMQ workflows with transactional outbox/inbox patterns and idempotent consumers; designed PostgreSQL transaction boundaries, Zitadel-based identity and authorization, envelope encryption, and reproducible multi-environment infrastructure with OpenTofu and Ansible on Proxmox."
---

## Overview

Quarzo Life is an end-to-end investment and insurance platform covering the complete customer and investment lifecycle—from onboarding and funding through investment execution, portfolio management, settlements, recurring investments, and withdrawals.

My work focused on designing and developing the backend so consistency-critical financial operations remained secure, traceable, and reliable as the platform grew across business domains.

## Architecture and Engineering

### Domain-Driven Services

- Designed services around explicit business domains using **Domain-Driven Design** and **Clean/Hexagonal Architecture**.
- Kept business rules independent from databases, messaging infrastructure, and external providers through clear application ports and infrastructure adapters.
- Standardized shared infrastructure for persistence, messaging, authentication, observability, and scheduling without weakening domain boundaries.

### Reliable Event-Driven Workflows

- Built asynchronous workflows with **RabbitMQ** and explicit domain events to coordinate processes across business domains.
- Applied **transactional outbox and inbox patterns** so database changes and message processing remained consistent.
- Designed **idempotent consumers** to make retries safe and prevent duplicate processing in financial workflows.
- Propagated correlation and causation metadata across message flows to make distributed operations traceable.

### Transactional Persistence

- Developed persistence layers on **PostgreSQL** using repository and unit-of-work patterns.
- Defined transaction boundaries for consistency-critical operations involving investment execution, money movement, settlements, recurring investments, and position keeping.
- Used **Redis/Valkey** where fast, short-lived access to shared data supported platform workflows.

### Identity, Security, and Traceability

- Designed the identity and authorization architecture with **Zitadel**, supporting users, machine identities, service accounts, token validation, fine-grained authorization, and secure service-to-service communication.
- Protected sensitive customer data with **envelope encryption**, separating key-encryption keys from data-encryption keys and controlling their lifecycle.

### APIs and Integrations

- Designed strongly validated REST APIs and internal service contracts with **TypeScript, Deno, Hono, Zod, and OpenAPI**.
- Isolated banking, identity, document-signing, storage, email, and other third-party services behind adapters, reducing provider coupling and keeping external concerns out of the domain model.

### Infrastructure and Environments

- Automated reproducible infrastructure provisioning and configuration with **OpenTofu** and **Ansible** on **Proxmox**.
- Supported isolated development, staging, demo, sandbox, and production environments through a consistent infrastructure-as-code workflow.

### Quality and Reliability

- Improved confidence in changes through automated tests covering domain logic, repositories, messaging infrastructure, external integrations, and end-to-end investment workflows.

## My Role

- Architected the backend and defined domain boundaries for the full investment and insurance lifecycle.
- Implemented reliable messaging and transactional consistency patterns for cross-domain financial workflows.
- Designed identity, authorization, execution-context propagation, encryption, persistence, API, and integration foundations shared across services.
- Automated reproducible, isolated application environments with OpenTofu and Ansible on Proxmox.

## Technology and Architecture

**Technology:** TypeScript, Deno, PostgreSQL, RabbitMQ, Zitadel, Redis/Valkey, Docker, Hono, Zod, OpenAPI, OpenTofu, Ansible, Proxmox

**Architecture:** Domain-Driven Design, Hexagonal Architecture, Event-Driven Architecture, OAuth/OIDC, Transactional Outbox/Inbox, Idempotency, Envelope Encryption, Distributed Tracing, Infrastructure as Code, REST APIs
