import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Article from './components/Article';
import Gallery from './components/Gallery';
import Sidebar from './components/Sidebar';

const Footer: React.FC = () => (
  <footer className="w-full bg-brand-blue text-white text-center text-xs py-3 mt-8" data-testid="site-footer">
    &copy; 2006 Sklep spożywczy. Wszelkie prawa zastrzeżone.
  </footer>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Navigation />

      <main className="flex-1 w-full max-w-[1000px] mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Article />
          <Gallery />
          <Sidebar />
        </div>
      </main>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default App;
