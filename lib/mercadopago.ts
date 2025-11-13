import { MercadoPagoConfig, Preference } from "mercadopago"

type Payer = {
  name?: string
  surname?: string
  email?: string
  phone?: { area_code?: string; number?: string }
}

export async function createTicketPreference(params: {
  quantity: number
  price: number
  currency?: string
  title?: string
  payer?: Payer
  externalReference?: string
  baseUrl?: string
  eventId?: number
}) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!accessToken) {
    throw new Error("Falta MERCADOPAGO_ACCESS_TOKEN en variables de entorno")
  }

  const client = new MercadoPagoConfig({ accessToken })
  const preference = new Preference(client)

  const {
    quantity,
    price,
    currency = "USD",
    title = "Entrada de evento",
    payer,
    externalReference,
    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    eventId,
  } = params

  const body = {
    items: [
      {
        id: "ticket",
        title,
        quantity,
        unit_price: price,
        currency_id: currency,
      },
    ],
    metadata: {
      quantity,
      eventId,
    },
    payer,
    back_urls: {
      success: `${baseUrl}/mercadopago/success`,
      failure: `${baseUrl}/mercadopago/failure`,
      pending: `${baseUrl}/mercadopago/pending`,
    },
    notification_url: `${baseUrl}/api/mercadopago/webhook`,
    auto_return: "approved" as const,
    external_reference: externalReference ?? crypto.randomUUID(),
    statement_descriptor: "Entradas",
  }

  const res = await preference.create({ body } as any)
  return res
}