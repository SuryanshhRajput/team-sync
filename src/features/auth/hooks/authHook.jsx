import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginEmployee } from "../state/auth/authAction";

export const useAuth = () => {
  const { register, reset, handleSubmit } = useForm();
  let dispatch = useDispatch()

  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loginFormSubmit = (data) => {
    console.log(data);
    dispatch(loginEmployee(data))
  };

  const registerFormSubmit = (data) => {
    console.log(data);
  };

  return {
    register,
    reset,
    handleSubmit,
    registerFormSubmit,
    loginFormSubmit,
    navigate,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
};
