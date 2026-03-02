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

export interface UpdateMeData {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  genderBirth?: string;
  genderActual?: string;
  profilePictureUrl?: string;
  profileLink?: string;
  profileColor?: string;
  profileCompleted?: boolean;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
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
      dateOfBirth?: string | null;
      genderBirth?: string | null;
      genderActual?: string | null;
      profilePictureUrl?: string | null;
      profileLink?: string | null;
      profileColor?: string | null;
      profileCompleted?: boolean;
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

  static async forgotPassword(data: ForgotPasswordData): Promise<void> {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(
        error?.message ||
          "Impossible d'envoyer le lien de réinitialisation pour le moment.",
      );
    }
  }

  static async resetPassword(data: ResetPasswordData): Promise<void> {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(
        error?.message ||
          "Impossible de réinitialiser le mot de passe pour le moment.",
      );
    }
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

  static async updateMe(data: UpdateMeData) {
    const token = this.getToken();

    if (!token) {
      throw new Error("Utilisateur non connecté");
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(
        error?.message ||
          "Impossible de mettre à jour le profil pour le moment.",
      );
    }

    return response.json();
  }

  static async verifyPassword(currentPassword: string): Promise<void> {
    const token = this.getToken();

    if (!token) {
      throw new Error("Utilisateur non connecté");
    }

    const response = await fetch(`${API_URL}/auth/verify-password`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(
        error?.message ||
          "Impossible de vérifier l'ancien mot de passe pour le moment.",
      );
    }
  }

  static async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const token = this.getToken();

    if (!token) {
      throw new Error("Utilisateur non connecté");
    }

    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(
        error?.message ||
          "Impossible de modifier votre mot de passe pour le moment.",
      );
    }
  }

  static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  static getAuthToken(): string | null {
    return this.getToken();
  }
}
