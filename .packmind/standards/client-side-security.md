# Client-Side Security

Prevents accidental exposure of secrets, unsafe HTML rendering, and unvalidated user input in browser-side code.

## Scope

All TypeScript/React files that run in the browser (client components, pages, hooks).

## Rules

* Never hardcode API keys, tokens, or secrets in any client-side file
* Environment variables exposed to the client must be prefixed `NEXT_PUBLIC_` (Next.js) or `VITE_` (Vite) and must be non-sensitive
* `dangerouslySetInnerHTML` is forbidden without exception
* All user inputs must be sanitized before use in rendering or API calls
* No dependency with a known critical vulnerability may be merged
* Do not store sensitive data (tokens, PII) in `localStorage` or `sessionStorage` without encryption
