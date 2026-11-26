
import { useState } from "react";
import {
  Building2,
  Users,
  Search,
  Plus,
  MoreHorizontal,
  UserRound,
  ArrowUpRight,
  BriefcaseBusiness,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router";

import DepartmentStatCard from "../components/DepartmentStatCard";
import { useDepartment } from "../../hooks/useDepartment";

export default function GetAllDepartments() {
  const { departments, isPending, isError, error } = useDepartment();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  if (isPending) {
    return (
      <div className="min-h-screen bg-main p-8 text-primary">
        Loading departments...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-main p-8 text-danger">
        Failed to load departments: {error?.message}
      </div>
    );
  }

  const filteredDepartments = departments.filter((department) => {
    const departmentName =
      department.name?.toLowerCase() ?? "";

    const managerName =
      typeof department.manager === "string"
        ? department.manager.toLowerCase()
        : department.manager?.name?.toLowerCase() ?? "";

    const matchesSearch =
      departmentName.includes(search.toLowerCase()) ||
      managerName.includes(search.toLowerCase());

    const employeeCount =
      department.employees?.length ?? 0;

    const matchesFilter =
      filter === "all" ||
      (filter === "large" && employeeCount >= 10) ||
      (filter === "small" && employeeCount < 10);

    return matchesSearch && matchesFilter;
  });

  const totalEmployees = departments.reduce(
    (total, department) =>
      total + (department.employees?.length ?? 0),
    0
  );

  const averageTeamSize =
    departments.length > 0
      ? Math.round(totalEmployees / departments.length)
      : 0;

  return (
    <div className="min-h-screen bg-main p-6 md:p-8 transition-colors duration-300">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Departments
          </h1>

          <p className="mt-1 text-sm text-muted">
            View and manage all departments in your workspace.
          </p>
        </div>

        <button
          onClick={() => navigate("/home/department/create")}
          className="flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          Create Department
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DepartmentStatCard
          title="Total Departments"
          value={departments.length}
          icon={<Building2 size={21} />}
          iconColor="#6366f1"
        />

        <DepartmentStatCard
          title="Total Employees"
          value={totalEmployees}
          icon={<Users size={21} />}
          iconColor="#3b82f6"
        />

        <DepartmentStatCard
          title="Average Team Size"
          value={averageTeamSize}
          icon={<BriefcaseBusiness size={21} />}
          iconColor="#a855f7"
        />
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-primary">
            All Departments
          </h2>

          <p className="mt-1 text-sm text-muted">
            {filteredDepartments.length} departments found
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search departments..."
              className="w-full rounded-lg border border-theme bg-surface py-2.5 pl-10 pr-4 text-sm text-primary outline-none transition placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-theme bg-surface py-2.5 pl-9 pr-8 text-sm text-primary outline-none focus:border-brand sm:w-44"
            >
              <option value="all">All Departments</option>
              <option value="large">10+ Employees</option>
              <option value="small">Below 10 Employees</option>
            </select>
          </div>
        </div>
      </div>

      {/* Department Cards */}
      {filteredDepartments.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredDepartments.map((department) => {
            const employeeCount =
              department.employees?.length ?? 0;

            const departmentColor =
              department.color ?? "#6366f1";

            const managerName =
              typeof department.manager === "string"
                ? department.manager
                : department.manager?.name ?? "Unassigned";

            return (
              <div
                key={department._id}
                className="rounded-xl border border-theme bg-surface p-5 transition duration-300 hover:shadow-theme"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${departmentColor}20`,
                      color: departmentColor,
                    }}
                  >
                    <Building2 size={23} />
                  </div>

                  <button
                    type="button"
                    className="rounded-lg p-2 text-muted transition hover:bg-hover hover:text-primary"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-primary">
                  {department.name}
                </h3>

                <p className="mt-1 min-h-10 text-sm leading-5 text-muted">
                  {department.description}
                </p>

                <div className="my-5 border-t border-theme" />

                {/* Manager */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-secondary">
                    <UserRound size={18} />
                  </div>

                  <div>
                    <p className="text-xs text-muted">
                      Department Manager
                    </p>

                    <p className="mt-1 text-sm font-medium text-secondary">
                      {managerName}
                    </p>
                  </div>
                </div>

                {/* Employees */}
                <div className="mt-5 flex items-center justify-between rounded-lg bg-card px-4 py-3">
                  <div className="flex items-center gap-2 text-secondary">
                    <Users size={18} />
                    <span className="text-sm">Employees</span>
                  </div>

                  <span className="text-sm font-semibold text-primary">
                    {employeeCount}
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-theme py-2.5 text-sm font-medium text-secondary transition hover:border-brand hover:text-brand"
                >
                  View Department
                  <ArrowUpRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-theme bg-surface py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-card text-muted">
            <Search size={24} />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-primary">
            No departments found
          </h3>

          <p className="mt-1 text-sm text-muted">
            Try changing your search or filter.
          </p>
        </div>
      )}
    </div>
  );
}
