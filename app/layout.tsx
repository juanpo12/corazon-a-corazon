import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { awesomeLathusca } from "./fonts"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "De Corazón a Corazón - Evento Especial",
  description:
    "Un evento donde creadores y pensadores se reúnen para conectar auténticamente. Descubre a nuestros presentadores y adquiere tu entrada.",
  icons: {
    icon: "/de corazoDn a corazon 2026-03.png",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${awesomeLathusca.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
