'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioClient() {
  // Only render in development mode
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            Sanity Studio
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Studio is not available in production build.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
            Use Sanity Studio at <a href="https://sanity.io" className="text-blue-500 hover:underline">sanity.io</a>
          </p>
        </div>
      </div>
    )
  }

  return <NextStudio config={config} />
}
