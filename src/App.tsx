import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { ContactDrawer, DrawerCtx } from './components/ui/ContactDrawer'
import Home from './pages/Home'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'
export default function App() {
  const loc = useLocation()
  const [open, setOpen] = useState(false)
  const openDrawer = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  useEffect(() => {
    if (loc.hash) { const t = setTimeout(() => document.querySelector(loc.hash)?.scrollIntoView(), 350); return () => clearTimeout(t) }
    window.scrollTo(0, 0)
  }, [loc.pathname, loc.hash])
  return (
    <DrawerCtx.Provider value={openDrawer}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-gold focus:p-2 focus:text-ink">Skip to content</a>
      <Header />
      <div id="main"><AnimatePresence mode="wait">
        <Routes location={loc} key={loc.pathname}>
          <Route path="/" element={<Home />} /><Route path="/work" element={<Work />} />
          <Route path="/project/:id" element={<CaseStudy />} /><Route path="*" element={<NotFound />} />
        </Routes></AnimatePresence></div>
      <Footer /><ContactDrawer open={open} onClose={close} />
    </DrawerCtx.Provider>
  )
}
