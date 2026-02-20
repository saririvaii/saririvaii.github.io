'use client'

import Link from 'next/link'
import RichTextBlock from '@/components/ui/RichTextBlock'
import { useHero } from '@/hooks/useSanityData'
import type { Hero } from '../../../sanity.types'

export default function Hero() {
  const { data: hero } = useHero() as { data: Hero | null }  

  return (
    <section className="default-section">
      <div className="grid grid-cols-8 gap-4 pt-24">

        {/* Rich Text Title - spans 5 columns */}
        <div className="col-span-8 md:col-span-5">
          {hero?.title && (
            <RichTextBlock 
              value={hero.title}
              elementClassNames={{
                h1: "text-4xl sm:text-5xl lg:text-6xl font-sans text-black-main tracking-tight",
                p: "text-xs lg:text-base text-black-main/40 font-sans tracking-tight",
              }}
            />
          )}

          {/* Animated Hero Image */}
          
          
          {/* Description */}
          {hero?.description && (
            <p className="text-lg lg:text-xl text-black-main/80 font-sans mt-6">
              {hero.description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
