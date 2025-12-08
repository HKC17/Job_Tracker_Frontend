import api from "./api";

export const applicationService = {
  // Get all applications with filters
  getApplications: async (params = {}) => {
    const response = await api.get("/applications/", { params });
    return response.data;
  },

  // Get ALL applications (without pagination)
  getAllApplications: async () => {
    let allApplications = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await api.get("/applications/", {
        params: { page, page_size: 100 }, // Fetch 100 at a time
      });

      const data = response.data;

      // Handle both paginated and non-paginated responses
      if (data.results) {
        allApplications = [...allApplications, ...data.results];
        hasMore = !!data.next;
        page++;
      } else {
        allApplications = data;
        hasMore = false;
      }
    }

    return allApplications;
  },

  // Get single application
  getApplication: async (id) => {
    const response = await api.get(`/applications/${id}/`);
    return response.data;
  },

  // Create new application
  createApplication: async (data) => {
    const response = await api.post("/applications/", data);
    return response.data;
  },

  // Update application
  updateApplication: async (id, data) => {
    const response = await api.put(`/applications/${id}/`, data);
    return response.data;
  },

  // Partial update application
  patchApplication: async (id, data) => {
    const response = await api.patch(`/applications/${id}/`, data);
    return response.data;
  },

  // Delete application
  deleteApplication: async (id) => {
    const response = await api.delete(`/applications/${id}/`);
    return response.data;
  },

  // Add timeline event
  addTimelineEvent: async (id, event) => {
    const response = await api.post(`/applications/${id}/timeline/`, event);
    return response.data;
  },

  // Get statistics
  getStats: async () => {
    const response = await api.get("/applications/stats/");
    return response.data;
  },

  // Update application status
  updateStatus: async (id, status) => {
    const response = await api.patch(`/applications/${id}/`, {
      application: { status },
    });
    return response.data;
  },
};
