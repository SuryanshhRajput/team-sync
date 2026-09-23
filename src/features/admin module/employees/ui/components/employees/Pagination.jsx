import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Pagination = ({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}) => {
  const start =
    total === 0
      ? 0
      : (page - 1) * limit + 1;

  const end = Math.min(
    page * limit,
    total
  );

  return (
    <div className="flex flex-col gap-4 border-t border-(--border-color) px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-(--text-muted)">
        Showing{" "}
        <span className="font-semibold text-(--text-secondary)">
          {start}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-(--text-secondary)">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-(--text-secondary)">
          {total}
        </span>{" "}
        employees
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={page === 1}
          onClick={() =>
            onPageChange(page - 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-color) text-(--text-muted) transition hover:bg-(--bg-hover) disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        )
          .slice(0, 5)
          .map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() =>
                onPageChange(pageNumber)
              }
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                page === pageNumber
                  ? "bg-(--primary) text-white"
                  : "text-(--text-secondary) hover:bg-(--bg-hover)"
              }`}
            >
              {pageNumber}
            </button>
          ))}

        {totalPages > 5 && (
          <>
            <span className="px-1 text-(--text-muted)">
              ...
            </span>

            <button
              type="button"
              onClick={() =>
                onPageChange(totalPages)
              }
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                page === totalPages
                  ? "bg-(--primary) text-white"
                  : "text-(--text-secondary) hover:bg-(--bg-hover)"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() =>
            onPageChange(page + 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--border-color) text-(--text-muted) transition hover:bg-(--bg-hover) disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;