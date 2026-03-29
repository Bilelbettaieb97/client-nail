import { createClient } from '@supabase/supabase-js'

function getDb() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

export const dynamic = 'force-dynamic'

export default async function ContactsPage() {
  const sb = getDb()
  const { data: contacts } = await sb.from('contacts').select('*').order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-[#1A1210]">Messages</h1>
        <p className="mt-1 font-body text-sm text-[#7A6A62]">{contacts?.length ?? 0} message{(contacts?.length ?? 0) > 1 ? 's' : ''} reçu{(contacts?.length ?? 0) > 1 ? 's' : ''}</p>
      </div>

      {!contacts?.length && (
        <div className="rounded-2xl p-12 text-center" style={{ background: '#fff', border: '1px solid #E8E0D8' }}>
          <p className="font-display text-xl text-[#C8BAB0]">Aucun message pour l'instant</p>
        </div>
      )}

      <div className="space-y-4">
        {contacts?.map((c) => (
          <div
            key={c.id}
            className="rounded-2xl p-6"
            style={{ background: '#fff', border: `1px solid ${!c.read ? '#C08878' : '#E8E0D8'}` }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-body text-sm font-semibold text-[#1A1210]">{c.name}</p>
                  {!c.read && (
                    <span className="rounded-full px-2 py-0.5 font-body text-[10px] font-medium text-white" style={{ background: '#C08878' }}>
                      Nouveau
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap gap-3 font-body text-xs text-[#7A6A62]">
                  <a href={`mailto:${c.email}`} className="hover:text-[#C08878] transition-colors">{c.email}</a>
                  {c.phone && <a href={`tel:${c.phone}`} className="hover:text-[#C08878] transition-colors">{c.phone}</a>}
                </div>
              </div>
              <p className="font-body text-xs text-[#7A6A62]">
                {new Date(c.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <p className="mt-4 font-body text-sm leading-relaxed text-[#1A1210] whitespace-pre-wrap">{c.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
