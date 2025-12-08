import api from "./api";

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post("/auth/register/", userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post("/auth/login/", credentials);
    const { access, refresh, user } = response.data;

    // Store tokens
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    return { access, refresh, user };
  },

  // Logout user
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await api.post("/auth/logout/", { refresh: refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    }
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get("/auth/user/");
    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put("/auth/user/", userData);
    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  },

  // Change password
  changePassword: async (passwords) => {
    const response = await api.post("/auth/change-password/", passwords);
    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await api.post("/auth/refresh/", {
      refresh: refreshToken,
    });
    const { access } = response.data;
    localStorage.setItem("access_token", access);
    return access;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("access_token");
  },

  // Get stored user
  getStoredUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};
