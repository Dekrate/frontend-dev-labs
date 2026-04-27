import React, { useState } from 'react';

const links = [
  { label: 'E-sklep', color: 'bg-blue-600' },
  { label: 'E-multimedia', color: 'bg-orange-500' },
  { label: 'Kuchnia Polki', color: 'bg-pink-600' },
  { label: 'Gazetka', color: 'bg-green-600' },
  { label: 'Arabeska', color: 'bg-purple-600' },
  { label: 'Pióra', color: 'bg-indigo-600' },
  { label: 'Trafika', color: 'bg-red-600' },
];

const Sidebar: React.FC = () => {
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');

  return (
    <aside className="w-full md:w-52 shrink-0" data-testid="sidebar">
      <ul className="space-y-3 mb-6">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={`#${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center gap-3 group"
            >
              <div className={`w-12 h-12 ${link.color} rounded-sm flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                {link.label[0]}
              </div>
              <span className="text-sm text-text-body font-medium group-hover:text-brand-blue group-hover:underline">
                {link.label}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="bg-sidebar-bg border border-border-light rounded-sm p-3 space-y-4">
        <div>
          <label htmlFor="sidebar-search" className="block text-sm font-semibold text-brand-blue mb-1">
            Szukaj
          </label>
          <div className="flex gap-1">
            <input
              id="sidebar-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border border-border-light rounded-sm focus:outline-none focus:border-brand-blue"
              aria-label="Szukaj"
            />
            <button
              aria-label="Szukaj"
              className="px-2 py-1 bg-brand-blue text-white text-sm rounded-sm hover:bg-brand-dark transition-colors"
            >
              OK
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="sidebar-newsletter" className="block text-sm font-semibold text-brand-blue mb-1">
            Zamów newsletter
          </label>
          <p className="text-xs text-text-muted mb-1">wpisz swój e-mail</p>
          <div className="flex gap-1">
            <input
              id="sidebar-newsletter"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twój@email.pl"
              className="flex-1 px-2 py-1 text-sm border border-border-light rounded-sm focus:outline-none focus:border-brand-blue"
              aria-label="Email do newslettera"
            />
            <button
              aria-label="Zamów newsletter"
              className="px-2 py-1 bg-brand-blue text-white text-sm rounded-sm hover:bg-brand-dark transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
