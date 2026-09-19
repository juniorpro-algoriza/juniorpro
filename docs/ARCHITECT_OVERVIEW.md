# SAWIHA - Architect Overview

This document provides a high-level overview of the technologies, architecture, and implementation patterns used in the SAWIHA .

## 🚀 Technologies

- **Frontend Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**:
  - [TanStack React Query v5](https://tanstack.com/query/latest) (Server state, caching, synchronization)
  - [Jotai](https://jotai.org/) (Atomic client-side state)
- **Styling**:
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [CVA (Class Variance Authority)](https://cva.style/) for component variants
  - [Lucide React](https://lucide.dev/) for icons
- **Form Management**: [Zod](https://zod.dev/) for validation
- **API Integration**: [OpenAPI-Typescript](https://openapi-ts.dev/) for type-safe API calls
- **Animations**: [Motion](https://motion.dev/) (formerly Framer Motion)
- **UI Components**: Headless UI, Sonner (toasts), Embla Carousel

---

## 🏗 Architecture

### 1. Project Structure

The project follows a modular structure within the Next.js `app` directory:

```text
root/
├── api-schema/            # OpenAPI/Swagger generated types
│   └── schema.d.ts        # The source of truth for API types
├── app/
│   ├── (pages)/           # Application routes & Page logic
│   │   ├── (loged-in)/    # Role-based protected routes
│   │   │   ├── admin/     # Admin dashboard and management
│   │   │   ├── contributor/ # Contributor specific features
│   │   │   └── junior/    # Junior learning paths & profile
│   │   └── (logged-out)/   # Public routes (Login, Register, Landing)
│   ├── components/        # UI Components
│   │   ├── client/        # Interactive components (Sidebars, Cards)
│   │   ├── modals/        # Modal definitions and logic
│   │   ├── schemas/       # Zod schemas for forms/validation
│   │   └── ui/            # Base atomic components (Button, Input)
│   ├── server/            # Server actions & Core Fetching logic
│   │   └── lib/           # customFetch and auth utilities
│   ├── tanstack/          # Shared React Query hooks
│   ├── configs/           # Constants, API endpoints, Query keys
│   ├── lib/               # Shared utilities, fonts, and providers
│   ├── atoms/             # Jotai global client state
│   ├── types/             # Common TypeScript interfaces
│   └── icons/             # Custom SVG icons
├── docs/                  # Project documentation
├── public/                # Static assets (images, logos)
└── package.json           # Scripts and dependencies
```

### 2. Data Fetching Pattern

We use a strictly typed `customFetch` wrapper located in `app/server/lib/customFetch.ts`. It leverages the generated types from `api-schema/schema.d.ts` to ensure:

- Endpoint paths are valid.
- Request payloads (body, query params, path params) match the API.
- Response types are automatically inferred.

### 3. State Management

- **Server State**: Managed via **TanStack Query**. All API calls should be wrapped in query or mutation hooks.
- **Client State**: Small pieces of global UI state (like sidebar toggle) are managed with **Jotai**.
- **URL State**: Modals and tabs often use URL query parameters for persistency and shareability.

---

## 🛠 How to Start Implementation

### 1. Adding a New API Hook

1. Check if the endpoint exists in `api-schema/schema.d.ts`. If not, run `npm run openapi` to update the schema.
2. Create a **Server Action** in `app/server/` that uses `customFetch` to communicate with the API.
3. Create a **TanStack Query hook** in `app/tanstack/` (or a feature-specific folder) that calls the server action.
4. Ensure the query key is added to `app/configs/queryKeys.ts`.

### 2. Creating a New Page

1. Determine the role (`admin`, `contributor`, or `junior`).
2. Create a folder in `app/(pages)/(loged-in)/[role]/`.
3. Create a `page.tsx`.
4. If it's a complex page, split logic into `_components/` within the page folder.

### 3. Using Modals

We use a URL-based modal system.

1. Define the modal in `app/components/modals/`.
2. Register it in `app/components/ModalRenderer.tsx`.
3. Open it using `<ModalLink name="YourModalName">`.

---

## 📝 Best Practices

- **Type Everything**: Avoid `any`. Use the types generated in `api-schema`.
