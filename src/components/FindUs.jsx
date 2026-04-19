import React from 'react';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function FindUs() {
  return (
    <section className="mt-16 mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-skc-purple px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaMapMarkerAlt />
          Nuestras Sucursales
        </h2>
      </div>

      <div className="flex flex-col gap-8 p-6">
        {/* Sucursal Centro */}
        <div className="flex flex-col lg:flex-row gap-6 border-b border-gray-100 pb-8">
          <div className="w-full lg:w-1/2">
            <img
              src="/sucursal-centro.jpeg"
              alt="Victoria's Shop - Sucursal Centro"
              className="w-full h-64 lg:h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Sucursal Centro</h3>

            <div className="flex items-start gap-3 text-gray-700">
              <FaClock className="mt-1 text-skc-purple" />
              <div>
                <p className="font-semibold">Horarios de Atención</p>
                <p className="text-sm">Lunes a Sábado: 09:30 - 19:30</p>
                <p className="text-sm">Domingo: Cerrado</p>
              </div>
            </div>

            <div className="flex-1 rounded-xl overflow-hidden border border-gray-200 min-h-[200px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.675713437142!2d-63.1901842!3d-17.7831518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e81b672727dd%3A0xc540306733ecab!2sVictoria&#39;s%20Shop!5e0!3m2!1ses-419!2sbo!4v1713460000000!5m2!1ses-419!2sbo"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Sucursal Centro"
              ></iframe>
            </div>

            <a
              href="https://maps.app.goo.gl/kjwQV9D9CyJW3T5y8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors border border-gray-300"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>

        {/* Sucursal Norte */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <img
              src="/sucursal-norte.jpeg"
              alt="Victoria's Shop - Sucursal Norte"
              className="w-full h-64 lg:h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Sucursal Norte</h3>

            <div className="flex items-start gap-3 text-gray-700">
              <FaClock className="mt-1 text-skc-purple" />
              <div>
                <p className="font-semibold">Horarios de Atención</p>
                <p className="text-sm">Martes a Domingo: 09:30 - 19:30</p>
                <p className="text-sm">Lunes: Cerrado</p>
              </div>
            </div>

            <div className="flex-1 rounded-xl overflow-hidden border border-gray-200 min-h-[200px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115286.07925186482!2d-63.25055042838396!3d-17.76011409276901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e81b672727dd%3A0xc540306733ecab!2sVictoria&#39;s%20Shop!5e0!3m2!1ses-419!2sbo!4v1713460000000!5m2!1ses-419!2sbo"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Sucursal Norte"
              ></iframe>
            </div>

            <a
              href="https://maps.app.goo.gl/t2jfDuZRuqwrjD9X8?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors border border-gray-300"
            >
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
