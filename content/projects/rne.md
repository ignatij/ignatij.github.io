---
title: "RNE — Rail Network Europe"
category: "client"
employer: "Netcetera"
description: "Cross-border rail-operations platform coordinating schedules and oversight across 15 European countries"
excerpt: "Long-running multi-country rail-operations platform across 15 European countries built with Java/Spring, GraphQL, TypeScript, Angular, and NgRx."
technologies: ["Java", "Spring", "GraphQL", "TypeScript", "Angular", "NgRx"]
start_date: 2016-10-01
end_date: 2020-12-31
my_role: "Developed and supported Java/Spring backend services, GraphQL APIs, and Angular/NgRx interfaces for rail operations spanning 15 European countries."
cv_highlights:
  - "Developed Java/Spring services, GraphQL APIs, and Angular/NgRx interfaces for rail operations across 15 European countries, handling cross-border timezone and scheduling consistency."
---

## Context & risk

RNE coordinates rail-operation oversight across **15 European countries**. Operational schedules and train-movement records have to remain consistent across national boundaries, timezones, and daylight-saving transitions where subtle timestamp bugs disrupt cross-border coordination.

## Architecture & key tradeoffs

- **Java/Spring & GraphQL backend:** Exposed complex, interconnected rail-operation entities through **Java/Spring** services and **GraphQL** APIs to support varied operational views without proliferating brittle REST payloads.
- **Deterministic client state:** Managed dense operational UI workflows in **TypeScript/Angular** using **NgRx** for predictable state transitions.
- **Cross-border time semantics:** Explicitly modeled timezone and timestamp-consistency rules across multi-country rail schedules.

## Role & outcome

- Built and maintained features end to end across backend services, GraphQL APIs, and Angular/NgRx frontends over four years on a mission-critical European operational platform.
