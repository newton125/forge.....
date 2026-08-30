/**
 * FORGE API Client
 * Designed for immediate backend handover.
 * Simulates real REST endpoints with standard JSON responses and simulated latency.
 * Switch USE_MOCK to false when real backend is connected via VITE_API_URL.
 */

const USE_MOCK = true;
const BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number = 400, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

/**
 * Storage helpers for persistent mock state
 */
export const getStoredItem = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(`forge_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

export const setStoredItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(`forge_${key}`, JSON.stringify(value));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
};

/**
 * Delay simulation for realistic UX (spinners, skeleton loaders, button pending states)
 */
export const delay = (ms: number = 250): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  if (USE_MOCK) {
    // When in mock mode, service functions handle the mock DB directly
    throw new Error(`Endpoint ${endpoint} not intercepted by mock service handler`);
  }

  const token = localStorage.getItem('forge_auth_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new ApiError(errData.message || 'Request failed', response.status);
  }

  return response.json();
}
