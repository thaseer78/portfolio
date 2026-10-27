import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
export const ease = [0.16, 1, 0.3, 1] as const
export function FadeIn({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease, delay }}>{children}</motion.div>
  )
}
export function RevealText({ lines, className, delay = 0 }: { lines: string[]; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <h1 className={className}>
      {lines.map((l, i) => (
        <span key={l} className="block overflow-hidden pb-2">
          <motion.span className="block" initial={reduce ? false : { y: '100%' }} animate={{ y: 0 }} transition={{ duration: 1, ease, delay: delay + i * 0.12 }}>{l}</motion.span>
        </span>
      ))}
    </h1>
  )
}
