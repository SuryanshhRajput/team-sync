import React from "react";
import {
  ChevronDown,
  Filter,
  Search,
} from "lucide-react";

const FilterSelect = ({
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full appearance-none rounded-lg border border-(--border-color) bg-(--bg-main) px-4 pr-10 text-sm text-(--text-primary) outline-none transition focus:border-(--primary)"
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() +
                  word.slice(1)
              )
              .join(" ")}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-muted)" />
    </div>
  );
};

const EmployeeFilters = ({
  search,
  onSearch,
  role,
  onRole,
  department,
  onDepartment,
  status,
  onStatus,
  roles,
  departments,
  onClear,
}) => {
  return (
    <div className="border-b border-(--border-color) p-4">
      <div className="flex flex-col gap-3 xl:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-muted)" />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search employees..."
            className="h-11 w-full rounded-lg border border-(--border-color) bg-(--bg-main) pl-10 pr-4 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary)"
          />
        </div>

        <div className="hidden items-center gap-2 text-(--text-muted) sm:flex">
          <Filter className="h-4 w-4" />

          <span className="text-xs font-medium">
            Filters
          </span>
        </div>

        <div className="w-full sm:w-45">
          <FilterSelect
            value={role}
            onChange={onRole}
            options={roles}
            placeholder="All Roles"
          />
        </div>

        <div className="w-full sm:w-45">
          <FilterSelect
            value={department}
            onChange={onDepartment}
            options={departments}
            placeholder="All Departments"
          />
        </div>

        <div className="w-full sm:w-42.5">
          <FilterSelect
            value={status}
            onChange={onStatus}
            options={[
              "active",
              "inactive",
            ]}
            placeholder="Status: All"
          />
        </div>

        <button
          type="button"
          onClick={onClear}
          className="h-11 rounded-lg border border-(--border-color) bg-(--bg-hover) px-4 text-sm font-medium text-(--text-secondary) transition hover:text-(--text-primary)"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default EmployeeFilters;