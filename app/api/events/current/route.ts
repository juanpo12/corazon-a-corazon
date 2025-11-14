import { NextResponse } from "next/server"
import { db } from "@/db"
import { events } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET() {
  try {
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

    return NextResponse.json({
      id: event.id,
      name: event.name,
      price: Number(event.price),
      currency: "ARS",
    })
  } catch (err: any) {
    const message = err?.message || "Error obteniendo evento"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}