
# JuniorPro Enhancement Roadmap

This document outlines recommended improvements and refactoring opportunities for the JuniorPro frontend application, divided into **short-term** (within 2 days) and **long-term** improvements.

---

## 🚀 Short-Term Improvements (Within 2 Days)

These are quick wins that will improve code quality, developer experience, and maintainability without major architectural changes.

### 1. Type Safety Improvements

**Time Estimate:** 4-6 hours

#### Current Issues:
- `getData` service lacks type inference from endpoint
- Many components use `any` types
- API responses not validated at runtime

#### Action Items:

**✅ Add Zod Schemas for API Responses**

```typescript
// app/server/schemas/junior.ts
import { z } from "zod";

export const JuniorSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  points: z.number(),
  activeProjects: z.number(),
  status: z.enum(["active", "inactive", "suspended"]),
  joinedOn: z.string(),
});

export type Junior = z.infer<typeof JuniorSchema>;
```

**✅ Validate Responses in getData**

```typescript
// app/server/getData.ts
export const getData = async <T>({
  url,
  method,
  body,
  schema, // Add optional Zod schema
}: Props<T> & { schema?: z.ZodSchema<T> }): Promise<T> => {
  // ... existing fetch logic
  
  const data = await res.json();
  
  // Validate with schema if provided
  if (schema) {
    return schema.parse(data);
  }
  
  return data as T;
};
```

**✅ Remove `any` Types**

Search and replace `any` with proper types:
```bash
# Find all 'any' usages
rg ":\s*any" --type ts --type tsx
```

---

### 2. Error Handling Standardization

**Time Estimate:** 3-4 hours

#### Current Issues:
- Inconsistent error messages
- No global error boundary
- Silent failures in some components

#### Action Items:

**✅ Create Error Boundary Component**

```typescript
// app/components/ErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error?: Error }
> {
  state = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">
              Something went wrong
            </h2>
            <p className="text-gray-600 mt-2">
              {this.state.error?.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**✅ Standardize Error Messages**

```typescript
// app/lib/errors.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public endpoint?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};
```

---

### 3. Loading States UX

**Time Estimate:** 2-3 hours

#### Current Issues:
- Inconsistent loading indicators
- No skeleton loaders
- Jarring page transitions

#### Action Items:

**✅ Create Skeleton Components**

```typescript
// app/components/Skeleton.tsx
export const TableSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-12 bg-gray-200 rounded mb-4" />
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="h-16 bg-gray-100 rounded mb-2" />
    ))}
  </div>
);

export const CardSkeleton = () => (
  <div className="animate-pulse bg-white p-6 rounded-lg">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
    <div className="h-4 bg-gray-100 rounded w-2/3" />
  </div>
);
```

**✅ Add Loading.tsx Files**

```typescript
// app/(pages)/(loged-in)/admin/junior/loading.tsx
import { TableSkeleton } from "@components";

export default function Loading() {
  return <TableSkeleton />;
}
```

---

### 4. Code Organization

**Time Estimate:** 3-4 hours

#### Current Issues:
- Some large components (100+ lines)
- Repeated logic across modals
- Mixed concerns in some files

#### Action Items:

**✅ Extract Modal Form Logic**

```typescript
// app/components/modals/hooks/useModalForm.ts
export const useModalForm = <T extends Record<string, any>>(
  initialData: T,
  onSubmit: (data: T) => Promise<void>
) => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  const handleChange = (field: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await onSubmit(formData);
      toast.success("Saved successfully!");
      router.back();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    saving,
    handleChange,
    handleSubmit,
  };
};
```

**✅ Extract Table Pagination Logic**

```typescript
// app/components/hooks/usePagination.ts
export const usePagination = (totalItems: number, pageSize: number = 10) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");

  const totalPages = Math.ceil(totalItems / pageSize);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return {
    currentPage,
    totalPages,
    goToPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
};
```

---

### 5. Performance Optimizations

**Time Estimate:** 2-3 hours

#### Current Issues:
- Large bundle size
- No code splitting for modals
- Missing `React.memo` on heavy components

#### Action Items:

**✅ Dynamic Import for Modals**

Already implemented! ✅

**✅ Memoize Expensive Components**

```typescript
// app/components/ProjectCard.tsx
import { memo } from "react";

