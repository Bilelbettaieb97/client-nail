'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import type { HeroData } from '@/lib/types'

export function Hero({ data }: { data: HeroData }) {
  const ref = useRef<HTMLElement>(null)
  const shouldReduce = useReducedMotion()
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 600], shouldReduce ? [0, 0] : [0, 80])
  const textY = useTransform(scrollY, [0, 400], shouldReduce ? [0, 0] : [0, -40])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-dvh overflow-hidden"
      style={{ background: '#F8F4EF' }}
      aria-label="Accueil"
    >
      {/* Vertical decorative line */}
      <div
        className="pointer-events-none absolute left-[52%] top-0 hidden h-full w-px lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent, #C08878, transparent)', opacity: 0.3 }}
        aria-hidden
      />

      {/* Full-bleed image — right side */}
      <motion.div
        className="absolute inset-y-0 right-0 w-full lg:w-[52%]"
        style={{ y: imgY }}
      >
        <div className="relative h-full w-full">
          <Image
            src={data.image}
            alt="Manucure artistique Nail Paris"
            fill
            sizes="(max-width: 1024px) 100vw, 52vw"
            priority
            className="object-cover"
            style={{ objectPosition: 'center top' }}
          />
          {/* Left fade — desktop only */}
          <div
            className="absolute inset-y-0 left-0 hidden w-32 lg:block"
            style={{ background: 'linear-gradient(to right, #F8F4EF, transparent)' }}
            aria-hidden
          />
          {/* Bottom tint */}
          <div
            className="absolute inset-x-0 bottom-0 h-48"
            style={{ background: 'linear-gradient(to top, rgba(248,244,239,0.6), transparent)' }}
            aria-hidden
          />
          {/* Dark overlay mobile */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{ background: 'rgba(248,244,239,0.55)' }}
            aria-hidden
          />
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        className="relative z-10 flex min-h-dvh flex-col justify-center px-6 pb-24 pt-32 md:px-12 lg:w-[52%] lg:pr-24"
        style={{ y: textY }}
      >
        {/* Label */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-px w-8" style={{ background: '#C08878' }} aria-hidden />
          <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase" style={{ color: '#C08878' }}>
            Salon Parisien
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display font-semibold leading-[0.9] tracking-tight text-[#1A1210]" style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)' }}>
          <motion.span
            className="block"
            initial={shouldReduce ? false : { opacity: 0, y: 50, skewY: 2 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {data.title.split(' ')[0]}
          </motion.span>
          <motion.span
            className="block italic"
            style={{ color: '#C08878' }}
            initial={shouldReduce ? false : { opacity: 0, y: 50, skewY: 2 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {data.title.split(' ').slice(1).join(' ')}
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-8 max-w-sm font-body text-base leading-relaxed"
          style={{ color: '#7A6A62' }}
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          {data.description}
        </motion.p>

        {/* Guarantee badge */}
        <motion.div
          className="mt-4 inline-flex items-center gap-2"
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
        >
          <span className="font-body text-xs" style={{ color: '#C08878' }}>✦</span>
          <span className="font-body text-xs font-medium" style={{ color: '#7A6A62' }}>
            Résultats garantis · Retouche offerte sous 5 jours
          </span>
        </motion.div>

        {/* Urgency */}
        <motion.div
          className="mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
          style={{ background: 'rgba(192,136,120,0.1)', border: '1px solid rgba(192,136,120,0.2)' }}
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#C08878' }} />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: '#C08878' }} />
          </span>
          <span className="font-body text-[11px] font-medium" style={{ color: '#C08878' }}>
            Créneaux disponibles cette semaine
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-4"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-full px-8 py-3.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-85"
            style={{ background: '#C08878' }}
          >
            {data.cta}
            <span aria-hidden>→</span>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 font-body text-sm font-medium transition-colors hover:text-[#C08878]"
            style={{ color: '#1A1210' }}
          >
            Voir les soins
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 flex items-center gap-8"
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {[
            { value: '8 ans', label: "d'expertise" },
            { value: '2 000+', label: 'clientes fidèles' },
            { value: '4.9★', label: '127 avis Google' },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              {i > 0 && <div className="h-8 w-px" style={{ background: '#E8E0D8' }} aria-hidden />}
              <div className="flex flex-col">
                <span className="font-display text-xl font-semibold" style={{ color: '#1A1210' }}>{stat.value}</span>
                <span className="font-body text-xs" style={{ color: '#7A6A62' }}>{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 lg:left-[26%]"
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        aria-hidden
      >
        <span className="font-body text-[9px] tracking-[0.25em] uppercase" style={{ color: '#C08878' }}>Découvrir</span>
        <motion.div
          className="h-10 w-px"
          style={{ background: 'linear-gradient(to bottom, #C08878, transparent)' }}
          animate={shouldReduce ? {} : { scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
