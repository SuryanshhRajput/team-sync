import React from "react";
import { UserRound } from "lucide-react";
import PhotoUpload from "./PhotoUpload";

const PersonalInformation = ({
  fileInputRef,
  preview,
  onImageChange,
  register,
}) => {
  return (
    <section className="rounded-xl border border-(--border-color) bg-(--bg-surface) p-6">
      <div className="flex items-center gap-3 border-b border-(--border-color) pb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--primary)/10">
          <UserRound className="h-5 w-5 text-(--primary)" />
        </div>

        <h2 className="text-xl font-semibold text-(--text-primary)">
          Personal Information
        </h2>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[210px_1fr]">
        <PhotoUpload
          fileInputRef={fileInputRef}
          preview={preview}
          onChange={onImageChange}
          register={register}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-(--text-secondary)">
              Full Name <span className="text-(--danger)">*</span>
            </label>

            <input
              {...register("name", { required: true })}
              type="text"
              name="name"
              required
              placeholder="e.g. Sarah Jenkins"
              className="h-12 w-full rounded-lg border border-(--border-color) bg-(--bg-main) px-4 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-(--text-secondary)">
              Email Address <span className="text-(--danger)">*</span>
            </label>

            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              required
              placeholder="name@company.com"
              className="h-12 w-full rounded-lg border border-(--border-color) bg-(--bg-main) px-4 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-(--text-secondary)">
              Password<span className="text-(--danger)">*</span>
            </label>

            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              required
              placeholder="Create password for employee"
              className="h-12 w-full rounded-lg border border-(--border-color) bg-(--bg-main) px-4 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-(--text-secondary)">
              Bio / About
            </label>

            <textarea
              {...register("bio")}
              name="bio"
              rows="4"
              placeholder="Tell us about the new team member..."
              className="w-full resize-none rounded-lg border border-(--border-color) bg-(--bg-main) px-4 py-3 text-sm text-(--text-primary) outline-none transition placeholder:text-(--text-muted) focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
