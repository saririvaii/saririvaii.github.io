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
              <div className="space-y-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-32"></div>
                    <div className="flex flex-wrap gap-2">
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
          <div className="space-y-8">
            {skillsByCategory.map((category: any, index: number) => (
              <div 
                key={index} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Mobile: Stack vertically, Desktop: Side by side */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  {/* Category Title */}
                  <div className="md:w-1/4 lg:w-1/5 md:ml-12 lg:ml-24">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                  
                  {/* Skills */}
                  <div className="md:flex-1">
                    <div className="flex flex-wrap gap-2">
                      {category.skills?.map((skill: any, skillIndex: number) => (
                        <span 
                          key={skillIndex}
                          className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-105 transition-all duration-300 cursor-default"
                          style={{ animationDelay: `${(index * 200) + (skillIndex * 50)}ms` }}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
