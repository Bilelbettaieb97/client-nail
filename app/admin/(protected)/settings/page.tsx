'use client'

import { useState, useEffect, FormEvent } from 'react'

export default function SettingsPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json() as Promise<{ notificationEmail?: string }>)
      .then((d) => { setEmail(d.notificationEmail ?? ''); setLoading(false) })
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notificationEmail: email }),
    })
    setSaving(false)
    setMsg(res.ok ? 'Sauvegardé ✓' : 'Erreur, vérifiez l\'email.')
  }

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-[#1A1210]">Paramètres</h1>
        <p className="mt-1 font-body text-sm text-[#7A6A62]">Configurez les notifications du site.</p>
      </div>

      <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #E8E0D8' }}>
        <h2 className="font-body text-sm font-semibold text-[#1A1210] mb-4">Email de notification</h2>
        <p className="font-body text-xs text-[#7A6A62] mb-6">
          Chaque nouveau message du formulaire de contact sera envoyé à cet email.
        </p>

        {loading ? (
          <div className="h-12 rounded-xl animate-pulse" style={{ background: '#F0EBE3' }} />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="notif-email" className="mb-1.5 block font-body text-xs font-medium tracking-[0.15em] uppercase text-[#7A6A62]">
                Email *
              </label>
              <input
                id="notif-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none transition-colors"
                style={{ background: '#F8F4EF', border: '1px solid #E8E0D8', color: '#1A1210' }}
                placeholder="contact@nail-paris.fr"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="self-start rounded-full px-6 py-2.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-50"
              style={{ background: '#C08878' }}
            >
              {saving ? 'Sauvegarde…' : 'Sauvegarder'}
            </button>
            {msg && <p className="font-body text-xs" style={{ color: msg.includes('✓') ? '#059669' : '#C08878' }}>{msg}</p>}
          </form>
        )}
      </div>
    </div>
  )
}
