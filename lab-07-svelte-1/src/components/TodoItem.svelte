<script>
  import { todos } from '../stores/todoStore.js';

  let { id, text, done } = $props();

  function toggle() {
    todos.toggle(id);
  }

  function remove() {
    todos.remove(id);
  }
</script>

<li class="todo-item" data-testid="todo-item">
  <label class="todo-label">
    <input
      type="checkbox"
      checked={done}
      onchange={toggle}
      aria-label="Toggle task"
    />
    <span class:completed={done}>{text}</span>
  </label>
  <button
    type="button"
    class="delete-btn"
    onclick={remove}
    aria-label="Delete task"
  >
    Delete
  </button>
</li>

<style>
  .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  .todo-label {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    cursor: pointer;
  }

  input[type='checkbox'] {
    width: 1.125rem;
    height: 1.125rem;
    accent-color: var(--accent);
    cursor: pointer;
  }

  .completed {
    text-decoration: line-through;
    color: var(--text-secondary);
  }

  .delete-btn {
    padding: 0.375rem 0.75rem;
    color: var(--danger);
    border: 1px solid var(--danger);
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .delete-btn:hover {
    background: var(--danger);
    color: white;
  }
</style>
