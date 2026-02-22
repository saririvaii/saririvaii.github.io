import ProjectCards from "@/components/ui/ProjectCards";
import { client, queries } from "@/lib/sanity";
import type { Project } from "../../../sanity.types";
import Footer from '@/components/layout/Footer';

export const revalidate = 3600;

export default async function WorksPage() {
    const projects: Project[] = await client.fetch(queries.projects);

    const seen = new Set<string>();
    const uniqueProjects = (projects ?? []).filter((project) => {
        const id = project._id;
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
    });

    if (!uniqueProjects.length) {
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
                <h1 className="text-section-title text-center text-black-main font-sans tracking-tight mb-4 md:mb-0">
                    Works I&apos;m proud of.
                </h1>
                <div className="space-y-10 md:space-y-16">
                    {uniqueProjects.map((project, index) => (
                        <ProjectCards
                            key={project._id}
                            project={project}
                            imageLeft={index % 2 === 0}
                        />
                    ))}
                </div>
            </section>
            <Footer />
        </main>
    );
}
