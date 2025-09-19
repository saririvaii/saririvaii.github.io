'use client'

import { use } from 'react'
import Header from '@/components/layout/Header'
import Breadcrumb from '@/components/Breadcrumb'
import HeroSection from '@/components/HeroSection'
import ArticleContent from '@/components/ArticleContent'
import { useProject } from '@/hooks/useSanityData'
import { urlFor } from '@/lib/sanity'

interface ProjectPostProps {
  params: Promise<{
    slug: string
  }>
}

interface ProjectData {
  title: string
  description: string
  intro?: string
  featuredImage?: {
    alt?: string
    asset: {
      _ref: string
    }
  }
  content?: any[]
  slug?: {
    current: string
  }
}

export default function ProjectPost({ params }: ProjectPostProps) {
  const resolvedParams = use(params)
  const { data: project, loading } = useProject(resolvedParams.slug) as { data: ProjectData | null, loading: boolean }

  if (loading) {
    return (
      <main>
        <Header />
        <div className="container">
          <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-24 lg:py-32">
            <div className="animate-pulse">
              <div className="h-16 bg-zinc-200 dark:bg-zinc-700 rounded mb-6"></div>
              <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded mb-8"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!project) {
    return (
      <main>
        <Header />
        <div className="container">
          <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-24 lg:py-32">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">
                Project Not Found
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-400">
                The project you're looking for doesn't exist.
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: project.title }
  ]

  const heroData = {
    title: project.title,
    description: project.description,
    intro: project.intro,
    imageUrl: project.featuredImage ? urlFor(project.featuredImage).width(1200).height(630).url() : null,
    imageAlt: project.featuredImage?.alt || project.title,
  }

  // Convert Sanity content to HTML string for ArticleContent component
  const articleContent = project.content ? project.content.map((block: any) => {
    if (block._type === 'block') {
      let html = ''
      
      // Handle text styles
      if (block.style === 'h2') {
        html += `<h2 class="scroll-m-20 pb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl first:mt-0">${block.children?.map((child: any) => child.text).join('')}</h2>`
      } else if (block.style === 'h3') {
        html += `<h3 class="scroll-m-20 text-lg sm:text-xl md:text-2xl lg:text-3xl">${block.children?.map((child: any) => child.text).join('')}</h3>`
      } else if (block.style === 'h4') {
        html += `<h4 class="scroll-m-20 text-base sm:text-lg md:text-xl lg:text-2xl">${block.children?.map((child: any) => child.text).join('')}</h4>`
      } else {
        html += `<p>${block.children?.map((child: any) => {
          let text = child.text
          if (child.marks) {
            child.marks.forEach((mark: string) => {
              if (mark === 'strong') text = `<strong>${text}</strong>`
              if (mark === 'em') text = `<em>${text}</em>`
              if (mark === 'code') text = `<code class="rounded-md border border-white/10 bg-opacity-5 p-1 text-sm lg:whitespace-nowrap">${text}</code>`
            })
          }
          return text
        }).join('')}</p>`
      }
      
      return html
    } else if (block._type === 'image') {
      const imageUrl = urlFor(block).width(1200).url()
      return `<div class="w-full my-6"><img width="1200" height="600" loading="lazy" alt="${block.alt || ''}" class="w-full h-auto object-contain rounded-lg transition-opacity duration-300 hover:opacity-90" src="${imageUrl}"></div>`
    } else if (block._type === 'youtubeVideo') {
      // Extract video ID from YouTube URL
      const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return (match && match[2].length === 11) ? match[2] : null
      }
      
      const videoId = getYouTubeId(block.url)
      if (!videoId) return ''
      
      return `<div class="w-full my-6"><div class="relative w-full aspect-video rounded-lg overflow-hidden"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" title="${block.title || 'YouTube video'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="rounded-lg"></iframe></div></div>`
    } else if (block._type === 'code') {
      return `<pre class="rounded-md border border-white/10 bg-opacity-5 p-4 text-sm overflow-x-auto"><code class="language-${block.language || 'typescript'}">${block.code}</code></pre>`
    }
    return ''
  }).join('') : ''

  return (
    <main className="animate-fade-in-up">
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <HeroSection {...heroData} />
      <hr className="border-zinc-200 dark:border-zinc-800" />
      <ArticleContent content={articleContent} />
    </main>
  )
}