"use client";

import RichTextBlock from "@/components/ui/RichTextBlock";
import AnimatedHeroImage from "@/components/ui/AnimatedHeroImage";

export default function Hero({ hero }: { hero: any }) {

    return (
        <section className="default-section">
            <div className="grid grid-cols-8 gap-8 md:gap-16 pt-32 md:pt-16">
                {/* Rich Text Title - spans 5 columns */}
                <div className="col-span-8 md:col-span-5">
                    {hero?.title && (
                        <RichTextBlock
                            value={hero.title}
                            elementClassNames={{
                                h1: "text-hero-title text-black-main mb-6 [&:not(:first-child)]:mt-12",
                                p: "text-caption text-black-main/40 font-sans tracking-tight [&:not(:last-child)]:mb-6",
                                link: "text-black-main/40 font-sans tracking-tight !underline",
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

                    {/* Description
                    {hero?.description && (
                        <p className="text-black-main/50 font-sans mt-6">
                            {hero.description}
                        </p>
                    )} */}
                </div>
            </div>
        </section>
    );
}
