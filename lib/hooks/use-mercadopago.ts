"use client"
import { useCallback, useState } from "react"

type CreatePaymentInput = {
  quantity: number
  name?: string
  email?: string
}

export function useMercadoPago() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createTicketPayment = useCallback(async (input: CreatePaymentInput) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: input.quantity,
          payer: input.email || input.name ? { name: input.name, email: input.email } : undefined,
        }),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Error creando preferencia")
      }
      const data = await res.json()
      if (typeof window !== "undefined" && data?.init_point) {
        window.location.href = data.init_point
      }
      return data
    } catch (err: any) {
      setError(err?.message || "Error iniciando pago")
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return { createTicketPayment, loading, error }
}