import React, { useRef, useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductCarousel({ title, products, onAddToCart, onViewDetails, brandName, onViewAll }) {
  const carouselRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    if (!isAutoScrolling || !carouselRef.current || !products || products.length === 0) return;

    const intervalId = setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const firstChild = carousel.children[0];
      if (!firstChild) return;

      // Calculate width of one item + gap (gap-4 is 16px)
      const itemWidth = firstChild.offsetWidth + 16;

      // Check if we are at the end
      if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
        // Go back to the beginning
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll one item to the right
        carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isAutoScrolling, products]);

  const handleInteraction = () => {
    setIsAutoScrolling(false);
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full my-2 md:my-4">
      <div className="flex items-center justify-between mb-2 pl-2 pr-4">
        <h2 className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-skc-purple-dark to-skc-copper uppercase tracking-wide">
          {title}
        </h2>
        {brandName && onViewAll && (
          <button
            onClick={() => onViewAll(brandName)}
            className="text-xs font-bold text-skc-purple-dark bg-skc-copper/10 hover:bg-skc-copper/20 px-3 py-1 rounded-full transition-colors"
          >
            Ver todos
          </button>
        )}
      </div>

      {/* Contenedor del Carrusel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-3 pb-2 snap-x snap-mandatory hide-scrollbar"
        onTouchStart={handleInteraction}
        onMouseDown={handleInteraction}
      >
        {products.map(product => (
          <div
            key={product.id}
            className="w-[42vw] md:w-[280px] flex-shrink-0 snap-start pb-2"
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          </div>
        ))}
      </div>
    </div>
  );
}