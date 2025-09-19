'use client'

import Link from 'next/link'
import Image from 'next/image'
import AnimatedIcon from '@/components/ui/AnimatedIcon'
import { useHero } from '@/hooks/useSanityData'
import { urlFor } from '@/lib/sanity'

interface HeroData {
  title?: string
  subtitle?: string
  description?: string
  primaryButton?: {
    text?: string
    url?: string
  }
  secondaryButton?: {
    text?: string
    url?: string
  }
  heroImage?: {
    alt?: string
    asset: {
      _ref: string
    }
  }
}

export default function Hero() {
  const { data: hero, loading } = useHero() as { data: HeroData | null, loading: boolean }

  if (loading) {
    return (
      <section className="container">
        <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-24 lg:py-32">
          <div className="absolute inset-0 bg-dot-zinc-300 dark:bg-dot-zinc-700 [mask-image:linear-gradient(to_bottom_right,black_20%,transparent_30%,transparent_70%,black_80%)] z-[-1]"></div>
          <div className="text-center max-w-4xl mx-auto px-4 relative">
            <div className="animate-pulse">
              <div className="h-16 bg-zinc-200 dark:bg-zinc-700 rounded mb-6"></div>
              <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded mb-8"></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="h-12 bg-zinc-200 dark:bg-zinc-700 rounded w-32"></div>
                <div className="h-12 bg-zinc-200 dark:bg-zinc-700 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="container">
      <div className="border-x border-zinc-200 dark:border-zinc-800 relative pt-16 pb-16 md:pb-0">
        <div className="absolute inset-0 bg-dot-zinc-300 dark:bg-dot-zinc-700 [mask-image:linear-gradient(to_bottom_right,black_20%,transparent_30%,transparent_70%,black_80%)] z-[-1]"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-4">
          {/* Left side - Content */}
          <div className="space-y-8 animate-fade-in-left">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-zinc-900 dark:text-white mb-4 tracking-tight">
                {hero?.title || 'Full-Stack Developer &'}
                {hero?.subtitle && (
                  <span className="block text-zinc-600 dark:text-zinc-400 mt-2">
                    {hero.subtitle}
                  </span>
                )}
              </h1>
              <p className="text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {hero?.description || 'I build modern web applications with Next.js, React, and cutting-edge technologies. Specializing in performance, accessibility, and user experience.'}
              </p>
            </div>
            
            {/* Tech stack preview */}
            <div className="flex flex-wrap gap-3">
              {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js'].map((tech, index) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${600 + (index * 100)}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="hidden lg:block relative animate-fade-in-right" style={{ animationDelay: '400ms' }}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group">
                <Image
                  src={urlFor(hero?.heroImage).width(300).height(300).url()}
                  alt={hero?.heroImage?.alt || 'Hero image'}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
