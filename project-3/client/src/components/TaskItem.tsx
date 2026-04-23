import { memo, useState } from 'react';
import { Task } from '../types/task';

interface Props {
  task: Task;
  onToggle: (id: number) => Promise<void>;
  onEdit: (id: number, title: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const TaskItem = memo(function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const [busy, setBusy] = useState(false);

  async function saveEdit() {
    const trimmed = editValue.trim();
    if (!trimmed || trimmed === task.title) {
      setIsEditing(false);
      setEditValue(task.title);
      return;
    }
    setBusy(true);
    await onEdit(task.id, trimmed);
    setBusy(false);
    setIsEditing(false);
  }

  function cancelEdit() {
    setIsEditing(false);
    setEditValue(task.title);
  }

  return (
    <li className="group flex items-center gap-3 px-3 py-3 rounded-md bg-white border border-stone-200 hover:border-stone-300 transition-colors">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`}
        className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-400"
      />
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') cancelEdit();
            }}
            autoFocus
            maxLength={255}
            className="flex-1 px-2 py-1 text-sm rounded border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <button
            onClick={saveEdit}
            disabled={busy}
            className="text-xs font-medium px-2 py-1 rounded bg-stone-900 text-white hover:bg-stone-800 disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={cancelEdit}
            className="text-xs font-medium px-2 py-1 rounded bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={`flex-1 text-sm cursor-pointer ${
              task.completed ? 'line-through text-stone-400' : 'text-stone-800'
            }`}
            title="Double-click to edit"
          >
            {task.title}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 text-xs text-stone-500 hover:text-stone-800 px-2 py-1 transition-opacity"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="opacity-0 group-hover:opacity-100 text-xs text-red-600 hover:text-red-800 px-2 py-1 transition-opacity"
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
});
