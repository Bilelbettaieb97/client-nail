'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

export function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  const springConfig = { stiffness: 200, damping: 22, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovered(
        !!target.closest('a, button, [role="button"], input, textarea, label, select')
      )
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [x, y])

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: hovered ? 0.4 : 1 }}
        transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
      >
        <div
          className="rounded-full transition-colors duration-300"
          style={{
            width: hovered ? 36 : 8,
            height: hovered ? 36 : 8,
            background: hovered ? 'transparent' : '#C08878',
            border: hovered ? '1.5px solid #C08878' : 'none',
            transition: 'width 0.3s ease, height 0.3s ease',
          }}
        />
      </motion.div>
    </>
  )
}
