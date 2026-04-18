import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

export default function ProductCard({ product, onAddToCart }) {
  // Use a fallback image if image is empty or missing
  const imageUrl = product.image || 'https://via.placeholder.com/300x300?text=Sin+Imagen';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      <div className="relative w-full pt-[100%] bg-white">
        <img
          src={imageUrl}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">{product.brand}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex-grow line-clamp-2">
          {product.name} {product.presentation && `- ${product.presentation}`}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Precio</span>
            <span className="text-xl font-bold text-skc-purple">
              Bs. {product.sellingPrice || product.priceBs || 0}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-skc-purple hover:bg-opacity-90 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-skc-purple focus:ring-opacity-50"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <FaCartPlus className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
