import { NextResponse } from "next/server"
import { MercadoPagoConfig, Payment } from "mercadopago"
import { db } from "@/db"
import { tickets, events } from "@/db/schema"
import { eq, and } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const payload = await req.json().catch(() => null)
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    if (!accessToken) {
      return NextResponse.json(
        { error: "MERCADOPAGO_ACCESS_TOKEN no configurado" },
        { status: 500 }
      )
    }

    const type = payload?.type || payload?.topic
    if (type !== "payment") {
      // Ignoramos otros tipos de notificación
      return NextResponse.json({ received: true, ignored: true })
    }

    const paymentId = payload?.data?.id || payload?.id
    if (!paymentId) {
      return NextResponse.json({ error: "Falta payment id" }, { status: 400 })
    }

    // Obtener detalle del pago desde Mercado Pago
    const mp = new Payment(new MercadoPagoConfig({ accessToken }))
    const payment = await mp.get({ id: String(paymentId) } as any)

    const status = payment?.status
    if (status !== "approved") {
      // Solo generamos ticket cuando el pago está aprobado
      return NextResponse.json({ received: true, status })
    }

    // Intentar recuperar datos del comprador desde external_reference (codificado)
    const externalRefRaw: string | undefined = (payment as any)?.external_reference
    let extBuyerName: string | undefined
    let extBuyerEmail: string | undefined
    let extQuantity: number | undefined
    let extEventId: number | undefined
    if (externalRefRaw && typeof externalRefRaw === "string" && externalRefRaw.startsWith("CAC1:")) {
      const encoded = externalRefRaw.slice(5)
      try {
        const decoded = JSON.parse(Buffer.from(encoded, "base64").toString("utf8"))
        if (typeof decoded?.bn === "string") extBuyerName = decoded.bn
        if (typeof decoded?.be === "string") extBuyerEmail = decoded.be
        if (Number.isFinite(Number(decoded?.q))) extQuantity = Number(decoded.q)
        if (Number.isFinite(Number(decoded?.ev))) extEventId = Number(decoded.ev)
      } catch {}
    }

    const buyerNameFromMeta: string | undefined = (payment as any)?.metadata?.buyerName
    const payerEmailFromMeta: string | undefined = (payment as any)?.metadata?.buyerEmail

    const buyerName: string = (buyerNameFromMeta ?? extBuyerName ?? [payment?.payer?.first_name, payment?.payer?.last_name]
      .filter(Boolean)
      .join(" ")) || ""
    const payerEmail: string | undefined = payerEmailFromMeta ?? extBuyerEmail ?? payment?.payer?.email

    const amountPaid: number = Number(payment?.transaction_amount ?? 0)
    const quantityFromMeta: number = Number((payment as any)?.metadata?.quantity ?? 1)
    const quantityFromItems: number = Number(((payment as any)?.additional_info?.items?.[0]?.quantity) ?? 1)
    const quantityFromExternal: number = Number(extQuantity ?? NaN)
    const quantity: number = Number.isFinite(quantityFromMeta)
      ? quantityFromMeta
      : Number.isFinite(quantityFromItems)
        ? quantityFromItems
        : Number.isFinite(quantityFromExternal)
          ? quantityFromExternal
          : 1

    // Buscamos el evento activo (puedes ajustar esta lógica según tus necesidades)
    const eventIdFromMeta = (payment as any)?.metadata?.eventId as number | undefined
    const activeEvent = await db
      .select()
      .from(events)
      .where(eq(events.isActive, true))
      .limit(1)

    if (!activeEvent?.length) {
      return NextResponse.json({ error: "No hay evento activo" }, { status: 500 })
    }

    const eventId = (Number.isFinite(Number(eventIdFromMeta)) ? Number(eventIdFromMeta) : undefined) ?? extEventId ?? activeEvent[0].id

    // Evitar duplicados: si ya existe un ticket con este paymentId, no creamos otro
    const existing = await db
      .select()
      .from(tickets)
      .where(and(eq(tickets.paymentId, String(paymentId))))
      .limit(1)

    if (existing?.length) {
      return NextResponse.json({ received: true, duplicated: true })
    }

    await db.insert(tickets).values({
      eventId,
      buyerName,
      buyerEmail: payerEmail || "",
      quantity,
      // Drizzle pg numeric espera string; guardamos con 2 decimales
      amountPaid: amountPaid.toFixed(2),
      paymentStatus: "paid",
      paymentId: String(paymentId),
    })

    return NextResponse.json({ received: true, created: true })
  } catch (err: any) {
    console.error("[MP webhook error]", err)
    return NextResponse.json({ received: false, error: err?.message }, { status: 500 })
  }
}

export async function GET() {
  // Mercado Pago puede enviar validaciones con GET
  return NextResponse.json({ ok: true })
}