import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full">
      {/* Main banner */}
      <div
        className="relative w-full h-48 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #4a148c 0%, #1a237e 40%, #283593 70%, #1a237e 100%)',
        }}
        data-testid="header-banner"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full relative">
            {/* Decorative text overlays mimicking the original */}
            <span className="absolute top-4 left-4 text-white/80 text-3xl font-bold tracking-wider uppercase">
              aromatyczne
            </span>
            <span className="absolute top-4 right-8 text-white/90 text-4xl font-extrabold tracking-widest uppercase">
              szynk<span className="text-yellow-300">a</span>
            </span>
            <span className="absolute bottom-6 left-6 text-white/70 text-2xl font-semibold tracking-wide">
              pyszna lard
            </span>
            {/* Center store image placeholder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-3/5 h-full opacity-60"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                role="img"
                aria-label="Sklep spożywczy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-header bar */}
      <div className="w-full bg-white border-b border-border-light">
        <div className="max-w-[1000px] mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            {/* Brooke Bond logo placeholder */}
            <div className="bg-brand-red text-white px-3 py-1 font-bold text-sm tracking-tight">
              Brooke Bond
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-orange-500 flex items-center justify-center text-xs font-bold text-orange-700"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
          <div className="text-right text-sm text-text-muted">
            <div className="font-semibold text-text-body">Wtorek 26.10.2006</div>
            <div>Imieniny: Janiny i Stefana</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
