import { axiosInstance } from "../../../../config/axiosInstance";

export const getAllEmployees = async ({ page = 1, limit = 20 } = {}) => {
  try {
    const res = await axiosInstance.get("/employee", {
      params: {
        page,
        limit,
      },
    });

    return res.data.data;
  } catch (error) {
    console.log("error in all employee api", error);
    throw error;
  }
};

export const createEmployee = async (formData) => {
  try {
    const payload = {
      ...formData,
      avatar: "",
    };

    const res = await axiosInstance.post("/employee/create", payload);
    console.log("succesfull");
    return res.data.data;
  } catch (error) {
    console.log(
      "error in create employee api",
      error.response?.data ?? error.message,
    );
    throw error;
  }
};

export const updateEmployee = async (empId, data) => {
  try {
    let res = await axiosInstance.patch(`/employee/update/${empId}`, data);
    return res;
  } catch (error) {
    console.log("error in update employee api", error);
    throw error;
  }
};
