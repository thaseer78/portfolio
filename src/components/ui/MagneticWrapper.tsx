import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'
export function MagneticWrapper({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 }), sy = useSpring(y, { stiffness: 220, damping: 16 })
  return (
    <motion.div style={{ x: sx, y: sy, display: 'inline-block' }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return
        const b = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - b.left - b.width / 2) * 0.25); y.set((e.clientY - b.top - b.height / 2) * 0.25)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}>{children}</motion.div>
  )
}
