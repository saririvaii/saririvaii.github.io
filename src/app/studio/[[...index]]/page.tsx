import StudioClient from './StudioClient'

// Generate static params for studio routes
export async function generateStaticParams() {
  return [
    { index: [] },
    { index: ['index'] }
  ]
}

export default function StudioPage() {
  return <StudioClient />
}