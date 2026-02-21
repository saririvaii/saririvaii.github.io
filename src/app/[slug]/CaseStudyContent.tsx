'use client'

import { useEffect, useMemo, useState } from 'react'
import { type PortableTextComponents } from '@portabletext/react'
import { Project } from 'sanity.types'
import RichTextBlock from '@/components/ui/RichTextBlock'

interface CaseStudyContentProps {
  sections?: Project['sections']
  /**
   * Optional offset for fixed headers (e.g. 80)
   */
  scrollOffsetPx?: number
  /**
   * Optional: class wrapper if you already have a `default-section` container style
   * (we still apply `default-section` below, this is for extra tweaks)
   */
  className?: string
  /**
   * Optional: PortableText component overrides
   */
  portableTextComponents?: PortableTextComponents
}

/**
 * Small helper to create stable ids from section titles
 */
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

/**
 * Smooth scroll to an element id with an offset (for sticky headers)
 */
function scrollToId(id: string, offsetPx = 0) {
  const el = document.getElementById(id)
  if (!el) return

  const y = window.scrollY + el.getBoundingClientRect().top - offsetPx
  window.scrollTo({ top: y, behavior: 'smooth' })
}

export default function CaseStudyContent({
  sections,
  scrollOffsetPx = 96,
  className = '',
  portableTextComponents,
}: CaseStudyContentProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [navHovered, setNavHovered] = useState(false)

  // Build ids once
  const sectionMeta = useMemo(() => {
    if (!sections) return []
    return sections.map((s, idx) => {
      const base = slugify(s.title || `section-${idx + 1}`)
      // ensure uniqueness even if titles repeat
      const id = `${base}-${idx}`
      return { id, title: s.title, key: s._key ?? id, index: idx }
    })
  }, [sections])

  // Find active section index
  const activeIndex = useMemo(() => {
    return sectionMeta.findIndex((meta) => meta.id === activeId)
  }, [sectionMeta, activeId])

  // Track active section via scroll position — deterministic, no IntersectionObserver flicker
  useEffect(() => {
    if (!sectionMeta.length) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      // Activation point: center of viewport (50% from top)
      const viewportCenter = scrollY + window.innerHeight * 0.5

      let current = ''
      let closestDistance = Infinity
      let containingSection = ''

      for (const { id } of sectionMeta) {
        const el = document.getElementById(id)
        if (!el) continue
        
        const rect = el.getBoundingClientRect()
        const sectionTop = rect.top + scrollY
        const sectionBottom = sectionTop + rect.height
        const sectionCenter = sectionTop + rect.height * 0.5
        
        // Check if viewport center is within this section
        if (viewportCenter >= sectionTop && viewportCenter <= sectionBottom) {
          containingSection = id
        }
        
        // Calculate distance from section center to viewport center
        const distance = Math.abs(sectionCenter - viewportCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          current = id
        }
      }
      
      // Prioritize section that contains the viewport center
      setActiveId(containingSection || current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sectionMeta, scrollOffsetPx])

  if (!sections?.length) return null

  return (
    <div className={`relative ${className}`}>
      {/* RIGHT NAV (sticky) */}
      <div className="pointer-events-none hidden lg:block">
        <aside
          className={[
            'pointer-events-auto',
            'fixed right-8 top-1/2 -translate-y-1/2 z-50',
            'transition-all duration-300 ease-out',
            navHovered ? 'w-[160px]' : 'w-[38px]',
          ].join(' ')}
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
        >
          <div
            className={[
              'rounded-xl transition-all duration-300 ease-out',
              navHovered 
                ? 'bg-white-main/60 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] px-3 py-4' 
                : 'bg-transparent px-0 py-0',
            ].join(' ')}
          >
            <nav className={navHovered ? 'flex flex-col gap-0.5 items-end' : 'flex flex-col items-end space-y-[1px]'}>
            {sectionMeta.map(({ id, title, index }) => {
                const isActive = id === activeId
                const isRead = activeIndex !== -1 && index < activeIndex

                let dashWidth = 'w-[4px]'
                if (isActive) dashWidth = 'w-10'
                else if (isRead) dashWidth = 'w-[10px]'

                return (
                    <button
                        key={id}
                        type="button"
                        onClick={() => scrollToId(id, scrollOffsetPx)}
                        className={[
                        'group flex items-center',
                        navHovered 
                            ? 'justify-end py-0.5' 
                            : 'relative justify-end h-[7px] p-0 m-0 leading-none',
                        ].join(' ')}
                        aria-current={isActive ? 'true' : 'false'}
                    >
                        {/* dash - only show when not hovered */}
                        {!navHovered && (
                        <span
                            className={[
                                'block h-[1px] bg-black/90 transition-all duration-500 ease-out',
                                dashWidth,
                            ].join(' ')}
                        />
                        )}

                        {/* label */}
                        <span
                        className={[
                            'whitespace-nowrap tracking-[-0.01em] transition-all duration-300 ease-out',
                            navHovered 
                                ? 'opacity-100 text-xs text-right' 
                                : 'absolute right-0 top-1/2 -translate-y-1/2 opacity-0 translate-x-0 pointer-events-none',
                            'group-hover:line-through',
                            isActive ? 'text-black' : 'text-black/60',
                        ].join(' ')}
                        >
                            {title}
                        </span>
                    </button>
                    )
                })}
            </nav>

          </div>
        </aside>
      </div>

      {/* MAIN CONTENT */}
      <div className="default-section py-0 pb-12">
        <div className="flex flex-col gap-20">
          {sections.map((section, sectionIndex) => {
            const meta = sectionMeta[sectionIndex]
            const id = meta?.id ?? `section-${sectionIndex}`

            return (
              <section key={section._key ?? id} id={id} className="scroll-mt-24">
                {/* Optional: hide this if ONLY want title in nav */}
                <div className="mb-10">
                  <h2 className="text-body-small tracking-[-0.01em] text-black/40">{section.title}</h2>
                </div>

                <div className="flex flex-col gap-12">
                  {(section.contentBlocks ?? []).map((block, blockIndex) => {
                    const key = block._key ?? `${id}-block-${blockIndex}`
                    const isFullWidth = Boolean(block.fullWidth)

                    if (isFullWidth) {
                      return (
                        <div key={key} className="w-full">
                          {/* Full width block inside default-section */}
                          <div className="w-full">
                            {block.headline ? (
                              <div className="mb-4 text-sm tracking-[-0.01em] text-black/60">
                                {block.headline}
                              </div>
                            ) : null}

                            <div className="prose prose-neutral max-w-none">
                              <RichTextBlock value={block.body ?? []} />
                            </div>
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div key={key} className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-x-8 md:gap-y-6">
                        {/* headline left: col-span-3 */}
                        <div className="w-full md:col-span-4 md:pr-12">
                          {block.headline ? (
                            <h3 className="text-2xl md:text-3xl leading-[0.95] tracking-[-0.03em] text-black">
                              {block.headline}
                            </h3>
                          ) : null}
                        </div>

                        {/* body right: start col 4 span 5 */}
                        <div className="w-full md:col-start-5 md:col-span-8">
                          <div className="prose prose-neutral max-w-none">
                            <RichTextBlock value={block.body ?? []} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
