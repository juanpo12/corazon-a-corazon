export default function SuccessPage({ searchParams }: { searchParams: Record<string, string> }) {
  const paymentId = searchParams?.payment_id
  const externalReference = searchParams?.external_reference
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-serif mb-4">Pago aprobado</h1>
        <p className="text-gray-300 mb-2">¡Gracias por tu compra! Tu pago fue aprobado.</p>
        {paymentId && (
          <p className="text-sm text-gray-500">Payment ID: {paymentId}</p>
        )}
        {externalReference && (
          <p className="text-sm text-gray-500">Referencia: {externalReference}</p>
        )}
      </div>
    </main>
  )
}