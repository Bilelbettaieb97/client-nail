'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { ContactInfo } from '@/lib/types'

const WHATSAPP_NUMBER = '33123456789' // à remplacer par le vrai numéro

export function Contact({ data }: { data: ContactInfo }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setStatus('loading')
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value
    const body = {
      name,
      email: `rdv-${Date.now()}@nail-paris.fr`, // email auto pour Supabase (champ requis)
      phone,
      message: `Demande de RDV — Tel: ${phone}`,
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) { setStatus('error'); return }
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const quickChannels = [
    {
      label: 'Appeler',
      icon: '📞',
      href: `tel:${data.phone}`,
      value: data.phone,
      bg: '#1A1210',
      border: 'rgba(255,255,255,0.1)',
    },
    {
      label: 'WhatsApp',
      icon: '💬',
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%2C+je+souhaite+prendre+rendez-vous+chez+Nail+Paris.`,
      value: 'WhatsApp',
      bg: '#1A1210',
      border: 'rgba(255,255,255,0.1)',
    },
    {
      label: 'Instagram',
      icon: '📷',
      href: `https://instagram.com/${data.instagram.replace('@', '')}`,
      value: data.instagram,
      bg: '#1A1210',
      border: 'rgba(255,255,255,0.1)',
    },
  ]

  return (
    <section id="contact" className="relative py-24 md:py-36" style={{ background: '#1A1210' }} aria-labelledby="contact-heading">
      <div className="mx-auto max-w-7xl px-6 md:px-12" ref={ref}>

        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
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
            Réservez
            <br />
            <em className="italic" style={{ color: '#C08878' }}>votre séance</em>
          </h2>
          {/* Urgency */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: 'rgba(192,136,120,0.12)', border: '1px solid rgba(192,136,120,0.25)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#C08878' }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#C08878' }} />
            </span>
            <span className="font-body text-xs font-medium" style={{ color: '#C08878' }}>
              Prochains créneaux disponibles cette semaine — Réponse sous 2h
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* LEFT — Low-friction quick form */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl p-8"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="font-display text-xl font-semibold text-white mb-1">Demande rapide</p>
            <p className="font-body text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Laissez-nous votre prénom et numéro — on vous rappelle sous 2h.
            </p>

            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'rgba(192,136,120,0.15)' }}>
                  <span style={{ color: '#C08878', fontSize: '1.5rem' }}>✓</span>
                </div>
                <p className="font-display text-xl text-white">Message envoyé !</p>
                <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Nous vous rappelons dans les 2 heures.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate aria-label="Formulaire de prise de rendez-vous">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="rdv-name" className="mb-1.5 block font-body text-xs font-medium tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Prénom *
                    </label>
                    <input
                      id="rdv-name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      autoComplete="given-name"
                      className="w-full rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder-white/20 outline-none transition-colors focus:ring-1"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                      placeholder="Marie"
                    />
                  </div>
                  <div>
                    <label htmlFor="rdv-phone" className="mb-1.5 block font-body text-xs font-medium tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Téléphone *
                    </label>
                    <input
                      id="rdv-phone"
                      name="phone"
                      type="tel"
                      required
                      aria-required="true"
                      autoComplete="tel"
                      className="w-full rounded-xl px-4 py-3.5 font-body text-sm text-white placeholder-white/20 outline-none transition-colors focus:ring-1"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                      placeholder="+33 6 00 00 00 00"
                    />
                  </div>
                </div>

                {/* Service souhaité */}
                <div>
                  <label htmlFor="rdv-service" className="mb-1.5 block font-body text-xs font-medium tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Soin souhaité
                  </label>
                  <select
                    id="rdv-service"
                    name="service"
                    className="w-full rounded-xl px-4 py-3.5 font-body text-sm text-white outline-none appearance-none"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
                  >
                    <option value="" style={{ background: '#1A1210' }}>Choisir un soin (optionnel)</option>
                    <option value="manucure" style={{ background: '#1A1210' }}>Manucure classique</option>
                    <option value="semi-permanent" style={{ background: '#1A1210' }}>Semi-permanent</option>
                    <option value="nail-art" style={{ background: '#1A1210' }}>Nail Art</option>
                    <option value="pose-gel" style={{ background: '#1A1210' }}>Pose Gel</option>
                    <option value="pedicure" style={{ background: '#1A1210' }}>Pédicure</option>
                    <option value="soin" style={{ background: '#1A1210' }}>Soin mains</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-2 w-full rounded-full py-4 font-body text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #C08878, #9A6858)' }}
                  aria-busy={status === 'loading'}
                >
                  {status === 'loading' ? 'Envoi en cours…' : 'Je veux être rappelée →'}
                </button>

                {/* Guarantee */}
                <p className="text-center font-body text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  🔒 Données confidentielles · Rappel garanti sous 2h en semaine
                </p>

                {status === 'error' && (
                  <p role="alert" className="text-xs text-center" style={{ color: '#C08878' }}>
                    Une erreur est survenue. Appelez-nous directement au {data.phone}
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* RIGHT — Quick contact channels + info */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-5"
          >
            {/* Contact channels */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-body text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Ou contactez-nous directement
              </p>
              <div className="flex flex-col gap-3">
                {quickChannels.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target={ch.label !== 'Appeler' ? '_blank' : undefined}
                    rel={ch.label !== 'Appeler' ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    aria-label={`${ch.label} : ${ch.value}`}
                  >
                    <span className="text-xl" aria-hidden>{ch.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-medium tracking-[0.1em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>{ch.label}</p>
                      <p className="font-body text-sm text-white truncate group-hover:text-[#C08878] transition-colors">{ch.value}</p>
                    </div>
                    <span style={{ color: '#C08878' }} aria-hidden>→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Address + Hours */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <ul className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {[
                  { label: 'Adresse', value: data.address },
                  { label: 'Horaires', value: data.hours },
                  { label: 'Email', value: data.email, href: `mailto:${data.email}` },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="font-body text-xs font-medium tracking-[0.15em] uppercase w-20 shrink-0 pt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {item.label}
                    </span>
                    {item.href ? (
                      <a href={item.href} className="font-body text-sm text-white hover:text-[#C08878] transition-colors">{item.value}</a>
                    ) : (
                      <span className="font-body text-sm text-white">{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantee badge */}
            <div
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{ background: 'rgba(192,136,120,0.08)', border: '1px solid rgba(192,136,120,0.2)' }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(192,136,120,0.15)' }}>
                <span style={{ color: '#C08878' }} aria-hidden>✦</span>
              </div>
              <div>
                <p className="font-body text-sm font-medium text-white">Retouche offerte</p>
                <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Si votre résultat ne vous satisfait pas, retouche gratuite sous 5 jours.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
