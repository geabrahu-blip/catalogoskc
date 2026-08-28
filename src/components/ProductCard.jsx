import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

export default function ProductCard({ product, onAddToCart, onViewDetails }) {
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
    <div className="bg-gradient-to-br from-skc-purple to-skc-purple-dark rounded-[1.2rem] shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col h-full border border-white/10 relative p-2 mt-2">

      {/* Badge de Oferta desplazado hacia arriba y con animación */}
      {hasDiscount && (
        <div className="absolute -top-2 right-2 z-20 animate-pulse bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-md tracking-wide">
          -{discountPercentage}% OFERTA
        </div>
      )}

      {/* Sección Clickable para Ver Detalles */}
      <div
        className="cursor-pointer flex-grow flex flex-col"
        onClick={() => onViewDetails && onViewDetails(product)}
      >
        {/* Imagen con contenedor que simula el fondo de la imagen de referencia */}
        <div className="relative w-full aspect-square rounded-xl bg-transparent border border-white/20 overflow-hidden flex items-center justify-center mt-0">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
            loading="lazy"
          />
        </div>

        <div className="p-1 pt-3 flex flex-col flex-grow">
          {/* Marca */}
          <p className="text-[10px] font-bold text-[#D4AF37] mb-1 uppercase tracking-wider">{product.brand}</p>

          {/* Título */}
          <h3 className="text-[13px] leading-tight font-bold text-white mb-2 flex-grow line-clamp-2 hover:text-gray-200 transition-colors">
            {product.name}
          </h3>

          {/* Pastillas de Categoría / Presentación */}
          <div className="flex flex-wrap gap-1 mb-2">
            {product.presentation && (
              <span className="text-[10px] font-semibold text-white bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full">
                {product.presentation}
              </span>
            )}
            {product.category && (
              <span className="text-[10px] font-semibold text-white bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full">
                {product.category}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Contenedor Inferior: Precio y Botón (No Clickable para Detalles) */}
      <div className="px-1 pb-1 flex items-end justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-wider mb-0.5">Precio</span>
            {hasDiscount ? (
              <>
                <span className="text-[11px] text-gray-300 line-through decoration-gray-300 decoration-2 font-medium leading-none mb-1">
                  Bs. {comparePriceNum.toFixed(2)}
                </span>
                <span className="text-[20px] md:text-[22px] font-black text-[#D4AF37] leading-none">
                  Bs. {currentPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <>
                <span className="text-[20px] md:text-[22px] font-black text-white leading-none mt-1">
                  Bs. {currentPrice.toFixed(2)}
                </span>
              </>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); // Evitar que el click en "Añadir al carrito" abra el modal
              onAddToCart(product, false);
            }}
            className="bg-skc-copper hover:bg-opacity-90 text-white w-10 h-10 flex items-center justify-center rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-skc-copper focus:ring-opacity-50 shadow-md flex-shrink-0"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <FaCartPlus className="text-lg" />
          </button>
        </div>
    </div>
  );
}
