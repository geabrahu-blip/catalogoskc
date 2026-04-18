import React from 'react';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import storePhoto from '../assets/store-photo.jpeg';

export default function FindUs() {
  return (
    <section className="mt-16 mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-skc-purple px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FaMapMarkerAlt />
          Dónde encontrarnos
        </h2>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Store Photo */}
        <div className="w-full md:w-1/2">
          <img
            src={storePhoto}
            alt="Victoria's Shop"
            className="w-full h-full object-cover min-h-[300px]"
          />
        </div>

        {/* Info & Map */}
        <div className="w-full md:w-1/2 flex flex-col p-6 space-y-6">

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Victoria's Shop</h3>
            <p className="text-gray-600 mb-4">
              Visítanos para descubrir todos nuestros productos en persona. Te asesoramos para que encuentres lo que necesitas.
            </p>

            <div className="flex items-start gap-3 text-gray-700 mb-3">
              <FaClock className="mt-1 text-skc-purple" />
              <div>
                <p className="font-semibold">Horarios de Atención</p>
                <p className="text-sm">Lunes a Sábado: 09:00 - 20:00</p>
                <p className="text-sm">Domingo: Cerrado</p>
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-xl overflow-hidden border border-gray-200">
            {/* Embed Google Maps */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115286.07925186482!2d-63.25055042838396!3d-17.76011409276901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e81b672727dd%3A0xc540306733ecab!2sVictoria&#39;s%20Shop!5e0!3m2!1ses-419!2sbo!4v1713460000000!5m2!1ses-419!2sbo"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '200px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Victoria's Shop"
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
    </section>
  );
}
