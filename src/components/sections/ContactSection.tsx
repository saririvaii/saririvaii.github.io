'use client'

import { useState } from 'react'

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState('fill-form')

  return (
    <section>
      <hr className="border-zinc-200 dark:border-zinc-800" />
      <section className="container">
        <div className="border-x border-zinc-200 dark:border-zinc-800 relative">
          <div className="pt-16">
            <div className="flex w-full flex-col items-center">
              <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center mb-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl dark:text-white">
                  Get in touch
                </h2>
                <p className="text-base md:text-lg text-balance max-w-md text-zinc-600 dark:text-zinc-300">
                  Book a meeting with us to discuss how we can help or fill out a form to get in touch
                </p>
              </div>
            </div>
          </div>
          
          <div dir="ltr" data-orientation="horizontal" className="w-full flex flex-col justify-center">
            <div className="px-4 mx-auto w-full max-w-md my-4">
              <div role="tablist" aria-orientation="horizontal" className="inline-flex h-9 items-center justify-center bg-muted p-1 text-muted-foreground rounded-none w-full" tabIndex={0} data-orientation="horizontal" style={{ outline: 'none' }}>
                <button 
                  type="button" 
                  role="tab" 
                  aria-selected={activeTab === 'fill-form'} 
                  aria-controls="fill-form-content" 
                  data-state={activeTab === 'fill-form' ? 'active' : 'inactive'} 
                  id="fill-form-trigger" 
                  className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-none flex-1 ${
                    activeTab === 'fill-form' 
                      ? 'bg-background text-foreground shadow' 
                      : ''
                  }`}
                  tabIndex={-1} 
                  data-orientation="horizontal" 
                  onClick={() => setActiveTab('fill-form')}
                >
                  Fill a form
                </button>
                <button 
                  type="button" 
                  role="tab" 
                  aria-selected={activeTab === 'book-call'} 
                  aria-controls="book-call-content" 
                  data-state={activeTab === 'book-call' ? 'active' : 'inactive'} 
                  id="book-call-trigger" 
                  className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-none flex-1 ${
                    activeTab === 'book-call' 
                      ? 'bg-background text-foreground shadow' 
                      : ''
                  }`}
                  tabIndex={-1} 
                  data-orientation="horizontal" 
                  onClick={() => setActiveTab('book-call')}
                >
                  Book a call
                </button>
              </div>
            </div>
            
            <div 
              data-state={activeTab === 'fill-form' ? 'active' : 'inactive'} 
              data-orientation="horizontal" 
              role="tabpanel" 
              aria-labelledby="fill-form-trigger" 
              id="fill-form-content" 
              tabIndex={0} 
              className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full" 
              style={{ animationDuration: '0s' }}
            >
              <div className="h-full overflow-hidden border py-8 -m-px w-[calc(100%+2px)] border-zinc-200 dark:border-zinc-800">
                <div className="space-y-6 max-w-2xl mx-auto px-4">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-zinc-950 dark:text-zinc-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" htmlFor="fullName">
                        Full name
                      </label>
                      <input 
                        className="flex h-[54px] w-full border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-zinc-500" 
                        placeholder="Enter your full name" 
                        id="fullName" 
                        aria-describedby="fullName-description" 
                        aria-invalid="false" 
                        name="fullName"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-zinc-950 dark:text-zinc-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" htmlFor="email">
                        Email address
                      </label>
                      <input 
                        className="flex h-[54px] w-full border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-zinc-500" 
                        placeholder="Enter your email address" 
                        id="email" 
                        aria-describedby="email-description" 
                        aria-invalid="false" 
                        type="email" 
                        name="email"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-zinc-950 dark:text-zinc-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" htmlFor="message">
                        Message
                      </label>
                      <textarea 
                        className="flex min-h-[54px] w-full border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-zinc-500" 
                        placeholder="What are you looking for?" 
                        name="message" 
                        id="message" 
                        aria-describedby="message-description" 
                        aria-invalid="false"
                      />
                    </div>
                    
                    <div className="flex flex-row items-start space-x-3 space-y-0">
                      <input className="" id="privacy" aria-describedby="privacy-description" aria-invalid="false" type="checkbox" />
                      <div className="space-y-1 leading-none">
                        <label className="text-zinc-950 dark:text-zinc-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm" htmlFor="privacy">
                          I have read and understood the privacy policy and consent to the processing of my personal data.
                        </label>
                      </div>
                    </div>
                    
                    <button 
                      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 h-10 px-4 py-2 w-full" 
                      type="submit" 
                      disabled
                    >
                      Send message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            <div 
              data-state={activeTab === 'book-call' ? 'active' : 'inactive'} 
              data-orientation="horizontal" 
              role="tabpanel" 
              aria-labelledby="book-call-trigger" 
              id="book-call-content" 
              tabIndex={0} 
              className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full"
              hidden={activeTab !== 'book-call'}
            >
              {/* Book call content would go here */}
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
