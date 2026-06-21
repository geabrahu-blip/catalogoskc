import React from 'react';
import { FaTimes, FaPlus, FaMinus, FaWhatsapp } from 'react-icons/fa';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const WHATSAPP_NUMBER = "59163144471";

  const total = cartItems.reduce((acc, item) => {
    const sellingPriceNum = Number(item.sellingPrice) || 0;
    const priceBsNum = Number(item.priceBs) || 0;
    const price = sellingPriceNum > 0 ? sellingPriceNum : priceBsNum;
    return acc + (price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let rawMessage = `¡Hola Victoria's Shop! Quisiera realizar el siguiente pedido:\n\n`;

    cartItems.forEach(item => {
      const sellingPriceNum = Number(item.sellingPrice) || 0;
      const priceBsNum = Number(item.priceBs) || 0;
      const price = sellingPriceNum > 0 ? sellingPriceNum : priceBsNum;
      rawMessage += `- ${item.quantity}x ${item.name} (Bs. ${price} c/u) = Bs. ${price * item.quantity}\n`;
    });

    rawMessage += `\n*Total: Bs. ${total}*\n\nQuedo atento/a para coordinar la entrega y el pago. ¡Gracias!`;

    const message = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Tu Carrito</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <FaWhatsapp className="text-6xl text-gray-200 mb-4" />
              <p>Tu carrito está vacío.</p>
              <p className="text-sm mt-2">¡Agrega algunos productos para comprar!</p>
            </div>
          ) : (
            cartItems.map(item => {
              const sellingPriceNum = Number(item.sellingPrice) || 0;
              const priceBsNum = Number(item.priceBs) || 0;
              const price = sellingPriceNum > 0 ? sellingPriceNum : priceBsNum;
              return (
                <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-20 h-20 bg-white rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image || 'https://via.placeholder.com/150'}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-skc-purple font-bold mt-1">Bs. {price}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg transition"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg transition"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-xs text-red-500 hover:text-red-700 underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">Total Estimado</span>
              <span className="text-2xl font-bold text-skc-purple">Bs. {total}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="text-xl" />
              Hacer pedido por WhatsApp
            </button>
            <p className="text-xs text-center text-gray-400 mt-3">
              Serás redirigido a WhatsApp para confirmar tu pedido y coordinar pago/entrega.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
