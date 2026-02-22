import ProjectCards from "@/components/ui/ProjectCards";
import type { Project } from "../../../sanity.types";

export default function HeroProjects({ projects }: { projects: Project[] | null }) {
    const seen = new Set<string>();
    const uniqueProjects = (projects ?? []).filter((project) => {
        const id = project._id;
        if (!id || seen.has(id)) return false;
        seen.add(id);
        return true;
    });

    if (!uniqueProjects.length) {
        return null;
    }

    return (
        <section className="default-section">
            <h2 className="text-section-title text-center text-black-main font-sans tracking-tight">
                Recent works that have{' '}
                <br className="hidden md:block" />
                significantly boosted business metrics.
            </h2>
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
    );
}