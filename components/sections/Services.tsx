'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import type { Service } from '@/lib/types'

const CATEGORY_ICONS: Record<string, string> = {
  'Manucure': '◇',
  'Nail Art': '◈',
  'Extensions': '◆',
  'Pédicure': '○',
  'Soins': '◉',
}

export function Services({ data }: { data: Service[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  // Group by category
  const categories = Array.from(new Set(data.map((s) => s.category ?? 'Autres')))

  return (
    <section id="services" className="relative py-24 md:py-36" style={{ background: '#1A1210' }} aria-labelledby="services-heading">

      {/* Watermark */}
      <div
        className="pointer-events-none absolute -top-8 right-0 select-none font-display font-semibold leading-none text-white/[0.025]"
        style={{ fontSize: 'clamp(6rem, 15vw, 18rem)' }}
        aria-hidden
      >
        Soins
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12" ref={ref}>

        {/* Header */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: '#C08878' }} aria-hidden />
              <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase" style={{ color: '#C08878' }}>
                Prestations
              </span>
            </div>
            <h2
              id="services-heading"
              className="font-display font-semibold leading-[0.9] tracking-tight text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              La collection
              <br />
              <em className="italic" style={{ color: '#C08878' }}>des soins</em>
            </h2>
          </div>
          <a
            href="#contact"
            className="hidden rounded-full border px-6 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#1A1210] md:inline-flex items-center gap-2"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          >
            Réserver <span aria-hidden>→</span>
          </a>
        </motion.div>

        {/* Services by category */}
        <div className="space-y-12">
          {categories.map((cat, ci) => {
            const catServices = data.filter((s) => (s.category ?? 'Autres') === cat)
            const icon = CATEGORY_ICONS[cat] ?? '◇'
            return (
              <motion.div
                key={cat}
                initial={shouldReduce ? false : { opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
              >
                {/* Category label */}
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-display text-lg" style={{ color: '#C08878' }} aria-hidden>{icon}</span>
                  <h3 className="font-body text-xs font-medium tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {cat}
                  </h3>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} aria-hidden />
                </div>

                {/* Service rows */}
                <ul className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  {catServices.map((service, si) => (
                    <motion.li
                      key={service.id}
                      initial={shouldReduce ? false : { opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: ci * 0.1 + si * 0.05 + 0.15 }}
                      className="group flex items-baseline gap-3 py-5"
                    >
                      {/* Number */}
                      <span
                        className="font-display text-sm italic shrink-0 w-6 transition-colors group-hover:text-[#C08878]"
                        style={{ color: 'rgba(255,255,255,0.2)' }}
                        aria-hidden
                      >
                        {String(si + 1).padStart(2, '0')}
                      </span>

                      {/* Name */}
                      <span
                        className="font-body text-sm md:text-base font-medium text-white transition-colors group-hover:text-[#C08878] flex-1"
                      >
                        {service.title}
                      </span>

                      {/* Description — hidden mobile */}
                      {service.description && (
                        <span
                          className="hidden md:block font-body text-sm max-w-xs"
                          style={{ color: 'rgba(255,255,255,0.4)' }}
                        >
                          {service.description}
                        </span>
                      )}

                      {/* Dotted leader */}
                      <span
                        className="flex-1 hidden md:block max-w-[3rem] h-px"
                        style={{
                          backgroundImage: 'radial-gradient(circle, rgba(192,136,120,0.3) 1px, transparent 1px)',
                          backgroundSize: '5px 1px',
                          backgroundRepeat: 'repeat-x',
                        }}
                        aria-hidden
                      />

                      {/* Price */}
                      <span
                        className="font-display text-base md:text-lg font-semibold shrink-0 tabular-nums"
                        style={{ color: service.price ? '#C08878' : 'rgba(255,255,255,0.4)' }}
                      >
                        {service.price ?? '—'}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 font-display italic text-sm"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          * Tarifs indicatifs, produits inclus. Un devis personnalisé sera établi lors de votre consultation.
        </motion.p>

        {/* Intermediate CTA */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-14 flex flex-col items-center gap-4 rounded-2xl py-10 px-6 text-center"
          style={{ background: 'rgba(192,136,120,0.08)', border: '1px solid rgba(192,136,120,0.18)' }}
        >
          <p className="font-display italic text-white" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
            Vous avez trouvé votre soin ?
          </p>
          <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Réponse garantie sous 2h en semaine — créneaux disponibles cette semaine
          </p>
          <a
            href="#contact"
            className="mt-2 inline-flex items-center gap-3 rounded-full px-8 py-3.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #C08878, #9A6858)' }}
          >
            Réserver maintenant
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
