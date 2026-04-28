<script>
  import { filteredTodos, stats } from '../stores/todoStore.js';
  import TodoItem from './TodoItem.svelte';
</script>

<div class="todo-list">
  <div class="stats">
    <span>{$stats.active} active</span>
    <span>{$stats.completed} completed</span>
    <span>{$stats.total} total</span>
  </div>

  {#if $filteredTodos.length === 0}
    <p class="empty">No tasks to display.</p>
  {:else}
    <ul>
      {#each $filteredTodos as todo (todo.id)}
        <TodoItem id={todo.id} text={todo.text} done={todo.done} />
      {/each}
    </ul>
  {/if}
</div>

<style>
  .todo-list {
    margin-top: 1rem;
  }

  .stats {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .empty {
    text-align: center;
    padding: 2rem;
    color: var(--text-secondary);
    border: 1px dashed var(--border);
    border-radius: 4px;
  }

  ul {
    list-style: none;
  }
</style>
