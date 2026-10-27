import { useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ease } from '../motion/Reveal'
export function PageWrapper({ title, children }: { title: string; children: ReactNode }) {
  useEffect(() => { document.title = title }, [title])
  return <motion.main initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease }}>{children}</motion.main>
}
