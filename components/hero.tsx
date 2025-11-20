"use client"
import Image from "next/image"
import { Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ["latin"], weight: "600" })

export default function Hero({ onBuyClick }: { onBuyClick: () => void }) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20">
      {/* Heart SVG */}
      <div className="mb-12 flex items-center justify-center">
        <Image src={"/de corazoDn a corazon 2026-03.png"} width={420} height={420} alt="De corazón a corazón" priority sizes="(max-width: 640px) 60vw, 420px"/>
      </div>

      {/* Description */}
      <p className={`text-base sm:text-lg text-gray-300 text-center max-w-2xl mb-4 uppercase font-semibold ${poppins.className}`}>
        Conferencia anual Cristo La Solución San Justo
      </p>

      {/* Red underline and subtitle block (closer to PNG layout) */}
      <div className="w-full max-w-7xl border-b-4 border-red-600 mb-3"></div>
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-center gap-4 text-white mb-12">
        {/* Left: Palabra y Poder decorative */}
        <div className="">
          <Image
            src="/palabraypoder.png"
            alt="Palabra y Poder"
            width={650}
            height={200}
            priority
          />
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
