"use client";

import Link from "next/link";
import RichTextBlock from "@/components/ui/RichTextBlock";
import AnimatedHeroImage from "@/components/ui/AnimatedHeroImage";
import { useHero } from "@/hooks/useSanityData";
import type { Hero } from "../../../sanity.types";

export default function Hero() {
    const { data: hero } = useHero() as { data: Hero | null };

    return (
        <section className="default-section">
            <div className="grid grid-cols-8 gap-16 pt-32">
                {/* Rich Text Title - spans 5 columns */}
                <div className="col-span-8 md:col-span-5">
                    {hero?.title && (
                        <RichTextBlock
                            value={hero.title}
                            elementClassNames={{
                                h1: "text-4xl sm:text-5xl lg:text-6xl font-sans text-black-main tracking-tight",
                                p: "text-xs lg:text-base text-black-main/40 font-sans tracking-tight",
                                link: "text-black-main/40 font-sans tracking-tight",
                            }}
                        />
                    )}
                </div>

                <div className="col-span-8">
                    {/* Animated Hero Image */}
                    {(hero as any)?.animatedHeroImage && (
                        <div className="w-full">
                            <AnimatedHeroImage
                                desktopImages={
                                    (hero as any).animatedHeroImage
                                        .desktopImages
                                }
                                mobileImages={
                                    (hero as any).animatedHeroImage.mobileImages
                                }
                            />
                        </div>
                    )}

                    {/* Description */}
                    {hero?.description && (
                        <p className="text-black-main/50 font-sans mt-6">
                            {hero.description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
