---
title: "Quarzo Life"
description: "Insurance and WealthTech platform supporting insurance, investments, payments, settlements, premium scheduling, and position management"
excerpt: "A financial platform built around reliable domain workflows for insurance, investments, payments, settlements, and portfolio operations."
technologies:
  [
    "TypeScript",
    "Deno",
    "PostgreSQL",
    "RabbitMQ",
    "Redis",
    "Docker",
    "Hono",
    "Zod",
    "OpenAPI",
    "Zitadel",
  ]
start_date: 2025-10-01
my_role: "Designed and evolved the backend architecture using Domain-Driven Design and Clean/Hexagonal Architecture. Built reliable event-driven workflows with RabbitMQ, transactional outbox/inbox patterns, idempotent consumers, and PostgreSQL transaction boundaries; delivered validated APIs and isolated third-party integrations."
---

## Overview

Quarzo Life is an Insurance and WealthTech platform supporting the financial lifecycle across insurance, investments, payments, settlements, premium scheduling, and position management.

My work focused on designing and evolving the backend architecture so that consistency-critical financial operations remained reliable while the platform continued to grow across business domains.

## Architecture and Engineering

### Domain-Driven Services

- Designed services around explicit business domains using **Domain-Driven Design** and **Clean/Hexagonal Architecture**.
- Kept business rules independent from databases, messaging infrastructure, and external providers through clear application ports and infrastructure adapters.
- Established reusable patterns for authentication, logging, scheduling, persistence, and messaging without weakening domain boundaries.

### Reliable Event-Driven Workflows

- Built asynchronous workflows with **RabbitMQ** and explicit domain events to coordinate processes across business domains.
- Applied **transactional outbox and inbox patterns** so database changes and message processing remained consistent.
- Designed **idempotent consumers** to make retries safe and prevent duplicate processing in financial workflows.

### Transactional Persistence

- Developed persistence layers on **PostgreSQL** using repository and unit-of-work patterns.
- Defined transaction boundaries for consistency-critical operations involving payments, settlements, premium schedules, and investment positions.
- Used **Redis** where fast, short-lived access to shared data supported platform workflows.

### APIs and Integrations

- Designed strongly validated REST APIs and internal service contracts with **TypeScript, Deno, Hono, Zod, and OpenAPI**.
- Isolated banking, identity, document-signing, storage, email, and other third-party services behind adapters, reducing provider coupling and keeping external concerns out of the domain model.

### Quality and Reliability

- Improved confidence in changes through automated unit, integration, repository, and end-to-end tests.
- Built reusable testing and infrastructure foundations for consistent behavior across services and business domains.

## My Role

- Designed and evolved the platform's backend architecture and domain boundaries.
- Implemented reliable messaging and transactional consistency patterns for cross-domain workflows.
- Built persistence, API, and integration layers for core insurance and wealth-management operations.

## Technology and Architecture

**Technology:** TypeScript, Deno, PostgreSQL, RabbitMQ, Redis, Docker, Hono, Zod, OpenAPI, Zitadel

**Architecture:** Domain-Driven Design, Clean/Hexagonal Architecture, Event-Driven Architecture, Transactional Outbox/Inbox, REST APIs
