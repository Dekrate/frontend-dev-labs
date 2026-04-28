<script>
  import TodoForm from './components/TodoForm.svelte';
  import TodoFilter from './components/TodoFilter.svelte';
  import TodoList from './components/TodoList.svelte';
</script>

<main>
  <h1>Task Manager</h1>
  <TodoForm />
  <TodoFilter />
  <TodoList />
</main>

<style>
  main {
    padding: 1rem 0;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text);
  }
</style>
