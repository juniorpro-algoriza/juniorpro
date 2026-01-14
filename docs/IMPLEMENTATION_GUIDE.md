# SAWIHA Implementation Guide

This guide explains how to perform common tasks in the project.

## 1. Environment Setup

1. Copy `.env.example` to `.env.local` (ensure `API_ROOT_URL` is correct).
2. Install dependencies: `pnpm install`.
3. Start dev server: `pnpm dev`.

## 2. Syncing API Types

If the backend API changes:

```bash
npm run openapi
```

This updates `api-schema/schema.d.ts`.

## 3. Creating a New Data Hook

The project follows a two-step pattern for data fetching:

### Step 1: Create the Server Fetch Function

Define the API call in `app/server/` using `customFetch`.

**Example: `app/server/getJuniorProfile.ts`**

```typescript
"use server";
import { customFetch } from "@server/lib";

export async function getJuniorProfile() {
  return customFetch("/api/api/v1/junior/profile", {
    method: "GET",
  });
}
```

### Step 2: Create the TanStack Query Hook

Define the hook in `app/tanstack/` or a related feature folder.

**Example: `app/tanstack/useJuniorProfile.ts`**

```typescript
"use client";
import { useQuery } from "@tanstack/react-query";
import { getJuniorProfile } from "@server";
import { QUERY_KEYS } from "@/configs/queryKeys";

export const useJuniorProfile = () => {
  return useQuery({
    queryKey: QUERY_KEYS.junior.profile, // Ensure this exists in queryKeys.ts
    queryFn: getJuniorProfile,
  });
};
```

## 4. Building a New Page

Follow the directory structure:

- `app/(pages)/(loged-in)/[role]/[page-name]/page.tsx`

**Structure of a complex page:**

```text
[page-name]/
├── _components/        # Page-specific components
│   ├── SubComponent.tsx
│   └── PageHeader.tsx
├── _hooks/             # Page-specific hooks (optional)
├── _types/             # Page-specific types (optional)
└── page.tsx            # Entry point
```

## 5. Using the Modal System

To add a new modal:

1. Create your modal component in `app/components/modals/MyNewModal.tsx`.
2. Wrap it with the `Modal` component.
3. Add the modal name to the `ModalName` type in `app/components/modals/types.ts`.
4. Add it to the `ModalRenderer.tsx` mapping.
5. Trigger it using `ModalLink`:
   ```tsx
   <ModalLink name="MyNewModal" params={{ id: "123" }}>
     Open Modal
   </ModalLink>
   ```

## 6. Styling & UI

- Use **Tailwind CSS v4** classes.
- For component variants, use `cva`:
  ```typescript
  const cardVariants = cva("rounded-lg p-4", {
    variants: {
      intent: {
        primary: "bg-blue-100",
        secondary: "bg-gray-100",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  });
  ```
- Icons: Use `lucide-react`.

## 7. Form Handling

1. **Schema Definition**: Create a `_schemas/` folder in your feature directory and define your Zod schema there (e.g., `_schemas/loginSchema.ts`).
2. **Logic Abstraction**: If the form is large or has complex logic, create a custom hook in a `_hooks/` folder to handle state, validation, and submission logic.
3. **UI Components**: Use the shared components in `app/components/` (like `Input.tsx`, `Select.tsx`) which are already styled.
