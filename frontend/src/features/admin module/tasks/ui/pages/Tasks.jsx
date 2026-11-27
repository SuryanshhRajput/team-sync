import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllEmployees } from "../../../employees/api/employeeApi";
import { getKanbanTasks, getTask, getTaskAnalytics } from "../../api/taskApi";
import { useTasks } from "../../hooks/useTasks";
import TaskForm from "../components/TaskForm";
import TaskRow from "../components/TaskRow";

const Tasks = () => {
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("list");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const { tasks, pagination, filters, setFilters, page, setPage, isPending, isError, error, createTask, isCreating, updateStatus, removeTask, isUpdating, isDeleting, assignTask, isAssigning } = useTasks();
  const employeesQuery = useQuery({
    queryKey: ["employees", "task-assignees"],
    queryFn: () => getAllEmployees({ page: 1, limit: 100 }),
    staleTime: 60_000,
  });
  const kanbanQuery = useQuery({ queryKey: ["tasks", "kanban"], queryFn: getKanbanTasks, enabled: view === "kanban" });
  const analyticsQuery = useQuery({ queryKey: ["tasks", "analytics"], queryFn: getTaskAnalytics });
  const detailQuery = useQuery({ queryKey: ["task", selectedTaskId], queryFn: () => getTask(selectedTaskId), enabled: Boolean(selectedTaskId) });

  const handleCreate = async (form) => {
    await createTask({ ...form, dueDate: form.dueDate || undefined });
    setShowForm(false);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Delete this task?")) await removeTask(taskId);
  };

  if (isPending) return <div className="min-h-screen bg-main p-8 text-primary">Loading tasks...</div>;
  if (isError) return <div className="min-h-screen bg-main p-8 text-danger">Failed to load tasks: {error?.message}</div>;

  return (
    <div className="min-h-screen bg-main p-6 text-primary transition-colors duration-300 md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">Work management</p>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="mt-1 text-sm text-muted">Create and track tasks assigned to your team.</p>
        </div>
        <button onClick={() => setShowForm((current) => !current)} className="flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white hover:opacity-90">
          <Plus size={18} /> {showForm ? "Close form" : "Create task"}
        </button>
      </div>

      {showForm && <TaskForm employees={employeesQuery.data?.employees ?? []} onSubmit={handleCreate} isSubmitting={isCreating} onCancel={() => setShowForm(false)} />}

      <div className="mt-6 flex flex-wrap gap-2 border-b border-theme pb-3">
        {[['list', 'Task list'], ['kanban', 'Kanban board']].map(([value, label]) => <button key={value} type="button" onClick={() => setView(value)} className={`rounded-lg px-3 py-2 text-sm ${view === value ? "bg-brand text-white" : "text-secondary hover:bg-hover"}`}>{label}</button>)}
      </div>

      {view === "kanban" && <Kanban data={kanbanQuery.data} isLoading={kanbanQuery.isPending} onStatusChange={(taskId, status) => updateStatus({ taskId, status })} isBusy={isUpdating} />}

      {view === "list" && <>
      <div className="mt-6"><Analytics data={analyticsQuery.data} isLoading={analyticsQuery.isPending} compact /></div>
      <section className="mt-6 overflow-hidden rounded-xl border border-theme bg-surface">
        <div className="flex flex-col gap-3 border-b border-theme p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="font-semibold">All tasks</h2><p className="mt-1 text-sm text-muted">{tasks.length} task{tasks.length === 1 ? "" : "s"} found</p></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input value={filters.search} onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} placeholder="Search tasks" className="w-full rounded-lg border border-theme bg-main py-2.5 pl-9 pr-3 text-sm text-primary outline-none focus:border-brand sm:w-52" /></div>
            <select value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))} className="rounded-lg border border-theme bg-main px-3 py-2.5 text-sm text-primary outline-none focus:border-brand"><option value="">All status</option><option value="todo">To do</option><option value="in-progress">In progress</option><option value="completed">Completed</option></select>
            <select value={filters.priority} onChange={(event) => setFilters((current) => ({ ...current, priority: event.target.value }))} className="rounded-lg border border-theme bg-main px-3 py-2.5 text-sm text-primary outline-none focus:border-brand"><option value="">All priority</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select>
          </div>
        </div>
        {tasks.length ? tasks.map((task) => <TaskRow key={task._id} task={task} employees={employeesQuery.data?.employees ?? []} onSelect={setSelectedTaskId} onAssign={(taskId, assignedTo) => assignTask({ taskId, assignedTo })} onStatusChange={(taskId, status) => updateStatus({ taskId, status })} onDelete={handleDelete} isBusy={isUpdating || isDeleting || isAssigning} />) : <p className="p-8 text-center text-sm text-muted">No tasks found.</p>}
        {tasks.length > 0 && <div className="flex items-center justify-between border-t border-theme px-5 py-4"><p className="text-sm text-muted">Page {pagination?.page ?? page} of {pagination?.totalPages ?? 1}</p><div className="flex gap-2"><button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className="rounded-lg border border-theme px-3 py-2 text-sm text-secondary hover:bg-hover disabled:cursor-not-allowed disabled:opacity-50">Previous</button><button type="button" disabled={page >= (pagination?.totalPages ?? 1)} onClick={() => setPage((current) => current + 1)} className="rounded-lg border border-theme px-3 py-2 text-sm text-secondary hover:bg-hover disabled:cursor-not-allowed disabled:opacity-50">Next</button></div></div>}
      </section>
      </>}

      {selectedTaskId && <TaskDetails task={detailQuery.data} isLoading={detailQuery.isPending} onClose={() => setSelectedTaskId(null)} />}
    </div>
  );
};

