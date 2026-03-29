'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import type { AboutData } from '@/lib/types'

export function About({ data }: { data: AboutData }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduce = useReducedMotion()

  return (
    <section id="about" className="relative overflow-hidden" style={{ background: '#F8F4EF' }} aria-labelledby="about-heading">
      <div className="grid grid-cols-1 min-h-[80vh] lg:grid-cols-2" ref={ref}>

        {/* Image — left, full bleed */}
        <div className="relative min-h-[50vh] overflow-hidden lg:min-h-0">
          <motion.div
            className="absolute inset-0"
            initial={shouldReduce ? false : { scale: 1.05 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={data.image}
              alt="L'atelier Nail Paris — espace de soins"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
            {/* Right gradient to cream */}
            <div
              className="absolute inset-y-0 right-0 hidden w-24 lg:block"
              style={{ background: 'linear-gradient(to right, transparent, #F8F4EF)' }}
              aria-hidden
            />
          </motion.div>

          {/* Experience badge */}
          <motion.div
            className="absolute bottom-8 right-8 rounded-2xl p-5 backdrop-blur-md lg:bottom-12 lg:right-12"
            style={{ background: 'rgba(248,244,239,0.7)', border: '1px solid rgba(192,136,120,0.2)' }}
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="font-display text-4xl font-semibold text-[#1A1210]">{data.years}</p>
            <p className="font-body text-xs text-[#7A6A62] mt-0.5">ans d'expertise</p>
            <div className="mt-2 h-px w-full" style={{ background: '#C08878', opacity: 0.4 }} aria-hidden />
            <p className="font-display text-2xl font-semibold text-[#1A1210] mt-2">{data.clients}</p>
            <p className="font-body text-xs text-[#7A6A62]">clientes fidèles</p>
          </motion.div>
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-center px-8 py-16 md:px-16 lg:py-20">

          <motion.div
            initial={shouldReduce ? false : { opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: '#C08878' }} aria-hidden />
              <span className="font-body text-[10px] font-medium tracking-[0.35em] uppercase" style={{ color: '#C08878' }}>
                Notre Histoire
              </span>
            </div>

            <h2
              id="about-heading"
              className="font-display font-semibold leading-[0.9] tracking-tight text-[#1A1210]"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)' }}
            >
              {data.title}
              <br />
              <em className="italic" style={{ color: '#C08878' }}>{data.subtitle}</em>
            </h2>
          </motion.div>

          {/* Pull quote */}
          <motion.blockquote
            className="my-8 border-l-2 pl-5 font-display italic leading-snug"
            style={{ borderColor: '#C08878', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#1A1210' }}
            initial={shouldReduce ? false : { opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            « Chaque femme mérite de se sentir parfaitement elle-même. »
          </motion.blockquote>

          <motion.p
            className="font-body text-sm leading-relaxed"
            style={{ color: '#7A6A62', maxWidth: '38ch' }}
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {data.description}
          </motion.p>

          {/* Values */}
          <motion.ul
            className="mt-8 space-y-3"
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            {data.values.map((value, i) => (
              <motion.li
                key={value}
                className="flex items-center gap-3 font-body text-sm"
                style={{ color: '#1A1210' }}
                initial={shouldReduce ? false : { opacity: 0, x: 10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.07 }}
              >
                <div className="h-px w-5 shrink-0" style={{ background: '#C08878' }} aria-hidden />
                {value}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
