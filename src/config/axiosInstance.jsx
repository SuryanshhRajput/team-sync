import axios from "axios";

export let axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "https://team-sync-backend-n78w.onrender.com"}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;
    const requestUrl = originalReq?.url ?? "";
    const isAuthEndpoint =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/get-accessToken");

    if (
      error.response?.status === 401 &&
      originalReq &&
      !originalReq._retry &&
      !isAuthEndpoint
    ) {
      originalReq._retry = true;

      try {
        await axiosInstance.get("/auth/get-accessToken");
        return axiosInstance(originalReq);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
