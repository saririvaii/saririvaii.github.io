'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface PlaygroundItem {
    _key?: string
    title?: string
    subtitle?: string
    hexCode?: string
    isBig?: boolean
    image?: { asset?: { _ref?: string }; [key: string]: any }
    video?: { asset?: { url?: string } }
}

interface PlaygroundRow {
    _key?: string
    items?: PlaygroundItem[]
}

interface PlaygroundGridProps {
    rows: PlaygroundRow[]
}

export default function PlaygroundGrid({ rows }: PlaygroundGridProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {rows.map((row, rowIdx) => (
                <div
                    key={row._key ?? rowIdx}
                    className="grid grid-cols-7 gap-2 items-stretch"
                    style={{ height: 'clamp(180px, 26vw, 380px)' }}
                >
                    {(row.items ?? []).map((item, itemIdx) => (
                        <PlaygroundItemCard key={item._key ?? itemIdx} item={item} />
                    ))}
                </div>
            ))}
        </div>
    )
}

function PlaygroundItemCard({ item }: { item: PlaygroundItem }) {
    const [hovered, setHovered] = useState(false)

    const videoUrl = item.video?.asset?.url
    const hasVideo = !!videoUrl
    const hasImage = !!item.image?.asset?._ref

    return (
        <div
            className={[
                'relative overflow-hidden rounded-lg h-full',
                item.isBig ? 'col-span-3' : 'col-span-2',
            ].join(' ')}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Media */}
            {hasVideo ? (
                <video
                    src={videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                />
            ) : hasImage ? (
                <Image
                    src={urlFor(item.image).width(800).url()}
                    alt={item.title ?? ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                />
            ) : (
                <div className="absolute inset-0 bg-black-main/5" />
            )}

            {/* Hover overlay */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4"
                style={{
                    backgroundColor: item.hexCode ?? '#000000',
                    opacity: hovered ? 1 : 0,
                }}
            >
                {item.subtitle && (
                    <p className="text-button text-black-main/70 font-sans tracking-tight text-center">
                        {item.subtitle}
                    </p>
                )}
                {item.title && (
                    <h3 className="text-body-large font-sans font-medium text-black-main text-center leading-tight tracking-tight">
                        {item.title}
                    </h3>
                )}
            </div>
        </div>
    )
}
