'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  unread: number
}

const nav = [
  { href: '/admin', label: 'Dashboard', icon: '◈', exact: true },
  { href: '/admin/contacts', label: 'Messages', icon: '✉' },
  { href: '/admin/services', label: 'Services', icon: '◇' },
  { href: '/admin/testimonials', label: 'Avis', icon: '★' },
  { href: '/admin/settings', label: 'Paramètres', icon: '⚙' },
]

export function AdminSidebar({ unread }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col border-r" style={{ background: '#1A1210', borderColor: 'rgba(255,255,255,0.07)' }}>
      {/* Logo */}
      <div className="border-b px-6 py-5" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="flex flex-col leading-none">
          <span className="font-display text-xl font-semibold text-white">Nail</span>
          <span className="font-body text-[9px] font-medium tracking-[0.3em] uppercase" style={{ color: '#C08878' }}>Paris · Admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4" aria-label="Navigation admin">
        <ul className="space-y-1">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== '/admin'
            const isExactAdmin = item.exact && pathname === '/admin'
            const isActive = item.exact ? isExactAdmin : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm font-medium transition-colors"
                  style={{
                    background: isActive ? 'rgba(192,136,120,0.15)' : 'transparent',
                    color: isActive ? '#C08878' : 'rgba(255,255,255,0.6)',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span aria-hidden>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.href === '/admin/contacts' && unread > 0 && (
                    <span
                      className="ml-auto flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-body text-[10px] font-medium text-white"
                      style={{ background: '#C08878' }}
                      aria-label={`${unread} messages non lus`}
                    >
                      {unread}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t px-3 py-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm transition-colors hover:bg-white/5"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <span aria-hidden>→</span>
          <span>Déconnexion</span>
        </button>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm transition-colors hover:bg-white/5 mt-1"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <span aria-hidden>↗</span>
          <span>Voir le site</span>
        </Link>
      </div>
    </aside>
  )
}
