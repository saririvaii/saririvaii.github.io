'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useProjects } from '@/hooks/useSanityData'
import { urlFor } from '@/lib/sanity'
import { ExternalLink } from 'lucide-react'

interface Project {
  title: string
  description: string
  category: string
  publishedAt: string
  slug: {
    current: string
  }
  featuredImage?: {
    alt?: string
    asset: {
      _ref: string
    }
  }
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
}

export default function FeaturedProjects() {
  const { data: projects, loading } = useProjects() as { data: Project[] | null, loading: boolean }
  const router = useRouter()

  if (loading) {
    return (
      <section className="container">
        <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-16">
          <div className="px-4">
            <div className="animate-pulse">
              <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded w-80 mb-12"></div>
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-full h-48 bg-zinc-200 dark:bg-zinc-700 rounded-lg"></div>
                    <div className="space-y-3">
                      <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4"></div>
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-full"></div>
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-2/3"></div>
                      <div className="flex gap-2">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded-full w-16"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const handleProjectClick = (slug: string) => {
    router.push(`/${slug}`)
  }

  return (
    <section className="container">
      <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-16">
        <div className="px-4">
          <div className="space-y-8">
            {projects?.map((project: any, index: number) => {
              const isEven = index % 2 === 0
              const isImageLeft = isEven
              
              return (
                <div 
                  key={index} 
                  className="group block animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onClick={() => handleProjectClick(project.slug?.current)}
                >
                  <div className="flex flex-col md:flex-row md:gap-8 md:items-center p-6 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.02]">
                    {/* Image */}
                    <div className={`w-full md:w-1/2 aspect-video bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden rounded-lg group-hover:rounded-xl transition-all duration-300 ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}>
                      {project.featuredImage ? (
                        <Image
                          src={urlFor(project.featuredImage).width(600).height(400).url()}
                          alt={project.featuredImage.alt || project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-200 dark:bg-zinc-700 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-600 transition-colors duration-300"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Text Content */}
                    <div className={`w-full md:w-1/2 flex flex-col items-start mt-4 md:mt-0 ${isImageLeft ? 'md:order-2' : 'md:order-1'}`}>
                      <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-3 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-[16px] text-zinc-600 dark:text-zinc-400 mb-4 text-left w-full group-hover:text-zinc-500 dark:group-hover:text-zinc-500 transition-colors duration-300">
                        {project.description}
                      </p>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        {project.technologies?.map((tech: string, tagIndex: number) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded-full group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 group-hover:scale-105 transition-all duration-300"
                            style={{ animationDelay: `${tagIndex * 100}ms` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex gap-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-300 group-hover:scale-105"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={16} />
                            Live Site
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
