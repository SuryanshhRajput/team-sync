import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import PersonalInformation from "./PersonalInformation";
import EmploymentDetails from "./EmploymentDetails";
import FormActions from "./FormActions";

const AddEmployeeForm = ({ onSubmit, onCancel }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      status: "active",
    },
  });
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

  const handleFormSubmit = async (values) => {
    await onSubmit(values);
    reset();
    setPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <PersonalInformation
        fileInputRef={fileInputRef}
        preview={preview}
        onImageChange={handleImageChange}
        register={register}
      />

      <EmploymentDetails register={register} />

      <FormActions onCancel={onCancel} />
    </form>
  );
};

export default AddEmployeeForm;
