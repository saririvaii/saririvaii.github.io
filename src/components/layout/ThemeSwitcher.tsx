'use client'

import { useState } from 'react'
import { Monitor, Sun, Moon } from 'lucide-react'

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('system')

  const themes = [
    { id: 'system', icon: Monitor, label: 'System theme' },
    { id: 'light', icon: Sun, label: 'Light theme' },
    { id: 'dark', icon: Moon, label: 'Dark theme' }
  ]

  return (
    <div className="md:flex md:flex-col md:items-start">
      <h3 className="text-xs text-zinc-500 uppercase tracking-wider mb-6 font-mono">
        Theme
      </h3>
      <div className="grid grid-cols-3 border rounded-none w-[180px] overflow-hidden border-zinc-300 dark:border-zinc-700">
        {themes.map(({ id, icon: Icon, label }) => (
          <button 
            key={id}
            type="button" 
            className={`flex h-10 items-center justify-center py-2 px-3 transition-colors ${
              theme === id 
                ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-white' 
                : 'bg-white text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800'
            }`}
            title={label}
            onClick={() => setTheme(id)}
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
