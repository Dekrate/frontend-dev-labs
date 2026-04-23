import { useTasks } from './hooks/useTasks';
import { AddTaskForm } from './components/AddTaskForm';
import { FilterTabs } from './components/FilterTabs';
import { TaskList } from './components/TaskList';

export default function App() {
  const {
    tasks,
    counts,
    filter,
    setFilter,
    loading,
    error,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
  } = useTasks();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-stone-500 mt-1">Manage your work without the noise.</p>
        </header>

        <AddTaskForm onAdd={addTask} />

        <FilterTabs active={filter} onChange={setFilter} counts={counts} />

        {error && (
          <div className="mt-4 p-3 rounded-md bg-red-50 text-red-700 border border-red-200 text-sm">
            {error}
          </div>
        )}

        {loading && tasks.length === 0 ? (
          <p className="mt-6 text-stone-500 text-sm">Loading…</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={deleteTask}
          />
        )}
      </div>
    </div>
  );
}
