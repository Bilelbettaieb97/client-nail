import { adminGetStats } from '@/lib/db'
import Link from 'next/link'

export default async function AdminDashboard() {
  const stats = await adminGetStats()

  const cards = [
    { label: 'Services', value: stats.services, href: '/admin/services', icon: '◇' },
    { label: 'Avis clients', value: stats.testimonials, href: '/admin/testimonials', icon: '★' },
    { label: 'Messages', value: stats.unread, href: '/admin/contacts', icon: '✉', alert: stats.unread > 0 },
  ]

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-[#1A1210]">Tableau de bord</h1>
        <p className="mt-1 font-body text-sm text-[#7A6A62]">Bienvenue dans l'espace d'administration Nail Paris.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group flex flex-col gap-3 rounded-2xl p-6 transition-shadow hover:shadow-md"
            style={{ background: '#fff', border: '1px solid #E8E0D8' }}
          >
            <div className="flex items-center justify-between">
              <span className="font-body text-xs font-medium tracking-[0.15em] uppercase text-[#7A6A62]">{card.label}</span>
              <span aria-hidden style={{ color: card.alert ? '#C08878' : '#C8BAB0' }}>{card.icon}</span>
            </div>
            <p className="font-display text-4xl font-semibold" style={{ color: card.alert ? '#C08878' : '#1A1210' }}>
              {card.value}
            </p>
            {card.alert && (
              <p className="font-body text-xs" style={{ color: '#C08878' }}>Non lu{card.value > 1 ? 's' : ''}</p>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #E8E0D8' }}>
        <h2 className="font-body text-sm font-medium text-[#1A1210] mb-4">Accès rapides</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/services" className="rounded-full border px-4 py-2 font-body text-sm transition-colors hover:bg-[#C08878] hover:text-white hover:border-[#C08878]" style={{ borderColor: '#E8E0D8', color: '#7A6A62' }}>
            + Ajouter un service
          </Link>
          <Link href="/admin/testimonials" className="rounded-full border px-4 py-2 font-body text-sm transition-colors hover:bg-[#C08878] hover:text-white hover:border-[#C08878]" style={{ borderColor: '#E8E0D8', color: '#7A6A62' }}>
            + Ajouter un avis
          </Link>
          <Link href="/admin/settings" className="rounded-full border px-4 py-2 font-body text-sm transition-colors hover:bg-[#C08878] hover:text-white hover:border-[#C08878]" style={{ borderColor: '#E8E0D8', color: '#7A6A62' }}>
            ⚙ Paramètres
          </Link>
          <Link href="/" target="_blank" className="rounded-full border px-4 py-2 font-body text-sm transition-colors hover:bg-[#C08878] hover:text-white hover:border-[#C08878]" style={{ borderColor: '#E8E0D8', color: '#7A6A62' }}>
            ↗ Voir le site
          </Link>
        </div>
      </div>
    </div>
  )
}
