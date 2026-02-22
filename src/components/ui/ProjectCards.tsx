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
    const tags = project.tags || [];

    return (
        <div className="flex flex-col md:grid md:grid-cols-8 gap-4 h-auto md:h-[75vh] col-span-8 items-center">
            {/* Image Section — always renders first on mobile */}
            <div className={`w-full md:col-span-5 bg-black-main/5 rounded-2xl md:rounded-3xl grid grid-cols-4 h-[56vw] min-h-[220px] md:h-full overflow-hidden order-1 ${imageLeft ? 'md:order-1' : 'md:order-2'}`}>
                {project.featuredImage && (
                    <div className="col-span-4 relative h-full rounded-2xl md:rounded-3xl overflow-hidden">
                        <Image
                            src={urlFor(project.featuredImage).width(1200).height(800).url()}
                            alt={project.featuredImage.alt || (project as any).heroTitle || (project as any).title || 'Project image'}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 62.5vw"
                        />
                    </div>
                )}
            </div>

            {/* Text Section */}
            <div className={`w-full md:col-span-3 flex flex-col gap-3 md:gap-6 py-1 md:p-4 max-w-full md:max-w-[90%] order-2 ${imageLeft ? 'md:order-2' : 'md:order-1'}`}>
                {tags && tags.length > 0 && (
                    <p className="text-button text-black-main/50 tracking-tight font-sans">
                        {tags.join(' · ')}
                    </p>
                )}

                <h2 className="text-section-subtitle leading-tight text-black-main font-sans">
                    {(project as any).heroTitle || 'Untitled Project'}
                </h2>

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