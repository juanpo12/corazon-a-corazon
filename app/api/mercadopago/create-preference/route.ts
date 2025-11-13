import { NextResponse } from "next/server"
import { createTicketPreference } from "@/lib/mercadopago"
import { db } from "@/db"
import { events } from "@/db/schema"
import { eq } from "drizzle-orm"

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

    // Buscar el evento "de corazon a corazon"; si no existe, usar el activo
    const desiredName = "de corazon a corazon"
    const byName = await db
      .select()
      .from(events)
      .where(eq(events.name, desiredName))
      .limit(1)

    let event = byName[0]
    if (!event) {
      const active = await db
        .select()
        .from(events)
        .where(eq(events.isActive, true))
        .limit(1)
      event = active[0]
    }

    if (!event) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 })
    }

    const price = Number(event.price)
    const currency = "ARS"

    const pref = await createTicketPreference({
      quantity,
      price,
      currency,
      title: event.name ?? "Entrada de evento",
      payer,
      eventId: event.id,
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