'use client'

import { useSkills } from '@/hooks/useSanityData'

interface Skill {
  name: string
  level?: string
  icon?: string
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

export default function Skills() {
  const { data: skills, loading } = useSkills() as { data: SkillCategory[] | null, loading: boolean }

  if (loading) {
    return (
      <section className="container">
        <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-16">
          <div className="px-4">
            <div className="animate-pulse">
              <div className="h-10 bg-zinc-200 dark:bg-zinc-700 rounded mb-12 mx-auto w-80"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded mb-4"></div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-20"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Skills are already grouped by category from the new schema
  const skillsByCategory = skills || []

  return (
    <section className="container">
      <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-16">
        <div className="px-4">
          <h2 className="tracking-tight text-zinc-700 dark:text-white/50 mb-12 text-center">
            Technologies & Skills
          </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skillsByCategory.map((category: any, index: number) => (
                  <div 
                    key={index} 
                    className="text-center animate-fade-in-up hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {category.skills?.map((skill: any, skillIndex: number) => (
                        <span 
                          key={skillIndex}
                          className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-110 transition-all duration-300 cursor-default"
                          style={{ animationDelay: `${(index * 200) + (skillIndex * 50)}ms` }}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
        </div>
      </div>
    </section>
  )
}
