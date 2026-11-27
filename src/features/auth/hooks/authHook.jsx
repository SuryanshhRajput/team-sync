import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginEmployee, registerEmployee } from "../state/auth/authAction";
import { toast } from "react-toastify";

export const useAuth = () => {
  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch();

  let navigate = useNavigate();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const loginFormSubmit = async (data) => {
    try {
      await dispatch(loginEmployee(data)).unwrap();
      toast.success("Logged in successfully.");
    } catch (error) {
      toast.error(error?.message ?? "Unable to log in. Please check your details.");
    }
  };

  const registerFormSubmit = async ({ name, email, password, department }) => {
    setRegisterError("");

    try {
      await dispatch(
        registerEmployee({ name, email, password, department }),
      ).unwrap();
      toast.success("Account created successfully.");
    } catch (error) {
      setRegisterError(error?.message ?? "Unable to register. Please try again.");
      toast.error(error?.message ?? "Unable to register. Please try again.");
    }
  };

  return {
    register,
    reset,
    handleSubmit,
    getValues,
    errors,
    registerFormSubmit,
    loginFormSubmit,
    navigate,
    isLoading,
    registerError,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
};
