import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { todos } from '../stores/todoStore.js';
import TodoForm from './TodoForm.svelte';

describe('TodoForm', () => {
  beforeEach(() => {
    localStorage.clear();
    todos.reset();
  });

  it('renders input and button', () => {
    render(TodoForm);
    expect(screen.getByLabelText('New task')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('adds a task on submit', async () => {
    render(TodoForm);
    const input = screen.getByLabelText('New task');
    const button = screen.getByRole('button', { name: 'Add' });

    await fireEvent.input(input, { target: { value: 'New task' } });
    await fireEvent.click(button);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows error for empty input', async () => {
    render(TodoForm);
    const button = screen.getByRole('button', { name: 'Add' });

    await fireEvent.click(button);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Task cannot be empty'
    );
  });

  it('clears input after successful submit', async () => {
    render(TodoForm);
    const input = screen.getByLabelText('New task');
    const button = screen.getByRole('button', { name: 'Add' });

    await fireEvent.input(input, { target: { value: 'Task to add' } });
    await fireEvent.click(button);

    expect(input.value).toBe('');
  });
});
