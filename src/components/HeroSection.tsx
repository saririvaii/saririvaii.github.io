import Image from 'next/image'

interface HeroSectionProps {
  title: string
  description: string
  imageUrl?: string | null
  imageAlt: string
}

export default function HeroSection({ 
  title, 
  description, 
  imageUrl, 
  imageAlt, 
}: HeroSectionProps) {
  return (
    <div>
      <hr className="border-zinc-200 dark:border-zinc-800 -mt-px" />
      <section className="container">
        <div className="border-x border-zinc-200 dark:border-zinc-800 relative block -mt-px">
          <div className="col-span-full grid lg:grid-cols-2 items-stretch">
            <div className="relative w-full h-64 sm:h-80 lg:h-96 lg:order-2 overflow-hidden">
              {imageUrl ? (
                <Image
                  alt={imageAlt}
                  src={imageUrl}
                  fill
                  className="transition-opacity duration-300 data-[loading]:opacity-0 data-[loaded]:opacity-100 object-cover"
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px"
                />
              ) : (
                <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <span className="text-zinc-400 dark:text-zinc-600">No image</span>
                </div>
              )}
              <div className="absolute h-32 sm:h-40 lg:h-48 bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent z-[1] lg:hidden"></div>
              <div className="h-32 sm:h-40 lg:h-48 absolute bottom-0 left-0 right-0 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,transparent_60%,black)] lg:hidden"></div>
              <div className="h-16 sm:h-20 lg:h-24 absolute bottom-0 left-0 right-0 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,transparent_40%,black)] lg:hidden"></div>
            </div>
            
            <div className="relative z-[2] flex flex-col p-4 lg:p-0 lg:order-1 lg:items-start lg:justify-end">
              <div className="absolute inset-0 bg-dot-zinc-300 dark:bg-dot-zinc-700 [mask-image:linear-gradient(to_bottom_right,black_20%,transparent_30%,transparent_70%,black_80%)] z-[-1]"></div>
              <div className="relative lg:px-4 lg:py-8">
                <h1 className="text-4xl lg:text-5xl font-medium text-zinc-900 dark:text-white text-balance [text-shadow:0_1px_2px_rgba(0,0,0,0.1)] dark:[text-shadow:0_1px_2px_rgba(0,0,0,0.3)] lg:text-shadow-none dark:lg:text-shadow-none">
                  {title}
                </h1>
                <p className="mt-2 lg:mt-4 text-balance lg:text-lg lg:text-muted-foreground">
                  {description}
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
