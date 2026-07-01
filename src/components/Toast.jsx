import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function Toast({ message, isVisible, onClose, duration = 3000 }) {
  const [isRendered, setIsRendered] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      const showTimer = setTimeout(() => setIsRendered(true), 0); // avoid synchronous setting warning
      const hideTimer = setTimeout(() => {
        onClose();
      }, duration);
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    } else {
      // Allow time for exit animation before removing from DOM
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed top-20 right-4 z-[60] transition-all duration-300 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="bg-gradient-to-r from-skc-purple to-skc-purple-dark text-white px-4 py-2 md:px-6 md:py-3 rounded-xl shadow-xl border border-white/20 flex items-center gap-3">
        <FaCheckCircle className="text-skc-copper text-lg md:text-xl flex-shrink-0" />
        <span className="font-semibold text-xs md:text-sm whitespace-nowrap">{message}</span>
      </div>
    </div>
  );
}
