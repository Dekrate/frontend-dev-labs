import React, { useState } from 'react';

const images = [
  { id: 1, alt: 'Sklep spożywczy', src: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80' },
  { id: 2, alt: 'Świeże warzywa', src: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=200&q=80' },
  { id: 3, alt: 'Klientka w sklepie', src: 'https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?w=200&q=80' },
];

const Gallery: React.FC = () => {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  const next = () => setIndex((i) => (i < images.length - 1 ? i + 1 : 0));

  return (
    <aside className="w-full md:w-44 shrink-0 flex flex-col items-center gap-2" data-testid="image-gallery" aria-label="Galeria zdjęć">
      <button
        onClick={prev}
        aria-label="Poprzednie zdjęcie"
        className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[12px] border-b-gray-400 hover:border-b-gray-600 transition-colors"
      />

      <div className="w-full">
        {images.map((img, i) => (
          <div
            key={img.id}
            className={`mb-2 ${i === index ? 'ring-2 ring-brand-blue' : 'opacity-70'}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-24 object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <button
        onClick={next}
        aria-label="Następne zdjęcie"
        className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-gray-400 hover:border-t-gray-600 transition-colors"
      />
    </aside>
  );
};

export default Gallery;
