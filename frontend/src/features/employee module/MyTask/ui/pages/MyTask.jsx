import { useTasks } from "../../../../admin module/tasks/hooks/useTasks";
import TaskRow from "../../../../admin module/tasks/ui/components/TaskRow";

const MyTask = () => {
  const { tasks, isPending, isError, error, updateStatus, isUpdating } = useTasks();

  if (isPending) return <div className="min-h-screen bg-main p-8 text-primary">Loading your tasks...</div>;
  if (isError) return <div className="min-h-screen bg-main p-8 text-danger">Failed to load tasks: {error?.message}</div>;

  return (
    <div className="min-h-screen bg-main p-6 text-primary md:p-8">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">Work management</p>
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <p className="mt-1 text-sm text-muted">View your assigned work and update its progress.</p>
      </div>

      <section className="overflow-hidden rounded-xl border border-theme bg-surface">
        {tasks.length ? tasks.map((task) => <TaskRow key={task._id} task={task} onStatusChange={(taskId, status) => updateStatus({ taskId, status })} isBusy={isUpdating} />) : <p className="p-8 text-center text-sm text-muted">You have no assigned tasks.</p>}
      </section>
    </div>
  );
};

export default MyTask
