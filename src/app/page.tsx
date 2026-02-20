import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import HeroProjects from "@/components/sections/HeroProjects";
import Footer from "@/components/layout/Footer";

export default function Home() {
    return (
        <main>
            <Header />
            <Hero />
            <HeroProjects />
            <Footer />
        </main>
    );
}
