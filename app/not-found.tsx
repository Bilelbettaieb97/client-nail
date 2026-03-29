import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center" style={{ background: '#F8F4EF' }}>
      <p className="font-display italic text-[#C08878]" style={{ fontSize: 'clamp(5rem, 15vw, 12rem)', lineHeight: 1 }}>404</p>
      <h1 className="font-display text-2xl font-semibold text-[#1A1210] mt-4">Page introuvable</h1>
      <p className="font-body text-sm text-[#7A6A62] mt-2">Cette page n'existe pas ou a été déplacée.</p>
      <Link href="/" className="mt-8 rounded-full px-6 py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-85" style={{ background: '#C08878' }}>
        Retour à l'accueil
      </Link>
    </div>
  )
}
