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
      <p className="whitespace-pre-line text-center mx-auto max-w-3xl sm:max-w-4xl text-base sm:text-lg md:text-xl leading-relaxed tracking-wide text-gray-200 mb-10">
        Aconteció un día que Jesús estaba enseñando y el poder del Señor estaba con él para sanar. S. Lucas 5:17

        Ese mismo poder no quedó en el pasado.
        Ese mismo poder está vivo.
        Ese mismo poder está en nosotros.

        Este es el momento de permitir que la Palabra llegue profundo… De Corazón a Corazón.

        ¡Es el tiempo donde la palabra  y el poder se unen para traer vida, sanidad y propósito!
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
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
