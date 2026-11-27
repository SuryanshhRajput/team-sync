import React from "react";

const StatusSelector = ({ register }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-(--text-secondary)">
        Employment Status
      </label>

      <div className="flex h-12 items-center gap-6">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-(--text-secondary)">
          <input
            {...register("status")}
            type="radio"
            name="status"
            value="active"
            defaultChecked
            className="h-4 w-4 accent-(--primary)"
          />
          Active
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-(--text-secondary)">
          <input
            {...register("status")}
            type="radio"
            name="status"
            value="inactive"
            className="h-4 w-4 accent-(--primary)"
          />
          Inactive
        </label>
      </div>
    </div>
  );
};

export default StatusSelector;
