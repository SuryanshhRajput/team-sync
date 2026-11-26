import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../../employees/api/employeeApi";
import { departmentApi } from "../../api/departmentApi";

const getAllEmployeesForDepartment = async () => {
  const firstPage = await getAllEmployees({ page: 1, limit: 100 });
  const totalPages = firstPage.pagination?.totalPages ?? 1;
  const otherPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      getAllEmployees({ page: index + 2, limit: 100 }),
    ),
  );

  const employees = [firstPage, ...otherPages].flatMap(
    (page) => page.employees ?? [],
  );

  return [
    ...new Map(
      employees
        .filter((employee) => employee?._id)
        .map((employee) => [employee._id, employee]),
    ).values(),
  ];
};

const CreateDepartment = () => {
  const fieldClassName =
    "w-full rounded-lg border border-theme bg-main px-4 py-2 text-primary placeholder:text-muted outline-none transition focus:border-brand";
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
    },
  });
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [employeesDropdownOpen, setEmployeesDropdownOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    data: employees = [],
    isPending: employeesPending,
    isError: employeesError,
  } = useQuery({
    queryKey: ["department-employees"],
    queryFn: getAllEmployeesForDepartment,
  });

  const onSubmit = async (formData) => {
    setMessage("");
    setErrorMessage("");

    const departmentData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      manager: formData.manager,
      employees: selectedEmployeeIds,
    };

    try {
      const response = await departmentApi(departmentData);
      setMessage(response.message);
      reset();
      setSelectedEmployeeIds([]);
      setEmployeesDropdownOpen(false);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || error.message
      );
    }
  };

  const resetForm = () => {
    reset();
    setSelectedEmployeeIds([]);
    setEmployeesDropdownOpen(false);
    setMessage("");
    setErrorMessage("");
  };

  const selectedEmployeeNames = selectedEmployeeIds
    .map((id) => employees.find((employee) => employee._id === id)?.name)
    .filter(Boolean);

  const toggleEmployee = (employeeId) => {
    setSelectedEmployeeIds((currentIds) =>
      currentIds.includes(employeeId)
        ? currentIds.filter((id) => id !== employeeId)
        : [...currentIds, employeeId],
    );
  };

  return (
    <div className="min-h-screen bg-main p-6 text-primary">
      <div className="mx-auto max-w-2xl rounded-xl border border-theme bg-surface p-6 shadow-theme">
      <h2 className="mb-6 text-2xl font-semibold text-primary">
        Create Department
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Department Name */}
        <div>
          <label className="mb-1 block font-medium text-secondary">
            Department Name
          </label>

          <input
            type="text"
            placeholder="Enter department name"
            {...register("name", {
              required: "Department name is required",
              validate: (name) =>
                Boolean(name.trim()) || "Department name is required",
            })}
            className={fieldClassName}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-danger">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block font-medium text-secondary">
            Description
          </label>

          <textarea
            rows={3}
            placeholder="Enter department description"
            {...register("description")}
            className={fieldClassName}
          />
        </div>

        {/* Manager */}
        <div>
          <label className="mb-1 block font-medium text-secondary">
            Department Manager
          </label>

          <select
            {...register("manager", {
              required: "Select a department manager",
            })}
            disabled={employeesPending || employeesError}
            className={fieldClassName}
          >
            <option value="">
              {employeesPending
                ? "Loading employees..."
                : "Select a manager"}
            </option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name}
              </option>
            ))}
          </select>
          {errors.manager && (
            <p className="mt-1 text-sm text-danger">
              {errors.manager.message}
            </p>
          )}
        </div>

        {/* Employees */}
        <div>
          <label className="mb-1 block font-medium text-secondary">
            Department Employees
          </label>

          <button
            type="button"
            onClick={() => setEmployeesDropdownOpen((open) => !open)}
            disabled={employeesPending || employeesError}
            aria-expanded={employeesDropdownOpen}
            className={`${fieldClassName} text-left disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {employeesPending
              ? "Loading employees..."
              : selectedEmployeeNames.length
                ? selectedEmployeeNames.join(", ")
                : "Select employees"}
          </button>

          {employeesDropdownOpen && (
            <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-theme bg-surface text-primary shadow-theme">
              {employees.map((employee) => (
                <label
                  key={employee._id}
                  className="flex cursor-pointer items-center gap-2 px-4 py-2 text-secondary hover:bg-hover"
                >
                  <input
                    type="checkbox"
                    checked={selectedEmployeeIds.includes(employee._id)}
                    onChange={() => toggleEmployee(employee._id)}
                    style={{ accentColor: "var(--brand)" }}
                  />
                  <span>{employee.name}</span>
                </label>
              ))}
              {employees.length === 0 && (
                <p className="px-4 py-2 text-sm text-muted">
                  No employees available
                </p>
              )}
            </div>
          )}

          {employeesError && (
            <p className="mt-1 text-sm text-danger">
              Could not load employees.
            </p>
          )}
        </div>

        {/* Success Message */}
        {message && (
          <p className="rounded-lg border border-theme bg-card p-3 text-sm text-success">
            {message}
          </p>
        )}

        {/* Error Message */}
        {errorMessage && (
          <p className="rounded-lg border border-theme bg-card p-3 text-sm text-danger">
            {errorMessage}
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-brand px-5 py-2 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "Creating..."
              : "Create Department"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="rounded-lg border border-theme bg-surface px-5 py-2 text-secondary transition hover:bg-hover"
          >
            Reset
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default CreateDepartment;