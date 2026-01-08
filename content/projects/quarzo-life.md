---
title: "Quarzo Life"
description: "Core insurance platform for next-gen wealthtech operations"
excerpt: "Event-driven Deno monorepo with domain-driven bounded contexts"
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

A modular TypeScript monorepo where every bounded context follows DDD, owns its PostgreSQL schema, and communicates through REST endpoints and domain events while sharing a Deno toolchain, React operator console, and GitHub Actions CI.

## Overview

- **Monorepo + Deno Runtime**: A single workspace hosting backend services, frontend apps, shared SDKs, and infrastructure scripts, all linted, tested, and bundled via Deno tasks and pnpm.
- **Event-Driven Architecture**: Contexts exchange domain events through RabbitMQ while remaining independently deployable.
- **DDD Boundaries**: Each context exposes its own REST surface, migrations, and seeders, ensuring domain isolation with explicit contracts.

### Technical Architecture

#### Backend Stack

- **Deno Modular Monolith** with Hono controllers, schema validation, and frozen lockfiles for deterministic builds.
- **Per-Context PostgreSQL Schemas** managed by dbmate migrations; TDD-first workflows using Vitest.
- **Message Bus & Events**: RabbitMQ channels carry domain events for loose coupling.

#### Frontend Stack

- **React** consuming BFF endpoints for suspense-account transfers and admin flows.
- **Feature Flag Engine** controlling UI renderers, themes, and experimental widgets, backed by environment-driven config.

#### Security & Platform

- **HashiCorp Vault** for secrets, seeded via automated scripts.
- **Keycloak** as the Identity Provider (IdP).
- **Dockerized Dev Stack** (Vault, Postgres, Keycloak, RabbitMQ) for local parity; production-ready images shipped to Kubernetes targets.

#### Automation & Quality

- **GitHub Actions CI** running lint, test, build, and dbmate verification pipelines on every PR.
- **Test-Driven Development** across contexts: domain use cases, HTTP controllers, and UI flows are covered by unit + integration suites.
- **Feature Toggles** pipelines allow gradual rollouts without code forks.

## My Role

- Architected the monorepo conventions (workspace layout, shared tooling, CI pipelines) and enforced DDD boundaries.
- Built the feature-flagged React console plus the BFF layer exposing transfer reconciliation workflows.
- Integrated Vault, Keycloak, and GitHub Actions so secrets, identity, and automation adhere to enterprise standards.

## Impact

- Enabled teams to spin up new bounded contexts rapidly while keeping DevOps (Docker, CI, infra scripts) consistent.
