export default async function SuccessPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = await searchParams
  const paymentId = sp?.payment_id
  const externalReference = sp?.external_reference
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-zinc-900 rounded-xl max-w-md w-full border border-rose-500/20 p-6 sm:p-8 text-center">
        <h1 className="text-3xl font-serif mb-3">Pago aprobado</h1>
        <p className="text-gray-300 mb-4">¡Gracias por tu compra! Tu pago fue aprobado.</p>
        <p className="text-sm text-gray-400 mb-2">Te llegará un correo con el código para retirar tu entrada en la iglesia.</p>
        {paymentId && (
          <p className="text-xs text-gray-500">Payment ID: {paymentId}</p>
        )}
        {externalReference && (
          <p className="text-xs text-gray-500">Referencia: {externalReference}</p>
        )}
      </div>
    </main>
  )
}