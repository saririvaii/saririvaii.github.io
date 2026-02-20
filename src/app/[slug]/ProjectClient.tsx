"use client";

import { Project } from "sanity.types";
import CaseStudyHero from "./CaseStudyHero";

interface ProjectClientProps {
    project: Project;
}

export default function ProjectClient({ project }: ProjectClientProps) {
    // Type assertion for new hero fields until types are regenerated
    const projectWithHero = project as Project & {
        preTitle?: string;
        heroTitle?: string;
        heroIntro?: string;
        heroStats?: Array<{
            number?: string;
            description?: string;
        }>;
        heroImage?: {
            asset?: {
                _ref?: string;
                _type?: string;
            };
            alt?: string;
            [key: string]: any;
        };
    };

    return (
        <div>
            <CaseStudyHero 
                preTitle={projectWithHero.preTitle}
                title={projectWithHero.heroTitle}
                description={projectWithHero.heroIntro}
                stats={projectWithHero.heroStats?.map((stat) => ({
                    value: stat.number || '',
                    label: stat.description || '',
                })) || []}
                heroImage={projectWithHero.heroImage}
            />
        </div>
    );
}