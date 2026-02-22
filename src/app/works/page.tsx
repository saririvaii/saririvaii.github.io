'use client'

import { useMemo } from 'react'
import ProjectCards from "@/components/ui/ProjectCards";
import { useProjects } from "@/hooks/useSanityData";
import type { Project } from "../../../sanity.types";
import Footer from '@/components/layout/Footer';

export default function WorksPage() {
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

    if (loading) {
        return (
            <main className="pt-24">
                <section className="default-section">
                    <div className="text-center text-black-main/60">Loading works...</div>
                </section>
            </main>
        );
    }

    if (!uniqueProjects || uniqueProjects.length === 0) {
        return (
            <main className="pt-24">
                <section className="default-section">
                    <div className="text-center text-black-main/60">No works found.</div>
                </section>
            </main>
        );
    }

    return (
        <main className="pt-24">
            <section className="default-section">
                <h1 className="text-section-title text-center text-black-main font-sans tracking-tight mb-12 md:mb-16">
                    All works that I&apos;m proud of.
                </h1>
                <div className="space-y-10 md:space-y-16">
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
            <Footer />
        </main>
    );
}
