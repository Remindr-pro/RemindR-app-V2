import { cookies } from "next/headers";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface NextConfig {
  revalidate?: number;
  tags?: string[];
}

interface ApiRequestOptions extends Omit<RequestInit, "method" | "headers"> {
  authenticated?: boolean;
  headers?: HeadersInit;
  next?: NextConfig;
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
  }

  async get<T>(path: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(HTTPMethod.GET, path, options);
  }

  async post<T>(path: string, body: unknown, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(HTTPMethod.POST, path, {
      ...options,
      body: JSON.stringify(body),
    });
  }

  async patch<T>(path: string, body: unknown, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(HTTPMethod.PATCH, path, {
      ...options,
      body: JSON.stringify(body),
    });
  }

  async put<T>(path: string, body: unknown, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(HTTPMethod.PUT, path, {
      ...options,
      body: JSON.stringify(body),
    });
  }

  async delete<T>(path: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(HTTPMethod.DELETE, path, options);
  }

  private async request<T>(
    method: HTTPMethod,
    path: string,
    options?: ApiRequestOptions
  ): Promise<T> {
    const authenticated = options?.authenticated ?? true;
    const authHeader = await this.getAuthorizationHeader(authenticated);

    const response = await fetch(`${this.baseURL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
        ...(options?.headers || {}),
      },
      body: options?.body,
      cache: options?.cache,
      next: options?.next,
    });

    if (!response.ok) {
      let errorMessage = "Une erreur API est survenue.";
      try {
        const payload = (await response.json()) as { message?: string };
        if (payload?.message) errorMessage = payload.message;
      } catch {
        const fallbackText = await response.text().catch(() => null);
        if (fallbackText) errorMessage = fallbackText;
      }

      throw new ApiError(errorMessage, response.status);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  private async getAuthorizationHeader(authenticated: boolean): Promise<HeadersInit> {
    if (!authenticated) return {};

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      throw new ApiError("Token d'authentification manquant.", 401);
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  }
}

const api = new ApiService();

export { ApiError };
export default api;
