import { client, queries } from "@/lib/sanity";
import Hero from "@/components/sections/Hero";
import HeroProjects from "@/components/sections/HeroProjects";
import Footer from "@/components/layout/Footer";

export const revalidate = 3600;

export default async function Home() {
    const [hero, projects] = await Promise.all([
        client.fetch(queries.hero),
        client.fetch(queries.projects),
    ]);

    return (
        <main>
            <Hero hero={hero} />
            <HeroProjects projects={projects} />
            <Footer />
        </main>
    );
}
