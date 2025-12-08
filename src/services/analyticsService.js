import api from "./api";

export const analyticsService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get("/analytics/dashboard/");
    return response.data;
  },

  // Get success rate over time
  getSuccessRate: async (params = {}) => {
    const response = await api.get("/analytics/success-rate/", { params });
    return response.data;
  },

  // Get skills demand analysis
  getSkillsDemand: async (params = {}) => {
    const response = await api.get("/analytics/skills/", { params });
    return response.data;
  },

  // Get application timeline
  getTimeline: async (params = {}) => {
    const response = await api.get("/analytics/timeline/", { params });
    return response.data;
  },

  // Export data
  exportData: async (format = "csv") => {
    const response = await api.get("/analytics/export/", {
      params: { format },
      responseType: "blob",
    });
    return response.data;
  },
};
