import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../api/employeeApi";
import { useNavigate } from "react-router";

export const useEmployee = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["employees", page],
    queryFn: () =>
      getAllEmployees({
        page,
        limit: 20,
      }),
    staleTime: 100000,
    keepPreviousData: true,
  });

  let navigate = useNavigate();

  const employeeData = data?.employees;
  const employees = useMemo(() => employeeData ?? [], [employeeData]);

  const pagination = data?.pagination ?? {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  };

  const roles = useMemo(() => {
    return [
      ...new Set(employees.map((employee) => employee.role).filter(Boolean)),
    ];
  }, [employees]);

  const departments = useMemo(() => {
    return [
      ...new Set(
        employees.map((employee) => employee.department).filter(Boolean),
      ),
    ];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        !searchValue ||
        employee.name?.toLowerCase().includes(searchValue) ||
        employee.email?.toLowerCase().includes(searchValue);

      const matchesRole = !role || employee.role === role;

      const matchesDepartment =
        !department || employee.department === department;

      const matchesStatus = !status || employee.status === status;

      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });
  }, [employees, search, role, department, status]);

  const activeCount = employees.filter(
    (employee) => employee.status === "active",
  ).length;

  const inactiveCount = employees.filter(
    (employee) => employee.status === "inactive",
  ).length;

  const adminCount = employees.filter(
    (employee) => employee.role === "admin",
  ).length;

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleRole = (value) => {
    setRole(value);
  };

  const handleDepartment = (value) => {
    setDepartment(value);
  };

  const handleStatus = (value) => {
    setStatus(value);
  };

  const clearFilters = () => {
    setSearch("");
    setRole("");
    setDepartment("");
    setStatus("");
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) {
      return;
    }

    setPage(newPage);
  };

  return {
    employees,
    filteredEmployees,
    pagination,
    navigate,
    page,
    handlePageChange,

    search,
    handleSearch,

    role,
    handleRole,

    department,
    handleDepartment,

    status,
    handleStatus,

    roles,
    departments,

    activeCount,
    inactiveCount,
    adminCount,

    clearFilters,

    isPending,
    isError,
    error,
    isFetching,
  };
};
