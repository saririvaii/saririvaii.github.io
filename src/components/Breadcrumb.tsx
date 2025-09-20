import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <section className="container">
      <div className="border-x border-zinc-200 dark:border-zinc-800 relative">
        <div className="h-10 overflow-x-auto border-b border-zinc-200 dark:border-zinc-800 px-4">
          <nav aria-label="Breadcrumb" className="h-full">
            <ol className="flex h-full items-center space-x-2 w-max">
              {items.map((item, index) => (
                <li key={index} className="flex flex-shrink-0 space-x-2">
                  {index > 0 && (
                    <span className="text-zinc-400 dark:text-zinc-600">/</span>
                  )}
                  {item.href ? (
                    <Link 
                      className="flex whitespace-nowrap capitalize text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200" 
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="flex whitespace-nowrap capitalize text-zinc-600 dark:text-zinc-400">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  )
}
