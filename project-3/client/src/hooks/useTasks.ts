import { useCallback, useEffect, useState } from 'react';
import { Task, Filter } from '../types/task';
import { tasksApi } from '../api/client';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksApi.getAll();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const addTask = useCallback(async (title: string) => {
    setError(null);
    try {
      const task = await tasksApi.create(title);
      setTasks((prev) => [task, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task');
    }
  }, []);

  const toggleTask = useCallback(async (id: number) => {
    setError(null);
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    try {
      const updated = await tasksApi.update(id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  }, [tasks]);

  const editTask = useCallback(async (id: number, title: string) => {
    setError(null);
    try {
      const updated = await tasksApi.update(id, { title });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to edit task');
    }
  }, []);

  const deleteTask = useCallback(async (id: number) => {
    setError(null);
    try {
      await tasksApi.remove(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  }, []);

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'todo') return !t.completed;
    if (filter === 'done') return t.completed;
    return true;
  });

  const counts: Record<Filter, number> = {
    all: tasks.length,
    todo: tasks.filter((t) => !t.completed).length,
    done: tasks.filter((t) => t.completed).length,
  };

  return {
    tasks: filteredTasks,
    counts,
    filter,
    setFilter,
    loading,
    error,
    addTask,
    toggleTask,
    editTask,
    deleteTask,
    refetch,
  };
}
