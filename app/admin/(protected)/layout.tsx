import { requireAdmin } from '@/lib/admin-auth'
import { adminGetStats } from '@/lib/db'
import { AdminSidebar } from './_components/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  const stats = await adminGetStats()

  return (
    <div className="flex h-dvh overflow-hidden" style={{ background: '#F8F4EF', fontFamily: 'var(--font-dm-sans)' }}>
      <AdminSidebar unread={stats.unread} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}
