# React Component Responsibility

Each React component must have a single responsibility: either display (JSX/UI) or logic (state, effects, data fetching) — never both in the same component.

## Scope

All React components in TypeScript + React (Next.js / Vite) projects.

## Rules

* Separate display components (pure JSX, no hooks beyond `useState`) from logic components
* Extract business logic and side effects into dedicated custom hooks (`useXxx`)
* Never fetch data directly inside a component — delegate to a custom hook
* Never write more than one `useEffect` per component — extract additional effects into hooks
* Props must be typed explicitly — no implicit prop inference
* A component that needs more than 3 hooks is a signal to split it
