import React from 'react';
import { FaTimes, FaCartPlus } from 'react-icons/fa';

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const imageUrl = product.image || 'https://via.placeholder.com/600x600?text=Sin+Imagen';
  const comparePriceNum = Number(product.comparePrice) || 0;
  const sellingPriceNum = Number(product.sellingPrice) || 0;
  const priceBsNum = Number(product.priceBs) || 0;

  const hasDiscount = comparePriceNum > 0 && comparePriceNum > sellingPriceNum;
  const currentPrice = sellingPriceNum > 0 ? sellingPriceNum : priceBsNum;

  // Renderiza si al menos uno de los campos de skincare está presente
  const hasSkincareDetails = product.skinType || product.benefits || product.keyIngredients || product.usage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-skc-purple-dark bg-opacity-70 transition-opacity backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Content */}
      <div className="bg-gradient-to-br from-skc-purple to-skc-purple-dark rounded-[2rem] shadow-2xl relative w-full max-w-2xl md:max-w-4xl max-h-[90vh] flex flex-col overflow-hidden z-10 animate-fade-in-up border border-white/10">

        {/* Header con botón cerrar */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Cerrar detalles del producto"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="overflow-y-auto p-0 md:flex flex-col md:flex-row">

          {/* Imagen de Producto */}
          <div className="relative w-full md:w-1/2 bg-transparent border-r border-b md:border-b-0 border-white/10 flex items-center justify-center p-6 min-h-[300px]">
             <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-contain max-h-[400px] rounded-2xl"
                loading="lazy"
              />
          </div>

          {/* Detalles e Información Básica */}
          <div className="p-6 md:p-6 w-full md:w-1/2 flex flex-col justify-center">

            {/* Categorías / Presentación */}
            <div className="flex flex-wrap gap-2 mb-2 md:mb-1">
              {product.presentation && (
                <span className="text-xs font-semibold text-white bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                  {product.presentation}
                </span>
              )}
              {product.category && (
                <span className="text-xs font-semibold text-white bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              )}
            </div>

            {/* Marca y Nombre */}
            <p className="text-sm font-bold text-[#D4AF37] mb-1 md:mb-0.5 uppercase tracking-wider">{product.brand}</p>
            <h2 className="text-2xl font-bold text-white mb-3 md:mb-2 leading-tight">{product.name}</h2>

            {/* Precio y Botón de Añadir */}
            <div className="mb-4 md:mb-3 flex items-center justify-between">
              <div>
                {hasDiscount ? (
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 line-through decoration-gray-400 decoration-1 font-medium mb-0.5">
                      Bs. {comparePriceNum.toFixed(2)}
                    </span>
                    <span className="text-3xl font-black text-red-400 leading-none">
                      Bs. {currentPrice.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-black text-white leading-none block">
                    Bs. {currentPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAddToCart) onAddToCart(product, true);
                }}
                className="bg-skc-copper hover:bg-opacity-90 text-white w-14 h-14 flex items-center justify-center rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-skc-copper focus:ring-opacity-50 shadow-md flex-shrink-0 ml-4"
                aria-label={`Añadir ${product.name} al carrito`}
              >
                <FaCartPlus className="text-2xl text-white" />
              </button>
            </div>

            {/* Detalles Específicos Skincare (Opcionales) */}
            {hasSkincareDetails && (
              <div className="mt-2 md:mt-1 border-t border-white/20 pt-4 md:pt-3">
                <h3 className="text-lg font-bold text-white mb-2">Detalles del Producto</h3>
                <ul className="space-y-2 md:space-y-1 text-sm text-gray-200">
                  {product.skinType && (
                    <li>
                      <span className="font-bold text-white md:inline md:mr-1 block mb-0.5 md:mb-0">Tipo de Piel:</span>
                      <span className="leading-relaxed text-gray-300">{product.skinType}</span>
                    </li>
                  )}
                  {product.benefits && (
                    <li>
                      <span className="font-bold text-white md:inline md:mr-1 block mb-0.5 md:mb-0">Beneficios:</span>
                      <span className="leading-relaxed text-gray-300">{product.benefits}</span>
                    </li>
                  )}
                  {product.keyIngredients && (
                    <li>
                      <span className="font-bold text-white md:inline md:mr-1 block mb-0.5 md:mb-0">Ingredientes Clave:</span>
                      <span className="leading-relaxed text-gray-300">{product.keyIngredients}</span>
                    </li>
                  )}
                  {product.usage && (
                    <li>
                      <span className="font-bold text-white md:inline md:mr-1 block mb-0.5 md:mb-0">Modo de Uso:</span>
                      <span className="leading-relaxed text-gray-300">{product.usage}</span>
                    </li>
                  )}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
