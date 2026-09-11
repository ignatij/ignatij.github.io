---
title: "Folio"
category: "open-source"
personal_project_order: 1
listing_subtitle: "Open-source CMS contributor"
description: "An open-source, self-hosted CMS with a Go backend and static-site publishing"
excerpt: "Folio is an open-source, self-hosted CMS with a Go backend and static-site publishing. I am an active contributor and maintain multiple websites on my custom VPS hosting."
technologies: ["Go", "SQLite", "TypeScript / React", "Eleventy"]
github: "https://github.com/vl4d1m1r4/folio"
cv_highlights:
  - "Active contributor to Folio, an open-source, self-hosted CMS with a Go API, React admin interface, and static-site publishing."
  - "Host and maintain multiple Folio websites on my custom VPS."
---

Folio is an open-source, self-hosted CMS that combines a visual content-management interface with a statically generated public website.

## How Folio works

The Go/Echo backend exposes APIs for content and administration, with SQLite storing articles, pages, translations, and settings. A React/TypeScript admin interface provides authenticated editing, media management, and configurable content blocks.

Editors can manage multilingual articles and pages, arrange content visually, and customize the site's theme and navigation. Uploaded media is stored separately from the content database.

Eleventy reads content through the API and generates the public site. Publishing changes triggers a rebuild, and the build script replaces the published output only after a successful build. This separates the editing experience from the static pages served to visitors.

## My involvement

I am an active Folio contributor and maintain multiple websites on my custom VPS hosting, including:

- [Anastasija Gichevska website](https://anastasijagichevska.com/en/)
- [Anima Centar website](https://animacentar.com/)

[Original Folio repository](https://github.com/vl4d1m1r4/folio)
