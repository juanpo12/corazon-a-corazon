"use client"

import { useState } from "react"
import Hero from "@/components/hero"
import Presenters from "@/components/presenters"
import TicketModal from "@/components/ticket-modal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="w-full bg-black bg-veins text-white overflow-hidden">
      <Hero onBuyClick={() => setIsModalOpen(true)} />
      <p className="text-center mx-auto max-w-3xl sm:max-w-4xl text-base sm:text-lg md:text-xl leading-relaxed tracking-wide text-gray-200 mb-6 italic">
        Aconteció un día que Jesús estaba enseñando y el poder del Señor estaba con él para sanar. S. Lucas 5:17.
      </p>
      <p className="text-center mx-auto max-w-3xl sm:max-w-4xl text-base sm:text-lg md:text-xl leading-relaxed tracking-wide text-gray-200 mb-10">
        Ese mismo poder no quedó en el pasado. Ese mismo poder está vivo. Ese mismo poder está en nosotros.
        Este es el momento de permitir que la Palabra llegue profundo… De Corazón a Corazón.
        ¡Es el tiempo donde la palabra y el poder se unen para traer vida, sanidad y propósito!
      </p>
      <div className="flex justify-center items-center w-full h-1/2">
         <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.7526004077745!2d-58.56511212445445!3d-34.68619297292483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc623af501339%3A0xc605a8a195d8ce69!2sAv.%20Brig.%20Gral.%20Juan%20Manuel%20de%20Rosas%204357%2C%20B1754FVB%20San%20Justo%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1757106329998!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Cristo La Solución"
            />
      </div>
      </div>
      <Presenters />
      <section className="w-full bg-black bg-veins px-4 py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-center mb-4 text-rose-500">
            Preguntas frecuentes
          </h2>
          <p className="text-center text-gray-400 mb-12 sm:mb-16 text-sm sm:text-base">
            Información clave sobre el evento
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-zinc-900/40 border border-rose-500/10 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">¿Dónde?</h3>
              <p className="text-gray-300">Av. Brig. Gral. Juan Manuel de Rosas 4357, San Justo, Buenos Aires. Iglesia Cristo La Solución.</p>
            </div>

            <div className="bg-zinc-900/40 border border-rose-500/10 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">¿Cuándo?</h3>
              <p className="text-gray-300">Marzo 2026. La fecha exacta se confirma al acercarse el evento.</p>
            </div>

            <div className="bg-zinc-900/40 border border-rose-500/10 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">¿A qué hora?</h3>
              <p className="text-gray-300">Puertas 18:00. Inicio 19:00. Cierre estimado 22:00.</p>
            </div>

            <div className="bg-zinc-900/40 border border-rose-500/10 rounded-lg p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">¿Instalaciones?</h3>
              <p className="text-gray-300">Auditorio climatizado, estacionamiento cercano, accesos para personas con movilidad reducida y sector de hidratación.</p>
            </div>
          </div>
        </div>
      </section>
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
