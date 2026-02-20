"use client";

import { Project } from "sanity.types";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudyContent from "./CaseStudyContent";
import Footer from "@/components/layout/Footer";

interface ProjectClientProps {
    project: Project;
}

export default function ProjectClient({ project }: ProjectClientProps) {
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
            />
            <CaseStudyContent 
                sections={project.sections} 
                scrollOffsetPx={96}
            />
            <Footer />
        </div>
    );
}