---
description: 'Create fetch hook'
agent: 'agent'
---

# Create Fetch Hook

Scaffold a data-fetching custom hook with the team's standard pattern: explicit return type interface, `isLoading`/`hasError`/`errorMessage` states, `useCallback` fetch wrapped in try/catch/finally, `useEffect` for auto-load, and an exposed `refetch`.

## When to Use

- A component needs to load a list or single item from a service on mount
- Extracting fetch logic out of a component that has grown beyond one `useEffect`
- Sharing fetch logic between two or more components

## Checkpoints

- What is the hook name (e.g., `useOrderList`, `useProduct`)?
- What data does it return — an array or a single item?
- Which service method does it call?
- Does it need parameters (e.g., an `id`), or does it auto-fetch on mount?

## Steps

### 1. Define the return type interface

```ts
interface Use<Name>Return {
  <items>: <Type>[];       // or: <item>: <Type> | null
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  refetch: () => void;
}
```

### 2. Declare the states

```ts
const [<items>, set<Items>] = useState<<Type>[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [hasError, setHasError] = useState(false);
const [errorMessage, setErrorMessage] = useState<string | null>(null);
```

### 3. Wrap the fetch in useCallback

```ts
const fetch<Items> = useCallback(async () => {
  setIsLoading(true);
  setHasError(false);
  setErrorMessage(null);
  try {
    const result = await <service>.<method>();
    set<Items>(result);
  } catch (e) {
    setHasError(true);
    setErrorMessage(e instanceof Error ? e.message : 'Unknown error');
  } finally {
    setIsLoading(false);
  }
}, []);
```

### 4. Auto-fetch on mount

```ts
useEffect(() => {
  fetch<Items>();
}, [fetch<Items>]);
```

### 5. Return the contract

```ts
return { <items>, isLoading, hasError, errorMessage, refetch: fetch<Items> };
```
