"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import type { SanityImage } from "../../../sanity.types";

interface AnimatedHeroImageProps {
    desktopImages?: SanityImage[];
    mobileImages?: SanityImage[];
}

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function easeInOutSine(t: number) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

export default function AnimatedHeroImage({
    desktopImages,
    mobileImages,
}: AnimatedHeroImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Rendered value (smoothed)
    const [scrollOffset, setScrollOffset] = useState(0);

    // Instant target based on scroll position
    const targetOffset = useRef(0);

    useEffect(() => {
        let rafScroll = 0;
        let rafAnimate = 0;

        const computeTarget = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const vh = window.innerHeight;

            const total = vh + rect.height;
            const current = vh - rect.top;
            const raw = clamp(current / total, 0, 1);
            const eased = easeInOutSine(raw);

            // Keep subtle
            const maxOffset = 160;
            targetOffset.current = (eased - 0.5) * 2 * maxOffset;
        };

        const onScroll = () => {
            cancelAnimationFrame(rafScroll);
            rafScroll = requestAnimationFrame(computeTarget);
        };

        // Smoother glide: smaller factor = more smoothing
        const SMOOTHING = 0.05; // try 0.03–0.07

        const animate = () => {
            setScrollOffset((prev) => {
                const next = lerp(prev, targetOffset.current, SMOOTHING);

                // Snap when super close to avoid endless tiny movement/jitter
                if (Math.abs(next - targetOffset.current) < 0.1)
                    return targetOffset.current;

                return next;
            });

            rafAnimate = requestAnimationFrame(animate);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        computeTarget();
        rafAnimate = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafScroll);
            cancelAnimationFrame(rafAnimate);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    if (
        !desktopImages ||
        !mobileImages ||
        desktopImages.length < 2 ||
        mobileImages.length < 3
    ) {
        return null;
    }

    // Subtle but readable speed differences
    const col1Y = scrollOffset * 0.7;
    const col2Y = scrollOffset * 0.45;
    const col3Y = scrollOffset * 0.95;

    return (
        <div
            ref={containerRef}
            className="bg-accent-primary rounded-3xl col-span-4 grid grid-cols-4 gap-6 overflow-hidden h-[85vh] px-6"
        >
            {/* Column 1: Desktop images span 2 cols */}
            <div className="col-span-2 relative h-full overflow-hidden">
                <div
                    className="absolute left-0 top-1/2 w-full will-change-transform"
                    style={{ transform: `translateY(calc(-50% + ${col1Y}px))` }}
                >
                    <div className="flex flex-col gap-6 py-12">
                        <div className="relative w-full rounded-lg overflow-hidden">
                            <Image
                                src={urlFor(desktopImages[0]).width(1200).url()}
                                alt={desktopImages[0]?.alt || "Desktop image 1"}
                                width={1200}
                                height={800}
                                className="w-full h-auto object-cover"
                                sizes="50vw"
                                priority
                            />
                        </div>

                        <div className="relative w-full rounded-lg overflow-hidden">
                            <Image
                                src={urlFor(desktopImages[1]).width(1200).url()}
                                alt={desktopImages[1]?.alt || "Desktop image 2"}
                                width={1200}
                                height={800}
                                className="w-full h-auto object-cover"
                                sizes="50vw"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Column 2: Single mobile */}
            <div className="col-span-1 relative h-full overflow-hidden">
                <div
                    className="absolute left-0 top-1/2 w-full will-change-transform"
                    style={{ transform: `translateY(calc(-50% + ${col2Y}px))` }}
                >
                    <div className="py-14">
                        <div className="relative w-full rounded-lg overflow-hidden">
                            <Image
                                src={urlFor(mobileImages[0]).width(600).url()}
                                alt={mobileImages[0]?.alt || "Mobile image 1"}
                                width={600}
                                height={1200}
                                className="w-full h-auto object-cover"
                                sizes="25vw"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Column 3: Two mobiles */}
            <div className="col-span-1 relative h-full overflow-hidden">
                <div
                    className="absolute left-0 top-1/2 w-full will-change-transform"
                    style={{ transform: `translateY(calc(-50% + ${col3Y}px))` }}
                >
                    <div className="flex flex-col gap-6 py-12">
                        <div className="relative w-full rounded-lg overflow-hidden">
                            <Image
                                src={urlFor(mobileImages[1]).width(600).url()}
                                alt={mobileImages[1]?.alt || "Mobile image 2"}
                                width={600}
                                height={1200}
                                className="w-full h-auto object-cover"
                                sizes="25vw"
                            />
                        </div>

                        <div className="relative w-full rounded-lg overflow-hidden">
                            <Image
                                src={urlFor(mobileImages[2]).width(600).url()}
                                alt={mobileImages[2]?.alt || "Mobile image 3"}
                                width={600}
                                height={1200}
                                className="w-full h-auto object-cover"
                                sizes="25vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
