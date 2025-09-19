'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useProjects } from '@/hooks/useSanityData'
import { urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

export default function ProjectsPage() {
  const { data: projects, loading } = useProjects()

  if (loading) {
    return (
      <main>
        <Header />
        <div className="container">
          <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-24 lg:py-32">
            <div className="px-4">
              <div className="animate-pulse">
                <div className="h-16 bg-zinc-200 dark:bg-zinc-700 rounded mb-12"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                      <div className="aspect-video bg-zinc-200 dark:bg-zinc-700"></div>
                      <div className="p-6">
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
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Header />
      <div className="container">
        <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-24 lg:py-32">
          <div className="px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
                My Projects
              </h1>
              <p className="text-xl lg:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                A collection of my work including web applications, tutorials, and case studies.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects?.map((project: any, index: number) => (
                <Link key={index} href={`/blog/${project.slug?.current}`} className="group">
                  <div className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
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
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded">
                          {project.category}
                        </span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                          {project.publishedAt && new Date(project.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 3).map((tech: string, tagIndex: number) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 3 && (
                          <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded">
                            +{project.technologies.length - 3} more
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
      </div>
      <Footer />
    </main>
  )
}
