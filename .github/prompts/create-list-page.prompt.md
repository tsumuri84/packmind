---
description: 'Create list page'
agent: 'agent'
---

# Create List Page

Scaffold a list page component with the team's standard 3-branch render pattern: loading state → error state with retry → content grid. Delegates data fetching entirely to a fetch hook.

## When to Use

- Creating a new page that displays a collection of items (users, products, orders, etc.)
- Any page that needs loading and error states with a retry mechanism

## Checkpoints

- What is the page name (e.g., `OrdersPage`, `ProductsPage`)?
- Which fetch hook does it use (e.g., `useOrderList`)?
- Which card/item component does it render in the grid (e.g., `OrderCard`)?
- What is the page title displayed in the `<h1>`?

## Steps

### 1. Create the page file

Create `src/pages/<Domain>sPage.tsx`:

```tsx
import React from 'react';
import { use<Domain>List } from '../hooks/use<Domain>List';
import { <Domain>Card } from '../components/<Domain>Card';

export function <Domain>sPage(): JSX.Element {
  const { <items>, isLoading, hasError, errorMessage, refetch } = use<Domain>List();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-gray-500">Loading <items>...</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <p className="text-sm text-red-600">{errorMessage}</p>
        <button
          onClick={refetch}
          className="mt-2 text-sm font-medium text-red-700 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-xl font-bold text-gray-900"><PageTitle></h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {<items>.map((item) => (
          <<Domain>Card key={item.id} <item>={item} />
        ))}
      </div>
    </div>
  );
}
```

### 2. Register the route

Add the page to your router configuration (React Router, Next.js `pages/`, etc.).

### 3. Create the Card component if missing

If `<Domain>Card` doesn't exist yet, use `/create-react-component` to scaffold it as a pure display component.
