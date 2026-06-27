import React from 'react';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function FindUs() {
  return (
    <section className="mt-16 mb-8 bg-skc-card rounded-2xl shadow-sm border border-skc-copper/10 overflow-hidden">
      <div className="bg-gradient-to-r from-skc-purple to-skc-purple-dark px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaMapMarkerAlt />
          Nuestras Sucursales
        </h2>
      </div>

      <div className="flex flex-col gap-8 p-6">
        {/* Sucursal Centro */}
        <div className="flex flex-col lg:flex-row gap-6 border-b border-skc-copper/10 pb-8">
          <div className="w-full lg:w-1/2">
            <img
              src="/sucursal-centro.jpeg"
              alt="Victoria's Shop - Sucursal Centro"
              className="w-full h-64 lg:h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Sucursal Centro</h3>

            <div className="flex items-start gap-3 text-skc-purple-dark bg-skc-purple-dark/10 p-4 rounded-xl border border-skc-purple-dark/20">
              <FaClock className="mt-1 text-xl" />
              <div>
                <p className="font-bold text-lg">Horarios de Atención</p>
                <p className="text-base font-semibold">Lunes a Sábado: 09:30 - 19:30</p>
                <p className="text-base font-semibold">Domingo: Cerrado</p>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/kjwQV9D9CyJW3T5y8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-skc-surface hover:bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors border border-skc-copper/20"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>

        {/* Sucursal Norte */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <img
              src="/sucursal-norte-v2.jpg"
              alt="Victoria's Shop - Sucursal Norte"
              className="w-full h-64 lg:h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Sucursal Norte</h3>

            <div className="flex items-start gap-3 text-skc-purple-dark bg-skc-purple-dark/10 p-4 rounded-xl border border-skc-purple-dark/20">
              <FaClock className="mt-1 text-xl" />
              <div>
                <p className="font-bold text-lg">Horarios de Atención</p>
                <p className="text-base font-semibold">Martes a Domingo: 09:30 - 19:30</p>
                <p className="text-base font-semibold">Lunes: Cerrado</p>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/t2jfDuZRuqwrjD9X8?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-skc-surface hover:bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors border border-skc-copper/20"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
