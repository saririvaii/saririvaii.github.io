'use client'

import { useMemo } from 'react'
import ProjectCards from "@/components/ui/ProjectCards";
import { useProjects } from "@/hooks/useSanityData";
import type { Project } from "../../../sanity.types";

export default function HeroProjects() {
    const { data: projects, loading } = useProjects() as { data: Project[] | null, loading: boolean };

    // Remove duplicates based on _id
    const uniqueProjects = useMemo(() => {
        if (!projects) return null;
        const seen = new Set<string>();
        return projects.filter((project) => {
            const id = project._id;
            if (!id || seen.has(id)) {
                return false;
            }
            seen.add(id);
            return true;
        });
    }, [projects]);

    if (!uniqueProjects || uniqueProjects.length === 0) {
        return null;
    }

    return (
        <section className="default-section">
            <h2 className="text-5xl text-center text-black-main font-sans tracking-tight">
                Recent works that have <br />
                significantly boosted business metrics.
            </h2>
            <div className="space-y-16">
                {uniqueProjects.map((project, index) => {
                    // Alternate: even index = image left, odd index = image right
                    const imageLeft = index % 2 === 0;
                    
                    return (
                        <ProjectCards 
                            key={project._id || `project-${index}`}
                            project={project}
                            imageLeft={imageLeft}
                        />
                    );
                })}
            </div>
        </section>
    );
}