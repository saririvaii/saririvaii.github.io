import StudioClient from './StudioClient'

// Generate static params for studio routes
export async function generateStaticParams() {
  // Generate the basic studio route and common paths
  return [
    { index: [] },
    { index: ['index'] },
    { index: ['structure'] },
    { index: ['structure', 'skillsPage'] },
    { index: ['structure', 'homePage'] },
    { index: ['structure', 'project'] },
    { index: ['structure', 'hero'] },
    { index: ['structure', 'skill'] },
  ]
}

export default function StudioPage() {
  return <StudioClient />
}