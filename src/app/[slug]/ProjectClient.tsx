"use client";

import { Project } from "sanity.types";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudyContent from "./CaseStudyContent";
import NextProject from "./NextProject";
import Footer from "@/components/layout/Footer";

interface NextProjectData {
    slug: string;
    heroTitle: string;
    featuredImage?: any;
}

interface ProjectClientProps {
    project: Project;
    nextProject?: NextProjectData | null;
}

export default function ProjectClient({ project, nextProject }: ProjectClientProps) {
    return (
        <div>
            <CaseStudyHero
                preTitle={project.preTitle}
                title={project.heroTitle}
                description={project.heroIntro}
                stats={project.heroStats?.map((stat) => ({
                    value: stat.number || '',
                    label: stat.description || '',
                })) || []}
                heroImage={project.heroImage}
                heroVideo={(project as any).heroVideo?.asset?.url}
            />
            <CaseStudyContent
                sections={project.sections}
                scrollOffsetPx={96}
            />
            {nextProject && (
                <NextProject
                    slug={nextProject.slug}
                    title={nextProject.heroTitle}
                    featuredImage={nextProject.featuredImage}
                />
            )}
            <Footer />
        </div>
    );
}