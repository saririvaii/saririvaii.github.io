// import Link from 'next/link'
// import FooterSection from './FooterLinks'
// import ThemeSwitcher from './ThemeSwitcher'

// const footerSections = [
//   {
//     title: 'Invictus',
//     links: [
//       { label: 'Team', href: '/team' },
//       { label: 'Blog', href: '/blog' },
//       { label: 'Careers', href: '/careers', badge: 'Hiring' },
//       { label: 'Get in touch', href: '/contact' }
//     ]
//   },
//   {
//     title: 'Services',
//     links: [
//       { label: 'Migration', href: '/migration' },
//       { label: 'Sanity', href: '/services/sanity' },
//       { label: 'Next.js', href: '/services/nextjs' },
//       { label: 'Contentful', href: '/services/contentful' }
//     ]
//   },
//   {
//     title: 'Social',
//     links: [
//       { label: 'LinkedIn', href: 'https://www.linkedin.com/company/11290247' },
//       { label: 'X', href: 'https://x.com/studioroboto' }
//     ]
//   }
// ]

// export default function Footer() {
//   return (
//     <footer className="-mt-px">
//       <hr className="border-zinc-200 dark:border-zinc-800" />
//       <section className="container">
//         <div className="border-x border-zinc-200 dark:border-zinc-800 relative">
//           <div className="py-12 px-4">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
//               {footerSections.map((section, index) => (
//                 <FooterSection key={index} {...section} />
//               ))}
//               <ThemeSwitcher />
//             </div>
//           </div>
//         </div>
//       </section>
      
//       <hr className="border-zinc-200 dark:border-zinc-800" />
//       <section className="container">
//         <div className="border-x border-zinc-200 dark:border-zinc-800 relative">
//           <div className="py-6 px-4">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//               <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
//                 <Link className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" href="/privacy">
//                   Privacy policy
//                 </Link>
//                 <span className="hidden md:inline">•</span>
//                 <Link className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" href="/terms">
//                   Terms of use
//                 </Link>
//               </div>
//               <div className="flex items-center gap-8">
//                 <div className="text-sm text-zinc-500">
//                   <span>Registered in England & Wales</span>
//                   <span className="mx-2">•</span>
//                   <span>VAT Number 426637679</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </footer>
//   )
// }
