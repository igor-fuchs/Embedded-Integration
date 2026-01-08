interface RequestConfig extends RequestInit {
    params?: Record<string, string | number | boolean>;
    timeout?: number;
}

// #region Base API Client
export default class BaseApiClient {
    protected baseURL: string = 'http://localhost:5000';
    protected defaultHeaders: Record<string, string> = {
        "Content-Type": "application/json"
    };

    constructor() {
        // this.baseURL = baseURL;
        // this.defaultHeaders = defaultHeaders;
    }

    private buildURL(endpoint: string, params?: Record<string, any>): string {
        const url = new URL(endpoint, this.baseURL);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, String(value));
            });
        }
        return url.toString();
    }

    protected async request<T>(
        endpoint: string,
        config: RequestConfig = {}
    ): Promise<T> {
        const { params, timeout = 30000, ...fetchConfig } = config;
        const url = this.buildURL(endpoint, params);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...fetchConfig,
                headers: {
                    "Content-Type": "application/json",
                    ...this.defaultHeaders,
                    ...fetchConfig.headers,
                },
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}: ${response.statusText}`
                );
            }

            return await response.json();
        } finally {
            clearTimeout(timeoutId);
        }
    }

    protected get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, { ...config, method: "GET" });
    }

    protected post<T>(
        endpoint: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    protected put<T>(
        endpoint: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    protected delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, { ...config, method: "DELETE" });
    }

    protected patch<T>(
        endpoint: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: "PATCH",
            body: JSON.stringify(data),
        });
    }
}
// #endregion

// #region Example Usage
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface CreateUserData {
  name: string;
  email: string;
}

//@ts-ignore#6196
class UsersAPI extends BaseApiClient {
  async getUsers(page = 1): Promise<User[]> {
    return this.get<User[]>('/users', { params: { page } });
  }

  async getUserById(id: number): Promise<User> {
    return this.get<User>(`/users/${id}`);
  }

  async createUser(data: CreateUserData): Promise<User> {
    return this.post<User>('/users', data);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return this.put<User>(`/users/${id}`, data);
  }

  async deleteUser(id: number): Promise<void> {
    return this.delete<void>(`/users/${id}`);
  }
}
// #endregion