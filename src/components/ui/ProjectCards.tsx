'use client'

import Image from 'next/image'
import CTAButton from "./richTextComponents/Button";
import { ArrowUpRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import type { Project } from "../../../sanity.types";

interface ProjectCardsProps {
    project: Project;
    imageLeft: boolean;
}

export default function ProjectCards({ project, imageLeft }: ProjectCardsProps) {
    if (!project) return null;

    const projectSlug = project.slug?.current || '';
    const technologies = project.technologies || [];
    const category = project.category || '';

    // Format tags: category + technologies
    const tags = [category, ...technologies].filter(Boolean).join(' · ');

    return (
        <div className="flex-row gap-4 h-[75vh] grid grid-cols-8 col-span-8 items-center">
            {/* Image Section */}
            <div className={`col-span-5 bg-black-main/5 rounded-3xl grid grid-cols-4 gap-4 h-full overflow-hidden ${imageLeft ? 'order-1' : 'order-2'}`}>
                {project.featuredImage && (
                    <div className="col-span-4 relative h-full rounded-3xl overflow-hidden">
                        <Image
                            src={urlFor(project.featuredImage).width(1200).height(800).url()}
                            alt={project.featuredImage.alt || project.title || 'Project image'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 62.5vw"
                        />
                    </div>
                )}
            </div>

            {/* Text Section */}
            <div className={`col-span-3 flex flex-col gap-6 p-4 max-w-[90%] ${imageLeft ? 'order-2' : 'order-1'}`}>
                {/* Tags */}
                {tags && (
                    <p className="text-button text-black-main/50 tracking-tight font-sans">
                        {tags}
                    </p>
                )}

                {/* Title */}
                <h2 className="text-section-subtitle leading-7 text-black-main font-sans">
                    {project.title}
                </h2>

                {/* Description
                {project.description && (
                    <p className="text-base text-black-main/80 font-sans leading-relaxed">
                        {project.description}
                    </p>
                )} */}

                {/* Action Links */}
                <div className="flex flex-row gap-3 flex-wrap">
                    {projectSlug && (
                        <CTAButton 
                            href={`/${projectSlug}`}
                        >
                            View Case Study
                        </CTAButton>
                    )}
                    {project.liveUrl && (
                        <CTAButton
                            href={project.liveUrl}
                            variant="secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                            icon={ArrowUpRight}
                            iconPosition="left"
                        >
                            View App Website
                        </CTAButton>
                    )}
                </div>
            </div>
        </div>
    );
}