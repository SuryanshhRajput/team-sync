import React from "react";
import { Users } from "lucide-react";
import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({
  employees,
  isFetching,
}) => {
  return (
    <div className="relative w-full overflow-x-auto">
      {isFetching && (
        <div className="absolute right-4 top-4 z-10 rounded-lg bg-(--bg-hover) px-3 py-1.5 text-xs text-(--text-muted)">
          Loading...
        </div>
      )}

      <table className="w-full min-w-237.5 border-collapse">
        <thead>
          <tr className="border-b border-(--border-color) bg-(--bg-main)">
            <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-(--text-muted)">
              Employee
            </th>

            <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-(--text-muted)">
              Role
            </th>

            <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-(--text-muted)">
              Department
            </th>

            <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-(--text-muted)">
              Status
            </th>

            <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-(--text-muted)">
              Joined Date
            </th>

            <th className="px-5 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-(--text-muted)">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <EmployeeRow
                key={employee._id}
                employee={employee}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="py-16 text-center"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--bg-hover)">
                    <Users className="h-5 w-5 text-(--text-muted)" />
                  </div>

                  <p className="mt-4 text-sm font-medium text-(--text-primary)">
                    No employees found
                  </p>

                  <p className="mt-1 text-xs text-(--text-muted)">
                    Try changing your filters.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;