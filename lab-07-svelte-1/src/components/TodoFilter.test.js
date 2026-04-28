import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { filter } from '../stores/todoStore.js';
import TodoFilter from './TodoFilter.svelte';

describe('TodoFilter', () => {
  beforeEach(() => {
    filter.set('all');
  });

  it('renders filter buttons', () => {
    render(TodoFilter);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument();
  });

  it('sets active class on current filter', () => {
    render(TodoFilter);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn.classList.contains('active')).toBe(true);
  });

  it('changes filter on click', async () => {
    render(TodoFilter);
    const activeBtn = screen.getByRole('button', { name: 'Active' });
    await fireEvent.click(activeBtn);
    expect(activeBtn.classList.contains('active')).toBe(true);
  });
});
