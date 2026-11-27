import { Check, Trash2 } from "lucide-react";

const statusLabels = { todo: "To do", "in-progress": "In progress", completed: "Completed" };

const TaskRow = ({ task, employees = [], onStatusChange, onAssign, onDelete, onSelect, isBusy }) => {
  const employeeName = typeof task.assignedTo === "string" ? "Unassigned" : task.assignedTo?.name ?? "Unassigned";

  return (
    <div className="flex flex-col gap-4 border-t border-theme px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <button type="button" onClick={() => onSelect?.(task._id)} className="truncate text-left font-medium text-primary hover:text-brand">{task.title}</button>
        <p className="mt-1 text-sm text-muted">{employeeName}{task.dueDate ? ` · Due ${new Date(task.dueDate).toLocaleDateString()}` : ""}</p>
        {task.description && <p className="mt-1 truncate text-sm text-muted">{task.description}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${task.priority === "high" ? "bg-red-500/10 text-red-400" : task.priority === "low" ? "bg-blue-500/10 text-blue-400" : "bg-yellow-500/10 text-yellow-400"}`}>{task.priority}</span>
        <select value={task.status} disabled={isBusy} onChange={(event) => onStatusChange(task._id, event.target.value)} className="rounded-lg border border-theme bg-main px-3 py-2 text-sm text-primary outline-none focus:border-brand">
          {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        {onAssign && <select value={typeof task.assignedTo === "string" ? task.assignedTo : task.assignedTo?._id ?? ""} disabled={isBusy} onChange={(event) => onAssign(task._id, event.target.value)} className="max-w-40 rounded-lg border border-theme bg-main px-3 py-2 text-sm text-primary outline-none focus:border-brand"><option value="">Unassigned</option>{employees.map((employee) => <option key={employee._id} value={employee._id}>{employee.name}</option>)}</select>}
        {onDelete && <button type="button" title="Delete task" disabled={isBusy} onClick={() => onDelete(task._id)} className="rounded-lg p-2 text-muted hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"><Trash2 size={17} /></button>}
        {task.status === "completed" && <Check size={18} className="text-success" />}
      </div>
    </div>
  );
};

export default TaskRow;
