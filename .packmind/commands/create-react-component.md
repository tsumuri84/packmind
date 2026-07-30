# Create React Component

Scaffold a new React component following the team's single-responsibility, explicit typing, and Tailwind CSS conventions.

## When to Use

- Adding a new UI component to the codebase
- Extracting a repeated UI pattern into a reusable component
- Creating a page-level component in Next.js or Vite

## Checkpoints

- What is the component name (PascalCase)?
- Is it a display component (pure JSX) or a logic component (with hooks)?
- What props does it receive — list name and type for each?
- Does it need a custom hook, or does it delegate to an existing one?

## Steps

### 1. Create the component file

Create `src/components/<ComponentName>.tsx`. Declare props as an explicit interface:

```tsx
interface <ComponentName>Props {
  // explicit prop types here
}

export function <ComponentName>({ ... }: <ComponentName>Props): JSX.Element {
  return (
    // JSX here
  );
}
```

### 2. Apply Tailwind classes

Use Tailwind utility classes directly. Extract repeated class combinations into a `@apply` block in a CSS file or into a sub-component — do not use `style={{}}`.

### 3. Extract logic into a hook if needed

If the component needs state, effects, or data fetching, create a companion hook `use<ComponentName>.ts` and call it at the top of the component.

### 4. Export from module index

If the component belongs to a feature module, re-export it from the module's `index.ts`.
