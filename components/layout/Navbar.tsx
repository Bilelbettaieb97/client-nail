'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'L\'Atelier' },
  { href: '#gallery', label: 'Galerie' },
  { href: '#testimonials', label: 'Avis' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(248,244,239,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(192,136,120,0.15)' : 'none',
        }}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12"
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none" aria-label="Nail Paris — Accueil">
            <span
              className="font-display font-semibold tracking-tight"
              style={{ fontSize: '1.6rem', color: '#1A1210' }}
            >
              Nail
            </span>
            <span
              className="font-body text-[10px] font-medium tracking-[0.3em] uppercase"
              style={{ color: '#C08878', marginTop: '-2px' }}
            >
              Paris
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-body text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[#C08878]"
                  style={{ color: '#1A1210' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA desktop */}
          <a
            href="#contact"
            className="hidden rounded-full px-6 py-2.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-85 md:block"
            style={{ background: '#C08878' }}
          >
            Rendez-vous
          </a>

          {/* Burger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block h-px w-6 origin-center"
              style={{ background: '#1A1210' }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block h-px w-6"
              style={{ background: '#1A1210' }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block h-px w-6 origin-center"
              style={{ background: '#1A1210' }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center md:hidden"
            style={{ background: 'rgba(248,244,239,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <ul className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl font-semibold tracking-tight"
                    style={{ color: '#1A1210' }}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 inline-block rounded-full px-8 py-3 font-body text-sm font-medium text-white"
                  style={{ background: '#C08878' }}
                >
                  Rendez-vous
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
