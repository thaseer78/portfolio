import type { Project } from '../../types'

interface MockupProps {
  kind?: Project['mockup']
  image?: {
    src: string
    alt: string
    label?: string
  }
  title?: string
  urlHint?: string
  onExpand?: () => void
  className?: string
}

export function Mockup({ kind, image, title, urlHint, onExpand, className = '' }: MockupProps) {
  if (image) {
    const hint = urlHint || (title ? `${title.toLowerCase().replace(/\s+/g, '-')}.app` : 'preview.local')
    return (
      <div
        className={`group/mockup relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-[color:var(--line)] bg-[#0A0A0C] transition-all duration-500 hover:border-gold/40 ${className}`}
      >
        {/* Browser Chrome Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[color:var(--line)] bg-[#121215] px-3.5 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]/80 transition-opacity group-hover/mockup:opacity-100" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]/80 transition-opacity group-hover/mockup:opacity-100" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]/80 transition-opacity group-hover/mockup:opacity-100" />
          </div>

          <div className="flex max-w-[60%] items-center gap-1.5 truncate rounded-md border border-white/5 bg-black/40 px-3 py-0.5 font-mono text-[11px] text-mu/80 transition-colors group-hover/mockup:text-mu">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/60" />
            <span className="truncate">{hint}</span>
          </div>

          <div className="flex items-center gap-2">
            {image.label && (
              <span className="hidden font-mono text-[10px] tracking-wider text-gold/80 sm:inline-block">
                {image.label}
              </span>
            )}
            {onExpand && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onExpand()
                }}
                className="rounded p-1 text-mu transition-colors hover:bg-white/10 hover:text-chalk"
                aria-label="View full screenshot"
                title="View full screenshot"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Screenshot Container */}
        <div className="relative flex-1 overflow-hidden bg-[#0A0A0C]">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mockup:scale-[1.025]"
          />
          {/* Subtle bottom fade to blend with card */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>
    )
  }

  // Fallback wireframe mockup when no real image is provided
  return (
    <div
      className={`h-full w-full overflow-hidden rounded-xl border border-[color:var(--line)] bg-[#0A0A0C] ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-[color:var(--line)] bg-[#121215] p-2.5">
        <i className="h-2 w-2 rounded-full bg-white/20" />
        <i className="h-2 w-2 rounded-full bg-white/20" />
        <i className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      <div className="grid gap-2 p-4">
        {kind === 'chat' && (
          <>
            <div className="h-3 w-2/3 rounded bg-white/10" />
            <div className="ml-auto h-3 w-1/2 rounded bg-gold/40" />
            <div className="h-3 w-3/4 rounded bg-white/10" />
            <div className="mt-4 h-8 rounded-full border border-[color:var(--line)]" />
          </>
        )}
        {kind === 'menu' && (
          <>
            <div className="h-5 w-1/3 rounded bg-gold/40" />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex justify-between border-b border-[color:var(--line)] pb-2"
              >
                <span className="h-3 w-1/3 rounded bg-white/10" />
                <span className="h-3 w-8 rounded bg-white/10" />
              </div>
            ))}
          </>
        )}
        {kind === 'dash' && (
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-14 rounded-lg ${
                  i === 0 ? 'bg-gold/30' : 'bg-white/5'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

