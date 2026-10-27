import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useDrawer } from '../ui/ContactDrawer'
const links = [['Work', '/#work'], ['Services', '/#services'], ['About', '/#about'], ['Contact', '/#contact']]
export function Header() {
  const [hover, setHover] = useState<string | null>(null)
  const [menu, setMenu] = useState(false)
  const openDrawer = useDrawer()
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-ink/85 backdrop-blur">
      <nav className="wrap flex h-16 items-center justify-between" aria-label="Main">
        <Link to="/" className="font-mono text-xs tracking-[.25em]">THASEER A R</Link>
        <ul className="hidden items-center gap-8 md:flex" onMouseLeave={() => setHover(null)}>
          {links.map(([l, to]) => (
            <li key={l} className="relative"><Link to={to} onMouseEnter={() => setHover(l)} onFocus={() => setHover(l)} onBlur={() => setHover(null)} className="text-sm text-mu hover:text-chalk">{l}</Link>
              {hover === l && <motion.span layoutId="nav-u" className="absolute -bottom-1 left-0 h-px w-full bg-gold" />}</li>
          ))}
          <li><button className="btn btn-p !py-2" onClick={openDrawer}>Start a Project</button></li>
        </ul>
        <button className="md:hidden" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </nav>
      <AnimatePresence>
        {menu && (
          <motion.div className="overflow-hidden border-t border-[color:var(--line)] md:hidden" initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
            <ul className="wrap grid gap-4 py-6">
              {links.map(([l, to]) => <li key={l}><Link to={to} onClick={() => setMenu(false)} className="font-serif text-3xl">{l}</Link></li>)}
              <li><button className="btn btn-p" onClick={() => { setMenu(false); openDrawer() }}>Start a Project</button></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
