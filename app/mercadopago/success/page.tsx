export default async function SuccessPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = await searchParams
  const paymentId = sp?.payment_id
  const externalReference = sp?.external_reference
 return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-zinc-900 rounded-xl max-w-md w-full border border-rose-500/20 p-6 sm:p-8">
        {/* Header con ícono de éxito */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-serif mb-2">¡Pago Exitoso!</h1>
          <p className="text-gray-300">Tu compra ha sido procesada correctamente</p>
        </div>

        {/* Sección del código de retiro */}
        <div className="bg-black/40 border border-rose-500/30 rounded-lg p-5 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <svg className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <div className="flex-1">
              <h2 className="text-rose-400 font-semibold mb-1">Código de Retiro</h2>
              <p className="text-sm text-gray-400 mb-3">
                Presenta este código en la iglesia para retirar tu entrada
              </p>
              {paymentId && (
                <div className="bg-zinc-950 border border-zinc-700 rounded px-4 py-3">
                  <p className="text-xs text-gray-500 mb-1">ID de Pago</p>
                  <p className="text-lg font-mono text-white tracking-wider">{paymentId}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-sm">
            <svg className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-400">
              Recibirás un correo electrónico con la confirmación y el código de retiro
            </p>
          </div>
          
          <div className="flex items-start gap-3 text-sm">
            <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-gray-400">
              <span className="text-yellow-400 font-medium">Importante:</span> Este código es único y solo puede usarse una vez
            </p>
          </div>
        </div>

        {/* Footer con referencia */}
        {externalReference && (
          <p className="text-xs text-gray-600 text-center mt-4 break-all">
            Referencia: {externalReference}
          </p>
        )}
      </div>
    </main>
  )
}