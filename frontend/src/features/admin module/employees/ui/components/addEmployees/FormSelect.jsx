import React from "react";
import { ChevronDown } from "lucide-react";

const FormSelect = ({
  name,
  label,
  placeholder,
  options,
  required = false,
  register,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-(--text-secondary)">
        {label}

        {required && <span className="text-(--danger)"> *</span>}
      </label>

      <div className="relative">
        <select
          {...register(name, { required })}
          name={name}
          required={required}
          defaultValue=""
          className="h-12 w-full appearance-none rounded-lg border border-(--border-color) bg-(--bg-main) px-4 pr-10 text-sm text-(--text-primary) outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-muted)" />
      </div>
    </div>
  );
};

export default FormSelect;
