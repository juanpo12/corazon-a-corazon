"use client"
import { useState } from "react"
import { useMercadoPago } from "@/lib/hooks/use-mercadopago"
import { X } from "lucide-react"

interface TicketModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TicketModal({ isOpen, onClose }: TicketModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    quantity: "1",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { createTicketPayment, loading } = useMercadoPago()

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    try {
      await createTicketPayment({
        quantity: Number(formData.quantity),
        name: formData.name,
        email: formData.email,
      })
      // Si estamos en servidor sandbox/producción, se redirige automáticamente
    } catch (err) {
      console.error(err)
      setIsSubmitted(false)
      alert("No se pudo iniciar el pago con Mercado Pago. Intenta nuevamente.")
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
        <div className="bg-zinc-900 rounded-xl max-w-md w-full border border-rose-500/20 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 text-rose-500">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">¡Gracias!</h3>
                <p className="text-gray-400">Tu entrada ha sido adquirida exitosamente.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl font-serif font-light mb-2">Adquirir Entrada</h2>
                <p className="text-gray-400 mb-6">Completa tus datos para asegurar tu lugar en este evento especial</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre Completo</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Tu nombre"
                      className="w-full px-4 py-2 bg-zinc-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-rose-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="tu@email.com"
                      className="w-full px-4 py-2 bg-zinc-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-rose-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Cantidad de Entradas</label>
                    <select
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-zinc-800 border border-gray-600 rounded-lg text-white focus:border-rose-500 focus:outline-none transition-colors"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Entrada" : "Entradas"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Info */}
                  <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 my-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Precio por entrada:</span>
                      <span className="font-semibold">$49</span>
                    </div>
                    <div className="border-t border-rose-500/20 mt-3 pt-3 flex justify-between items-center text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-rose-500">${Number(formData.quantity) * 49}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors duration-300 mt-6"
                  >
                    {loading ? "Conectando con Mercado Pago..." : "Pagar con Mercado Pago"}
                  </button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Al comprar aceptas nuestros términos y condiciones
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
