import { NextResponse } from "next/server"
import { createTicketPreference } from "@/lib/mercadopago"

export async function POST(req: Request) {
  try {
    const access = process.env.MERCADOPAGO_ACCESS_TOKEN
    if (!access) {
      return NextResponse.json(
        { error: "MERCADOPAGO_ACCESS_TOKEN no configurado" },
        { status: 500 }
      )
    }

    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: "JSON inválido" }, { status: 400 })
    }

    const quantity = Number(body.quantity ?? 1)
    const payer = body.payer ?? undefined

    // Precio y moneda: ajusta si corresponde
    const price = Number(body.price)
    const currency = String(body.currency ?? "ARS")

    const pref = await createTicketPreference({
      quantity,
      price,
      currency,
      title: body.title ?? "Entrada de evento",
      payer,
    })

    return NextResponse.json({
      id: pref.id,
      init_point: pref.init_point,
      sandbox_init_point: pref.sandbox_init_point,
      external_reference: pref.external_reference,
    })
  } catch (err: any) {
    const message = err?.message || "Error creando preferencia"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}