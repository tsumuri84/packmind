---
name: 'create-react-feature'
description: 'Scaffold a complete React feature end-to-end: entity type, API service, fetch hook, card component, and list page. Use when the user asks to create a new feature, domain resource, or CRUD module (e.g. "add an invoices feature", "create a categories module", "scaffold orders"). Follows team conventions: TypeScript strict, Vite/NEXT_PUBLIC env, ApiResponse<T> wrapper, Tailwind card shell, isLoading/hasError state pattern.'
---

# Create React Feature

Scaffold a complete feature from entity type to list page, following the team's layered architecture. Each layer delegates to the next — never skip or merge layers.

## Layer Order

Always create in this sequence — each layer depends on the previous:

```
1. src/types/index.ts          ← entity interface
2. src/services/<Domain>Service.ts  ← API calls
3. src/hooks/use<Domain>List.ts     ← data fetching state
4. src/components/<Domain>Card.tsx  ← display component
5. src/pages/<Domain>sPage.tsx      ← list page
```

## Context Validation Checkpoints

- [ ] What is the domain name (PascalCase, e.g. `Invoice`)?
- [ ] What is the API endpoint path (e.g. `/invoices`)?
- [ ] What fields does the entity have? Any status/role fields (list allowed values)?
- [ ] Which action buttons are needed on the card (edit, delete, view…)?

## Step 1 — Entity Type

Add the interface to `src/types/index.ts`. Follow `/create-entity-type`:

- `id: string` is always the first field
- Status/role fields use union literals — never plain `string`
- Timestamps typed as `string` (ISO 8601)
- Nested objects get their own interface immediately above the parent
- `ApiResponse<T>` and `PaginatedResponse<T>` already exist — reuse them

```ts
export interface {{Domain}} {
  id: string;
  // fields...
  status: 'pending' | 'active' | 'archived';
  createdAt: string;
}
```

## Step 2 — API Service

Create `src/services/{{Domain}}Service.ts`. Follow `/create-api-service`:

- Use `import.meta.env.VITE_API_URL` (never hardcode the base URL)
- Every method: `fetch` → `if (!response.ok) throw new Error(...)` → unwrap `json.data`
- Export a singleton: `export const {{domain}}Service = new {{Domain}}Service()`

See [service-pattern.md](references/service-pattern.md) for the full template.

## Step 3 — Fetch Hook

Create `src/hooks/use{{Domain}}List.ts`. Follow `/create-fetch-hook`:

- Explicit return type interface `Use{{Domain}}ListReturn`
- States: `items`, `isLoading`, `hasError`, `errorMessage`
- Fetch wrapped in `useCallback` + `try/catch/finally`
- `useEffect` auto-loads on mount
- Expose `refetch`

## Step 4 — Card Component

Create `src/components/{{Domain}}Card.tsx`. Follow `/create-card-component`:

- Pure display component — zero hooks, zero state
- Props: `{{domain}}: {{Domain}}` + action callbacks (`onEdit`, `onDelete`)
- Tailwind card shell: `rounded-xl border border-gray-200 bg-white p-4 shadow-sm`
- Conditional badges for status fields (see `ProductBadge.tsx`)

## Step 5 — List Page

Create `src/pages/{{Domain}}sPage.tsx`. Follow `/create-list-page`:

- Consumes `use{{Domain}}List` hook
- Three render branches in order: `isLoading` → `hasError` (with retry button) → content grid
- Grid layout: `grid gap-3 sm:grid-cols-2 lg:grid-cols-3`
- Maps items to `<{{Domain}}Card key={item.id} ... />`

## Quality Gate

After all 5 files are created, verify:

- [ ] No `any` or untyped fields anywhere
- [ ] No `console.log` left in any file
- [ ] No secrets or tokens hardcoded — only `VITE_` env vars
- [ ] Card component has zero hooks
- [ ] Every `await` is inside a `try/catch`

## Related Commands

- `/create-entity-type` — Step 1 in detail
- `/create-api-service` — Step 2 in detail
- `/create-fetch-hook` — Step 3 in detail
- `/create-card-component` — Step 4 in detail
- `/create-list-page` — Step 5 in detail