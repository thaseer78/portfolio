import { Link } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
export default function NotFound() {
  return <PageWrapper title="Page not found — Thaseer A R"><div className="wrap py-40"><p className="lbl">404</p><h1 className="mt-3 font-serif text-7xl">Page not found.</h1><Link to="/" className="btn mt-8">Back home</Link></div></PageWrapper>
}
