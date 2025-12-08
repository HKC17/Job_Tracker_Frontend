import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationService } from "../services/applicationService";
import toast from "react-hot-toast";

export const useApplications = (filters = {}) => {
  return useQuery({
    queryKey: ["applications", filters],
    queryFn: () => applicationService.getApplications(filters),
  });
};

// New hook to get ALL applications (for dashboard stats)
export const useAllApplications = () => {
  return useQuery({
    queryKey: ["applications", "all"],
    queryFn: applicationService.getAllApplications,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

export const useApplication = (id) => {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => applicationService.getApplication(id),
    enabled: !!id,
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationService.createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application created successfully!");
    },
    onError: (error) => {
      const message =
        error.response?.data?.detail || "Failed to create application";
      toast.error(message);
    },
  });
};

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      applicationService.updateApplication(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({
        queryKey: ["application", variables.id],
      });
      toast.success("Application updated successfully!");
    },
    onError: (error) => {
      const message =
        error.response?.data?.detail || "Failed to update application";
      toast.error(message);
    },
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationService.deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application deleted successfully!");
    },
    onError: (error) => {
      const message =
        error.response?.data?.detail || "Failed to delete application";
      toast.error(message);
    },
  });
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => applicationService.updateStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({
        queryKey: ["application", variables.id],
      });
      toast.success("Status updated successfully!");
    },
    onError: (error) => {
      const message = error.response?.data?.detail || "Failed to update status";
      toast.error(message);
    },
  });
};
