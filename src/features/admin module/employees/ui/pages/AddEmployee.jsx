import React from "react";
import AddEmployeeForm from "../components/addEmployees/AddEmployeeForm";
import { useEmployee } from "../../hooks/useEmployees";
import { createEmployee } from "../../api/employeeApi";

const AddEmployee = () => {
  const { navigate } = useEmployee();
  const handleSubmit = async (formData) => {
    try {
      let res = await createEmployee(formData);
      console.log("employee created in UI", {
        id: res?._id,
        name: res?.name,
        email: res?.email,
      });
      return res;
    } catch (error) {
      console.log("error in ADD EMPLOYEE FORM CREATE API", error);
      throw error;
    }
  };

  const handleCancel = () => {
    console.log("cancel");
    navigate("/home/employee");
  };

  return (
    <main className="min-h-screen bg-(--bg-main) text-(--text-primary)">
      <div className="mx-auto mx-w-auto px-5 py-8 sm:px-7 lg:px-10">
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2 text-sm text-(--text-muted)">
            <span>Team</span>
            <span>›</span>
            <span className="font-medium text-(--text-secondary)">
              Add New Employee
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Add Employee
          </h1>

          <p className="mt-2 text-base text-(--text-secondary)">
            Configure the new team member's workspace profile and permissions.
          </p>
        </div>

        <AddEmployeeForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </main>
  );
};

export default AddEmployee;