export const ProjectCard = memo(({ project }: ProjectCardProps) => {
  // ... component code
});
```

**✅ Add next/font Optimization**

```typescript
// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      {children}
    </html>
  );
}
```

---

## 🎯 Long-Term Improvements (Post-Refactor)

These require more substantial architectural changes and should be planned carefully.

---

### 1. TanStack Query Integration

**Time Estimate:** 1-2 weeks

#### Why TanStack Query?

✅ **Automatic Caching**: No need to manually manage request deduplication

✅ **Background Refetching**: Keep data fresh automatically

✅ **Optimistic Updates**: Update UI before server response

✅ **Mutation Management**: Built-in error handling and rollback

✅ **DevTools**: Powerful debugging experience

#### Implementation Plan

**Step 1: Install Dependencies**

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

**Step 2: Setup Query Client**

```typescript
// app/providers/QueryProvider.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

**Step 3: Create Custom Hooks**

```typescript
// app/hooks/useJuniors.ts
import { useQuery } from "@tanstack/react-query";
import { getData } from "@server";

export const useJuniors = () => {
  return useQuery({
    queryKey: ["juniors"],
    queryFn: () => getData({ url: "junior/get-all", method: "GET" }),
  });
};

export const useJunior = (id: number) => {
  return useQuery({
    queryKey: ["junior", id],
    queryFn: () => getData({ url: `junior/${id}`, method: "GET" }),
    enabled: !!id,
  });
};
```

**Step 4: Create Mutations**

```typescript
// app/hooks/useCreateJunior.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getData } from "@server";
import { toast } from "sonner";

export const useCreateJunior = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newJunior: JuniorInput) =>
      getData({
        url: "junior/add",
        method: "POST",
        body: newJunior,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["juniors"] });
      toast.success("Junior added successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
```

**Step 5: Use in Components**

```typescript
// Before (Server Component)
export default async function JuniorsPage() {
  const juniors = await getData({ url: "junior/get-all", method: "GET" });
  return <JuniorsTable data={juniors} />;
}

// After (Client Component with TanStack Query)
"use client";

export default function JuniorsPage() {
  const { data: juniors, isLoading, error } = useJuniors();

  if (isLoading) return <TableSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return <JuniorsTable data={juniors} />;
}
```

#### Benefits:
- ⚡ Automatic request deduplication
- 🔄 Background data synchronization
- 💾 Built-in caching layer
- 🎯 Optimistic UI updates
- 🐛 Better error handling

---

### 2. OpenAPI TypeScript Integration

**Time Estimate:** 2-3 weeks

#### Why OpenAPI TypeScript?

✅ **Backend Contract**: Types generated from actual API spec

✅ **No Type Drift**: Types always match backend

✅ **Auto-completion**: Full IDE support for all endpoints

✅ **Compile-time Safety**: Catch API contract violations before runtime

#### Implementation Plan

**Step 1: Generate OpenAPI Spec from Backend**

Work with backend team to generate `openapi.json` or `openapi.yaml`.

**Step 2: Install openapi-typescript**

```bash
pnpm add -D openapi-typescript
```

**Step 3: Generate Types**

```bash
# Add to package.json scripts
"generate:types": "openapi-typescript ./openapi.yaml -o ./app/types/api.ts"
```

**Step 4: Create Type-Safe getData**

