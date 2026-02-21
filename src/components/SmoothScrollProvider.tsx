'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from '@studio-freight/lenis'

const LenisContext = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisContext)

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Skip Lenis for Sanity Studio routes
    if (pathname?.startsWith('/studio')) {
      return
    }

    const lenisInstance = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    setLenis(lenisInstance)

    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenisInstance.destroy()
      setLenis(null)
    }
  }, [pathname])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
