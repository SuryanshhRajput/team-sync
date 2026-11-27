import { ArrowUpRight, CheckCircle2, Clock3, ListTodo, Users } from "lucide-react";
import { createElement } from "react";
import { useSelector } from "react-redux";
import { useDashboard } from "../../hooks/useDashboard";

const statCards = [
  { key: "totalEmployees", label: "Total employees", icon: Users, color: "text-blue-400", background: "bg-blue-500/10" },
  { key: "totalTasks", label: "Total tasks", icon: ListTodo, color: "text-violet-400", background: "bg-violet-500/10" },
  { key: "completedTask", label: "Completed tasks", icon: CheckCircle2, color: "text-green-400", background: "bg-green-500/10" },
  { key: "pendingTask", label: "Pending tasks", icon: Clock3, color: "text-yellow-400", background: "bg-yellow-500/10" },
];

const Home = () => {
  const employee = useSelector((store) => store.auth.employee);
  const { stats, isPending, isError, error } = useDashboard();

  if (isPending) return <div className="min-h-screen bg-main p-8 text-primary">Loading dashboard...</div>;

  if (isError) {
    return <div className="min-h-screen bg-main p-8 text-danger">Failed to load dashboard: {error?.message}</div>;
  }

  return (
    <main className="min-h-screen bg-main p-6 text-primary transition-colors duration-300 md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">Workspace overview</p>
          <h1 className="text-2xl font-bold">Welcome back{employee?.name ? `, ${employee.name}` : ""}</h1>
          <p className="mt-1 text-sm text-muted">Here is what is happening in your workspace today.</p>
        </div>
        <span className="rounded-full border border-theme bg-surface px-3 py-1.5 text-xs capitalize text-secondary">{employee?.role ?? "user"} workspace</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ key, label, icon: Icon, color, background }) => <div key={key} className="rounded-xl border border-theme bg-surface p-5"><div className="flex items-start justify-between"><div className={`flex h-10 w-10 items-center justify-center rounded-lg ${background} ${color}`}>{createElement(Icon, { size: 20 })}</div><ArrowUpRight size={17} className="text-muted" /></div><p className="mt-5 text-sm text-muted">{label}</p><p className="mt-1 text-2xl font-semibold text-primary">{stats?.[key] ?? 0}</p></div>)}
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-theme bg-surface">
        <div className="flex items-center justify-between border-b border-theme px-5 py-4"><div><h2 className="font-semibold">Recent tasks</h2><p className="mt-1 text-sm text-muted">The latest work activity in your workspace.</p></div><ListTodo size={20} className="text-muted" /></div>
        {stats?.recentTasks?.length ? stats.recentTasks.map((task) => <div key={task._id} className="flex flex-col gap-3 border-b border-theme px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-medium text-primary">{task.title}</h3><p className="mt-1 text-sm text-muted">Assigned to {task.assignedTo?.name ?? "Unassigned"}</p></div><div className="flex items-center gap-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${task.priority === "high" ? "bg-red-500/10 text-red-400" : task.priority === "low" ? "bg-blue-500/10 text-blue-400" : "bg-yellow-500/10 text-yellow-400"}`}>{task.priority}</span><span className="rounded-full border border-theme px-2.5 py-1 text-xs capitalize text-secondary">{task.status.replace("-", " ")}</span></div></div>) : <p className="p-8 text-center text-sm text-muted">No recent tasks found.</p>}
      </section>
    </main>
  );
};

export default Home;
