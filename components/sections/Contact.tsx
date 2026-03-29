'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { ContactInfo } from '@/lib/types'

export function Contact({ data }: { data: ContactInfo }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const infoItems = [
    { label: 'Téléphone', value: data.phone, href: `tel:${data.phone}` },
    { label: 'Email', value: data.email, href: `mailto:${data.email}` },
    { label: 'Adresse', value: data.address, href: null },
    { label: 'Horaires', value: data.hours, href: null },
    { label: 'Instagram', value: data.instagram, href: '#' },
  ]

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setStatus('loading')
    const form = e.currentTarget
    const body = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) {
        const json = await res.json() as { error?: Record<string, { _errors: string[] }> | string }
        if (typeof json.error === 'object') {
          const flat: Record<string, string> = {}
          for (const [k, v] of Object.entries(json.error)) {
            flat[k] = (v as { _errors: string[] })._errors[0] ?? 'Erreur'
          }
          setErrors(flat)
        }
        setStatus('error')
        return
      }
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-36" style={{ background: '#1A1210' }} aria-labelledby="contact-heading">

      <div className="mx-auto max-w-7xl px-6 md:px-12" ref={ref}>
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <div className="h-px w-8" style={{ background: '#C08878' }} aria-hidden />
            <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase" style={{ color: '#C08878' }}>Rendez-vous</span>
            <div className="h-px w-8" style={{ background: '#C08878' }} aria-hidden />
          </div>
          <h2
            id="contact-heading"
            className="font-display font-semibold leading-[0.9] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            Nous
            <br />
            <em className="italic" style={{ color: '#C08878' }}>contacter</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

          {/* Info panel */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <ul className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              {infoItems.map((item) => (
                <li key={item.label} className="flex items-baseline gap-5 py-5">
                  <span className="font-body text-xs font-medium tracking-[0.2em] uppercase w-24 shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-body text-sm text-white transition-colors hover:text-[#C08878]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-body text-sm text-white">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={shouldReduce ? false : { opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-4"
            aria-label="Formulaire de contact"
            noValidate
          >
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block font-body text-xs font-medium tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Nom *
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/20 outline-none transition-colors focus:ring-1"
                style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${errors.name ? '#C08878' : 'rgba(255,255,255,0.1)'}` }}
                placeholder="Marie Dupont"
              />
              {errors.name && <p id="name-error" role="alert" className="mt-1 text-xs" style={{ color: '#C08878' }}>{errors.name}</p>}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block font-body text-xs font-medium tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Email *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/20 outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${errors.email ? '#C08878' : 'rgba(255,255,255,0.1)'}` }}
                  placeholder="marie@email.com"
                />
                {errors.email && <p id="email-error" role="alert" className="mt-1 text-xs" style={{ color: '#C08878' }}>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="contact-phone" className="mb-1.5 block font-body text-xs font-medium tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Téléphone
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/20 outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  placeholder="+33 6 00 00 00 00"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block font-body text-xs font-medium tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Message *
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className="w-full resize-none rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/20 outline-none transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${errors.message ? '#C08878' : 'rgba(255,255,255,0.1)'}` }}
                placeholder="Bonjour, je souhaite prendre rendez-vous pour..."
              />
              {errors.message && <p id="message-error" role="alert" className="mt-1 text-xs" style={{ color: '#C08878' }}>{errors.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="mt-2 inline-flex items-center justify-center gap-3 rounded-full px-8 py-3.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-50"
              style={{ background: '#C08878' }}
              aria-busy={status === 'loading'}
            >
              {status === 'loading' ? 'Envoi en cours…' : status === 'success' ? 'Message envoyé ✓' : 'Envoyer le message'}
            </button>

            {status === 'error' && !Object.keys(errors).length && (
              <p role="alert" className="text-xs text-center" style={{ color: '#C08878' }}>
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
