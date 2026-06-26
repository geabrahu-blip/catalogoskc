import React from 'react';
import { FaTimes } from 'react-icons/fa';

export default function ProductModal({ product, onClose }) {
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
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[2rem] shadow-2xl relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden z-10 animate-fade-in-up">

        {/* Header con botón cerrar */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="bg-white bg-opacity-80 hover:bg-gray-100 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-skc-purple"
            aria-label="Cerrar detalles del producto"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="overflow-y-auto p-0 md:flex flex-col md:flex-row">

          {/* Imagen de Producto */}
          <div className="relative w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6 min-h-[300px]">
             <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-contain max-h-[400px] mix-blend-multiply"
                loading="lazy"
              />
          </div>

          {/* Detalles e Información Básica */}
          <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col">

            {/* Categorías / Presentación */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.presentation && (
                <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {product.presentation}
                </span>
              )}
              {product.category && (
                <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              )}
            </div>

            {/* Marca y Nombre */}
            <p className="text-sm font-bold text-[#D4AF37] mb-2 uppercase tracking-wider">{product.brand}</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h2>

            {/* Precio */}
            <div className="mb-6">
              {hasDiscount ? (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through decoration-gray-400 decoration-1 font-medium mb-1">
                    Bs. {comparePriceNum.toFixed(2)}
                  </span>
                  <span className="text-3xl font-black text-red-600 leading-none">
                    Bs. {currentPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-black text-skc-purple leading-none block">
                  Bs. {currentPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Detalles Específicos Skincare (Opcionales) */}
            {hasSkincareDetails && (
              <div className="mt-4 border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Detalles del Producto</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  {product.skinType && (
                    <li>
                      <span className="font-bold text-skc-purple block mb-0.5">Tipo de Piel:</span>
                      <span className="leading-relaxed">{product.skinType}</span>
                    </li>
                  )}
                  {product.benefits && (
                    <li>
                      <span className="font-bold text-skc-purple block mb-0.5">Beneficios:</span>
                      <span className="leading-relaxed">{product.benefits}</span>
                    </li>
                  )}
                  {product.keyIngredients && (
                    <li>
                      <span className="font-bold text-skc-purple block mb-0.5">Ingredientes Clave:</span>
                      <span className="leading-relaxed">{product.keyIngredients}</span>
                    </li>
                  )}
                  {product.usage && (
                    <li>
                      <span className="font-bold text-skc-purple block mb-0.5">Modo de Uso:</span>
                      <span className="leading-relaxed">{product.usage}</span>
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
