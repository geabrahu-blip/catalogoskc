import React, { useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaTimes, FaPhoneAlt } from 'react-icons/fa';

export default function FloatingLocations() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-skc-purple to-skc-purple-dark text-white p-4 rounded-full shadow-lg border-2 border-[#D4AF37] hover:scale-105 transition-transform flex items-center justify-center"
        aria-label="Ubicaciones"
      >
        <FaMapMarkerAlt className="text-2xl text-[#D4AF37]" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-gradient-to-br from-skc-purple to-skc-purple-dark border border-white/20 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-skc-purple-dark px-6 py-4 border-b border-white/10 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#D4AF37]" />
                Nuestras Sucursales
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Cerrar ubicaciones"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-6 p-6">
              {/* Sucursal Centro */}
              <div className="flex flex-col md:flex-row gap-6 border-b border-white/10 pb-6">
                <div className="w-full md:w-1/2">
                  <img
                    src="/sucursal-centro-v2.jpeg"
                    alt="Victoria's Shop - Sucursal Centro"
                    className="w-full h-48 md:h-full object-cover rounded-xl border border-white/10"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col space-y-4 justify-center">
                  <h3 className="text-xl font-bold text-[#D4AF37]">Sucursal Centro</h3>

                  <div className="flex flex-col gap-3 text-white">
                    <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
                      <FaClock className="mt-1 text-lg text-gray-200" />
                      <div>
                        <p className="font-bold">Horarios de Atención</p>
                        <p className="text-sm text-gray-200">Lunes a Sábado: 09:30 - 19:30</p>
                        <p className="text-sm text-gray-200">Domingo: Cerrado</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
                      <FaPhoneAlt className="text-lg text-gray-200" />
                      <span className="font-bold">63144471</span>
                    </div>
                  </div>

                  <a
                    href="https://maps.app.goo.gl/kjwQV9D9CyJW3T5y8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center bg-[#D4AF37] hover:bg-[#b5952f] text-skc-purple-dark font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Abrir en Google Maps
                  </a>
                </div>
              </div>

              {/* Sucursal Norte */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <img
                    src="/sucursal-norte-v2.jpg"
                    alt="Victoria's Shop - Sucursal Norte"
                    className="w-full h-48 md:h-full object-cover rounded-xl border border-white/10"
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col space-y-4 justify-center">
                  <h3 className="text-xl font-bold text-[#D4AF37]">Sucursal Norte</h3>

                  <div className="flex flex-col gap-3 text-white">
                    <div className="flex items-start gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
                      <FaClock className="mt-1 text-lg text-gray-200" />
                      <div>
                        <p className="font-bold">Horarios de Atención</p>
                        <p className="text-sm text-gray-200">Martes a Domingo: 09:30 - 19:30</p>
                        <p className="text-sm text-gray-200">Lunes: Cerrado</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
                      <FaPhoneAlt className="text-lg text-gray-200" />
                      <span className="font-bold">63144471</span>
                    </div>
                  </div>

                  <a
                    href="https://maps.app.goo.gl/t2jfDuZRuqwrjD9X8?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center bg-[#D4AF37] hover:bg-[#b5952f] text-skc-purple-dark font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Abrir en Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
