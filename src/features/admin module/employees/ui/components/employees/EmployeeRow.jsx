import React from "react";
import EmployeeActionMenu from "./EmployeeActionMenu";
import { updateEmployee } from "../../../api/employeeApi";

const formatText = (value) => {
  if (!value) return "-";

  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const EmployeeAvatar = ({ employee }) => {
  if (employee.avatar) {
    return (
      <img
        src={employee.avatar}
        alt={employee.name}
        className="h-10 w-10 rounded-full border border-(--border-color) object-cover"
      />
    );
  }

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--primary)/10 text-xs font-semibold text-(--primary)">
      {getInitials(employee.name)}
    </div>
  );
};

const RoleBadge = ({ role }) => {
  const isAdmin = role?.toLowerCase() === "admin";

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${
        isAdmin
          ? "bg-purple-500/10 text-purple-600 dark:text-purple-300"
          : "bg-blue-500/10 text-blue-600 dark:text-blue-300"
      }`}
    >
      {formatText(role)}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const isActive = status?.toLowerCase() === "active";

  return (
    <div
      className={`inline-flex items-center gap-2 text-sm font-medium ${
        isActive ? "text-(--success)" : "text-(--text-muted)"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isActive ? "bg-(--success)" : "bg-(--text-muted)"
        }`}
      />

      {formatText(status)}
    </div>
  );
};

const EmployeeRow = ({ employee, onUpdate, onDelete }) => {
  const isActive = employee?.status?.toLowerCase() === "active";

  return (
    <tr className="border-b border-(--border-color) transition hover:bg-(--bg-hover) last:border-b-0">
      <td className="px-5 py-4">
        <div className="flex min-w-62.5 items-center gap-3">
          <EmployeeAvatar employee={employee} />

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-(--text-primary)">
              {employee.name}
            </p>

            <p className="mt-0.5 truncate text-xs text-(--text-muted)">
              {employee.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <RoleBadge role={employee.role} />
      </td>

      <td className="px-5 py-4">
        <span className="whitespace-nowrap text-sm text-(--text-secondary)">
          {formatText(employee.department)}
        </span>
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={employee.status} />
      </td>

      <td className="px-5 py-4">
        <span className="whitespace-nowrap text-sm text-(--text-secondary)">
          {formatDate(employee.createdAt)}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end">
          <EmployeeActionMenu
            employee={employee}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleStatus={async () => {
              await updateEmployee(employee?._id, {
                status: isActive ? "inactive" : "active",
              });
              alert("status updated")
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export default EmployeeRow;
