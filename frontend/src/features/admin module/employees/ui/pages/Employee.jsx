import React from "react";
import { Download, Plus } from "lucide-react";

import { useEmployee } from "../../hooks/useEmployees";

import EmployeeStats from "../components/employees/EmployeeStats";
import EmployeeFilters from "../components/employees/EmployeeFilters";
import EmployeeTable from "../components/employees/EmployeeTable";
import Pagination from "../components/employees/Pagination";
import { Outlet } from "react-router";

const Employee = () => {
  const {
    employees,
    filteredEmployees,
    pagination,
    navigate,

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

    handlePageChange,
  } = useEmployee();
  if (isPending) {
    return (
      <main className="min-h-screen bg-(--bg-main) p-6">
        <div className="mx-auto max-w-350 animate-pulse">
          <div className="h-7 w-64 rounded bg-(--bg-card)" />

          <div className="mt-3 h-4 w-80 rounded bg-(--bg-card)" />

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-28 rounded-xl bg-(--bg-card)" />
            ))}
          </div>

          <div className="mt-6 h-137.5 rounded-xl bg-(--bg-card)" />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-(--bg-main)">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-(--text-primary)">
            Failed to load employees
          </h1>

          <p className="mt-2 text-sm text-(--text-muted)">
            {error?.message || "Something went wrong"}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-(--bg-main) text-(--text-primary)">
      <div className="mx-auto max-w-auto px-5 py-8 sm:px-7 lg:px-10">
        <Outlet />
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-(--primary)">
              Workforce
            </p>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-[28px]">
              Employee Directory
            </h1>

            <p className="mt-1.5 text-sm text-(--text-muted)">
              Manage your organization's workforce and roles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 rounded-lg border border-(--border-color) bg-(--bg-surface) px-4 text-sm font-medium text-(--text-secondary) transition hover:bg-(--bg-hover)"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            <button
              onClick={() => navigate("/home/add-employee")}
              type="button"
              className="flex h-11 items-center gap-2 rounded-lg bg-(--primary) px-4 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </button>
          </div>
        </div>

        <div className="mt-7">
          <EmployeeStats
            total={pagination.total}
            active={activeCount}
            admins={adminCount}
            inactive={inactiveCount}
            pageCount={employees.length}
          />
        </div>

        <section className="mt-6 overflow-hidden rounded-xl border border-(--border-color) bg-(--bg-surface)">
          <EmployeeFilters
            search={search}
            onSearch={handleSearch}
            role={role}
            onRole={handleRole}
            department={department}
            onDepartment={handleDepartment}
            status={status}
            onStatus={handleStatus}
            roles={roles}
            departments={departments}
            onClear={clearFilters}
          />

          <EmployeeTable
            employees={filteredEmployees}
            isFetching={isFetching}
          />

          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </main>
  );
};

export default Employee;
