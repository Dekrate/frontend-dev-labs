import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { todos } from '../stores/todoStore.js';
import TodoList from './TodoList.svelte';

describe('TodoList', () => {
  beforeEach(() => {
    localStorage.clear();
    todos.reset();
  });

  it('shows empty message when no todos', () => {
    render(TodoList);
    expect(screen.getByText('No tasks to display.')).toBeInTheDocument();
  });

  it('renders todo items', () => {
    todos.add('First');
    todos.add('Second');
    render(TodoList);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('displays stats', () => {
    todos.add('A');
    todos.add('B');
    render(TodoList);
    expect(screen.getByText('2 active')).toBeInTheDocument();
    expect(screen.getByText('0 completed')).toBeInTheDocument();
    expect(screen.getByText('2 total')).toBeInTheDocument();
  });

  it('removes a todo on delete click', async () => {
    todos.add('Delete me');
    render(TodoList);
    const deleteBtn = screen.getByRole('button', { name: 'Delete task' });
    await fireEvent.click(deleteBtn);
    expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
  });

  it('toggles a todo on checkbox click', async () => {
    todos.add('Toggle me');
    render(TodoList);
    const checkbox = screen.getByRole('checkbox', { name: 'Toggle task' });
    await fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
