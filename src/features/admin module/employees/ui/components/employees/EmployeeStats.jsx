import React from "react";
import { UserCheck, UserCog, UserX, Users } from "lucide-react";

const StatCard = ({ icon, title, value, description }) => {
  return (
    <div className="rounded-xl border border-(--border-color) bg-(--bg-surface) p-5 transition hover:bg-(--bg-hover)">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-(--text-muted)">{title}</p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--primary)/10">
          {React.createElement(icon, {
            className: "h-4.5 w-4.5 text-(--primary)",
          })}
        </div>
      </div>

      <div className="mt-4 flex items-end gap-2">
        <span className="text-[28px] font-semibold leading-none text-(--text-primary)">
          {value}
        </span>

        {description && (
          <span className="mb-0.5 text-xs text-(--text-muted)">
            {description}
          </span>
        )}
      </div>
    </div>
  );
};

const EmployeeStats = ({ total, active, admins, inactive, pageCount }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard icon={Users} title="Total Employees" value={total} />

      <StatCard
        icon={UserCheck}
        title="Active Employees"
        value={active}
        description={`of ${pageCount} loaded`}
      />

      <StatCard
        icon={UserCog}
        title="Admins"
        value={admins}
        description={`of ${pageCount} loaded`}
      />

      <StatCard
        icon={UserX}
        title="Inactive Employees"
        value={inactive}
        description={`of ${pageCount} loaded`}
      />
    </div>
  );
};

export default EmployeeStats;
