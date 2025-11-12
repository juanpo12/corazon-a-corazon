"use client"

import { useState } from "react"
import Hero from "@/components/hero"
import Presenters from "@/components/presenters"
import TicketModal from "@/components/ticket-modal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="w-full bg-black text-white overflow-hidden">
      <Hero onBuyClick={() => setIsModalOpen(true)} />
      <p className="whitespace-pre-line text-center mx-auto max-w-3xl sm:max-w-4xl text-base sm:text-lg md:text-xl leading-relaxed tracking-wide text-gray-200 mb-10">
        Aconteció un día que Jesús estaba enseñando y el poder del Señor estaba con él para sanar. S. Lucas 5:17

        Ese mismo poder no quedó en el pasado.
        Ese mismo poder está vivo.
        Ese mismo poder está en nosotros.

        Este es el momento de permitir que la Palabra llegue profundo… De Corazón a Corazón.

        ¡Es el tiempo donde la palabra  y el poder se unen para traer vida, sanidad y propósito!
      </p>
      <Presenters />
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
