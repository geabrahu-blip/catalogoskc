import React from 'react';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';

export default function Header({
  cartItemCount,
  onCartClick,
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategorySelect,
  brands,
  selectedBrand,
  onBrandSelect,
  searchResults = [],
  onProductSelect
}) {
  return (
    <header className="bg-gradient-to-r from-skc-purple to-skc-purple-dark text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        {/* Top Row: Logo, Search, Cart */}
        <div className="flex items-center justify-between gap-3 mb-3">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src="/logo.png" alt="Victoria's Shop" className="h-10 w-10 rounded-full object-cover" />
          </div>

          {/* Search Bar */}
          <div className="flex-grow max-w-md relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <FaSearch className="text-skc-copper text-sm" />
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-9 pr-3 py-1.5 rounded-full border-2 border-transparent shadow-inner focus:outline-none focus:border-skc-copper focus:ring-2 focus:ring-skc-copper/50 text-gray-800 bg-white text-sm relative z-10"
              value={searchTerm}
              onChange={onSearchChange}
            />

            {/* Autocomplete Dropdown */}
            {searchTerm && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100 max-h-[60vh] overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      if (onProductSelect) {
                        onProductSelect(product);
                      }
                    }}
                    className="flex items-center p-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="w-12 h-12 flex-shrink-0 bg-transparent rounded-md overflow-hidden mr-3">
                      <img
                        src={product.image || 'https://via.placeholder.com/150'}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate" title={product.name}>
                        {product.name}
                      </p>
                      <p className="text-xs text-skc-purple-dark font-medium truncate" title={product.brand}>
                        {product.brand}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchTerm && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl z-50 border border-gray-100 p-4 text-center">
                <p className="text-sm text-gray-500">No se encontraron productos.</p>
              </div>
            )}
          </div>

          {/* Cart Button */}
          <div className="flex-shrink-0">
            <button
              onClick={onCartClick}
              className="relative flex items-center p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
              aria-label="Ver carrito"
            >
              <FaShoppingCart className="text-xl text-skc-white" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-skc-copper rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Row: Categories Carousel (Oculto temporalmente según solicitud) */}
        {/*
        {categories && categories.length > 0 && (
          <div className="flex overflow-x-auto pb-1 hide-scrollbar -mx-4 px-4 gap-2">
            <button
              onClick={() => onCategorySelect('')}
              className={`whitespace-nowrap px-3 py-1 text-xs rounded-full border transition-colors ${
                selectedCategory === ''
                  ? 'bg-skc-copper text-white border-skc-copper font-bold'
                  : 'bg-transparent text-white border-white/50 hover:border-white'
              }`}
            >
              Todos
            </button>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => onCategorySelect(cat)}
                className={`whitespace-nowrap px-3 py-1 text-xs rounded-full border transition-colors ${
                  selectedCategory === cat
                    ? 'bg-skc-copper text-white border-skc-copper font-bold'
                    : 'bg-transparent text-white border-white/50 hover:border-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
        */}
      </div>
    </header>
  );
}
