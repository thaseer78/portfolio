export const profile = {
  name: 'Thaseer A R', location: 'Bengaluru, India',
  education: 'B.E. in Information Science & Technology, SEA College of Engineering & Technology',
  email: 'thaseerar789@gmail.com', github: 'https://github.com/thaseer78',
  linkedin: 'https://www.linkedin.com/in/thaseer-a-r-2bb532312/',
  calendly: import.meta.env.VITE_CALENDLY_URL as string | undefined,
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT as string | undefined,
  avatar: '/images/thaseer-portrait.jpg',
}
export const services = [
  { title: 'AI Applications & Agent Systems', items: ['Custom LLM integrations', 'AI assistants and conversational interfaces', 'Voice-enabled applications', 'Local LLM pipelines using Ollama', 'Context-aware chatbots', 'Memory-enabled systems using SQLite', 'AI API integration'] },
  { title: 'Full-Stack Web Products', items: ['React and TypeScript applications', 'Responsive websites', 'SaaS interfaces', 'Custom dashboards', 'Backend and API integration', 'Premium brand websites'] },
  { title: 'Workflow & Task Automation', items: ['Python automation', 'API integrations', 'Repetitive-task automation', 'Data processing pipelines', 'Backend workflow development'] },
]
export const process = [
  ['Discover', 'Understand goals and requirements.'], ['Define', 'Establish scope, deliverables, and priorities.'],
  ['Build', 'Design, engineer, and refine the solution.'], ['Deliver', 'Test, deploy, and hand over the finished product.'],
]
export const skills: Record<string, string[]> = { Frontend: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'], 'Backend & AI': ['Python', 'FastAPI', 'SQLite', 'Ollama'], Tools: ['Git', 'GitHub', 'Vercel', 'Render'] }
