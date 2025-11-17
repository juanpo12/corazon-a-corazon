import { Html, Head, Preview, Body, Container, Section, Text, Hr } from "@react-email/components"

type TicketConfirmationProps = {
  buyerName?: string
  paymentId: string
  eventName?: string
  quantity?: number
  amountPaid?: number
  currency?: string
}

export default function TicketConfirmationEmail({
  buyerName,
  paymentId,
  eventName = "Evento",
  quantity = 1,
  amountPaid,
  currency = "ARS",
}: TicketConfirmationProps) {
  const total = typeof amountPaid === "number" && Number.isFinite(amountPaid)
    ? `${currency} $${amountPaid.toFixed(2)}`
    : undefined

  return (
    <Html>
      <Head />
      <Preview>Confirmación de compra - {eventName}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section>
            <Text style={styles.title}>¡Gracias por tu compra!</Text>
            <Text style={styles.subtitle}>{eventName}</Text>
          </Section>
          <Hr style={styles.hr} />
          <Section>
            {buyerName ? (
              <Text style={styles.text}>Hola {buyerName},</Text>
            ) : (
              <Text style={styles.text}>Hola,</Text>
            )}
            <Text style={styles.text}>
              Tu pago fue aprobado y ya registramos tu entrada.
            </Text>
            <Text style={styles.text}>Datos de tu compra:</Text>
            <Text style={styles.textSmall}>• ID de pago: <strong>{paymentId}</strong></Text>
            <Text style={styles.textSmall}>• Entradas: <strong>{quantity}</strong></Text>
            {total && <Text style={styles.textSmall}>• Total: <strong>{total}</strong></Text>}
          </Section>
          <Hr style={styles.hr} />
          <Section>
            <Text style={styles.textMuted}>
              Presenta este correo en el ingreso si fuera necesario.
              Si tienes dudas, responde a este mensaje.
            </Text>
          </Section>
          <Section>
            <Text style={styles.footer}>Corazón a Corazón</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  body: {
    backgroundColor: "#111827",
    color: "#e5e7eb",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  },
  container: {
    backgroundColor: "#1f2937",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #374151",
  },
  title: {
    fontSize: "22px",
    fontWeight: 600,
  },
  subtitle: {
    marginTop: "4px",
    fontSize: "16px",
    color: "#d1d5db",
  },
  text: {
    fontSize: "14px",
    lineHeight: "22px",
  },
  textSmall: {
    fontSize: "13px",
    lineHeight: "20px",
  },
  textMuted: {
    fontSize: "12px",
    color: "#9ca3af",
  },
  footer: {
    fontSize: "12px",
    color: "#9ca3af",
    marginTop: "8px",
  },
  hr: {
    borderColor: "#374151",
    margin: "16px 0",
  },
} as const