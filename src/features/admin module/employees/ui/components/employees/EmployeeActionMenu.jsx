import React, { useState } from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Power,
} from "lucide-react";

const EmployeeActionMenu = ({
  employee,
  onUpdate,
  onDelete,
  onToggleStatus,
}) => {
  const [open, setOpen] = useState(false);

  const isActive =
    employee?.status?.toLowerCase() === "active";

  const handleAction = (action) => {
    setOpen(false);
    action?.();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-(--text-muted) transition hover:bg-(--bg-hover) hover:text-(--text-primary)"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 z-50 w-44 overflow-hidden rounded-lg border border-(--border-color) bg-(--bg-surface) shadow-lg">
          <button
            type="button"
            onClick={() => handleAction(() => onUpdate?.(employee))}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-(--text-secondary) transition hover:bg-(--bg-hover) hover:text-(--text-primary)"
          >
            <Pencil className="h-4 w-4" />
            Update
          </button>

          <button
            type="button"
            onClick={() => handleAction(() => onDelete?.(employee))}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-(--danger) transition hover:bg-(--danger)/10"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>

          <button
            type="button"
            onClick={() =>
              handleAction(() => onToggleStatus?.(employee))
            }
            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-(--text-secondary) transition hover:bg-(--bg-hover) hover:text-(--text-primary)"
          >
            <Power className="h-4 w-4" />
            {isActive ? "Inactive" : "Active"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeActionMenu;