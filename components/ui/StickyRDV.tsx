'use client'

import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

export function StickyRDV() {
  const [visible, setVisible] = useState(false)
  const [atContact, setAtContact] = useState(false)
  const shouldReduce = useReducedMotion()
  const { scrollY } = useScroll()

  useEffect(() => {
    const check = () => {
      const y = window.scrollY
      const contactSection = document.getElementById('contact')
      const contactTop = contactSection ? contactSection.getBoundingClientRect().top + y : Infinity
      setVisible(y > 400)
      setAtContact(y + window.innerHeight > contactTop + 100)
    }
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <AnimatePresence>
      {visible && !atContact && (
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0"
        >
          <a
            href="#contact"
            className="flex items-center gap-3 rounded-full px-6 py-3.5 font-body text-sm font-medium text-white shadow-xl transition-opacity hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #C08878, #9A6858)', boxShadow: '0 8px 32px rgba(192,136,120,0.4)' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: '#fff' }} />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Prendre rendez-vous
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
