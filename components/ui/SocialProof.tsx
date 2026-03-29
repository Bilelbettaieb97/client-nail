'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const BRANDS = ['OPI', 'CND', 'Essie', 'Gelish', 'IBD']

export function SocialProof() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const shouldReduce = useReducedMotion()

  return (
    <section
      aria-label="Preuves sociales"
      ref={ref}
      className="relative py-8 md:py-10 overflow-hidden"
      style={{ background: '#F8F4EF', borderTop: '1px solid rgba(192,136,120,0.15)', borderBottom: '1px solid rgba(192,136,120,0.15)' }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">

          {/* Google rating */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'rgba(192,136,120,0.12)' }}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path fill="#C08878" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#9A6858" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#C08878" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#9A6858" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                    <path fill={i <= 5 ? '#C08878' : 'rgba(192,136,120,0.3)'} d="M8 1l1.75 3.55 3.92.57-2.84 2.76.67 3.91L8 9.94l-3.5 1.85.67-3.91L2.33 5.12l3.92-.57L8 1z"/>
                  </svg>
                ))}
                <span className="ml-1 font-body text-sm font-semibold" style={{ color: '#1A1210' }}>4.9</span>
              </div>
              <p className="font-body text-xs" style={{ color: '#7A6A62' }}>127 avis vérifiés Google</p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="hidden h-8 w-px md:block" style={{ background: 'rgba(192,136,120,0.2)' }} aria-hidden />

          {/* Brands used */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-6"
          >
            <span className="font-body text-[10px] font-medium tracking-[0.2em] uppercase shrink-0" style={{ color: 'rgba(26,18,16,0.35)' }}>
              Produits
            </span>
            <div className="flex items-center gap-5">
              {BRANDS.map((brand, i) => (
                <motion.span
                  key={brand}
                  initial={shouldReduce ? false : { opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="font-display text-sm font-semibold tracking-wide"
                  style={{ color: 'rgba(26,18,16,0.35)' }}
                >
                  {brand}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="hidden h-8 w-px md:block" style={{ background: 'rgba(192,136,120,0.2)' }} aria-hidden />

          {/* Guarantee */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <span style={{ color: '#C08878' }} aria-hidden>✦</span>
            <p className="font-body text-xs font-medium" style={{ color: '#7A6A62' }}>
              Retouche offerte sous 5 jours — satisfaite ou refaite
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
