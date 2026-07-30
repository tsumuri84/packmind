---
description: 'Create custom hook'
agent: 'agent'
---

# Create Custom Hook

Scaffold a new React custom hook that encapsulates reusable logic, side effects, or data fetching.

## When to Use

- Extracting state and effects from a component that has grown too complex
- Sharing logic between two or more components
- Encapsulating a data-fetching pattern (API call, subscription, etc.)

## Checkpoints

- What is the hook name (must start with `use`, e.g., `useProductList`)?
- What does it return — list the returned values and their types?
- What side effects does it manage (API call, event listener, timer)?
- What are the dependencies (parameters, context, other hooks)?

## Steps

### 1. Create the hook file

Create `src/hooks/use<Name>.ts`. Define explicit return type:

```ts
interface Use<Name>Return {
  // explicit return types
}

export function use<Name>(...): Use<Name>Return {
  // hook logic
}
```

### 2. Wrap async calls in try/catch

Every `await` must be inside a `try/catch`. Expose error state explicitly:

```ts
const [error, setError] = useState<Error | null>(null);
try {
  const result = await fetchSomething();
} catch (e) {
  setError(e instanceof Error ? e : new Error('Unknown error'));
}
```

### 3. Clean up effects

Return a cleanup function from `useEffect` for subscriptions, timers, or event listeners.

### 4. Export and document inputs/outputs

Export the hook from `src/hooks/index.ts`. The function signature is its contract — no additional JSDoc needed if types are explicit.
