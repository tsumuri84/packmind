---
description: 'Create api service'
agent: 'agent'
---

# Create API Service

Scaffold a typed REST API service class following the codebase pattern: fetch wrapper with `VITE_API_URL`, `ApiResponse<T>` unwrapping, and a singleton export.

## When to Use

- Adding a new domain resource that needs CRUD API calls (e.g., `OrderService`, `CategoryService`)
- Extracting fetch calls scattered in components or hooks into a dedicated service

## Checkpoints

- What is the domain name (e.g., `Order`, `Category`)? This becomes `<Domain>Service`.
- What is the API endpoint path (e.g., `/orders`)?
- Which methods are needed: `getAll`, `getById`, `create`, `update`, `delete`?
- What is the entity type imported from `../types`?

## Steps

### 1. Create the service file

Create `src/services/<Domain>Service.ts`:

```ts
import type { <Domain>, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL as string;

export class <Domain>Service {
  async getById(id: string): Promise<<Domain>> {
    const response = await fetch(`${API_BASE_URL}/<endpoint>/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch <domain> ${id}`);
    const json: ApiResponse<<Domain>> = await response.json();
    return json.data;
  }

  async getAll(): Promise<<Domain>[]> {
    const response = await fetch(`${API_BASE_URL}/<endpoint>`);
    if (!response.ok) throw new Error('Failed to fetch <domain>s');
    const json: ApiResponse<<Domain>[]> = await response.json();
    return json.data;
  }

  async create(payload: Omit<<Domain>, 'id'>): Promise<<Domain>> {
    const response = await fetch(`${API_BASE_URL}/<endpoint>`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to create <domain>');
    const json: ApiResponse<<Domain>> = await response.json();
    return json.data;
  }

  async update(id: string, payload: Partial<<Domain>>): Promise<<Domain>> {
    const response = await fetch(`${API_BASE_URL}/<endpoint>/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Failed to update <domain> ${id}`);
    const json: ApiResponse<<Domain>> = await response.json();
    return json.data;
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/<endpoint>/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete <domain> ${id}`);
  }
}

export const <domain>Service = new <Domain>Service();
```

### 2. Add the entity type

If the type doesn't exist yet, add it to `src/types/index.ts` following the existing interface pattern.

### 3. Verify VITE_API_URL is set

Check that `VITE_API_URL` is defined in `.env.local` and is non-sensitive (no tokens, just the base URL).
