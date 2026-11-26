
export default function DepartmentStatCard({
  title,
  value,
  icon,
  iconColor = "var(--primary)",
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-theme bg-surface p-5 transition-colors duration-300">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        style={{
          backgroundColor: "var(--bg-card)",
          color: iconColor,
        }}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-muted">{title}</p>

        <p className="mt-1 text-2xl font-bold text-primary">
          {value}
        </p>
      </div>
    </div>
  );
}
