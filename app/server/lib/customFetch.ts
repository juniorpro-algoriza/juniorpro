"use server";
import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  AvailableMethods,
  FetchOptions,
  HttpMethod,
  Path,
  SuccessResponse,
} from '@server/types';

// Server-side fetch wrapper
export const createServerFetch = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  return async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}${url}`, {
      ...options,
      headers,
      cache: 'no-store', // Important: prevents caching like your original
    });
  };
};

// Client-side fetch wrapper
export const createClientFetch = () => {
  return async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    
    // Get token from client-side cookie
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];
    
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    return fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}${url}`, {
      ...options,
      headers,
    });
  };
};

// Strictly typed fetch function with error handling
export const customFetch = async <P extends Path, M extends HttpMethod>(
  url: P,
  options: M extends AvailableMethods<P> ? FetchOptions<P, M> : never,
  isServer: boolean = false,
): Promise<SuccessResponse<P, M>> => {
  try {
    const fetchFn = isServer ? await createServerFetch() : createClientFetch();
    
    let finalUrl = url as string;
    
    // Handle path parameters
    if ('path' in options && options.path) {
      Object.entries(options.path).forEach(([key, value]) => {
        finalUrl = finalUrl.replace(`{${key}}`, String(value));
      });
    }
    
    // Handle query parameters
    if ('params' in options && options.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        finalUrl += `?${queryString}`;
      }
    }
    
    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: options.method,
      headers: options.headers,
    };
    
    // Add body for methods that support it
    if ('data' in options && options.data) {
      fetchOptions.body = JSON.stringify(options.data);
    }
    
    const response = await fetchFn(finalUrl, fetchOptions);
    
    // Handle 401 Unauthorized (only on server)
    if (!response.ok && response.status === 401 && isServer) {
      const cookieStore = await cookies();
      cookieStore.delete('auth_token');
      cookieStore.delete('user_type');
      
      const headersList = await headers();
      const currentPath = headersList.get('x-pathname') || '/';
      redirect(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
    }
    
    // Handle other errors
    if (!response.ok) {
      let errorMessage = `Request failed: ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson?.errorMessage) errorMessage = errJson.errorMessage;
        else if (errJson?.message) errorMessage = errJson.message;
      } catch {
        // ignore if no valid JSON
      }
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err;
  }
};