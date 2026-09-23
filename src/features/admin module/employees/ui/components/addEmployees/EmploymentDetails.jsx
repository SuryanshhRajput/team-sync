import React from "react";
import { BriefcaseBusiness } from "lucide-react";
import FormSelect from "./FormSelect";
import StatusSelector from "./StatusSelector";

const EmploymentDetails = ({ register }) => {
  return (
    <section className="rounded-xl border border-(--border-color) bg-(--bg-surface) p-6">
      <div className="flex items-center gap-3 border-b border-(--border-color) pb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--primary)/10">
          <BriefcaseBusiness className="h-5 w-5 text-(--primary)" />
        </div>

        <h2 className="text-xl font-semibold text-(--text-primary)">
          Employment Details
        </h2>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <FormSelect
          register={register}
          name="department"
          label="Department"
          placeholder="Select Department"
          options={["developer", "design", "common", "hr"]}
          required
        />

        <FormSelect
          register={register}
          name="role"
          label="Role"
          placeholder="Select Role"
          options={["employee", "admin"]}
          required
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-(--text-secondary)">
            Joining Date <span className="text-(--danger)">*</span>
          </label>

          <input
            {...register("joiningDate", { required: true })}
            type="date"
            name="joiningDate"
            required
            className="h-12 w-full rounded-lg border border-(--border-color) bg-(--bg-main) px-4 text-sm text-(--text-primary) outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
          />
        </div>

        <StatusSelector register={register} />
      </div>
    </section>
  );
};

export default EmploymentDetails;
