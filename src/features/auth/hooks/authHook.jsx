import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginEmployee, registerEmployee } from "../state/auth/authAction";

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

  const loginFormSubmit = (data) => {
    dispatch(loginEmployee(data));
  };

  const registerFormSubmit = async ({ name, email, password, department }) => {
    setRegisterError("");

    try {
      await dispatch(
        registerEmployee({ name, email, password, department }),
      ).unwrap();
    } catch (error) {
      setRegisterError(error?.message ?? "Unable to register. Please try again.");
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
