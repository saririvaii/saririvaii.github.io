const skills = [
  {
    category: 'Frontend',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma']
  },
  {
    category: 'Tools & Platforms',
    technologies: ['Vercel', 'AWS', 'Docker', 'Git', 'Figma']
  },
  {
    category: 'CMS & Headless',
    technologies: ['Sanity', 'Contentful', 'Strapi', 'WordPress']
  }
]

export default function Skills() {
  return (
    <section className="container">
      <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-16">
        <div className="px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-12 text-center">
            Technologies & Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skill.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm rounded-full"
                    >
                      {tech}
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
