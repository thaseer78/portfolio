
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Plus } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { WorkShowcase } from '../components/sections/WorkShowcase'
import { FadeIn, RevealText } from '../components/motion/Reveal'
import { MagneticWrapper } from '../components/ui/MagneticWrapper'
import { useDrawer } from '../components/ui/ContactDrawer'
import { process, profile, services, skills } from '../data/profile'

function Social() {
  const cls =
    'inline-flex items-center gap-2 text-sm text-mu transition-colors duration-300 hover:text-gold'

  return (
    <div className="flex flex-wrap gap-6">
      <a
        className={cls}
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github size={16} />
        GitHub
      </a>

      {profile.linkedin && (
        <a
          className={cls}
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin size={16} />
          LinkedIn
        </a>
      )}
    </div>
  )
}

export default function Home() {
  const openDrawer = useDrawer()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <PageWrapper title="Thaseer A R — AI Developer & Full-Stack Studio">
      {/* HERO */}
      <section
        className="
          wrap grid min-h-[calc(100svh-82px)]
          content-center items-center
          gap-10 py-12
          md:grid-cols-12 md:gap-8 md:py-10
          lg:gap-10
        "
      >
        {/* HERO CONTENT */}
        <div className="min-w-0 md:col-span-7">
          <motion.p
            className="lbl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            Independent studio · {profile.location}
          </motion.p>

          <RevealText
            delay={0.2}
            className="
              mt-5 font-serif
              text-[clamp(2.6rem,5.2vw,5.2rem)]
              leading-[0.96]
              tracking-[-0.035em]
              lg:text-[clamp(3.8rem,5vw,5.2rem)]
            "
            lines={[
              'Engineering intelligent',
              'AI systems &',
              'high-converting web products.',
            ]}
          />

          <FadeIn delay={0.45}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mu md:text-lg">
              I help founders, startups, and brands build custom AI assistants,
              automated workflows, and high-performance web applications that
              scale.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <MagneticWrapper>
                <a href="#work" className="btn btn-p">
                  Explore Selected Work
                  <ArrowRight size={16} />
                </a>
              </MagneticWrapper>

              <MagneticWrapper>
                <button className="btn" onClick={openDrawer}>
                  Start a Project
                </button>
              </MagneticWrapper>
            </div>

            <div className="mt-6">
              <Social />
            </div>
          </FadeIn>
        </div>

        {/* HERO PORTRAIT & IDENTITY */}
        <motion.div
          className="min-w-0 md:col-span-5 flex justify-center md:justify-end"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="group relative w-full max-w-[420px]">
            {/* Ambient gold glow backdrop */}
            <div
              className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-gold/20 via-transparent to-gold/10 opacity-60 blur-xl transition-opacity duration-700 group-hover:opacity-100"
              aria-hidden="true"
            />

            {/* Portrait Frame */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[#121215] shadow-2xl transition-all duration-700 group-hover:border-gold/50 group-hover:shadow-[0_25px_60px_-15px_rgba(212,197,169,0.18)]">
              <img
                src={profile.avatar || '/images/thaseer-portrait.jpg'}
                alt="Thaseer A R — Formal Portrait"
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover object-[center_16%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />

              {/* Gradient overlay for readability and polish */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"
                aria-hidden="true"
              />

              {/* Floating Status & Identity Card */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 backdrop-blur-md w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-chalk">
                    Available for projects
                  </span>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <h2 className="font-serif text-2xl text-chalk sm:text-3xl">
                      {profile.name}
                    </h2>
                    <p className="font-mono text-xs text-gold/90">
                      AI Developer & Full-Stack Engineer
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-mu">
                    {profile.location.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-3 text-center font-mono text-xs tracking-wide text-mu md:text-right">
              Thaseer A R <span className="mx-2 text-gold">·</span> Bengaluru, India
            </p>
          </div>
        </motion.div>
      </section>

      {/* SELECTED WORK */}
      <WorkShowcase />

      {/* SERVICES */}
      <section
        id="services"
        className="wrap border-t border-[color:var(--line)] py-20 md:py-24"
      >
        <FadeIn>
          <p className="lbl">Services</p>

          <h2 className="mb-10 mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl md:text-7xl">
            What I build for clients.
          </h2>
        </FadeIn>

        {services.map((service, index) => (
          <FadeIn key={service.title}>
            <div className="border-t border-[color:var(--line)]">
              <button
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
                aria-expanded={open === index}
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
              >
                <span className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-xs text-gold">
                    0{index + 1}
                  </span>

                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl">
                    {service.title}
                  </span>
                </span>

                <motion.span
                  animate={{ rotate: open === index ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  <Plus size={22} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.ul
                    className="grid gap-2 overflow-hidden pb-6 pl-8 text-sm text-mu sm:pl-12 sm:text-base md:grid-cols-2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 30,
                    }}
                  >
                    {service.items.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* PROCESS */}
      <section className="wrap border-t border-[color:var(--line)] py-20 md:py-24">
        <FadeIn>
          <p className="lbl">Process</p>

          <h2 className="mb-10 mt-3 font-serif text-4xl sm:text-5xl md:text-7xl">
            How we work.
          </h2>
        </FadeIn>

        <ol className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {process.map(([title, description], index) => (
            <li key={title}>
              <FadeIn delay={index * 0.08}>
                <div className="h-full border-t border-gold pt-4">
                  <span className="font-mono text-xs text-gold">
                    0{index + 1}
                  </span>

                  <h3 className="mt-2 font-serif text-3xl">
                    {title}
                  </h3>

                  <p className="mt-2 leading-relaxed text-mu">
                    {description}
                  </p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="wrap grid gap-8 border-t border-[color:var(--line)] py-20 md:grid-cols-12 md:gap-10 md:py-24"
      >
        <FadeIn className="md:col-span-5">
          <p className="lbl">About</p>

          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
            Practical products, built end to end.
          </h2>
        </FadeIn>

        <FadeIn className="md:col-span-7" delay={0.1}>
          <p className="text-base leading-relaxed text-mu md:text-lg">
            I’m an independent developer based in {profile.location}, with a{' '}
            {profile.education}. I enjoy building AI-powered applications,
            automation systems, and refined digital experiences — and I’d like
            to build yours.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {Object.entries(skills).map(([group, technologies]) => (
              <div key={group}>
                <h3 className="lbl">{group}</h3>

                <p className="mt-2 font-mono text-xs leading-6 text-mu">
                  {technologies.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="wrap border-t border-[color:var(--line)] py-20 md:py-28"
      >
        <FadeIn>
          <p className="lbl">Have a project in mind?</p>

          <h2 className="mt-4 max-w-6xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-6xl md:text-8xl">
            Have an ambitious idea? Let’s build something intelligent.
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-4 md:mt-10">
            <MagneticWrapper>
              <button className="btn btn-p" onClick={openDrawer}>
                Start a Project
                <ArrowRight size={16} />
              </button>
            </MagneticWrapper>

            <a
              className="break-all text-sm text-mu transition-colors hover:text-gold sm:text-base"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
          </div>

          <p className="mt-4 text-sm text-mu">
            Send an inquiry through the form, or email directly.
          </p>

          <div className="mt-6">
            <Social />
          </div>
        </FadeIn>
      </section>
    </PageWrapper>
  )
}
