import { ReactNode } from 'react'

interface BorderSectionProps {
  children: ReactNode
  className?: string
}

export default function BorderSection({ children, className = "" }: BorderSectionProps) {
  return (
    <section className="container">
      <div className={`border-x border-zinc-200 dark:border-zinc-800 relative ${className}`}>
        {children}
      </div>
    </section>
  )
}
