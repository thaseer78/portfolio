import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'
import type { Category } from '../../types'
import { Mockup } from '../ui/Mockup'
import { FadeIn } from '../motion/Reveal'
const filters: { id: 'all' | Category; label: string }[] = [{ id: 'all', label: 'All Work' }, { id: 'ai', label: 'AI Systems' }, { id: 'web', label: 'Web Engineering' }, { id: 'auto', label: 'Automation' }]
export function WorkShowcase() {
  const [f, setF] = useState<'all' | Category>('all')
  const list = projects.filter((p) => f === 'all' || p.category === f)
  return (
    <section id="work" className="wrap border-t border-[color:var(--line)] py-24">
      <FadeIn><p className="lbl">Selected work</p><h2 className="mb-8 mt-3 font-serif text-5xl md:text-7xl">Three builds, closely told.</h2></FadeIn>
      <div className="mb-10 flex flex-wrap gap-1 rounded-full border border-[color:var(--line)] p-1 w-fit" role="group" aria-label="Filter projects">
        {filters.map((x) => (
          <button key={x.id} onClick={() => setF(x.id)} aria-pressed={f === x.id} className={`relative rounded-full px-4 py-2 text-sm ${f === x.id ? 'text-ink' : 'text-mu'}`}>
            {f === x.id && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-gold" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            <span className="relative">{x.label}</span></button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={i === 0 && f === 'all' ? 'md:col-span-12' : 'md:col-span-6'}
            >
              <Link
                to={`/project/${p.id}`}
                className="group block rounded-2xl border border-[color:var(--line)] bg-surf p-4 sm:p-5 transition-all duration-500 hover:scale-[1.01] hover:border-[color:var(--line-hi)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_0_60px_rgba(212,197,169,.05)]"
              >
                {/* Visual Preview Container with consistent aspect ratios */}
                <div
                  className={`overflow-hidden rounded-xl ${
                    i === 0 && f === 'all'
                      ? 'h-64 sm:h-80 md:h-[420px] lg:h-[480px]'
                      : 'h-60 sm:h-72 md:h-80'
                  }`}
                >
                  <Mockup
                    kind={p.mockup}
                    image={p.primaryImage}
                    title={p.title}
                    urlHint={
                      p.id === 'nova-ai'
                        ? 'nova-ai.local'
                        : p.id === 'nova-bites'
                        ? 'novabites.craft'
                        : p.id === 'engineering-copilot'
                        ? 'engineering-copilot.app'
                        : undefined
                    }
                  />
                </div>

                {/* Project Metadata */}
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="lbl">{p.categoryLabel}</p>
                      {p.primaryImage && (
                        <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-[10px] text-gold">
                          Real UI
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-chalk transition-colors group-hover:text-gold">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm sm:text-base leading-relaxed text-mu">
                      {p.tagline}
                    </p>
                    <p className="mt-3 font-mono text-xs text-mu/80">
                      {p.stack.slice(0, 5).join(' · ')}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--line)] bg-ink/60 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {list.length === 0 && <p className="text-mu">No featured projects in this category yet.</p>}
    </section>
  )
}
