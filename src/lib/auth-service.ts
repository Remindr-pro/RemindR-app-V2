// Service d'authentification qui appelle l'API Express
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  dateOfBirth: string;
  genderBirth?: string;
  genderActual?: string;
  userType?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      userType: string;
      familyId?: string | null;
    };
    token: string;
    refreshToken: string;
  };
}

export class AuthService {
  private static getToken(): string | null {
    if (typeof window === "undefined") return null;

    return localStorage.getItem("auth_token");
  }

  private static setToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("auth_token", token);
    // Synchroniser avec le cookie pour le middleware
    document.cookie = `auth_token=${token}; path=/; max-age=604800; SameSite=Lax`;
  }

  private static removeToken(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("auth_token");
    // Supprimer le cookie
    document.cookie = "auth_token=; path=/; max-age=0";
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Échec de la connexion");
    }

    const data: AuthResponse = await response.json();

    if (data.success && data.data.token) {
      this.setToken(data.data.token);
    }

    return data;
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Échec de l'inscription");
    }

    const result: AuthResponse = await response.json();

    if (result.success && result.data.token) {
      this.setToken(result.data.token);
    }

    return result;
  }

  static async logout(): Promise<void> {
    const token = this.getToken();

    if (token) {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
      }
    }

    this.removeToken();
  }

  static async getCurrentUser() {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        this.removeToken();
        return null;
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);

      this.removeToken();

      return null;
    }
  }

  static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  static getAuthToken(): string | null {
    return this.getToken();
  }
}
