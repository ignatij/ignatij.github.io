---
title: "J+ Monitor"
category: "client"
employer: "Ludotech"
description: "Rule-based website monitoring platform whose core processing service was migrated from Node.js to Go"
excerpt: "A rule-based monitoring platform where I migrated core processing from Node.js to Go and helped move service communication toward event-driven processing."
technologies:
  [
    "Node.js",
    "React",
    "Go",
    "GCP",
    "Docker",
    "Pulumi",
    "K8s",
    "Google Pub/Sub",
    "PostgreSQL",
  ]
start_date: 2024-06-01
end_date: 2024-11-30
my_role: 'Enhanced product speed by 33% by migrating the core processing logic to Golang'
cv_highlights:
  - "Reduced message-processing time by 33% by migrating a core processing service from Node.js to Go."
---

A rule-based website monitoring platform that lets users define checks for target websites and produces events and overview data from those checks.

## Overview

J+ Monitor allows users to define custom rules for checking specific aspects of target websites. The platform automatically executes these rules and generates events with detailed overview data, providing insights into website performance, content changes, and user-defined metrics.

## Key Features

- **Custom Rule Creation**: Intuitive interface for defining monitoring rules for target websites
- **Event Generation**: Automated creation of events based on rule violations or conditions
- **Real-time Overview Data**: Comprehensive analytics and insights for each monitored website
- **Measured improvement**: Existing project records report a 33% improvement after the Go migration. The measurement definition needs confirmation, so this is not characterized as latency or throughput.

## Technical Architecture

### Backend Infrastructure

- **Microservices Architecture**: Scalable, maintainable service-oriented design with
  event-driven architecture built in Node.js and Golang
- **Event-Driven Processing**: Google Pub/Sub integration for reliable event handling
- **Rule Engine**: High-performance rule processing and execution system

### Frontend Technologies

- **React**: Modern, responsive user interface for rule creation and data visualization
- **Interactive Dashboards**: Real-time overview data and event visualization
- **Rule Builder Interface**: User-friendly tools for creating and managing monitoring rules

## Performance Improvements

### Golang Migration

- **Rule Processing Engine**: Migrated rule execution logic from Node.js to Golang
- **33% recorded improvement**: Preserved from the project record, with the underlying measurement still to be confirmed

### Architecture Migration

- **From Synchronous to Event-Driven**: Migrated from REST-based microservices
  communication to event-driven architecture
- **Google Pub/Sub Integration**: Replaced direct HTTP calls with asynchronous message processing
- **Looser service coupling**: Event-driven processing replaced some direct synchronous communication

## My Role

- **Golang Migration**: Led the migration of one Node.js microservice to Golang
- **Monitoring Tool Development**: Built core website-monitoring processing in Go; existing records report a 33% improvement, pending clarification of how it was measured
- **Event System**: Developed the event generation and overview data system

## Impact & Results

- **33% recorded improvement** following the migration, with the measurement definition flagged for review
