import React from 'react';
import { FaShoppingCart, FaBalanceScale } from 'react-icons/fa'; // FaBalanceScale as Libra sign proxy

export default function Header({ cartItemCount, onCartClick }) {
  return (
    <header className="bg-skc-purple text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <FaBalanceScale className="text-skc-gold text-3xl" title="Libra Logo" />
          <h1 className="text-2xl font-bold text-skc-white drop-shadow-sm">
            Victoria's Shop
          </h1>
        </div>

        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="relative flex items-center p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
          aria-label="Ver carrito"
        >
          <FaShoppingCart className="text-2xl text-skc-white" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-skc-purple transform translate-x-1/4 -translate-y-1/4 bg-skc-gold rounded-full">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
