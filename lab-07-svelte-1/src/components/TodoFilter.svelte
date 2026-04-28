<script>
  import { filter } from '../stores/todoStore.js';

  const options = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];
</script>

<div class="filter" role="group" aria-label="Filter tasks">
  {#each options as option}
    <button
      type="button"
      class="filter-btn"
      class:active={$filter === option.value}
      onclick={() => filter.set(option.value)}
    >
      {option.label}
    </button>
  {/each}
</div>

<style>
  .filter {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .filter-btn {
    padding: 0.375rem 0.875rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--surface);
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  .filter-btn:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .filter-btn.active {
    background: var(--accent);
    border-color: var(--accent);
    color: white;
  }
</style>
