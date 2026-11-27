import { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  assignedTo: "",
  priority: "medium",
  status: "todo",
  dueDate: "",
};

const TaskForm = ({ employees, onSubmit, isSubmitting, onCancel }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(form);
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 rounded-xl border border-theme bg-surface p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-secondary md:col-span-2">
          Title
          <input required name="title" value={form.title} onChange={handleChange} placeholder="Prepare Q3 sales report" className="mt-1.5 w-full rounded-lg border border-theme bg-main px-3 py-2.5 text-primary outline-none focus:border-brand" />
        </label>

        <label className="text-sm text-secondary md:col-span-2">
          Description
          <textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Add a short description" className="mt-1.5 w-full resize-none rounded-lg border border-theme bg-main px-3 py-2.5 text-primary outline-none focus:border-brand" />
        </label>

        <label className="text-sm text-secondary">
          Assign to
          <select required name="assignedTo" value={form.assignedTo} onChange={handleChange} className="mt-1.5 w-full rounded-lg border border-theme bg-main px-3 py-2.5 text-primary outline-none focus:border-brand">
            <option value="">Select employee</option>
            {employees.map((employee) => <option key={employee._id} value={employee._id}>{employee.name}</option>)}
          </select>
        </label>

        <label className="text-sm text-secondary">
          Due date
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className="mt-1.5 w-full rounded-lg border border-theme bg-main px-3 py-2.5 text-primary outline-none focus:border-brand" />
        </label>

        <label className="text-sm text-secondary">
          Priority
          <select name="priority" value={form.priority} onChange={handleChange} className="mt-1.5 w-full rounded-lg border border-theme bg-main px-3 py-2.5 text-primary outline-none focus:border-brand">
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </select>
        </label>

        <label className="text-sm text-secondary">
          Status
          <select name="status" value={form.status} onChange={handleChange} className="mt-1.5 w-full rounded-lg border border-theme bg-main px-3 py-2.5 text-primary outline-none focus:border-brand">
            <option value="todo">To do</option><option value="in-progress">In progress</option><option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="rounded-lg border border-theme px-4 py-2 text-sm text-secondary hover:bg-hover">Cancel</button>
        <button disabled={isSubmitting} className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60">{isSubmitting ? "Creating..." : "Create task"}</button>
      </div>
    </form>
  );
};

export default TaskForm;
