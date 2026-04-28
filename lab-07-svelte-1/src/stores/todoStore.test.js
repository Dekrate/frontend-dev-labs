import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import { todos, filter, filteredTodos, stats } from './todoStore.js';

describe('todoStore', () => {
  beforeEach(() => {
    localStorage.clear();
    todos.reset();
    filter.set('all');

    if (!globalThis.crypto?.randomUUID) {
      let counter = 0;
      globalThis.crypto = {
        randomUUID: () => `mock-id-${++counter}`,
      };
    }
  });

  it('starts empty', () => {
    expect(get(todos)).toEqual([]);
  });

  it('adds a todo', () => {
    todos.add('Task 1');
    const items = get(todos);
    expect(items).toHaveLength(1);
    expect(items[0].text).toBe('Task 1');
    expect(items[0].done).toBe(false);
    expect(items[0].id).toBeDefined();
  });

  it('toggles todo status', () => {
    todos.add('Task 1');
    const id = get(todos)[0].id;
    todos.toggle(id);
    expect(get(todos)[0].done).toBe(true);
    todos.toggle(id);
    expect(get(todos)[0].done).toBe(false);
  });

  it('removes a todo', () => {
    todos.add('Task 1');
    todos.add('Task 2');
    const id = get(todos)[0].id;
    todos.remove(id);
    expect(get(todos)).toHaveLength(1);
    expect(get(todos)[0].text).toBe('Task 2');
  });

  it('resets to empty', () => {
    todos.add('Task 1');
    todos.reset();
    expect(get(todos)).toEqual([]);
  });

  it('persists to localStorage', () => {
    todos.add('Persisted task');
    const raw = localStorage.getItem('todo-items');
    expect(raw).toBeDefined();
    const parsed = JSON.parse(raw);
    expect(parsed[0].text).toBe('Persisted task');
  });

  it('filters active todos', () => {
    todos.add('Active');
    todos.add('Completed');
    const id = get(todos)[1].id;
    todos.toggle(id);
    filter.set('active');
    expect(get(filteredTodos)).toHaveLength(1);
    expect(get(filteredTodos)[0].text).toBe('Active');
  });

  it('filters completed todos', () => {
    todos.add('Active');
    todos.add('Completed');
    const id = get(todos)[1].id;
    todos.toggle(id);
    filter.set('completed');
    expect(get(filteredTodos)).toHaveLength(1);
    expect(get(filteredTodos)[0].text).toBe('Completed');
  });

  it('shows all todos with all filter', () => {
    todos.add('A');
    todos.add('B');
    todos.toggle(get(todos)[0].id);
    filter.set('all');
    expect(get(filteredTodos)).toHaveLength(2);
  });

  it('computes stats correctly', () => {
    todos.add('A');
    todos.add('B');
    todos.add('C');
    todos.toggle(get(todos)[0].id);
    const s = get(stats);
    expect(s.total).toBe(3);
    expect(s.active).toBe(2);
    expect(s.completed).toBe(1);
  });
});
