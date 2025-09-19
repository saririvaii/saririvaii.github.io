import Link from 'next/link'
import Image from 'next/image'

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'Modern e-commerce solution built with Next.js, Sanity CMS, and Stripe integration.',
    image: '/api/placeholder/600/400',
    tags: ['Next.js', 'Sanity', 'Stripe', 'TypeScript'],
    href: '/case-study/ecommerce-platform'
  },
  {
    title: 'SaaS Dashboard',
    description: 'Analytics dashboard with real-time data visualization and user management.',
    image: '/api/placeholder/600/400',
    tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    href: '/case-study/saas-dashboard'
  },
  {
    title: 'Content Management System',
    description: 'Headless CMS migration from WordPress to Sanity with custom components.',
    image: '/api/placeholder/600/400',
    tags: ['Sanity', 'WordPress', 'Migration', 'API'],
    href: '/case-study/cms-migration'
  }
]

export default function FeaturedProjects() {
  return (
    <section className="container">
      <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-16">
        <div className="px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white">
              Featured Projects
            </h2>
            <Link 
              href="/case-study" 
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              View all projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link key={index} href={project.href} className="group">
                <div className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
