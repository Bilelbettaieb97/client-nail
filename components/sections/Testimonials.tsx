'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import type { Testimonial } from '@/lib/types'

const DEFAULT: Testimonial[] = [
  { id: '1', name: 'Sophie M.', location: 'Paris 8e', rating: 5, text: 'Un vrai moment de détente. Les finitions sont impeccables, jamais eu un nail art aussi précis. Je reviens chaque mois.', service: 'Nail Art', active: true, created_at: '' },
  { id: '2', name: 'Camille L.', location: 'Paris 16e', rating: 5, text: "L'ambiance est raffinée, les techniciennes sont aux petits soins. Mon semi-permanent tient plus de 3 semaines.", service: 'Semi-permanent', active: true, created_at: '' },
  { id: '3', name: 'Aurélie D.', location: 'Neuilly-sur-Seine', rating: 5, text: "Le meilleur salon de Paris. Propreté irréprochable, résultat professionnel, et l'accueil est vraiment chaleureux.", service: 'Pose Gel', active: true, created_at: '' },
]

export function Testimonials({ data }: { data: Testimonial[] }) {
  const items = data.length > 0 ? data : DEFAULT
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()
  const current = items[index]

  const go = (i: number) => {
    setDirection(i > index ? 1 : -1)
    setIndex(i)
  }

  return (
    <section id="testimonials" className="relative py-24 md:py-36 overflow-hidden" style={{ background: '#F0EBE3' }} aria-labelledby="testimonials-heading">

      {/* Giant decorative quote */}
      <div
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none font-display font-semibold leading-none"
        style={{ fontSize: 'clamp(8rem, 20vw, 20rem)', color: 'rgba(192,136,120,0.07)', lineHeight: 1 }}
        aria-hidden
      >
        "
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-12" ref={ref}>

        {/* Label */}
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center"
        >
          <h2 id="testimonials-heading" className="sr-only">Avis clients</h2>
          <div className="flex items-center gap-4">
            <div className="h-px w-8" style={{ background: '#C08878' }} aria-hidden />
            <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase" style={{ color: '#C08878' }}>
              Avis Clients
            </span>
            <div className="h-px w-8" style={{ background: '#C08878' }} aria-hidden />
          </div>
        </motion.div>

        {/* Quote */}
        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, y: shouldReduce ? 0 : d * 30 }),
                center: { opacity: 1, y: 0 },
                exit: (d: number) => ({ opacity: 0, y: shouldReduce ? 0 : -d * 30 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <blockquote
                className="font-display italic leading-snug tracking-tight text-[#1A1210]"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)', maxWidth: '30ch' }}
              >
                &ldquo;{current.text}&rdquo;
              </blockquote>

              {/* Separator */}
              <div className="my-8 h-px w-12" style={{ background: '#C08878' }} aria-hidden />

              {/* Author */}
              <div className="flex flex-col items-center gap-1">
                <p className="font-display text-lg font-semibold text-[#1A1210]">{current.name}</p>
                <p className="font-body text-xs" style={{ color: '#7A6A62' }}>
                  {current.location}{current.service && ` · ${current.service}`}
                </p>
                {/* Stars */}
                <div className="mt-2 flex gap-1" aria-label={`${current.rating} étoiles sur 5`}>
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <span key={i} style={{ color: '#C08878', fontSize: '0.7rem' }} aria-hidden>★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigation */}
        <div className="mt-12 flex items-center justify-center gap-3" role="tablist" aria-label="Naviguer entre les avis">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`Avis ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? 32 : 6,
                height: 6,
                background: i === index ? '#C08878' : 'rgba(192,136,120,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
