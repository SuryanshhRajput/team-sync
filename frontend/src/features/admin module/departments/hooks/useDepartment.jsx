import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import {
  departmentApi,
  getAllDepartmentApi,
} from "../api/departmentApi";

export const useDepartment = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      manager: "",
      employees: "",
    },
  });

  // Get departments
  const {
    data: departments = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartmentApi,
  });

  // Create department
  const onSubmit = async (formData) => {
    setMessage("");
    setErrorMessage("");

    try {
      const departmentData = {
        name: formData.name.trim(),
        description: formData.description.trim(),

        employees: formData.employees
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean),
      };

      // Manager is an employee MongoDB ID
      if (formData.manager.trim()) {
        departmentData.manager = formData.manager.trim();
      }

      const response = await departmentApi(departmentData);

      setMessage(
        response.message || "Department created successfully"
      );

      reset();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to create department"
      );
    }
  };

  // Reset form
  const resetForm = () => {
    reset();
    setMessage("");
    setErrorMessage("");
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    resetForm,

    errors,
    isSubmitting,

    message,
    errorMessage,

    departments,
    isPending,
    isError,
    error,
  };
};
