import { writable, derived } from 'svelte/store';

const STORAGE_KEY = 'todo-items';

function createTodoStore() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const initial = saved ? JSON.parse(saved) : [];

  const { subscribe, set, update } = writable(initial);

  subscribe((items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  });

  return {
    subscribe,
    add: (text) =>
      update((items) => [
        ...items,
        { id: crypto.randomUUID(), text, done: false },
      ]),
    toggle: (id) =>
      update((items) =>
        items.map((item) =>
          item.id === id ? { ...item, done: !item.done } : item
        )
      ),
    remove: (id) =>
      update((items) => items.filter((item) => item.id !== id)),
    reset: () => set([]),
  };
}

export const todos = createTodoStore();

export const filter = writable('all');

export const filteredTodos = derived(
  [todos, filter],
  ([$todos, $filter]) => {
    switch ($filter) {
      case 'active':
        return $todos.filter((t) => !t.done);
      case 'completed':
        return $todos.filter((t) => t.done);
      default:
        return $todos;
    }
  }
);

export const stats = derived(todos, ($todos) => ({
  total: $todos.length,
  active: $todos.filter((t) => !t.done).length,
  completed: $todos.filter((t) => t.done).length,
}));
