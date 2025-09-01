---
title: "GoFlow"
description: "Workflow management library built in Go for simple, powerful workflow orchestration"
excerpt: "A comprehensive workflow orchestration library in Go featuring task dependencies, retry mechanisms, timeout handling, and PostgreSQL persistence"
technologies: ["Go", "PostgreSQL", "Docker"]
github: "https://github.com/ignatij/goflow"
---

# GoFlow - Workflow Management Library

A powerful and flexible workflow orchestration library built in Go, designed for simple yet robust workflow management with advanced features like task dependencies, retry mechanisms, and persistent storage.

## Overview

GoFlow is a comprehensive workflow management solution that provides both library and service modes for workflow orchestration. Built with Go's concurrency primitives, it offers high performance, reliability, and ease of use for complex workflow scenarios.

## Key Features

- **Task Dependencies**: Define complex task relationships and execution order
- **Retry Mechanisms**: Configurable retry policies with exponential backoff
- **Timeout Handling**: Built-in timeout management for task execution
- **Persistent Storage**: PostgreSQL backend for workflow state persistence
- **Parallel Execution**: Concurrent task execution with dependency resolution
- **Error Recovery**: Robust error handling and recovery mechanisms
- **Service Mode**: Run as standalone HTTP service or embedded library
- **Context Support**: Full context.Context integration for cancellation and timeouts

## Technical Architecture

### Key Concepts

- **Workflow**: A collection of tasks and their dependencies
- **Task**: Individual unit of work with optional retry/timeout configuration
- **Flow**: Entry point that defines the execution path
- **Dependencies**: Task relationships that determine execution order

## Implementation Highlights

### Library Usage

```go
// Register tasks with dependencies
wfService.RegisterTask("validate_order", validateOrderFunc, nil)
wfService.RegisterTask("check_inventory", checkInventoryFunc, []string{"validate_order"})
wfService.RegisterTask("process_payment", processPaymentFunc, []string{"check_inventory"})

// Create and execute workflow
workflowID, err := wfService.CreateWorkflow("order-processing")
result, err := wfService.ExecuteFlow(ctx, workflowID, "main")
```

### Advanced Configuration

```go
// Configure task with retries and timeout
wfService.RegisterTask("unstable_task", taskFunc, deps,
    models.WithRetries(3),
    models.WithTimeout(30*time.Second),
)
```

### PostgreSQL Integration

```go
// Connect to PostgreSQL with persistent storage
dbURL := "postgres://username:password@localhost:5432/goflow?sslmode=disable"
store, err := storage.NewPostgresStore(dbURL)
wfService := service.NewWorkflowService(ctx, store, logger)
```

## Real-World Applications

### E-commerce Order Processing

The library includes a comprehensive e-commerce example demonstrating:

- **Complex Task Dependencies**: Multi-step order processing workflow
- **Error Handling & Retries**: Inventory checking with automatic retry mechanisms
- **Timeout Management**: Payment processing with configurable timeouts
- **Parallel Execution**: Independent tasks running concurrently
- **Data Flow**: Proper passing of order data between tasks

### Workflow Tasks Include

- Order validation
- Inventory checking (with retry mechanism)
- Payment processing (with timeout)
- Shipping preparation
- Email confirmation
- Inventory updates

## API Reference

### Library API

- **WorkflowService**: Main orchestrator struct
- **TaskResult**: Interface for task results
- **ContextTaskFunc**: Function signature for tasks
- **RegisterTask**: Register tasks with dependencies
- **RegisterFlow**: Define workflow entry points
- **CreateWorkflow**: Create new workflow instances
- **ExecuteFlow**: Execute workflow flows

### HTTP Endpoints (Service Mode)

- `GET /workflows` - List all workflows
- `POST /workflows` - Create a new workflow
- `GET /workflows/{id}` - Get workflow details
- `POST /workflows/{id}/execute` - Execute a workflow flow

## Version Management

GoFlow uses semantic versioning with automated releases:

- **feat:** - New features (minor version bump)
- **fix:** - Bug fixes (patch version bump)
- **BREAKING CHANGE:** - Breaking changes (major version bump)
