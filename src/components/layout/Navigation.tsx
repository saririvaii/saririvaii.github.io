'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import AnimatedIcon from '@/components/ui/AnimatedIcon'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="relative h-full flex justify-between">
      <div className="w-[215px] lg:border-e h-full border-zinc-200 dark:border-zinc-800">
        <Link className="h-full items-center px-4 inline-flex group transition-colors lg:hover:bg-primary/5" href="/">
          <Logo className="w-24 h-10" />
        </Link>
      </div>
      
      <div className="flex-1 flex justify-center">
        <nav aria-label="Main" className="relative z-10 max-w-max flex-1 items-center justify-center hidden lg:flex h-full">
          <div style={{ position: 'relative' }}>
            <ul className="group flex flex-1 list-none items-center justify-center h-full">
            </ul>
          </div>
        </nav>
      </div>
      
      <div className="w-[215px] border-s border-zinc-200 dark:border-zinc-800 flex md:block">
        <Link className="hidden lg:flex h-full w-full items-center justify-center group transition-colors hover:bg-white hover:text-black" href="mailto:bysaririvai@gmail.com">
          <span className="group font-medium flex items-center gap-4">
            Get in touch
            <AnimatedIcon />
          </span>
        </Link>
      </div>
      
      <div className="lg:hidden flex items-center justify-end pe-4 h-full w-full">
        <div className="lg:hidden block absolute right-0 top-0 bottom-0">
          <button 
            type="button" 
            className="size-16 hover:bg-accent flex items-center justify-center border-s border-zinc-200 dark:border-zinc-800" 
            aria-label="Open menu" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  )
}
