---
title: "GoFlow"
home_summary: "Go workflow orchestration library implementing DAG dependency resolution, exponential-backoff retries, context timeouts, parallel execution, and PostgreSQL state persistence."
home_technologies: ["Go", "PostgreSQL", "Docker"]
category: "open-source"
personal_project_order: 2
cv_highlights:
  - "Built a Go workflow library implementing DAG dependency resolution, exponential-backoff retries, context timeouts, parallel execution, and durable PostgreSQL state persistence."
description: "Go workflow orchestration library with DAG dependency resolution, bounded retries, timeouts, concurrent execution, and PostgreSQL persistence"
excerpt: "Go workflow orchestration library and optional HTTP service implementing DAG task dependencies, exponential-backoff retries, context timeouts, parallel execution, and PostgreSQL state persistence."
technologies: ["Go", "PostgreSQL", "Docker"]
github: "https://github.com/ignatij/goflow"
---

## Context & risk

Multi-step backend operations (such as order validation, inventory checks, payment calls, and notifications) fail halfway through when tasks run as ad-hoc sequential calls without explicit dependency graphs, bounded retries, timeouts, or durable state. GoFlow explores building those workflow reliability primitives directly in Go without pulling in a heavy external orchestration cluster.

## Architecture & key tradeoffs

- **Embedded library or standalone HTTP service:** Exposes the same core `WorkflowService` either embedded in-process (minimal operational footprint) or behind an HTTP service boundary (`/workflows`, `/workflows/{id}/execute`).
- **DAG resolution with concurrent execution:** Models workflows as tasks with explicit dependency edges, running independent branches concurrently using Go concurrency primitives while preserving topological order.
- **PostgreSQL-backed state persistence:** Persists workflow instances and task execution state in **PostgreSQL** via a `storage.NewPostgresStore` boundary rather than holding state solely in process memory.

## Reliability mechanics

- **Bounded retries with exponential backoff:** Per-task retry policies (`models.WithRetries(3)`) handle transient downstream failures without unbounded retry loops.
- **Context propagation & timeouts:** Full `context.Context` support (`models.WithTimeout(30*time.Second)`) ensures cancellation and per-task deadlines propagate cleanly through every execution step.

## Example Usage

```go
store, err := storage.NewPostgresStore(dbURL)
wfService := service.NewWorkflowService(ctx, store, logger)

wfService.RegisterTask("validate_order", validateOrderFunc, nil)
wfService.RegisterTask("check_inventory", checkInventoryFunc, []string{"validate_order"},
    models.WithRetries(3),
)
wfService.RegisterTask("process_payment", processPaymentFunc, []string{"check_inventory"},
    models.WithTimeout(30*time.Second),
)

workflowID, err := wfService.CreateWorkflow("order-processing")
result, err := wfService.ExecuteFlow(ctx, workflowID, "main")
```

## Repository

[View GoFlow on GitHub](https://github.com/ignatij/goflow)
