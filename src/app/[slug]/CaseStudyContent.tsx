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

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!sectionMeta.length) return

    const els = sectionMeta
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!els.length) return

    // We want a section to be considered "active" around the upper-middle of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the entry closest to the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0))

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        } else {
          // Clear active section when no sections are intersecting (e.g., in hero section)
          setActiveId('')
        }
      },
      {
        // This makes the "active band" feel like it matches your design:
        // top portion counts more, bottom less.
        root: null,
        rootMargin: `-${scrollOffsetPx + 12}px 0px -55% 0px`,
        threshold: [0.01, 0.1, 0.2],
      }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
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
                ? 'bg-white/60 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] px-3 py-4' 
                : 'bg-transparent px-0 py-0',
            ].join(' ')}
          >
            <nav className={navHovered ? 'flex flex-col gap-0.5 items-end' : 'flex flex-col items-end space-y-[1px]'}>
            {sectionMeta.map(({ id, title, index }) => {
                const isActive = id === activeId
                const isRead = activeIndex !== -1 && index < activeIndex

                let dashWidth = 'w-[2px]'
                if (isActive) dashWidth = 'w-10'
                else if (isRead) dashWidth = 'w-[7px]'

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
                      <div key={key} className="grid grid-cols-12 gap-x-8 gap-y-6">
                        {/* headline left: col-span-3 */}
                        <div className="col-span-8 lg:col-span-5 lg:pr-16">
                          {block.headline ? (
                            <h3 className="text-3xl leading-[0.95] tracking-[-0.03em] text-black">
                              {block.headline}
                            </h3>
                          ) : null}
                        </div>

                        {/* body right: start col 4 span 5 */}
                        <div className="col-span-8 lg:col-start-6 lg:col-span-7">
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
