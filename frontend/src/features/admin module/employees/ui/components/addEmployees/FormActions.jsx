import React from "react";
import { UserPlus, X } from "lucide-react";

const FormActions = ({ onCancel }) => {
  return (
    <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
      <button
        onClick={onCancel}
        type="button"
        className="flex h-12 items-center justify-center gap-2 rounded-lg border border-(--border-color) bg-(--bg-surface) px-6 text-sm font-semibold text-(--text-secondary) transition hover:bg-(--bg-hover) hover:text-(--text-primary)"
      >
        <X className="h-4 w-4" />
        Cancel
      </button>

      <button
        type="submit"
        className="flex h-12 items-center justify-center gap-2 rounded-lg bg-(--primary) px-7 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
      >
        <UserPlus className="h-4 w-4" />
        Create Employee
      </button>
    </div>
  );
};

export default FormActions;
