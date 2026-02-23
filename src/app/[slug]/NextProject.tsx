'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface NextProjectProps {
    slug: string
    title: string
    featuredImage?: any
}

export default function NextProject({ slug, title, featuredImage }: NextProjectProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY })
    }, [])

    const imageUrl = featuredImage ? urlFor(featuredImage).width(640).height(420).url() : null

    return (
        <>
            <div className="default-section py-16 md:py-24 ">
                <div className="w-full flex flex-col gap-3">
                    <p className="text-button text-black-main/40 font-sans tracking-tight uppercase">
                        Next Project
                    </p>
                    <Link
                        href={`/${slug}`}
                        className="cursor-none group w-fit"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <h2 className="text-[11vw] md:text-[7vw] font-sans font-[400] tracking-[-0.04em] leading-[0.9] text-black-main group-hover:opacity-60 transition-opacity duration-300">
                            {title}
                        </h2>
                    </Link>
                </div>
            </div>

            {/* Cursor-following image — fixed, outside Link to avoid layout issues */}
            {isHovered && imageUrl && (
                <div
                    className="fixed pointer-events-none z-50 w-72 h-48 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden shadow-2xl transition-opacity duration-150"
                    style={{ left: mousePos.x, top: mousePos.y }}
                >
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="288px"
                    />
                </div>
            )}
        </>
    )
}
