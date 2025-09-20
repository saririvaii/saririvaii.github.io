import Navigation from './Navigation'

export default function Header() {
  return (
    <header>
      <nav aria-label="Primary Hidden Navigation" className="sr-only">
        <ul>
          <li><a href="/case-study">Case Studies</a></li>
          <li><a href="/migration">Migration</a></li>
          <li><a href="/migration/wordpress-to-sanity">WordPress → Sanity</a></li>
          <li><a href="/migration/prismic-to-sanity">Prismic → Sanity</a></li>
          <li><a href="/migration/strapi-to-contentful">Strapi → Contentful</a></li>
          <li><a href="/migration/adobe-experience-manager-to-contentful">AEM → Contentful</a></li>
          <li><a href="/migration/wordpress-to-contentful">WordPress → Contentful</a></li>
          <li><a href="/migration/dato-to-contentful">Dato CMS → Contentful</a></li>
          <li><a href="/migration/wordpress-to-prismic">WordPress → Prismic</a></li>
          <li><a href="/migration/adobe-experience-manager-to-sanity">AEM → Sanity</a></li>
          <li><a href="/migration/storyblok-to-contentful">Storyblok → Contentful</a></li>
          <li><a href="/migration/storyblok-to-sanity">Storyblok → Sanity</a></li>
          <li><a href="/migration/sanity-to-contentful">Sanity → Contentful</a></li>
          <li><a href="/migration/contentful-to-sanity">Contentful → Sanity</a></li>
          <li><a href="/services/sanity">Sanity website development</a></li>
          <li><a href="/services/nextjs">Next.js app development</a></li>
          <li><a href="/services/contentful">Contentful website development</a></li>
          <li><a href="/services/sanity-nextjs-accelerator">Sanity & Next.js accelerator</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Get in touch</a></li>
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
