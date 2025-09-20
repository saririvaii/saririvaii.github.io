import Link from 'next/link'
import Navigation from './Navigation'

export default function Header() {
  return (
    <header>
      <nav aria-label="Primary Hidden Navigation" className="sr-only">
        <ul>
          <li><Link href="/case-study">Case Studies</Link></li>
          <li><Link href="/migration">Migration</Link></li>
          <li><Link href="/migration/wordpress-to-sanity">WordPress → Sanity</Link></li>
          <li><Link href="/migration/prismic-to-sanity">Prismic → Sanity</Link></li>
          <li><Link href="/migration/strapi-to-contentful">Strapi → Contentful</Link></li>
          <li><Link href="/migration/adobe-experience-manager-to-contentful">AEM → Contentful</Link></li>
          <li><Link href="/migration/wordpress-to-contentful">WordPress → Contentful</Link></li>
          <li><Link href="/migration/dato-to-contentful">Dato CMS → Contentful</Link></li>
          <li><Link href="/migration/wordpress-to-prismic">WordPress → Prismic</Link></li>
          <li><Link href="/migration/adobe-experience-manager-to-sanity">AEM → Sanity</Link></li>
          <li><Link href="/migration/storyblok-to-contentful">Storyblok → Contentful</Link></li>
          <li><Link href="/migration/storyblok-to-sanity">Storyblok → Sanity</Link></li>
          <li><Link href="/migration/sanity-to-contentful">Sanity → Contentful</Link></li>
          <li><Link href="/migration/contentful-to-sanity">Contentful → Sanity</Link></li>
          <li><Link href="/services/sanity">Sanity website development</Link></li>
          <li><Link href="/services/nextjs">Next.js app development</Link></li>
          <li><Link href="/services/contentful">Contentful website development</Link></li>
          <li><Link href="/services/sanity-nextjs-accelerator">Sanity & Next.js accelerator</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/contact">Get in touch</Link></li>
        </ul>
      </nav>
      
      <section className="container">
        <div className="border-x border-zinc-200 dark:border-zinc-800 relative h-4"></div>
      </section>
      
      <hr className="border-zinc-200 dark:border-zinc-800" />
      
      <section className="container">
        <div className="border-x border-zinc-200 dark:border-zinc-800 relative h-16">
          <Navigation />
        </div>
      </section>
      
      <hr className="border-zinc-200 dark:border-zinc-800" />
    </header>
  )
}
