Add a new TypeScript entity interface to `src/types/index.ts` following the conventions established in the codebase: `id: string` as the first field, string union literals for status and role fields, ISO `string` for timestamps, and nested sub-entities as separate interfaces. Generic wrappers `ApiResponse<T>` and `PaginatedResponse<T>` already exist — reuse them.

## When to Use

* When adding a new domain resource that will be fetched from the API
* When defining the shape of a response that will be used across services, hooks, and components
* When adding sub-entities that belong to an existing interface (e.g., `OrderItem` inside `Order`)

## Context Validation Checkpoints

* [ ] What is the entity name (PascalCase, e.g., `Invoice`)?
* [ ] What are the required fields and their types?
* [ ] Are there status or role fields? List the allowed values for the union literal.
* [ ] Does the entity have nested sub-objects that need their own interface?
* [ ] Is the entity already partially defined elsewhere (check `src/types/index.ts`)?

## Steps

### Step 1: Open src/types/index.ts

Open `src/types/index.ts`. All entity interfaces live in this single file — do not create a separate file per entity.

### Step 2: Write the interface

Add the new interface at the end of the file. Always start with `id: string`:

```ts
export interface {{Entity}} {
  id: string;
  // required fields here
  status: 'pending' | 'active' | 'archived'; // use union literals, never plain string
  createdAt: string; // ISO 8601 date string
}
```

### Step 3: Extract nested sub-entities

If the entity contains nested objects, define each as a separate interface immediately above the parent:

```ts
export interface {{Entity}}Item {
  {{subEntityField}}: string;
  quantity: number;
  unitPrice: number;
}

export interface {{Entity}} {
  id: string;
  items: {{Entity}}Item[];
  // ...
}
```

### Step 4: Reuse ApiResponse and PaginatedResponse

Do NOT redefine `ApiResponse<T>` or `PaginatedResponse<T>`. Reference them in services and hooks:

```ts
// In a service:
const json: ApiResponse<{{Entity}}> = await response.json();
return json.data;

// For paginated lists:
const result: PaginatedResponse<{{Entity}}> = await response.json();
```

### Step 5: Verify strict typing

Confirm no field uses `any`, `object`, or untyped `string` for constrained values. Every status or role field must be a union literal.
