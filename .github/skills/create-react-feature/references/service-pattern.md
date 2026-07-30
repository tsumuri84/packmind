# API Service Pattern

Full template for `src/services/{{Domain}}Service.ts`.

```ts
import type { {{Domain}}, ApiResponse, PaginatedResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL as string;

export class {{Domain}}Service {
  async getAll(page = 1, pageSize = 20): Promise<PaginatedResponse<{{Domain}}>> {
    const response = await fetch(
      `${API_BASE_URL}/{{endpoint}}?page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) throw new Error('Failed to fetch {{domain}}s');
    return response.json();
  }

  async getById(id: string): Promise<{{Domain}}> {
    const response = await fetch(`${API_BASE_URL}/{{endpoint}}/${id}`);
    if (!response.ok) throw new Error(`{{Domain}} ${id} not found`);
    const json: ApiResponse<{{Domain}}> = await response.json();
    return json.data;
  }

  async create(payload: Omit<{{Domain}}, 'id' | 'createdAt'>): Promise<{{Domain}}> {
    const response = await fetch(`${API_BASE_URL}/{{endpoint}}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to create {{domain}}');
    const json: ApiResponse<{{Domain}}> = await response.json();
    return json.data;
  }

  async update(id: string, payload: Partial<{{Domain}}>): Promise<{{Domain}}> {
    const response = await fetch(`${API_BASE_URL}/{{endpoint}}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error(`Failed to update {{domain}} ${id}`);
    const json: ApiResponse<{{Domain}}> = await response.json();
    return json.data;
  }

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/{{endpoint}}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`Failed to delete {{domain}} ${id}`);
  }
}

export const {{domain}}Service = new {{Domain}}Service();
```
