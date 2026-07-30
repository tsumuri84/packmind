<!-- start: Packmind standards -->
# Packmind Standards

Before starting your work, make sure to review the coding standards relevant to your current task.

Always consult the sections that apply to the technology, framework, or type of contribution you are working on.

All rules and guidelines defined in these standards are mandatory and must be followed consistently.

Failure to follow these standards may lead to inconsistencies, errors, or rework. Treat them as the source of truth for how code should be written, structured, and maintained.

# Standard: Client-Side Security

Prevents accidental exposure of secrets, unsafe HTML rendering, and unvalidated user input in browser-side code. :
* `dangerouslySetInnerHTML` is forbidden without exception
* All user inputs must be sanitized before use in rendering or API calls
* Do not store sensitive data (tokens, PII) in `localStorage` or `sessionStorage` without encryption
* Environment variables exposed to the client must be prefixed `NEXT_PUBLIC_` (Next.js) or `VITE_` (Vite) and must be non-sensitive
* Never hardcode API keys, tokens, or secrets in any client-side file
* No dependency with a known critical vulnerability may be merged

Full standard is available here for further request: [Client-Side Security](.packmind/standards/client-side-security.md)

# Standard: React Component Responsibility

Each React component must have a single responsibility: either display (JSX/UI) or logic (state, effects, data fetching) — never both in the same component. :
* A component that needs more than 3 hooks is a signal to split it
* Extract business logic and side effects into dedicated custom hooks (`useXxx`)
* Never fetch data directly inside a component — delegate to a custom hook
* Never write more than one `useEffect` per component — extract additional effects into hooks
* Props must be typed explicitly — no implicit prop inference
* Separate display components (pure JSX, no hooks beyond `useState`) from logic components

Full standard is available here for further request: [React Component Responsibility](.packmind/standards/react-component-responsibility.md)
<!-- end: Packmind standards -->