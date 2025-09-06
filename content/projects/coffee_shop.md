---
title: "Coffee Shop"
description: "Sample coffee-ordering application showcasing modern web development technologies"
excerpt: "A technical showcase demonstrating Node.js, GraphQL, React, TypeScript, and Docker in a monorepo architecture"
technologies:
  ["TypeScript", "React", "Node.js", "GraphQL", "Docker", "PostgreSQL"]
github: "https://github.com/ignatij/coffee-shop"
---

A comprehensive sample application demonstrating modern web development technologies and architectural patterns in a coffee-ordering system.

## Overview

Coffee Shop is a technical showcase project designed to demonstrate the usage of modern web development technologies including Node.js, Express, TypeScript, React, GraphQL, and Docker. Built as a monorepo using Yarn workspaces, it showcases both CommonJS and ESM module systems.

## Key Features

- **Monorepo Architecture**: Yarn workspaces with multiple applications
- **GraphQL API**: Apollo Server with TypeScript
- **React Frontend**: TypeScript-based UI with Apollo Client
- **Microservices**: External API service integration
- **Docker Support**: Containerized deployment
- **PostgreSQL Database**: Data persistence with TypeScript

## Technical Architecture

### Workspaces

- **app**: GraphQL server (ESM, TypeScript, Express)
- **ui**: React frontend (TypeScript, Apollo Client)
- **external-api-service**: Microservice (CommonJS, Express)

### Technology Stack

- **Backend**: Node.js, Express, GraphQL, TypeScript
- **Frontend**: React, Apollo Client, TypeScript
- **Database**: PostgreSQL
- **Containerization**: Docker
- **Package Manager**: Yarn Berry (v4)

## Quick Start

```bash
# Install dependencies
yarn

# Start local database
yarn start-local-db

# Initialize database
yarn app:init-db

# Start external API service
yarn external-api-service:up

# Start GraphQL server
yarn app:start

# Start React frontend
yarn ui:start
```

## Docker Deployment

```bash
# Build images
docker build -t external-api-service -f dockerfiles/ExternalServiceApi.Dockerfile .
docker build -t app -f dockerfiles/App.Dockerfile .
docker build -t ui -f dockerfiles/UI.Dockerfile .

# Run containers
docker network create coffee-shop
docker run -d -p 8081:8081 --network coffee-shop external-api-service
docker run -d -p 8000:8000 --network coffee-shop app
docker run -d -p 8080:8080 --network coffee-shop ui
```
