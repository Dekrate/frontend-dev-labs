import React, { useState } from 'react';

const links = [
  {
    label: 'E-sklep',
    src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80',
    alt: 'Koszyk z zakupami',
  },
  {
    label: 'E-multimedia',
    src: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=80&q=80',
    alt: 'Płyta CD',
  },
  {
    label: 'Kuchnia Polki',
    src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=80&q=80',
    alt: 'Produkty spożywcze',
  },
  {
    label: 'Gazetka',
    src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80',
    alt: 'Koszyk z zakupami',
  },
  {
    label: 'Arabeska',
    src: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=80&q=80',
    alt: 'Płyta CD',
  },
  {
    label: 'Pióra',
    src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=80&q=80',
    alt: 'Produkty spożywcze',
  },
  {
    label: 'Trafika',
    src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&q=80',
    alt: 'Koszyk z zakupami',
  },
];

const Sidebar: React.FC = () => {
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');

  return (
    <aside className="w-full md:w-56 shrink-0" data-testid="sidebar">
      <ul className="space-y-1 mb-6">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={`#${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center gap-3 group justify-between"
            >
              <span className="text-sm text-text-body font-medium group-hover:text-brand-blue group-hover:underline">
                {link.label}
              </span>
              <div
                className="w-16 h-16 shrink-0 bg-white rounded-sm shadow-md border border-gray-200 p-1"
                style={{
                  transform: 'skewY(10deg)',
                  transformOrigin: 'center center',
                }}
              >
                <img
                  src={link.src}
                  alt={link.alt}
                  className="w-full h-full object-cover rounded-sm"
                  loading="lazy"
                />
              </div>
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
              className="flex-1 min-w-0 px-2 py-1 text-sm border border-border-light rounded-sm focus:outline-none focus:border-brand-blue"
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
              className="flex-1 min-w-0 px-2 py-1 text-sm border border-border-light rounded-sm focus:outline-none focus:border-brand-blue"
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
