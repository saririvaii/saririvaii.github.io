'use client'

import CMSImage from '@/components/ui/richTextComponents/CMSImage'
import { HeroStats, Project } from 'sanity.types'

interface CaseStudyHeroProps {
  preTitle?: string
  title?: string
  description?: string
  stats?: Array<{
    value: string
    label: string
  }>
  heroImage?: Project['heroImage']
}

export default function CaseStudyHero({
  preTitle,
  title,
  description,
  stats = [],
  heroImage,
}: CaseStudyHeroProps) {
  return (
    <section className="default-section">

        {/* Top content */}
        <div className="pt-24 grid grid-cols-8 gap-4 items-end w-full">
            {/* Left text */}
            <div className="col-span-8 md:col-span-4">
                <div className="flex flex-col gap-4">
                    {preTitle && (
                    <p className="text-caption text-black-main/60 font-sans">{preTitle}</p>
                    )}

                    {title && (
                    <h1 className="text-hero-title-small font-[400] text-black-main">
                        {title.split('\n').map((line, idx) => (
                        <span key={idx} className="block">
                            {line}
                        </span>
                        ))}
                    </h1>
                    )}

                    {description && (
                    <p className="text-body-small leading-relaxed text-black-main/70 font-sans">
                        {description}
                    </p>
                    )}
                </div>
            </div>

            {/* Right stats */}
            {stats && stats.length > 0 && (
                <div className="col-span-8 md:col-span-3 md:col-start-6">
                <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:mt-4">
                    {stats.slice(0, 4).map((s, i) => (
                    <div key={i} className="min-w-0 max-w-20 md:max-w-44">
                        <div className="text-section-subtitle font-medium text-black-main font-sans tracking-[-0.02em]">
                        {s.value}
                        </div>
                        <div className="mt-1 text-button leading-snug text-black-main/60 font-sans whitespace-pre-line">
                        {s.label}
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            )}
        </div>
        {/* Hero image card */}
        {heroImage && heroImage.asset && (
                <div className="col-span-4">
                <div className="overflow-hidden rounded-2xl bg-black-main/5">
                    <CMSImage
                        image={heroImage}
                        width={1920}
                        height={1080}
                        className="w-full h-full object-cover object-center"
                        priority
                    />
                </div>
            </div>
        )}
    </section>
  )
}
