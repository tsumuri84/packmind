Scaffold a new card component following the `UserCard` pattern: a pure display component (no hooks, no state) with an explicit props interface, an entity prop, optional action callbacks, and the team's standard Tailwind card shell.

## When to Use

* When adding a new card to a list page (e.g., `OrderCard`, `CategoryCard`)
* When extracting a repeated card UI pattern into a reusable component
* When a list page's item display grows beyond a single line

## Context Validation Checkpoints

* [ ] What is the domain name (e.g., `Order`)? The component will be named `<Domain>Card`.
* [ ] What entity type does the card display? It must exist in `src/types/index.ts`.
* [ ] Which action callbacks are needed? (e.g., `onEdit`, `onDelete`, `onView`)
* [ ] Are there conditional styles (e.g., status badges, stock levels)?

## Steps

### Step 1: Create the component file

Create `src/components/{{Domain}}Card.tsx`. Declare the props interface inline above the component:

```tsx
import React from 'react';
import type { {{Domain}} } from '../types';

interface {{Domain}}CardProps {
  {{domain}}: {{Domain}};
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function {{Domain}}Card({ {{domain}}, onEdit, onDelete }: {{Domain}}CardProps): JSX.Element {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          {/* entity fields here */}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit({{domain}}.id)}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete({{domain}}.id)}
            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Step 2: Fill in entity fields

Inside the left `<div>`, render the entity's display fields using `text-sm font-semibold text-gray-900` for the primary field and `text-xs text-gray-500` for secondary fields. Reference `UserCard.tsx:14-19` as the model.

### Step 3: Add conditional badges if needed

For status or stock fields, use inline conditional Tailwind classes. Reference `ProductBadge.tsx` for the pattern:

```tsx
<span className={[
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  {{domain}}.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700',
].join(' ')}>
  {{{domain}}.status}
</span>
```

### Step 4: Export from module index

If a `src/components/index.ts` exists, re-export the new component:

```ts
export { {{Domain}}Card } from './{{Domain}}Card';
```

### Step 5: Verify no hooks or state were introduced

Confirm the component uses zero hooks (including `useState`). If logic is needed, extract it into a `use{{Domain}}.ts` hook instead and keep this component pure.
