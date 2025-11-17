import nodemailer from "nodemailer"
import { renderToStaticMarkup } from "react-dom/server"
import TicketConfirmationEmail from "@/emails/TicketConfirmation"

type SendTicketEmailParams = {
  to: string
  buyerName?: string
  paymentId: string
  eventName?: string
  quantity?: number
  amountPaid?: number
  currency?: string
}

function buildSubject(eventName?: string) {
  return `Confirmación de compra - ${eventName || "Entrada"}`
}

function buildText({ buyerName, paymentId, eventName, quantity, amountPaid, currency = "ARS" }: SendTicketEmailParams) {
  return `Gracias por tu compra${buyerName ? ", " + buyerName : ""}.
Pago aprobado.
Payment ID: ${paymentId}
${eventName ? `Evento: ${eventName}\n` : ""}${quantity ? `Cantidad: ${quantity}\n` : ""}${amountPaid ? `Total: ${amountPaid} ${currency}` : ""}`
}

// Resend eliminado; sólo proveedor Gmail (Nodemailer)

async function sendViaGmail(params: SendTicketEmailParams) {
  const { to, buyerName, paymentId, eventName, quantity, amountPaid, currency = "ARS" } = params
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) {
    console.warn("[email] GMAIL_USER/GMAIL_APP_PASSWORD no configurados; se omite envío")
    return { skipped: true }
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    })
    const from = process.env.GMAIL_FROM || `${user}`
    const html = renderToStaticMarkup(
      TicketConfirmationEmail({ buyerName, paymentId, eventName, quantity, amountPaid, currency }) as any
    )
    const info = await transporter.sendMail({
      from,
      to,
      subject: buildSubject(eventName),
      html,
      text: buildText({ buyerName, paymentId, eventName, quantity, amountPaid, currency }),
    })
    console.log(`[email] Gmail enviado a ${to} (messageId: ${info.messageId})`)
    return info
  } catch (err: any) {
    console.error("[email] Error enviando confirmación (Gmail):", err)
    return { error: err?.message || "Error enviando email (Gmail)" }
  }
}

export async function sendTicketConfirmationEmail(params: SendTicketEmailParams) {
  return sendViaGmail(params)
}