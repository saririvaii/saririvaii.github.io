import Link from 'next/link'
import AnimatedIcon from '@/components/ui/AnimatedIcon'

export default function Hero() {
  return (
    <section className="container">
      <div className="border-x border-zinc-200 dark:border-zinc-800 relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-dot-zinc-300 dark:bg-dot-zinc-700 [mask-image:linear-gradient(to_bottom_right,black_20%,transparent_30%,transparent_70%,black_80%)] z-[-1]"></div>
        <div className="text-center max-w-4xl mx-auto px-4 relative">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
            Full-Stack Developer & 
            <span className="block text-zinc-600 dark:text-zinc-400">
              Digital Solutions Architect
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
            I build modern web applications with Next.js, React, and cutting-edge technologies. 
            Specializing in performance, accessibility, and user experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="group inline-flex items-center justify-center px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Get in touch
              <AnimatedIcon />
            </Link>
            <Link 
              href="/case-study" 
              className="inline-flex items-center justify-center px-8 py-4 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              View my work
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
