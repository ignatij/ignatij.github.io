---
title: "Quarzo Life"
description: "Core insurance platform for next-gen wealthtech operations"
excerpt: "Core insurance platform for next-gen wealthtech operations"
technologies:
  [
    "Deno",
    "TypeScript",
    "React",
    "PostgreSQL",
    "Docker",
    "RabbitMQ",
    "HashiCorp Vault",
    "Keycloak",
  ]
start_date: 2025-10-01
---

## Overview

A full-scale life insurance platform that offers a comprehensive range of insurance and investment products to clients.

## Technical Architecture

### Backend Infrastructure

- **Deno Modular Monolith Runtime**: Modular monolith runtime built in Deno, consisting of multiple contexts, each with its own domain model, services, and infrastructure.
- **Event-Driven Architecture**: Contexts exchange domain events through RabbitMQ while remaining independently deployable.
- **DDD Boundaries**: Each context exposes its own REST surface, migrations, and seeders, ensuring domain isolation with explicit contracts.

### Frontend Technologies

- **React** consuming BFF endpoints.

### Security & Platform

- **HashiCorp Vault** for secrets, seeded via automated scripts.
- **Keycloak** as the Identity Provider (IdP).
- **Dockerized Dev Stack** (Vault, Postgres, Keycloak, RabbitMQ) for local parity; production-ready images shipped to Kubernetes targets.

### Continuous Integration and Deployment

- **GitHub Actions CI** for Continuous Integration.
- **Railway** for Continuous Deployment.

### Methodologies

- **Monorepo**: A single workspace hosting backend services, frontend apps, shared SDK, and infrastructure scripts, all linted, tested, and bundled via Deno tasks and pnpm.
- **Trunk-Based Development** keeps releases flowing daily by gating merges behind automated checks and short-lived feature branches.
- **Feature Toggles** allow gradual rollouts without code forks.
- **Functional Programming** principles to ensure code predictability and maintainability.
- **Test-Driven Development (TDD)** enforces executable specifications for aggregates, REST handlers, and React flows.
- **Domain-Driven Design (DDD)** guides bounded contexts, ubiquitous language, and integration contracts.

## My Role

- Architected the monorepo conventions (workspace layout, shared tooling, CI pipelines) and enforced DDD boundaries.
- Integrated Vault, Keycloak, and GitHub Actions so secrets, identity, and automation adhere to enterprise standards.

## Impact

- Enabled teams to spin up new bounded contexts rapidly while keeping DevOps (Docker, CI, infra scripts) consistent.
