export type Category = 'ai' | 'web' | 'auto'

export interface CaseStudyMedia {
  src: string
  alt: string
  label: string
  caption?: string
  badge?: string
}

export interface Project {
  id: string
  title: string
  category: Category
  categoryLabel: string
  tagline: string
  summary: string
  problem: string
  approach: string
  architecture: string[]
  features: string[]
  challenges: { title: string; body: string }[]
  stack: string[]
  mockup: 'chat' | 'menu' | 'dash'
  links: { live?: string; source?: string }
  primaryImage?: {
    src: string
    alt: string
    label?: string
  }
  secondaryImage?: {
    src: string
    alt: string
    label?: string
    caption?: string
  }
}
