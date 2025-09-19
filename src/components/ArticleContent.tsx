'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ArticleContentProps {
  content: string
  tableOfContents: Array<{
    id: string
    title: string
    level: number
  }>
}

export default function ArticleContent({ content, tableOfContents }: ArticleContentProps) {
  const [activeSection, setActiveSection] = useState('introduction')

  return (
    <section className="container">
      <div className="border-x relative py-8 px-4 border-b border-zinc-200 dark:border-zinc-800 border-x-[0.5]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          <main className="min-w-0">
            <div 
              className="prose prose-slate prose-headings:font-normal dark:prose-invert prose-headings:scroll-m-24 prose-headings:text-opacity-90 dark:prose-headings:text-opacity-100 prose-p:text-opacity-80 dark:prose-p:text-opacity-90 prose-a:underline prose-a:decoration-dotted prose-ol:list-decimal prose-ol:text-opacity-80 dark:prose-ol:text-opacity-90 prose-ul:list-disc prose-ul:text-opacity-80 dark:prose-ul:text-opacity-90 prose-h2:prose-h2:first:mt-0 max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </main>
          
          <aside className="hidden lg:block">
            <div className="sticky top-4 rounded-lg">
              <div className="sticky left-0 top-8 flex flex-col">
                <h2 id="table-of-contents-title" className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                  Table of contents
                </h2>
                <nav aria-labelledby="table-of-contents-title">
                  <ol className="flex flex-col space-y-4 text-zinc-600 dark:text-zinc-400 list-none m-0 p-0">
                    {tableOfContents.map((item, index) => (
                      <li key={item.id} className="flex flex-col space-y-3">
                        <div className="flex items-start">
                          <span className="me-3 text-sm font-mono text-zinc-900 dark:text-zinc-100" aria-hidden="true">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <a 
                            className={`text-sm truncate hover:text-zinc-900 dark:hover:text-zinc-200 ${
                              activeSection === item.id 
                                ? 'text-zinc-900 font-medium dark:text-zinc-100' 
                                : ''
                            }`}
                            href={`#${item.id}`}
                            onClick={() => setActiveSection(item.id)}
                          >
                            {item.title}
                          </a>
                        </div>
                        {item.level > 1 && (
                          <div className="relative ms-4 space-y-3 ps-3">
                            <div className="absolute top-0 bottom-0 start-0 w-px bg-zinc-300 dark:bg-zinc-600" aria-hidden="true"></div>
                            <ol className="list-none m-0 p-0 space-y-3">
                              <li className="relative">
                                <a className="block text-sm truncate hover:text-zinc-900 dark:hover:text-zinc-200" href={`#${item.id}`}>
                                  {item.title}
                                </a>
                              </li>
                            </ol>
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
