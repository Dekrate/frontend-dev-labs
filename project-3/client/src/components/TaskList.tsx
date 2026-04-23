import { Task } from '../types/task';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: Task[];
  onToggle: (id: number) => Promise<void>;
  onEdit: (id: number, title: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TaskList({ tasks, onToggle, onEdit, onDelete }: Props) {
  if (tasks.length === 0) {
    return <p className="mt-6 text-stone-500 text-sm">No tasks found.</p>;
  }

  return (
    <ul className="mt-4 space-y-2" role="list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
