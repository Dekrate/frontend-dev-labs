import { Task } from '../types/task';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function http<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(res.status, body.error ?? `HTTP ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export const tasksApi = {
  getAll: () => http<Task[]>('/tasks'),
  create: (title: string) =>
    http<Task>('/tasks', { method: 'POST', body: JSON.stringify({ title }) }),
  update: (id: number, fields: Partial<Pick<Task, 'title' | 'completed'>>) =>
    http<Task>(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(fields) }),
  remove: (id: number) =>
    http<void>(`/tasks/${id}`, { method: 'DELETE' }),
};
