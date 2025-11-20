import 'server-only'
import nodemailer from "nodemailer"

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

function buildHtml({ buyerName, paymentId, eventName = "Evento", quantity = 1, amountPaid, currency = "ARS" }: SendTicketEmailParams) {
  const total = typeof amountPaid === "number" && Number.isFinite(amountPaid)
    ? `${currency} $${amountPaid.toFixed(2)}`
    : ""
  return `<!DOCTYPE html><html lang="es"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Confirmación de compra - ${eventName}</title></head><body style="margin:0;padding:0;background:#0b0b0b;color:#ffffff;font-family:Arial,Helvetica,sans-serif"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#111;border:1px solid #2b2b2b"><tr><td style="padding:24px 24px 8px 24px;text-align:center"><div style="font-size:20px;font-weight:700;color:#ffffff">¡Gracias por tu compra!</div><div style="font-size:16px;color:#e11d48;margin-top:6px">${eventName}</div></td></tr><tr><td style="height:1px;background:#2b2b2b"></td></tr><tr><td style="padding:16px 24px"><div style="font-size:14px;color:#dddddd">${buyerName ? `Hola ${buyerName},` : 'Hola,'}</div><div style="font-size:14px;color:#bbbbbb;margin-top:6px">Tu pago fue aprobado y ya registramos tu entrada.</div><div style="font-size:14px;color:#bbbbbb;margin-top:12px">Datos de tu compra:</div><div style="font-size:13px;color:#bbbbbb;margin-top:6px">• ID de pago: <strong style="color:#ffffff">${paymentId}</strong></div><div style="font-size:13px;color:#bbbbbb;margin-top:4px">• Entradas: <strong style="color:#ffffff">${quantity}</strong></div>${total ? `<div style=\"font-size:13px;color:#bbbbbb;margin-top:4px\">• Total: <strong style=\"color:#ffffff\">${total}</strong></div>` : ''}</td></tr><tr><td style="height:1px;background:#2b2b2b"></td></tr><tr><td style="padding:16px 24px"><div style="font-size:12px;color:#888888">Debes presentar este correo para retirar tu entrada. Si tienes dudas contacte con nosotros.</div></td></tr><tr><td style="padding:8px 24px 24px 24px;text-align:center"><div style="font-size:12px;color:#aaaaaa">Corazón a Corazón</div></td></tr></table></body></html>`
}

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
    const html = buildHtml({ buyerName, paymentId, eventName, quantity, amountPaid, currency })
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