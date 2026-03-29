'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import type { GalleryItem } from '@/lib/types'

const FALLBACK_GALLERY: GalleryItem[] = [
  { id: '1', image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', alt: 'Nail art floral', category: null, display_order: 1, active: true },
  { id: '2', image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', alt: 'Manucure nude', category: null, display_order: 2, active: true },
  { id: '3', image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', alt: 'Semi-permanent rose', category: null, display_order: 3, active: true },
  { id: '4', image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', alt: 'Nail art géométrique', category: null, display_order: 4, active: true },
  { id: '5', image_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80', alt: 'Extension gel naturel', category: null, display_order: 5, active: true },
]

// Unsplash nail art images
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=80',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80',
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80',
]

export function Gallery({ data }: { data: GalleryItem[] }) {
  const items = data.length > 0 ? data : FALLBACK_GALLERY
  const [selected, setSelected] = useState<GalleryItem | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()

  const displayed = items.slice(0, 5)

  return (
    <section id="gallery" className="relative py-24 md:py-36 overflow-hidden" style={{ background: '#1A1210' }} aria-labelledby="gallery-heading">

      {/* Header */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-12" ref={ref}>
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: '#C08878' }} aria-hidden />
              <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase" style={{ color: '#C08878' }}>
                Portfolio
              </span>
            </div>
            <h2
              id="gallery-heading"
              className="font-display font-semibold leading-[0.9] tracking-tight text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              Nos
              <br />
              <em className="italic" style={{ color: '#C08878' }}>créations</em>
            </h2>
          </div>
          <p className="font-body text-sm max-w-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Chaque pose est une œuvre unique, pensée et réalisée sur mesure.
          </p>
        </motion.div>
      </div>

      {/* Full-width grid */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">

          {/* Featured — spans 2 rows on desktop */}
          {displayed[0] && (
            <motion.button
              layoutId={`gallery-${displayed[0].id}`}
              className="group relative col-span-2 overflow-hidden rounded-2xl md:col-span-2 md:row-span-2"
              style={{ aspectRatio: '4/3' }}
              onClick={() => setSelected(displayed[0])}
              aria-label={`Voir ${displayed[0].alt ?? 'photo'} en grand`}
              initial={shouldReduce ? false : { opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Image
                src={displayed[0].image_url}
                alt={displayed[0].alt ?? 'Réalisation nail art'}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'rgba(192,136,120,0.15)' }}
                aria-hidden
              />
              <div className="absolute bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full px-4 py-1.5 font-body text-xs font-medium text-white backdrop-blur-sm" style={{ background: 'rgba(192,136,120,0.8)' }}>
                  Voir
                </span>
              </div>
            </motion.button>
          )}

          {/* Right column — 2 items */}
          {displayed.slice(1, 3).map((item, i) => (
            <motion.button
              key={item.id}
              layoutId={`gallery-${item.id}`}
              className="group relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '1/1' }}
              onClick={() => setSelected(item)}
              aria-label={`Voir ${item.alt ?? 'photo'} en grand`}
              initial={shouldReduce ? false : { opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            >
              <Image
                src={item.image_url}
                alt={item.alt ?? 'Réalisation nail art'}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'rgba(192,136,120,0.15)' }} aria-hidden />
            </motion.button>
          ))}

          {/* Bottom row — remaining */}
          {displayed.slice(3).map((item, i) => (
            <motion.button
              key={item.id}
              layoutId={`gallery-${item.id}`}
              className="group relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '4/3' }}
              onClick={() => setSelected(item)}
              aria-label={`Voir ${item.alt ?? 'photo'} en grand`}
              initial={shouldReduce ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
            >
              <Image
                src={item.image_url}
                alt={item.alt ?? 'Réalisation nail art'}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'rgba(192,136,120,0.15)' }} aria-hidden />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Intermediate CTA */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 mt-12">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-4 rounded-2xl py-10 px-6 text-center"
          style={{ background: 'rgba(192,136,120,0.08)', border: '1px solid rgba(192,136,120,0.18)' }}
        >
          <p className="font-display italic text-white" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
            Envie d'un résultat comme celui-ci ?
          </p>
          <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Chaque pose est créée sur mesure selon votre style et vos envies.
          </p>
          <a
            href="#contact"
            className="mt-2 inline-flex items-center gap-3 rounded-full px-8 py-3.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #C08878, #9A6858)' }}
          >
            Prendre rendez-vous
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-label="Image agrandie"
            aria-modal
          >
            <div className="absolute inset-0" style={{ background: 'rgba(26,18,16,0.92)', backdropFilter: 'blur(16px)' }} aria-hidden />
            <motion.div
              layoutId={`gallery-${selected.id}`}
              className="relative z-10 max-h-[85vh] max-w-4xl w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: '4/3' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected.image_url}
                alt={selected.alt ?? 'Réalisation nail art'}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover"
              />
            </motion.div>
            <button
              onClick={() => setSelected(null)}
              className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:text-[#C08878]"
              style={{ background: 'rgba(255,255,255,0.1)' }}
              aria-label="Fermer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
