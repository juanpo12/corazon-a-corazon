import Link from "next/link"
import { Instagram, Facebook, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black px-4 py-12 border-t border-rose-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-300 text-center">Seguinos en nuestras redes</p>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/cristolasolucionsj/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-pink-600 flex items-center justify-center transition-colors"
            >
              <Instagram className="w-5 h-5 text-white" />
            </Link>
            <Link
              href="https://www.facebook.com/AlfredoDimiro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-blue-600 flex items-center justify-center transition-colors"
            >
              <Facebook className="w-5 h-5 text-white" />
            </Link>
            <Link
              href="https://wa.me/message/IAMHFRO2IBX6B1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-green-600 flex items-center justify-center transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-4">© {new Date().getFullYear()} Cristo La Solución</p>
        </div>
      </div>
    </footer>
  )
}