import React from "react";
import { Camera, ImagePlus } from "lucide-react";

const PhotoUpload = ({ fileInputRef, preview, onChange, register }) => {
  const avatarField = register("avatar");

  return (
    <div>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="group relative mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-(--border-color) bg-(--bg-main) transition hover:border-(--primary) lg:mx-0"
      >
        {preview ? (
          <img
            src={preview}
            alt="Employee preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center text-(--text-muted)">
            <Camera className="h-8 w-8" />

            <span className="mt-2 text-xs font-medium">Upload Photo</span>
          </div>
        )}

        <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-(--primary) text-white shadow-md">
          <ImagePlus className="h-4 w-4" />
        </div>
      </button>

      <input
        {...avatarField}
        ref={(element) => {
          fileInputRef.current = element;
          avatarField.ref(element);
        }}
        type="file"
        name="avatar"
        accept="image/png,image/jpeg,image/jpg"
        onChange={(event) => {
          avatarField.onChange(event);
          onChange(event);
        }}
        className="hidden"
      />

      <p className="mt-3 text-center text-xs text-(--text-muted) lg:text-left">
        JPG or PNG. Max size of 800K.
      </p>
    </div>
  );
};

export default PhotoUpload;
