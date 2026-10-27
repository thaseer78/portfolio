import { createContext, useContext, useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CalendarDays } from 'lucide-react'
import { profile } from '../../data/profile'

export const DrawerCtx = createContext<() => void>(() => {})
export const useDrawer = () => useContext(DrawerCtx)

const init = { name: '', email: '', company: '', service: 'AI Integration', budget: 'Not sure yet', timeline: 'Flexible', details: '' }
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'mailto'

export function ContactDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [f, setF] = useState(init)
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>('idle')
  const first = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k); first.current?.focus()
    return () => window.removeEventListener('keydown', k)
  }, [open, onClose])
  const set = (k: keyof typeof init) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  async function submit(e: FormEvent) {
    e.preventDefault()
    const er: Record<string, string> = {}
    if (!f.name.trim()) er.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Please enter a valid email.'
    if (f.details.trim().length < 10) er.details = 'Tell me a little more (10+ characters).'
    setErrs(er); if (Object.keys(er).length) return
    if (profile.formEndpoint) {
      setStatus('sending')
      try {
        const r = await fetch(profile.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(f) })
        setStatus(r.ok ? 'sent' : 'error')
      } catch { setStatus('error') }
    } else {
      const body = Object.entries(f).map(([k, v]) => `${k}: ${v}`).join('\n')
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Project inquiry from ' + f.name)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
    }
  }
  const sel = (k: keyof typeof init, label: string, opts: string[]) => (
    <label className="block text-sm text-mu">{label}
      <select className="fld mt-1" value={f[k]} onChange={set(k)}>{opts.map((o) => <option key={o}>{o}</option>)}</select></label>
  )
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside role="dialog" aria-modal="true" aria-label="Start a project" className="fixed right-0 top-0 z-50 h-full w-full max-w-[480px] overflow-y-auto border-l border-[color:var(--line)] bg-surf p-6"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 32 }}>
            <div className="flex items-center justify-between"><h2 className="font-serif text-4xl">Start a project</h2>
              <button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:text-gold"><X /></button></div>
            {status === 'sent' ? <p role="status" className="mt-8 rounded-xl border border-gold/40 p-4 text-gold">Thanks — your inquiry was sent. I’ll reply by email.</p> : (
              <form onSubmit={submit} noValidate className="mt-6 grid gap-4">
                <label className="block text-sm text-mu">Name
                  <input ref={first} className="fld mt-1" value={f.name} onChange={set('name')} aria-invalid={!!errs.name} />
                  {errs.name && <span className="text-xs text-red-300">{errs.name}</span>}</label>
                <label className="block text-sm text-mu">Email
                  <input type="email" className="fld mt-1" value={f.email} onChange={set('email')} aria-invalid={!!errs.email} />
                  {errs.email && <span className="text-xs text-red-300">{errs.email}</span>}</label>
                <label className="block text-sm text-mu">Company or project (optional)<input className="fld mt-1" value={f.company} onChange={set('company')} /></label>
                {sel('service', 'Service needed', ['AI Integration', 'Web Application', 'Workflow Automation', 'Other'])}
                {sel('budget', 'Estimated budget', ['Not sure yet', 'Under $1k', '$1k – $5k', '$5k – $15k', '$15k+'])}
                {sel('timeline', 'Timeline', ['Flexible', 'Within 1 month', '1–3 months', '3+ months'])}
                <label className="block text-sm text-mu">Project details
                  <textarea rows={5} className="fld mt-1" value={f.details} onChange={set('details')} aria-invalid={!!errs.details} />
                  {errs.details && <span className="text-xs text-red-300">{errs.details}</span>}</label>
                {status === 'error' && <p role="alert" className="text-sm text-red-300">Sending failed. Please email {profile.email} directly.</p>}
                {status === 'mailto' && <p role="status" className="text-sm text-mu">Your email app should open with the message prepared. Nothing is sent until you press send there.</p>}
                <button className="btn btn-p justify-center" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send inquiry'}</button>
                {profile.calendly && <a className="btn justify-center" href={profile.calendly} target="_blank" rel="noopener noreferrer"><CalendarDays size={16} /> Book a discovery call</a>}
              </form>)}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
