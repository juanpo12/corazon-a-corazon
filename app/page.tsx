"use client";

import { useState } from "react";
import Hero from "@/components/hero";
import Presenters from "@/components/presenters";
import TicketModal from "@/components/ticket-modal";
import Footer from "@/components/footer";
import LazyMap from "@/components/lazy-map";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="w-full bg-black bg-veins text-white overflow-hidden">
      <Hero onBuyClick={() => setIsModalOpen(true)} />
      <p className="text-center mx-auto max-w-3xl sm:max-w-4xl text-base sm:text-lg md:text-xl leading-relaxed tracking-wide text-gray-200 mb-6 italic">
        Aconteció un día que Jesús estaba enseñando y el poder del Señor estaba
        con él para sanar. S. Lucas 5:17.
      </p>
      <p className="text-center mx-auto max-w-3xl sm:max-w-4xl text-base sm:text-lg md:text-xl leading-relaxed tracking-wide text-gray-200 mb-10">
        Ese mismo poder no quedó en el pasado. Ese mismo poder está vivo. Ese
        mismo poder está en nosotros. Este es el momento de permitir que la
        Palabra llegue profundo… De Corazón a Corazón. ¡Es el tiempo donde la
        palabra y el poder se unen para traer vida, sanidad y propósito!
      </p>
      <Presenters />
      <section className="w-full bg-black bg-veins px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold text-center mb-4 text-rose-500">
            Preguntas frecuentes
          </h2>
          <p className="font-sans font-semibold text-center text-gray-400 mb-12 sm:mb-16 text-sm sm:text-base">
            INFORMACIÓN CLAVE SOBRE EL EVENTO
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-zinc-900/40 border border-rose-500/10 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">¿Dónde?</h3>
              <p className="text-gray-300">
                Av. Brig. Gral. Juan Manuel de Rosas 4357, San Justo, Buenos
                Aires. Iglesia Cristo La Solución.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-rose-500/10 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                ¿Cuándo?
              </h3>
              <p className="text-gray-300">
                16 y 17 de Febrero de 2026.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-rose-500/10 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                ¿A qué hora?
              </h3>
              <p className="text-gray-300">
                Ambos dias a las 16:00.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-rose-500/10 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                ¿Instalaciones?
              </h3>
              <p className="text-gray-300">
                Auditorio climatizado, a metros del centro de la ciudad de San
                Justo, accesos para personas con movilidad reducida y sector
                de venta de comida.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <LazyMap
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.7526004077745!2d-58.56511212445445!3d-34.68619297292483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc623af501339%3A0xc605a8a195d8ce69!2sAv.%20Brig.%20Gral.%20Juan%20Manuel%20de%20Rosas%204357%2C%20B1754FVB%20San%20Justo%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1757106329998!5m2!1ses-419!2sar"
          title="Ubicación Cristo La Solución"
          className="w-full h-96 sm:h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl"
        />
      </div>
      </section>
      <Footer />
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
