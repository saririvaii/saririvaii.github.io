'use client'

import { useSkills } from '@/hooks/useSanityData'

export default function Skills() {
  const { data: skills, loading } = useSkills()

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
          <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-12 text-center">
            Technologies & Skills
          </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skillsByCategory.map((category: any, index: number) => (
                  <div key={index} className="text-center">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {category.skills?.map((skill: any, skillIndex: number) => (
                        <span 
                          key={skillIndex}
                          className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm rounded-full"
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
