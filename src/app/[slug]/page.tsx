import { client } from '@/lib/sanity'
import ProjectClient from './ProjectClient'

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await client.fetch(`*[_type == "project"] {
    "slug": slug.current
  }`)
  
  return projects.map((project: any) => ({
    slug: project.slug,
  }))
}

interface ProjectPostProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPost({ params }: ProjectPostProps) {
  const resolvedParams = await params
  const project = await client.fetch(`*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    intro,
    content,
    featuredImage,
    gallery,
    technologies,
    category,
    liveUrl,
    githubUrl,
    featured,
    publishedAt,
    tags
  }`, { slug: resolvedParams.slug })

  return <ProjectClient project={project} />
}