```typescript
// app/server/api.ts
import type { paths } from "@types/api";

type ApiPath = keyof paths;
type ApiMethod<Path extends ApiPath> = keyof paths[Path];

type RequestBody<
  Path extends ApiPath,
  Method extends ApiMethod<Path>
> = paths[Path][Method] extends { requestBody: { content: { "application/json": infer Body } } }
  ? Body
  : never;

type ResponseData<
  Path extends ApiPath,
  Method extends ApiMethod<Path>
> = paths[Path][Method] extends {
  responses: { 200: { content: { "application/json": infer Data } } };
}
  ? Data
  : unknown;

export async function api<
  Path extends ApiPath,
  Method extends ApiMethod<Path> = "get"
>(
  path: Path,
  options: {
    method: Method;
    body?: RequestBody<Path, Method>;
    params?: Record<string, string | number>;
  }
): Promise<ResponseData<Path, Method>> {
  return getData({
    url: path as string,
    method: options.method.toUpperCase() as any,
    body: options.body,
    params: options.params,
  }) as Promise<ResponseData<Path, Method>>;
}
```

**Step 5: Usage (Fully Type-Safe!)**

```typescript
// Autocomplete works! Types inferred from OpenAPI spec
const juniors = await api("/junior/get-all", { method: "get" });
//    ^? Junior[]

const newJunior = await api("/junior/add", {
  method: "post",
  body: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "secure123",
    // TypeScript error if missing required fields!
  },
});
```

#### Benefits:
- 🎯 100% type-safe API calls
- 🔄 Types auto-sync with backend
- 🐛 Catch breaking changes at compile time
- 📝 Auto-generated documentation
- ✨ Amazing developer experience

---

### 3. Combine TanStack Query + OpenAPI TypeScript

**The Ultimate Type-Safe API Layer**

```typescript
// app/hooks/api/useJuniors.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@server/api";

export const useJuniors = () => {
  return useQuery({
    queryKey: ["juniors"],
    queryFn: () => api("/junior/get-all", { method: "get" }),
  });
};

// Type-safe mutation
export const useCreateJunior = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: paths["/junior/add"]["post"]["requestBody"]["content"]["application/json"]) =>
      api("/junior/add", { method: "post", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["juniors"] });
    },
  });
};
```

---

### 4. Additional Long-Term Improvements

#### 4.1 Testing Infrastructure

- Add Vitest for unit tests
- Add Playwright for E2E tests
- Add Testing Library for component tests

#### 4.2 CI/CD Pipeline

- Automated testing on PRs
- Type checking
- Linting
- Bundle size monitoring

#### 4.3 Monitoring & Analytics

- Add Sentry for error tracking
- Add performance monitoring
- Add user analytics

#### 4.4 Design System

- Create Storybook for components
- Document design tokens
- Create component playground

---

## 📊 Priority Matrix

| Improvement | Impact | Effort | Priority | Timeframe |
|------------|--------|--------|----------|-----------|
| Type Safety (Zod) | High | Low | 🔴 Critical | Short-term |
| Error Handling | High | Low | 🔴 Critical | Short-term |
| Loading States | Medium | Low | 🟡 High | Short-term |
| Code Organization | Medium | Medium | 🟡 High | Short-term |
| Performance | Medium | Low | 🟢 Medium | Short-term |
| TanStack Query | High | High | 🟡 High | Long-term |
| OpenAPI TypeScript | Very High | High | 🔴 Critical | Long-term |
| Testing | High | High | 🟢 Medium | Long-term |
| CI/CD | Medium | Medium | 🟢 Medium | Long-term |

---

## 🎯 Recommended 2-Day Sprint Plan

### Day 1: Type Safety & Error Handling
- ⏰ Morning (4 hours): Add Zod schemas & validation
- ⏰ Afternoon (4 hours): Implement error boundary & standardize errors

### Day 2: UX & Code Quality
- ⏰ Morning (3 hours): Add skeleton loaders & loading states
- ⏰ Afternoon (5 hours): Extract reusable hooks & optimize performance

---

## 💡 Getting Started

### Short-Term (Start Today)
1. Create `/app/server/schemas/` folder
2. Add Zod schemas for main entities
3. Update `getData` to validate responses
4. Create `ErrorBoundary` component

### Long-Term (After Refactor)
1. Discuss OpenAPI spec with backend team
2. Set up `openapi-typescript` in CI/CD
3. Evaluate TanStack Query for a single feature first
4. Gradually migrate to type-safe API layer

---

**Good luck with the refactor! 🚀**
