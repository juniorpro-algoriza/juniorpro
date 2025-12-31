// lib/errors.ts
export class ApiError {
  constructor(
    public status: number,
    public statusText: string,
    public errorMessage?: string,
    public code?: string,
    public details?: Record<string, unknown>
  ) {}
}

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };
