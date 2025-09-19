'use client'

import Link from 'next/link'
import AnimatedIcon from '@/components/ui/AnimatedIcon'
import { useHero } from '@/hooks/useSanityData'

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
      <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-dot-zinc-300 dark:bg-dot-zinc-700 [mask-image:linear-gradient(to_bottom_right,black_20%,transparent_30%,transparent_70%,black_80%)] z-[-1]"></div>
        <div className="text-center max-w-4xl mx-auto px-4 relative">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
            {hero?.title || 'Full-Stack Developer &'}
            {hero?.subtitle && (
              <span className="block text-zinc-600 dark:text-zinc-400">
                {hero.subtitle}
              </span>
            )}
          </h1>
          <p className="text-xl lg:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            {hero?.description || 'I build modern web applications with Next.js, React, and cutting-edge technologies. Specializing in performance, accessibility, and user experience.'}
          </p>
          
        </div>
      </div>
    </section>
  )
}
