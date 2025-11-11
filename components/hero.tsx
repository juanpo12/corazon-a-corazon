"use client"

import Image from "next/image"
import { Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ["latin"], weight: "600" })

export default function Hero({ onBuyClick }: { onBuyClick: () => void }) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20">
      {/* Heart SVG */}
      <div className="mb-12 flex items-center justify-center">
        <Image src={"/de corazoDn a corazon 2026-03.png"} width={420} height={420} alt="De corazón a corazón"/>
      </div>

      {/* Description */}
      <p className={`text-base sm:text-lg text-gray-300 text-center max-w-2xl mb-4 uppercase font-semibold ${poppins.className}`}>
        Conferencia anual Cristo la solucion San Justo
      </p>

      {/* Red underline and subtitle block (closer to PNG layout) */}
      <div className="w-full max-w-5xl border-b-4 border-red-600 mb-3"></div>
      <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify- gap-4 text-white mb-12">
        {/* Left: Palabra y Poder decorative */}
        <p
          className="text-3xl sm:text-5xl leading-none"
          style={{ fontFamily: '"AwesomeLathusca-Regular", Poppins, sans-serif' }}
        >
          PALABRA y PODER
        </p>

        {/* Right: Date and venue */}
        <div className="text-right">
          <p className="uppercase tracking-widest text-base sm:text-xl text-gray-200">
            16 Y 17 DE FEBRERO 16HS
          </p>
          <p className="uppercase tracking-wide text-xs sm:text-sm text-gray-300">
            AUDITORIO CRISTO LA SOLUCIÓN SAN JUSTO
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onBuyClick}
        className="px-8 sm:px-10 py-3 sm:py-4 bg-rose-500 hover:bg-rose-600 text-white text-lg font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105"
      >
        Adquirir Entrada
      </button>
    </section>
  )
}
