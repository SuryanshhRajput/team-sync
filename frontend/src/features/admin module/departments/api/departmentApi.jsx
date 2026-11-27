import { axiosInstance } from "../../../../config/axiosInstance";

export const departmentApi = async (departmentData) => {
  const res = await axiosInstance.post(
    "/departments/create",
    departmentData
  );

  return res.data;
};

export const getAllDepartmentApi = async () => {
  const res = await axiosInstance.get("/departments");

  return res.data.data;
};