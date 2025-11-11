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
      <Presenters />
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
