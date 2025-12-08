import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "../services/analyticsService";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: analyticsService.getDashboardStats,
  });
};

export const useSuccessRate = (params = {}) => {
  return useQuery({
    queryKey: ["successRate", params],
    queryFn: () => analyticsService.getSuccessRate(params),
  });
};

export const useSkillsDemand = (params = {}) => {
  return useQuery({
    queryKey: ["skillsDemand", params],
    queryFn: () => analyticsService.getSkillsDemand(params),
  });
};

export const useTimeline = (params = {}) => {
  return useQuery({
    queryKey: ["timeline", params],
    queryFn: () => analyticsService.getTimeline(params),
  });
};
