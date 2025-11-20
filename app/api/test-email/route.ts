import { NextResponse } from "next/server"
import { sendTicketConfirmationEmail } from "@/lib/email"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const to = url.searchParams.get("to")
    const name = url.searchParams.get("name") || "Juan"
    const paymentId = url.searchParams.get("paymentId") || `TEST-${Date.now()}`
    const eventName = url.searchParams.get("event") || "De Corazón a Corazón"
    const quantity = Number(url.searchParams.get("q") || 1)
    const amountPaid = Number(url.searchParams.get("total") || 1000)
    const currency = url.searchParams.get("currency") || "ARS"

    if (!to) {
      return NextResponse.json({ error: "Falta 'to' en query" }, { status: 400 })
    }

    const res = await sendTicketConfirmationEmail({
      to,
      buyerName: name,
      paymentId: String(paymentId),
      eventName,
      quantity,
      amountPaid,
      currency,
    })

    return NextResponse.json({ ok: true, provider: "gmail", result: res })
  } catch (err: any) {
    console.error("[test-email] Error:", err)
    return NextResponse.json({ ok: false, error: err?.message }, { status: 500 })
  }
}