import { axiosInstance } from "../../../../config/axiosInstance";

export const getTasks = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  priority = "",
} = {}) => {
  const res = await axiosInstance.get("/tasks", {
    params: {
      page,
      limit,
      search: search || undefined,
      status: status || undefined,
      priority: priority || undefined,
    },
  });

  return res.data.data;
};

export const getKanbanTasks = async () => {
  const res = await axiosInstance.get("/tasks/kanban");
  return res.data.data;
};

export const getTaskAnalytics = async () => {
  const res = await axiosInstance.get("/tasks/analytics");
  return res.data.data;
};

export const getTask = async (taskId) => {
  const res = await axiosInstance.get(`/tasks/${taskId}`);
  return res.data.data;
};

export const createTask = async (taskData) => {
  const res = await axiosInstance.post("/tasks/create", taskData);
  return res.data.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const res = await axiosInstance.patch(`/tasks/status/${taskId}`, { status });
  return res.data.data;
};

export const assignTask = async (taskId, assignedTo) => {
  const res = await axiosInstance.patch(`/tasks/assign/${taskId}`, {
    assignedTo,
  });
  return res.data.data;
};

export const deleteTask = async (taskId) => {
  const res = await axiosInstance.delete(`/tasks/delete/${taskId}`);
  return res.data.data;
};
