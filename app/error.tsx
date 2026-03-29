'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center" style={{ background: '#F8F4EF' }}>
      <p className="font-display italic text-[#C08878]" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1 }}>Oups</p>
      <h1 className="font-display text-2xl font-semibold text-[#1A1210] mt-4">Une erreur est survenue</h1>
      <button onClick={reset} className="mt-8 rounded-full px-6 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-85" style={{ background: '#C08878' }}>
        Réessayer
      </button>
    </div>
  )
}
