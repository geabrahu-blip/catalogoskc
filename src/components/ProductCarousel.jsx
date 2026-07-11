import React from 'react';
import ProductCard from './ProductCard';

export default function ProductCarousel({ title, products, onAddToCart, onViewDetails }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="w-full my-6">
      <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-skc-purple-dark to-skc-copper mb-4 pl-2 uppercase tracking-wide">
        {title}
      </h2>

      {/* Contenedor del Carrusel */}
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar">
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