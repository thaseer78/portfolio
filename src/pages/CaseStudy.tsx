import { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageWrapper } from '../components/layout/PageWrapper'
import { FadeIn } from '../components/motion/Reveal'
import { Mockup } from '../components/ui/Mockup'
import { useDrawer } from '../components/ui/ContactDrawer'
import { projects } from '../data/projects'
import { profile } from '../data/profile'

export default function CaseStudy() {
  const { id } = useParams()
  const openDrawer = useDrawer()
  const [zoomedImage, setZoomedImage] = useState<{
    src: string
    alt: string
    label?: string
    caption?: string
  } | null>(null)

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedImage(null)
    }
    if (zoomedImage) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [zoomedImage])

  const i = projects.findIndex((p) => p.id === id)
  if (i < 0) return <Navigate to="/404" replace />

  const p = projects[i]
  const prev = projects[(i + projects.length - 1) % projects.length]
  const next = projects[(i + 1) % projects.length]
  const src = p.links.source ?? profile.github

  const H = ({ n, t }: { n: string; t: string }) => (
    <>
      <p className="lbl">{n}</p>
      <h2 className="mb-4 mt-2 font-serif text-3xl sm:text-4xl">{t}</h2>
    </>
  )

  const urlHint =
    p.id === 'nova-ai'
      ? 'nova-ai.local'
      : p.id === 'nova-bites'
      ? 'novabites.craft'
      : p.id === 'engineering-copilot'
      ? 'engineering-copilot.app'
      : undefined

  return (
    <PageWrapper title={`${p.title} — Case study · Thaseer A R`}>
      <article className="wrap py-16">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-sm text-mu transition-colors hover:text-gold"
        >
          <ArrowLeft size={14} /> Back to all work
        </Link>

        <p className="lbl mt-10">{p.categoryLabel}</p>
        <h1 className="mt-3 font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight">
          {p.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg sm:text-xl text-mu leading-relaxed">
          {p.tagline}
        </p>

        {/* PRIMARY PREVIEW SHOWCASE */}
        <div className="mt-12">
          <div className="h-72 sm:h-96 md:h-[500px] lg:h-[580px] shadow-2xl">
            <Mockup
              kind={p.mockup}
              image={p.primaryImage}
              title={p.title}
              urlHint={urlHint}
              onExpand={
                p.primaryImage
                  ? () =>
                      setZoomedImage({
                        ...p.primaryImage!,
                        caption: 'Primary project interface and production preview.',
                      })
                  : undefined
              }
            />
          </div>

          {p.primaryImage && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-mu">
              <span className="font-mono">
                Primary Preview <span className="mx-2 text-gold">·</span>{' '}
                {p.primaryImage.label || p.title}
              </span>
              <button
                type="button"
                onClick={() =>
                  setZoomedImage({
                    ...p.primaryImage!,
                    caption: 'Primary project interface and production preview.',
                  })
                }
                className="inline-flex items-center gap-1.5 font-mono text-gold transition-colors hover:text-chalk"
              >
                <Maximize2 size={13} /> View full uncropped screenshot
              </button>
            </div>
          )}
        </div>

        {/* CORE CASE STUDY DETAILS */}
        <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-16">
          <FadeIn>
            <H n="01" t="Summary" />
            <p className="leading-relaxed text-mu">{p.summary}</p>
          </FadeIn>

          <FadeIn>
            <H n="02" t="Problem & objectives" />
            <p className="leading-relaxed text-mu">{p.problem}</p>
          </FadeIn>

          <FadeIn>
            <H n="03" t="Approach" />
            <p className="leading-relaxed text-mu">{p.approach}</p>
          </FadeIn>

          <FadeIn>
            <H n="04" t="Key features" />
            <ul className="grid gap-2.5 text-mu">
              {p.features.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="text-gold">—</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* SECONDARY CASE STUDY VISUAL ASSET */}
        {p.secondaryImage && (
          <FadeIn>
            <div className="mt-24 border-t border-[color:var(--line)] pt-16">
              <div className="mb-8">
                <H
                  n="05"
                  t={
                    p.id === 'nova-ai'
                      ? 'Dual-Theme Architecture & Editorial Mode'
                      : 'Editorial Menu Experience & Layout'
                  }
                />
                {p.secondaryImage.caption && (
                  <p className="max-w-3xl leading-relaxed text-mu">
                    {p.secondaryImage.caption}
                  </p>
                )}
              </div>

              <div className="h-72 sm:h-96 md:h-[480px] lg:h-[540px] shadow-2xl">
                <Mockup
                  kind={p.mockup}
                  image={p.secondaryImage}
                  title={`${p.title} — ${p.secondaryImage.label || 'Secondary View'}`}
                  urlHint={
                    p.id === 'nova-ai'
                      ? 'nova-ai.local/light'
                      : p.id === 'nova-bites'
                      ? 'novabites.craft/menu'
                      : undefined
                  }
                  onExpand={() => setZoomedImage(p.secondaryImage!)}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-mu">
                <span className="font-mono">
                  Case Study Visual Asset <span className="mx-2 text-gold">·</span>{' '}
                  {p.secondaryImage.label}
                </span>
                <button
                  type="button"
                  onClick={() => setZoomedImage(p.secondaryImage!)}
                  className="inline-flex items-center gap-1.5 font-mono text-gold transition-colors hover:text-chalk"
                >
                  <Maximize2 size={13} /> View full uncropped screenshot
                </button>
              </div>
            </div>
          </FadeIn>
        )}

        {/* ARCHITECTURE */}
        <FadeIn>
          <div className="mt-20 border-t border-[color:var(--line)] pt-16">
            <H n={p.secondaryImage ? '06' : '05'} t="Architecture" />
            <ol className="flex flex-wrap items-center gap-3">
              {p.architecture.map((a, k) => (
                <li key={a} className="flex items-center gap-3">
                  <span className="rounded-lg border border-[color:var(--line)] bg-surf px-4 py-2 font-mono text-xs">
                    {a}
                  </span>
                  {k < p.architecture.length - 1 && (
                    <ArrowRight size={14} className="text-gold" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>

        {/* CHALLENGES & SOLUTIONS */}
        <FadeIn>
          <div className="mt-20">
            <H
              n={p.secondaryImage ? '07' : '06'}
              t="Challenges & solutions"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {p.challenges.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-[color:var(--line)] bg-surf p-6"
                >
                  <h3 className="font-serif text-2xl">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-mu">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* STACK & LINKS */}
        <FadeIn>
          <div className="mt-20">
            <H n={p.secondaryImage ? '08' : '07'} t="Stack & links" />
            <p className="font-mono text-sm text-mu">{p.stack.join(' · ')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {p.links.live && (
                <a
                  className="btn btn-p"
                  href={p.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live demo <ExternalLink size={14} />
                </a>
              )}
              <a
                className="btn"
                href={src}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.links.source ? 'Source code' : 'GitHub profile'}{' '}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </FadeIn>

        {/* NEXT / PREV NAVIGATION */}
        <nav
          className="mt-24 grid gap-4 border-t border-[color:var(--line)] pt-8 md:grid-cols-2"
          aria-label="Projects"
        >
          <Link to={`/project/${prev.id}`} className="group hover:text-gold">
            <span className="lbl">Previous</span>
            <br />
            <span className="font-serif text-3xl transition-colors group-hover:text-gold">
              {prev.title}
            </span>
          </Link>
          <Link
            to={`/project/${next.id}`}
            className="group md:text-right hover:text-gold"
          >
            <span className="lbl">Next</span>
            <br />
            <span className="font-serif text-3xl transition-colors group-hover:text-gold">
              {next.title}
            </span>
          </Link>
        </nav>

        {/* CALL TO ACTION */}
        <div className="mt-20 text-center">
          <h2 className="font-serif text-5xl">Want something like this?</h2>
          <button className="btn btn-p mt-6" onClick={openDrawer}>
            Start a Project
          </button>
        </div>
      </article>

      {/* FULL UNMODIFIED SCREENSHOT LIGHTBOX MODAL */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-6 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              className="relative max-h-[92vh] max-w-6xl overflow-hidden rounded-2xl border border-[color:var(--line-hi)] bg-ink shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Chrome Header */}
              <div className="flex items-center justify-between border-b border-[color:var(--line)] bg-[#121215] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                  <span className="font-mono text-xs text-chalk">
                    {zoomedImage.label || 'Complete Screenshot Preview'}
                  </span>
                  <span className="hidden rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-mu sm:inline-block">
                    Original Resolution
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setZoomedImage(null)}
                  className="rounded-lg p-1.5 text-mu transition-colors hover:bg-white/10 hover:text-chalk"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable image area */}
              <div className="max-h-[calc(90vh-100px)] overflow-auto bg-[#070709] p-2 sm:p-4">
                <img
                  src={zoomedImage.src}
                  alt={zoomedImage.alt}
                  className="mx-auto block h-auto max-w-full rounded-lg shadow-lg"
                />
              </div>

              {/* Caption Footer */}
              {zoomedImage.caption && (
                <div className="border-t border-[color:var(--line)] bg-[#121215] px-4 py-2.5 text-xs text-mu">
                  {zoomedImage.caption}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}

