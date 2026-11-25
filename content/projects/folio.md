---
title: "Folio"
home_summary: "Active contributor to a self-hosted Go/SQLite CMS with static Eleventy publishing and atomic build swaps; self-hosting two live production sites on my VPS."
home_technologies: ["Go", "SQLite", "React", "Eleventy"]
category: "open-source"
personal_project_order: 3
listing_subtitle: "Open-source CMS contributor & operator"
description: "Open-source, self-hosted CMS pairing a Go/SQLite admin API with statically generated Eleventy sites and atomic publish swaps"
excerpt: "Open-source, self-hosted CMS separating a Go/SQLite admin API from statically generated Eleventy output with atomic build swaps; active contributor self-hosting two live production sites on a managed VPS."
technologies: ["Go", "SQLite", "TypeScript / React", "Eleventy"]
github: "https://github.com/vl4d1m1r4/folio"
cv_highlights:
  - "Active contributor to Folio, an open-source self-hosted Go/SQLite/React CMS with static Eleventy publishing and atomic build swaps."
  - "Self-host and maintain two live production sites (anastasijagichevska.com and animacentar.com) on a custom VPS."
---

## Context & risk

Traditional dynamic CMS platforms expose the database, authentication surface, and application runtime directly to every public visitor request. Folio reduces that attack surface and operational complexity by isolating authenticated editing from static public delivery.

## Architecture & security mechanics

- **Decoupled admin runtime and static delivery:** A **Go/Echo** backend with **SQLite** and a **React/TypeScript** admin interface handles authenticated editing, multilingual content, media uploads (stored separately from the database), and theme configuration.
- **Atomic publish swaps:** Publishing triggers an **Eleventy** static build that pulls content through the API and replaces the served public output only after a build succeeds—preventing broken partial deploys and keeping the public web tier strictly static.

## My involvement

I am an active contributor to Folio and operate two live production sites on my own managed VPS:

- [anastasijagichevska.com](https://anastasijagichevska.com/en/)
- [animacentar.com](https://animacentar.com/)

[View Folio on GitHub](https://github.com/vl4d1m1r4/folio)
