import { FormEvent, useState } from 'react';

interface Props {
  onAdd: (title: string) => Promise<void>;
}

export function AddTaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setBusy(true);
    await onAdd(trimmed);
    setBusy(false);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        maxLength={255}
        className="flex-1 px-3 py-2 rounded-md border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
      />
      <button
        type="submit"
        disabled={busy || title.trim().length === 0}
        className="px-4 py-2 rounded-md bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add
      </button>
    </form>
  );
}
