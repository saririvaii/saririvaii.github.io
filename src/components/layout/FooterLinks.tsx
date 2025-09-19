import Link from 'next/link'

interface FooterSectionProps {
  title: string
  links: Array<{ label: string; href: string; badge?: string }>
}

export default function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div>
      <h3 className="text-xs text-zinc-500 uppercase tracking-wider mb-6 font-mono">
        {title}
      </h3>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors inline-flex items-center gap-2" href={link.href}>
              {link.label}
              {link.badge && (
                <span className="text-xs px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">
                  {link.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
