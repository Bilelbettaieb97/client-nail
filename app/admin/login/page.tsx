'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    const json = await res.json() as { error?: string }
    if (!res.ok) {
      setError(json.error ?? 'Mot de passe incorrect')
      setLoading(false)
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-dvh flex items-center justify-center" style={{ background: '#F8F4EF' }}>
      <div className="w-full max-w-sm px-6">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="flex flex-col items-center leading-none">
            <span className="font-display text-3xl font-semibold" style={{ color: '#1A1210' }}>Nail</span>
            <span className="font-body text-[10px] font-medium tracking-[0.3em] text-[#C08878] uppercase">Paris · Admin</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block font-body text-xs font-medium tracking-[0.15em] uppercase" style={{ color: '#7A6A62' }}>
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full rounded-xl px-4 py-3 font-body text-sm outline-none transition-colors"
              style={{ background: '#fff', border: '1px solid #E8E0D8', color: '#1A1210' }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p role="alert" className="text-xs text-center" style={{ color: '#C08878' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full py-3 font-body text-sm font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-50"
            style={{ background: '#C08878' }}
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