const Analytics = ({ data, isLoading, compact = false }) => {
  if (isLoading) return <div className="mt-6 rounded-xl border border-theme bg-surface p-6 text-sm text-muted">Loading analytics...</div>;
  const count = (items) => items?.[0]?.count ?? 0;
  return <div className={`${compact ? "mt-0" : "mt-6"} grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>{[["Total tasks", count(data?.totalTasks)], ["Completed", count(data?.completedTasks)], ["Pending", count(data?.pendingTasks)], ["High priority", data?.tasksByPriority?.find((item) => item._id === "high")?.count ?? 0]].map(([label, value]) => <div key={label} className="rounded-xl border border-theme bg-surface p-5"><p className="text-sm text-muted">{label}</p><p className="mt-2 text-2xl font-semibold text-primary">{value}</p></div>)}</div>;
};

const Kanban = ({ data, isLoading, onStatusChange, isBusy }) => {
  if (isLoading) return <div className="mt-6 rounded-xl border border-theme bg-surface p-6 text-sm text-muted">Loading kanban board...</div>;
  const columns = [["todo", "To do", data?.todo ?? []], ["inProgress", "In progress", data?.inProgress ?? []], ["completed", "Completed", data?.completed ?? []]];
  return <div className="mt-6 grid gap-4 lg:grid-cols-3">{columns.map(([status, title, columnTasks]) => <div key={status} className="rounded-xl border border-theme bg-surface p-4"><div className="mb-3 flex items-center justify-between"><h2 className="font-semibold text-primary">{title}</h2><span className="rounded-full bg-main px-2 py-1 text-xs text-muted">{columnTasks.length}</span></div>{columnTasks.length ? columnTasks.map((task) => <div key={task._id} className="mb-3 rounded-lg border border-theme bg-main p-3"><p className="font-medium text-primary">{task.title}</p><p className="mt-1 text-xs text-muted">{task.assignedTo?.name ?? "Unassigned"}</p><select value={task.status} disabled={isBusy} onChange={(event) => onStatusChange(task._id, event.target.value)} className="mt-3 w-full rounded-lg border border-theme bg-surface px-2 py-2 text-xs text-primary"><option value="todo">To do</option><option value="in-progress">In progress</option><option value="completed">Completed</option></select></div>) : <p className="text-sm text-muted">No tasks</p>}</div>)}</div>;
};

const TaskDetails = ({ task, isLoading, onClose }) => <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-lg rounded-xl border border-theme bg-surface p-6 shadow-theme">{isLoading ? <p className="text-sm text-muted">Loading task...</p> : task ? <><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-wider text-brand">Task details</p><h2 className="mt-1 text-xl font-semibold text-primary">{task.title}</h2></div><button type="button" onClick={onClose} className="text-muted hover:text-primary">Close</button></div><p className="mt-4 text-sm text-secondary">{task.description || "No description added."}</p><div className="mt-5 grid grid-cols-2 gap-4 text-sm"><div><p className="text-muted">Status</p><p className="mt-1 text-primary">{task.status}</p></div><div><p className="text-muted">Priority</p><p className="mt-1 text-primary">{task.priority}</p></div><div><p className="text-muted">Assigned to</p><p className="mt-1 text-primary">{task.assignedTo?.name ?? "Unassigned"}</p></div><div><p className="text-muted">Due date</p><p className="mt-1 text-primary">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</p></div></div></> : <p className="text-sm text-muted">Task not found.</p>}<button type="button" onClick={onClose} className="mt-6 rounded-lg border border-theme px-4 py-2 text-sm text-secondary hover:bg-hover">Close</button></div></div>;

export default Tasks
