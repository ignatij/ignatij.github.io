---
title: "Share of Search / Model"
home_summary: "Led the Share of Search engineering team within shareofmodel.ai, building FastAPI services, Prefect collection pipelines, and an SSE-streamed Google ADK agent for brand-visibility analysis."
home_technologies: ["Python / FastAPI", "Prefect", "Google ADK", "PostgreSQL"]
category: "client"
employer: "Ludotech"
description: "Brand-visibility and competitive-intelligence product within shareofmodel.ai comparing rankings across search engines and LLMs"
excerpt: "Competitive-intelligence and brand-visibility work within shareofmodel.ai, where I led the Share of Search team across FastAPI/PostgreSQL services, Prefect collection workflows, and a streaming Google ADK agent."
technologies: ["Python", "FastAPI", "PostgreSQL", "Prefect", "Google ADK", "React", "Docker", "Kubernetes"]
start_date: 2024-12-01
end_date: 2025-09-30
my_role: "Led the Share of Search engineering team within shareofmodel.ai, owning full-stack architecture, automated Prefect workflows for collecting and presenting brand-ranking data, and LLM integration work with data science."
cv_highlights:
  - "Led the Share of Search team within shareofmodel.ai, building automated Prefect data-collection pipelines across search engines and LLM platforms (Google, Bing, ChatGPT, Perplexity, Gemini, Claude)."
  - "Built Python/FastAPI backend services, PostgreSQL storage, and SSE-streamed Google ADK agent workflows in collaboration with data science."
---

## Context & risk

Within the broader `shareofmodel.ai` platform, the **Share of Search** product needed to give marketing and research users one place to compare brand visibility and rankings across Google, Bing, their AI-assisted search experiences, and LLM products including **ChatGPT, Perplexity, Gemini, and Claude**.

Automating collection across multiple search engines and LLM platforms introduces long-running jobs, intermittent failures, and latency profiles that cannot live inside synchronous API request paths.

## Architecture & key tradeoffs

- **Split synchronous APIs from orchestrated collection:** Built backend APIs with **Python, FastAPI, and PostgreSQL** while orchestrating automated brand-ranking collection pipelines asynchronously with **Prefect**.
- **Per-user streaming agent over SSE:** Built the **React** analytics interface and used Server-Sent Events (SSE) to stream responses from a per-user agent built with **Google ADK**, keeping interactions responsive during multi-step LLM responses.
- **Cross-functional LLM integration:** Collaborated with the data-science team to integrate LLM workflows into production services packaged and deployed with **Docker and Kubernetes**.

## Role & outcome

- Led the **Share of Search** engineering team, owning full-stack development, backend architecture, and automated collection workflows for brand-ranking data.
- Brought data collection and visualization across multiple search engines and LLM platforms into a single competitive-analysis workflow.
