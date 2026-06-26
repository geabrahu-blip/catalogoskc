import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

export default function ProductCard({ product, onAddToCart }) {
  // Use a fallback image if image is empty or missing
  const imageUrl = product.image || 'https://via.placeholder.com/300x300?text=Sin+Imagen';

  // Convertir los precios a números para evitar problemas con datos antiguos guardados como texto
  const comparePriceNum = Number(product.comparePrice) || 0;
  const sellingPriceNum = Number(product.sellingPrice) || 0;
  const priceBsNum = Number(product.priceBs) || 0;

  // Validar si existe descuento y si el precio de comparación es mayor al de venta
  const hasDiscount = comparePriceNum > 0 && comparePriceNum > sellingPriceNum;

  // Calcular el porcentaje de descuento redondeado
  const discountPercentage = hasDiscount
    ? Math.round(((comparePriceNum - sellingPriceNum) / comparePriceNum) * 100)
    : 0;

  const currentPrice = sellingPriceNum > 0 ? sellingPriceNum : priceBsNum;

  return (
    <div className="bg-white rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col h-full border border-gray-100 relative p-3 mt-3">

      {/* Badge de Oferta desplazado hacia arriba y con animación */}
      {hasDiscount && (
        <div className="absolute -top-3 right-3 z-20 animate-pulse bg-red-500 text-white text-[11px] font-black px-3 py-1.5 rounded-full shadow-md tracking-wide">
          -{discountPercentage}% OFERTA
        </div>
      )}

      {/* Imagen con contenedor que simula el fondo de la imagen de referencia */}
      <div className="relative w-full aspect-square rounded-2xl bg-gray-50 overflow-hidden flex items-center justify-center mt-1">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-2 pt-5 flex flex-col flex-grow">
        {/* Marca */}
        <p className="text-[11px] font-bold text-[#D4AF37] mb-1 uppercase tracking-wider">{product.brand}</p>

        {/* Título */}
        <h3 className="text-[14px] leading-tight font-bold text-gray-900 mb-3 flex-grow line-clamp-3">
          {product.name}
        </h3>

        {/* Pastillas de Categoría / Presentación */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.presentation && (
            <span className="text-[10px] font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full">
              {product.presentation}
            </span>
          )}
          {product.category && (
            <span className="text-[10px] font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full">
              {product.category}
            </span>
          )}
        </div>

        {/* Contenedor Inferior: Precio y Botón */}
        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Precio</span>
            {hasDiscount ? (
              <>
                <span className="text-[13px] text-gray-500 line-through decoration-gray-400 decoration-1 font-medium leading-none mb-1">
                  Bs. {comparePriceNum.toFixed(2)}
                </span>
                <span className="text-[26px] font-black text-red-600 leading-none">
                  Bs. {currentPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <>
                <span className="text-[26px] font-black text-skc-purple leading-none mt-1">
                  Bs. {currentPrice.toFixed(2)}
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-skc-purple hover:bg-opacity-90 text-white w-12 h-12 flex items-center justify-center rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-skc-purple focus:ring-opacity-50 shadow-md flex-shrink-0"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <FaCartPlus className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
