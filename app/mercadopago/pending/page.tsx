export default function PendingPage({ searchParams }: { searchParams: Record<string, string> }) {
  const status = searchParams?.status
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-zinc-900 rounded-xl max-w-md w-full border border-rose-500/20 p-6 sm:p-8 text-center">
        <h1 className="text-3xl font-serif mb-3">Pago pendiente</h1>
        <p className="text-gray-300 mb-4">Tu pago está en revisión o pendiente de confirmación.</p>
        {status && <p className="text-xs text-gray-500">Estado: {status}</p>}
      </div>
    </main>
  )
}