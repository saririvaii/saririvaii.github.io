'use client'

import { useRef, useState, useEffect } from 'react'
import { urlFor } from '@/lib/sanity'
import { useLenis } from '@/components/SmoothScrollProvider'

interface ShowcaseItem {
    _key?: string
    title?: string
    image?: {
        asset?: { _ref?: string }
        alt?: string
        [key: string]: any
    }
}

interface ScrollingShowcaseProps {
    backgroundColor?: string
    items?: ShowcaseItem[]
}

export default function ScrollingShowcase({ backgroundColor, items }: ScrollingShowcaseProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [thumbLeft, setThumbLeft] = useState(0)
    const [thumbWidth, setThumbWidth] = useState(100)
    const lenis = useLenis()
    // Keep a ref so the wheel handler always sees the latest instance
    const lenisRef = useRef(lenis)
    useEffect(() => { lenisRef.current = lenis }, [lenis])

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const updateThumb = () => {
            const { scrollLeft, scrollWidth, clientWidth } = el
            const ratio = clientWidth / scrollWidth
            setThumbWidth(ratio * 100)
            const maxScroll = scrollWidth - clientWidth
            setThumbLeft(maxScroll > 0 ? (scrollLeft / maxScroll) * (1 - ratio) * 100 : 0)
        }

        // Lock gesture direction for the lifetime of a single trackpad gesture
        let direction: 'h' | 'v' | null = null
        let dirTimer: ReturnType<typeof setTimeout>

        const onWheel = (e: WheelEvent) => {
            const ax = Math.abs(e.deltaX)
            const ay = Math.abs(e.deltaY)

            // Determine direction on first significant movement
            if (!direction) {
                if (ax > ay && ax > 3) direction = 'h'
                else if (ay > ax && ay > 3) direction = 'v'
                else return
            }

            // Reset lock when gesturing stops
            clearTimeout(dirTimer)
            dirTimer = setTimeout(() => { direction = null }, 100)

            if (direction === 'h') {
                e.preventDefault()
                el.scrollLeft += e.deltaX
            } else {
                // Forward vertical to Lenis so it stays smooth
                // data-lenis-prevent on the outer div means Lenis won't auto-handle
                // these events, so we drive it manually here
                const l = lenisRef.current
                if (l) l.scrollTo(window.scrollY + e.deltaY)
            }
        }

        updateThumb()
        el.addEventListener('scroll', updateThumb, { passive: true })
        el.addEventListener('wheel', onWheel, { passive: false })

        return () => {
            clearTimeout(dirTimer)
            el.removeEventListener('scroll', updateThumb)
            el.removeEventListener('wheel', onWheel)
        }
    }, [items])

    if (!items?.length) return null

    return (
        // data-lenis-prevent stops Lenis from auto-processing wheel events from
        // within this component; we handle routing manually in onWheel above
        <div
            data-lenis-prevent
            className="rounded-md pb-2 pt-6 overflow-hidden"
            style={{ backgroundColor: backgroundColor || '#f0ede8' }}
        >
            {/* Scroll track — no horizontal padding on the outer so content reaches the edges.
                Leading/trailing spacers fake the inset visually. */}
            <div
                ref={scrollRef}
                className="flex flex-row gap-3 overflow-x-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* Leading spacer — visual inset */}
                <div className="flex-shrink-0 w-2" aria-hidden />

                {items.map((item, idx) => {
                    const src = item.image?.asset?._ref
                        ? urlFor(item.image).height(960).auto('format').quality(85).url()
                        : null

                    return (
                        <div
                            key={item._key ?? idx}
                            className="flex-shrink-0 flex flex-col gap-2"
                        >
                            {item.title && (
                                <p className="!m-0 text-button font-sans text-white-main tracking-tight">
                                    {item.title}
                                </p>
                            )}
                            {src && (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={src}
                                    alt={item.image?.alt || item.title || ''}
                                    className="!m-0 h-[75vh] w-auto object-cover rounded-lg block flex-shrink-0"
                                    draggable={false}
                                />
                            )}
                        </div>
                    )
                })}

                {/* Trailing spacer — visual inset */}
                <div className="flex-shrink-0 w-2" aria-hidden />
            </div>

            {/* Scrollbar thumb — only shown when content overflows */}
            {thumbWidth < 100 && (
                <div className="mx-2 mt-4 mb-1 h-[5px] relative">
                    <div
                        className="absolute top-0 h-full rounded-full bg-black/10 transition-all duration-300 ease-out"
                        style={{ width: `${thumbWidth}%`, left: `${thumbLeft}%` }}
                    />
                </div>
            )}
        </div>
    )
}
