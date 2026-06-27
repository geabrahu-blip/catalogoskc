import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="bg-skc-purple-dark rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col h-full border border-white/10 relative p-3 animate-pulse">
      {/* Imagen Placeholder */}
      <div className="relative w-full aspect-square rounded-2xl bg-white/10 overflow-hidden flex items-center justify-center mb-5 border border-white/5">
      </div>

      <div className="p-2 pt-0 flex flex-col flex-grow">
        {/* Marca Placeholder */}
        <div className="h-3 bg-white/10 rounded w-1/3 mb-2"></div>

        {/* Título Placeholder */}
        <div className="h-5 bg-white/10 rounded w-full mb-1"></div>
        <div className="h-5 bg-white/10 rounded w-4/5 mb-4"></div>

        {/* Pastillas Placeholder */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-white/10 rounded-lg w-16"></div>
          <div className="h-6 bg-white/10 rounded-lg w-20"></div>
        </div>

        {/* Contenedor Inferior: Precio y Botón Placeholder */}
        <div className="flex items-end justify-between mt-auto pt-4">
          <div className="flex flex-col w-1/2">
            <div className="h-2 bg-white/10 rounded w-1/2 mb-1"></div>
            <div className="h-6 bg-white/10 rounded w-full"></div>
          </div>

          <div className="bg-white/10 w-12 h-12 rounded-2xl flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
}
