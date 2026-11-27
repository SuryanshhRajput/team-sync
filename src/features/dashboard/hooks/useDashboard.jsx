import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../api/dashboardApi";

export const useDashboard = () => {
  const query = useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats,
    staleTime: 30_000,
  });

  return {
    stats: query.data,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
    isFetching: query.isFetching,
  };
};
