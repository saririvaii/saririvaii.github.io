'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useProjects } from '@/hooks/useSanityData'
import { urlFor } from '@/lib/sanity'

export default function FeaturedProjects() {
  const { data: projects, loading } = useProjects()

  if (loading) {
    return (
      <section className="container">
        <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-16">
          <div className="px-4">
            <div className="animate-pulse">
              <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded w-80 mb-12"></div>
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-8">
                    <div className="w-1/3 aspect-video bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                    <div className="w-px bg-zinc-200 dark:bg-zinc-700"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded mb-2"></div>
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded mb-4"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-16"></div>
                        <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-20"></div>
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

  return (
    <section className="container">
      <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-16">
        <div className="px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-12">
            All Projects
          </h2>
          <div className="space-y-8">
            {projects?.map((project: any, index: number) => (
              <Link key={index} href={`/blog/${project.slug?.current}`} className="group block">
                <div className="flex gap-8 items-center">
                  <div className="w-1/3 aspect-video bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden rounded">
                    {project.featuredImage ? (
                      <Image
                        src={urlFor(project.featuredImage).width(600).height(400).url()}
                        alt={project.featuredImage.alt || project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-200 dark:bg-zinc-700"></div>
                    )}
                  </div>
                  <div className="w-px h-24 bg-zinc-200 dark:bg-zinc-700"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded">
                        {project.category}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {project.publishedAt && new Date(project.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-3 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies?.slice(0, 4).map((tech: string, tagIndex: number) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 4 && (
                        <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
