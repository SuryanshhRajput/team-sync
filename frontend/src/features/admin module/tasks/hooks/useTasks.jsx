import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  assignTask,
  createTask,
  deleteTask,
  getTasks,
  updateTaskStatus,
} from "../api/taskApi";

export const useTasks = () => {
  const queryClient = useQueryClient();
  const employee = useSelector((store) => store.auth.employee);
  const assignedTo = employee?.role === "employee" ? employee?._id : "";
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: "",
  });

  const tasksQuery = useQuery({
    queryKey: ["tasks", filters, page, assignedTo],
    queryFn: () =>
      getTasks({
        ...filters,
        page,
        limit: 10,
        assignedTo: assignedTo || undefined,
      }),
    staleTime: 30_000,
  });

  const refreshTasks = () =>
    queryClient.invalidateQueries({ queryKey: ["tasks"] });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (_, variables) => { refreshTasks(); toast.success(`Task "${variables.title}" created successfully.`); },
    onError: (error) => toast.error(error.response?.data?.message ?? "Failed to create task."),
  });
  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, status }) => updateTaskStatus(taskId, status),
    onSuccess: () => { refreshTasks(); toast.success("Task status updated."); },
    onError: (error) => toast.error(error.response?.data?.message ?? "Failed to update task status."),
  });
  const assignTaskMutation = useMutation({
    mutationFn: ({ taskId, assignedTo }) => assignTask(taskId, assignedTo),
    onSuccess: () => { refreshTasks(); toast.success("Task assignment updated."); },
    onError: (error) => toast.error(error.response?.data?.message ?? "Failed to assign task."),
  });
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => { refreshTasks(); toast.success("Task deleted successfully."); },
    onError: (error) => toast.error(error.response?.data?.message ?? "Failed to delete task."),
  });

  return {
    tasks: tasksQuery.data?.tasks ?? [],
    pagination: tasksQuery.data?.pagination,
    filters,
    setFilters: (nextFilters) => {
      setPage(1);
      setFilters((currentFilters) =>
        typeof nextFilters === "function"
          ? nextFilters(currentFilters)
          : nextFilters,
      );
    },
    page,
    setPage,
    isPending: tasksQuery.isPending,
    isError: tasksQuery.isError,
    error: tasksQuery.error,
    isFetching: tasksQuery.isFetching,
    createTask: createTaskMutation.mutateAsync,
    isCreating: createTaskMutation.isPending,
    updateStatus: updateStatusMutation.mutateAsync,
    isUpdating: updateStatusMutation.isPending,
    assignTask: assignTaskMutation.mutateAsync,
    isAssigning: assignTaskMutation.isPending,
    removeTask: deleteTaskMutation.mutateAsync,
    isDeleting: deleteTaskMutation.isPending,
  };
};
