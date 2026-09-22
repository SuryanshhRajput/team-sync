import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../config/axiosInstance";

export const loginEmployee = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      console.log("from login api", res);
      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data ?? { message: "Unable to sign in" },
      );
    }
  },
);

export const currentLoggedEmployee = createAsyncThunk(
  "auth/me",
  async (_, thunkApi) => {
    try {
      const res = await axiosInstance.get("auth/me");
      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message ?? error.message,
        data: error.response?.data,
      });
    }
  },
);
