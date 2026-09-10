---
title: "Forward Publishing"
category: "client"
employer: "Netcetera"
description: "Digital publishing platform for importing, managing, and delivering content across multiple websites"
excerpt: "A Node.js publishing platform that evolved from a client-specific system into a SaaS offering, with content import, CMS integration, and multi-site delivery."
technologies: ["Node.js", "React", "NX", "Livingdocs CMS", "PostgreSQL", "Docker", "Kubernetes", "Digital Ocean", "AWS", "Terraform", "Cloudflare"]
start_date: 2022-01-01
end_date: 2023-07-30
my_role: "Contributed to migrating a client-specific publishing solution into a SaaS platform, worked across application and infrastructure concerns, and documented the system for future implementations."
cv_highlights:
  - "Contributed to the migration of a client-specific publishing solution into a SaaS platform."
  - "Worked across Node.js services, PostgreSQL, React, CMS integrations, and Kubernetes infrastructure; the platform handled about 700,000 monthly requests."
  - "Documented the platform to support subsequent implementation work."
---

## The problem

Forward Publishing needed to grow from a solution built for one client into a SaaS platform. It had to import content from multiple sources, support editorial work through Livingdocs CMS, publish to different websites, and serve reader-facing delivery sites.

## My contribution

I contributed to the migration and worked across the Node.js services, PostgreSQL data layer, React interfaces, CMS integration, and delivery infrastructure. I also produced detailed documentation so later implementations could follow the platform's established patterns.

## Engineering decisions

- Used an NX monorepo to manage related services and applications.
- Ran containerized services on Kubernetes across Digital Ocean and AWS.
- Used Aurora PostgreSQL for managed relational storage, Amazon SQS for inter-service messaging, and S3 for article storage.
- Provisioned environments with Terraform and used autoscaling for traffic variation.
- Used Cloudflare protection while responding to DDoS attacks.

## Supported result

The client-specific system was migrated into a SaaS offering. During this work the platform handled about **700,000 requests per month**. That number describes the platform's operating context; it is not presented as a throughput benchmark.
