import React, { useState } from 'react';

const navItems = [
  'Firma',
  'Informacje',
  'Oferta',
  'Promocje',
  'Radość zakupów',
  'Firma',
  'Informacje',
  'Oferta',
  'Promocje',
  'Mapa strony',
];

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full bg-nav-bg border-y border-orange-400" data-testid="main-navigation">
      <div className="max-w-[1000px] mx-auto px-4">
        <div className="flex items-center justify-between md:justify-start">
          {/* Desktop nav */}
          <ul className="hidden md:flex flex-wrap items-center">
            {navItems.map((item, idx) => (
              <li key={`${item}-${idx}`}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block px-3 py-2 text-nav-text text-sm font-semibold hover:bg-orange-600 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <button
                aria-label="Szukaj"
                className="p-2 text-nav-text hover:bg-orange-600 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-nav-text"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M3 12h18" />
                  <path d="M3 6h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <ul className="md:hidden pb-2">
            {navItems.map((item, idx) => (
              <li key={`mobile-${item}-${idx}`}>
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block px-3 py-2 text-nav-text text-sm font-semibold hover:bg-orange-600 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="px-3 py-2">
              <input
                type="text"
                placeholder="Szukaj..."
                className="w-full px-2 py-1 text-sm rounded"
                aria-label="Szukaj"
              />
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
