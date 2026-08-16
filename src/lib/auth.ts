import { fetchAPI } from "./api";

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role: string;
  universityId?: string;
}

export const auth = {
  getToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },
  
  getUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  getUniversityId: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("universityId");
  },

  isAuthenticated: () => {
    return !!auth.getToken();
  },

  setSession: (token: string, user: User) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    if (user.universityId) {
      localStorage.setItem("universityId", user.universityId);
    }
  },

  clearSession: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("universityId");
  }
};
