"use client"

export default function Hero({ onBuyClick }: { onBuyClick: () => void }) {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20">
      {/* Heart SVG */}
      <div className="mb-12 flex items-center justify-center">
        <svg viewBox="0 0 100 100" width="120" height="120" className="text-rose-500 animate-pulse" fill="currentColor">
          <path d="M50,85 Q15,70 15,50 Q15,35 30,35 Q40,35 50,45 Q60,35 70,35 Q85,35 85,50 Q85,70 50,85 Z" />
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-center mb-8 text-balance leading-tight max-w-4xl">
        De corazón a corazón
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-gray-300 text-center max-w-2xl mb-12">
        Un evento especial donde creadores y pensadores se reúnen para conectar auténticamente
      </p>

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
