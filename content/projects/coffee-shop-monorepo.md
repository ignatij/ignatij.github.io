---
title: "Coffee Shop - Monorepo"
excerpt: "Simple coffee-ordering application designed as a monorepo with Yarn workspaces showcasing Node.js, Express, TypeScript, React, GraphQL, Docker, and PostgreSQL"
technologies: ["Node.js", "Express", "TypeScript", "React", "GraphQL", "Docker", "PostgreSQL", "Yarn Workspaces", "CJS", "ESM"]
github: "https://github.com/ignatij/coffee-shop"
---

# Coffee Shop - Monorepo

A comprehensive coffee-ordering application built as a monorepo using Yarn workspaces, demonstrating modern full-stack development practices and architectural patterns.

## Overview

This project serves as a showcase for building scalable applications using modern JavaScript/TypeScript technologies. The monorepo structure demonstrates how to effectively manage multiple packages, shared dependencies, and complex build processes in a single repository.

## Monorepo Architecture

### Package Structure
```
coffee-shop/
├── packages/
│   ├── api/                 # Backend API (Node.js + Express)
│   ├── web/                 # Frontend (React + TypeScript)
│   ├── shared/              # Shared utilities and types
│   ├── database/            # Database migrations and seeds
│   └── docker/              # Docker configurations
├── apps/
│   ├── admin/               # Admin dashboard
│   └── mobile/              # React Native mobile app
└── tools/
    ├── eslint-config/       # Shared ESLint configuration
    └── typescript-config/   # Shared TypeScript configuration
```

### Yarn Workspaces Configuration
```json
{
  "name": "coffee-shop-monorepo",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*",
    "tools/*"
  ],
  "scripts": {
    "dev": "yarn workspaces run dev",
    "build": "yarn workspaces run build",
    "test": "yarn workspaces run test",
    "lint": "yarn workspaces run lint"
  }
}
```

## Backend API (Node.js + Express)

### Architecture
```typescript
// packages/api/src/app.ts
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user,
    db: req.db
  })
});

server.applyMiddleware({ app });
```

### GraphQL Schema
```graphql
# packages/api/src/schema/order.graphql
type Order {
  id: ID!
  items: [OrderItem!]!
  total: Float!
  status: OrderStatus!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type OrderItem {
  id: ID!
  product: Product!
  quantity: Int!
  price: Float!
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  READY
  COMPLETED
  CANCELLED
}

type Query {
  orders: [Order!]!
  order(id: ID!): Order
}

type Mutation {
  createOrder(input: CreateOrderInput!): Order!
  updateOrderStatus(id: ID!, status: OrderStatus!): Order!
}
```

### Database Integration
```typescript
// packages/database/src/migrations/001_create_orders.ts
export const up = async (db: Knex) => {
  await db.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(db.raw('gen_random_uuid()'));
    table.jsonb('items').notNullable();
    table.decimal('total', 10, 2).notNullable();
    table.enum('status', ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']).defaultTo('pending');
    table.timestamps(true, true);
  });
};
```

## Frontend (React + TypeScript)

### Component Architecture
```typescript
// packages/web/src/components/OrderForm.tsx
import React from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      total
      status
    }
  }
`;

export const OrderForm: React.FC = () => {
  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER);

  const handleSubmit = async (formData: OrderFormData) => {
    try {
      const { data } = await createOrder({
        variables: { input: formData }
      });
      // Handle success
    } catch (err) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

### State Management
```typescript
// packages/web/src/store/orderStore.ts
import { create } from 'zustand';

interface OrderStore {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  fetchOrders: () => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  loading: false,
  addOrder: (order) => set((state) => ({ 
    orders: [...state.orders, order] 
  })),
  updateOrder: (id, updates) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === id ? { ...order, ...updates } : order
    )
  })),
  fetchOrders: async () => {
    set({ loading: true });
    // API call implementation
    set({ loading: false });
  }
}));
```

## Docker Configuration

### Multi-stage Build
```dockerfile
# packages/api/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  api:
    build: ./packages/api
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/coffee_shop
    depends_on:
      - db

  web:
    build: ./packages/web
    ports:
      - "3001:3001"
    environment:
      - REACT_APP_API_URL=http://localhost:3000

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: coffee_shop
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Module Systems (CJS + ESM)

### Dual Package Support
```json
// packages/shared/package.json
{
  "name": "@coffee-shop/shared",
  "main": "./dist/index.js",
  "module": "./dist/index.esm.js",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js"
    }
  },
  "type": "module"
}
```

### Build Configuration
```javascript
// packages/shared/rollup.config.js
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs'
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm'
      }
    ],
    plugins: [typescript()]
  }
]);
```

## Development Workflow

### Scripts
```json
{
  "scripts": {
    "dev": "concurrently \"yarn workspace @coffee-shop/api dev\" \"yarn workspace @coffee-shop/web dev\"",
    "build": "yarn workspaces run build",
    "test": "yarn workspaces run test",
    "lint": "yarn workspaces run lint",
    "type-check": "yarn workspaces run type-check",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down"
  }
}
```

### Shared Configurations
```javascript
// tools/eslint-config/index.js
module.exports = {
  extends: [
    '@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn'
  }
};
```

## Testing Strategy

### Unit Tests
```typescript
// packages/api/src/__tests__/order.test.ts
import { createOrder } from '../services/orderService';
import { mockOrderData } from '../__mocks__/orderData';

describe('Order Service', () => {
  it('should create a new order', async () => {
    const result = await createOrder(mockOrderData);
    expect(result).toHaveProperty('id');
    expect(result.total).toBe(15.50);
  });
});
```

### Integration Tests
```typescript
// packages/api/src/__tests__/graphql.test.ts
import { createTestClient } from 'apollo-server-testing';
import { server } from '../app';

describe('GraphQL API', () => {
  it('should query orders', async () => {
    const { query } = createTestClient(server);
    const result = await query({ query: GET_ORDERS });
    expect(result.data.orders).toBeDefined();
  });
});
```

## Performance Optimizations

### Bundle Analysis
```javascript
// packages/web/webpack.config.js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]
};
```

### Code Splitting
```typescript
// packages/web/src/App.tsx
import { lazy, Suspense } from 'react';

const OrderForm = lazy(() => import('./components/OrderForm'));
const OrderHistory = lazy(() => import('./components/OrderHistory'));

export const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <OrderForm />
    <OrderHistory />
  </Suspense>
);
```

## Deployment

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy Coffee Shop
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: yarn install --frozen-lockfile
      - name: Run tests
        run: yarn test
      - name: Build
        run: yarn build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

This project demonstrates expertise in modern JavaScript/TypeScript development, monorepo management, and full-stack application architecture, making it an excellent showcase of technical skills and best practices. 