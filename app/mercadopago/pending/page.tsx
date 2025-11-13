export default function PendingPage({ searchParams }: { searchParams: Record<string, string> }) {
  const status = searchParams?.status
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-serif mb-4">Pago pendiente</h1>
        <p className="text-gray-300 mb-2">Tu pago está pendiente de confirmación.</p>
        {status && <p className="text-sm text-gray-500">Estado: {status}</p>}
      </div>
    </main>
  )
}