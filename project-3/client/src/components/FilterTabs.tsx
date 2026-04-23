import { Filter } from '../types/task';

interface Props {
  active: Filter;
  onChange: (f: Filter) => void;
  counts: Record<Filter, number>;
}

export function FilterTabs({ active, onChange, counts }: Props) {
  const tabs: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'todo', label: 'ToDo' },
    { key: 'done', label: 'Done' },
  ];

  return (
    <div className="flex gap-2 mt-6">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          aria-pressed={active === t.key}
          className={`px-3 py-1.5 text-sm font-medium rounded-md border transition-colors ${
            active === t.key
              ? 'bg-stone-900 text-white border-stone-900'
              : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
          }`}
        >
          {t.label}{' '}
          <span className="ml-1 text-xs opacity-70">{counts[t.key]}</span>
        </button>
      ))}
    </div>
  );
}
