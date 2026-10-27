import { profile } from '../../data/profile'
export function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)] py-10 text-sm text-mu"><div className="wrap flex flex-wrap justify-between gap-4">
      <span>© {new Date().getFullYear()} {profile.name} · {profile.location}</span>
      <span className="flex gap-5"><a className="hover:text-gold" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        {profile.linkedin && <a className="hover:text-gold" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
        <a className="hover:text-gold" href={`mailto:${profile.email}`}>Email</a></span></div></footer>
  )
}
