<script>
  import { todos } from '../stores/todoStore.js';
  import { validateTodo } from '../lib/utils.js';

  let value = $state('');
  let error = $state('');

  function handleSubmit(event) {
    event.preventDefault();
    error = '';

    const result = validateTodo(value);

    if (!result.valid) {
      error = result.error;
      return;
    }

    todos.add(result.text);
    value = '';
  }
</script>

<form onsubmit={handleSubmit} class="todo-form">
  <div class="input-row">
    <input
      type="text"
      bind:value
      placeholder="What needs to be done?"
      aria-label="New task"
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={error ? 'todo-error' : undefined}
    />
    <button type="submit">Add</button>
  </div>
  {#if error}
    <p id="todo-error" class="error" role="alert">{error}</p>
  {/if}
</form>

<style>
  .todo-form {
    margin-bottom: 1.5rem;
  }

  .input-row {
    display: flex;
    gap: 0.5rem;
  }

  input {
    flex: 1;
    padding: 0.625rem 0.875rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--surface);
    color: var(--text);
  }

  input:focus {
    outline: 2px solid var(--accent);
    outline-offset: 0;
  }

  button[type='submit'] {
    padding: 0.625rem 1.25rem;
    background: var(--accent);
    color: white;
    border-radius: 4px;
    font-weight: 500;
  }

  button[type='submit']:hover {
    background: var(--accent-hover);
  }

  .error {
    margin-top: 0.5rem;
    color: var(--danger);
    font-size: 0.875rem;
  }
</style>
