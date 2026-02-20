'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from '@studio-freight/lenis'

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Skip Lenis for Sanity Studio routes
    if (pathname?.startsWith('/studio')) {
      return
    }

    const lenis = new Lenis({
      duration: 1.2, // scroll smoothness
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [pathname])

  return <>{children}</>
}
