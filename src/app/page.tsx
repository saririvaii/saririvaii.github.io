import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Skills from '@/components/sections/Skills'
import FeaturedProjects from '@/components/sections/FeaturedProjects'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <hr className="border-zinc-200 dark:border-zinc-800" />
      <Skills />
      <hr className="border-zinc-200 dark:border-zinc-800" />
      <FeaturedProjects />
    </main>
  )
}
