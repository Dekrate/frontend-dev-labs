<script lang="ts">
	import type { Task } from '@prisma/client';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let tasks = $state<Task[]>([]);
	$effect(() => {
		tasks = [...data.tasks];
	});
	let filter = $state<'all' | 'todo' | 'done'>('all');
	let newTitle = $state('');
	let isSubmitting = $state(false);
	let errorMsg = $state<string | null>(null);

	let filtered = $derived(
		tasks.filter((t) => {
			if (filter === 'todo') return !t.completed;
			if (filter === 'done') return t.completed;
			return true;
		})
	);

	async function addTask(e: Event) {
		e.preventDefault();
		const title = newTitle.trim();
		if (!title) return;

		isSubmitting = true;
		errorMsg = null;

		try {
			const res = await fetch('/api/tasks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title })
			});
			if (!res.ok) {
				const err = await res.json().catch(() => ({}));
				throw new Error(err.message ?? 'Failed to add task');
			}
			const task = await res.json();
			tasks = [task, ...tasks];
			newTitle = '';
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : 'Could not add task. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	async function toggleTask(task: (typeof tasks)[number]) {
		errorMsg = null;
		try {
			const res = await fetch(`/api/tasks/${task.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ completed: !task.completed })
			});
			if (!res.ok) throw new Error('Failed to update task');
			const updated = await res.json();
			tasks = tasks.map((t) => (t.id === updated.id ? updated : t));
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : 'Failed to update task.';
		}
	}

	async function deleteTask(id: number) {
		errorMsg = null;
		try {
			const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
			if (!res.ok) throw new Error('Failed to delete task');
			tasks = tasks.filter((t) => t.id !== id);
		} catch (e) {
			errorMsg = e instanceof Error ? e.message : 'Failed to delete task.';
		}
	}
</script>

<svelte:head>
	<title>Tasks</title>
</svelte:head>

<main class="mx-auto max-w-xl px-4 py-12">
	<h1 class="mb-6 text-2xl font-bold tracking-tight">Tasks</h1>

	<form onsubmit={addTask} class="mb-6 flex gap-2">
		<input
			type="text"
			bind:value={newTitle}
			placeholder="What needs to be done?"
			maxlength="200"
			class="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
		/>
		<button
			type="submit"
			disabled={isSubmitting || !newTitle.trim()}
			class="rounded-md bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
		>
			Add
		</button>
	</form>

	{#if errorMsg}
		<div class="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
			{errorMsg}
		</div>
	{/if}

	<div class="mb-6 flex gap-2">
		{#each ['all', 'todo', 'done'] as f (f)}
			<button
				onclick={() => (filter = f as typeof filter)}
				class="rounded-md border px-3 py-1.5 text-sm font-medium {filter === f
					? 'border-stone-800 bg-stone-800 text-white'
					: 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'}"
			>
				{f === 'all' ? 'All' : f === 'todo' ? 'To Do' : 'Done'}
			</button>
		{/each}
	</div>

	<ul class="space-y-2">
		{#each filtered as task (task.id)}
			<li class="flex items-center gap-3 rounded-md border border-neutral-200 bg-white p-3 shadow-sm">
				<input
					type="checkbox"
					checked={task.completed}
					onchange={() => toggleTask(task)}
					class="h-4 w-4 rounded border-neutral-300 text-stone-800 focus:ring-stone-700"
				/>
				<span
					class="flex-1 text-sm {task.completed
						? 'text-neutral-400 line-through'
						: 'text-neutral-900'}"
				>
					{task.title}
				</span>
				<button
					onclick={() => deleteTask(task.id)}
					class="rounded-md border border-transparent px-2 py-1 text-xs font-medium text-red-700 hover:border-red-200 hover:bg-red-50"
				>
					Delete
				</button>
			</li>
		{:else}
			<li class="py-4 text-center text-sm text-neutral-500">No tasks found.</li>
		{/each}
	</ul>

	<p class="mt-6 text-center text-xs text-neutral-400">
		{filtered.length} task{filtered.length === 1 ? '' : 's'}
	</p>
</main>
