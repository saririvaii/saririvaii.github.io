import Header from '@/components/layout/Header'
import Breadcrumb from '@/components/Breadcrumb'
import HeroSection from '@/components/HeroSection'
import ArticleContent from '@/components/ArticleContent'

interface BlogPostProps {
  params: {
    slug: string
  }
}

export default function BlogPost({ params }: BlogPostProps) {
  // This would typically fetch data based on the slug
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Building A Search Bar With Sanity Embeddings Index Api And Nextjs' }
  ]

  const heroData = {
    title: "Building a search bar with Sanity Embeddings Index API & Next.js",
    description: "Learn how to build a search bar using Sanity's Embeddings Index API & Next.js. This tutorial guides you through creating a dynamic, API-driven search component.",
    imageUrl: "https://cdn.sanity.io/images/dcflm8sj/production-v3/45e1a97d32901327e5d8eb392f3340df99ac2dae-1024x1024.jpg?rect=0,243,1024,538&w=1200&h=630&q=85&fit=max&auto=format",
    imageAlt: "Building a search bar with Sanity Embeddings Index API & Next.js",
    author: {
      name: "Hrithik",
      role: "Senior Full-stack Developer",
      avatar: "https://cdn.sanity.io/images/dcflm8sj/production-v3/f4c8d513115bf901edb945120b503d1308301e7d-2824x2736.jpg?rect=0,429,2824,1483&w=1200&h=630&q=85&fit=max&auto=format"
    }
  }

  const articleContent = `
    <h2 id="introduction" class="scroll-m-20 pb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl first:mt-0">Introduction</h2>
    <p>We've been wanting to tinker with Sanity's Embeddings Index API for a long time. We've also been toying with the idea of using it as a search bar too. So guess what we did.</p>
    <p>Sanity Embedding is essentially a pretty powerful, AI-powered semantic search for your content. It leverages embeddings, which are simplified vector representations of your documents, and can retrieve content based on meaning and context rather than just keywords.</p>
    <p>So with that out the way, let's walk through how to create a search bar in a Next.js application that utilizes Sanity's Embeddings Index API. We'll cover the key steps including:</p>
    <ul>
      <li>Setting up an embeddings index for your Sanity dataset</li>
      <li>Configuring the Embeddings Index API in your Sanity <a class="underline decoration-dotted underline-offset-2" href="https://robotostudio.com/case-study">project</a></li>
      <li>Building a search bar component in Next.js that queries the embeddings index</li>
      <li>Displaying the relevant search results to users</li>
    </ul>
    <p>By the end, you'll have a fully functional semantic search experience that allows users to find the most relevant documents based on their search queries.</p>
    <p>Whether you want to provide an intelligent search interface for your <a class="underline decoration-dotted underline-offset-2" href="/blog">blog</a>, documentation, or any other type of content, Sanity's Embeddings Index API makes it straightforward to implement. Let's dive in and see how it works!</p>
    
    <h2 id="setting-up-an-embeddings-index" class="scroll-m-20 pb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl first:mt-0">Setting up an embeddings index</h2>
    <p>To set up an embeddings index in Sanity, you have two main options:</p>
    <ol>
      <li><strong>Using the Sanity Studio UI</strong>:
        <ul>
          <li>Go to your project's Sanity Studio.</li>
          <li>Navigate to the "Embeddings" section.</li>
          <li>Click on "Create new index".</li>
          <li>Configure the index by specifying the dataset, projection, and other settings.</li>
          <li>Save the index configuration.</li>
        </ul>
      </li>
      <li><strong>Using the Sanity CLI</strong>:
        <ul>
          <li>Install the Sanity CLI if you haven't already.</li>
          <li>Run the command <code class="rounded-md border border-white/10 bg-opacity-5 p-1 text-sm lg:whitespace-nowrap">sanity init</code> to initialise a new Sanity project or you can use an existing one</li>
          <li>Use the <code class="rounded-md border border-white/10 bg-opacity-5 p-1 text-sm lg:whitespace-nowrap">sanity embeddings create</code> command to create a new embeddings index.</li>
          <li>Provide the necessary configuration options such as dataset, projection, etc.</li>
          <li>The CLI will create the embeddings index based on your configuration.</li>
        </ul>
      </li>
    </ol>
    <p>For detailed instructions on setting up an embeddings index using the CLI, you can refer to the Sanity documentation.</p>
    
    <div class="mx-auto max-w-7xl">
      <div class="relative w-full">
        <div class="relative w-full">
          <img width="1600" height="900" loading="eager" alt="Video thumbnail" class="h-full w-full object-cover transition-opacity duration-300 hover:opacity-90" src="https://image.mux.com/AheslFD5AJz9Rr02dcPZAs402gyoKosneDmG2o4zVeyZE/thumbnail.webp?fit_mode=smartcrop&time=0">
          <button type="button" class="absolute inset-0 m-auto flex h-[54px] w-[54px] items-center justify-center rounded-full bg-zinc-900/70 ring-1 ring-zinc-600 transition hover:scale-105 hover:bg-zinc-900/80" aria-label="Play video">
            <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-0.5">
              <path d="M0 14V0L11 7L0 14Z" class="fill-white"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <p>Once you have created the embeddings index using either method, Sanity will process your documents and generate the embeddings. The index will be ready to use for semantic search and other applications.</p>
    <p>In the next section, we will focus on configuring the Embeddings Index API in your Sanity project to enable querying the index from your <a class="underline decoration-dotted underline-offset-2" href="/services/nextjs">Next.js</a> application.</p>
    
    <h2 id="adding-search-to-nextjs" class="scroll-m-20 pb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl first:mt-0">Adding Search to Next.js</h2>
    <p>To add search functionality to your <a class="underline decoration-dotted underline-offset-2" href="/services/nextjs">Next.js</a> application using Sanity's embeddings index API, you need to implement three main components:</p>
    <ol>
      <li>Creating a search box.</li>
      <li>Creating an API endpoint to handle the query.</li>
      <li>Showing results to the client.</li>
    </ol>
    
    <h3 id="search-box" class="scroll-m-20 text-lg sm:text-xl md:text-2xl lg:text-3xl">Search Box</h3>
    <p>To create a search box component in your Next.js application, you can use a simple input field. Here's an example of how you can implement a basic search box component:</p>
    
    <h3 id="api-endpoint" class="scroll-m-20 text-lg sm:text-xl md:text-2xl lg:text-3xl">API Endpoint</h3>
    <p>To create an API endpoint you can start by creating <code class="rounded-md border border-white/10 bg-opacity-5 p-1 text-sm lg:whitespace-nowrap">/api/search/route.ts</code> file and add business logic in it. The logic for the search endpoint consists of two main components:</p>
    <ol>
      <li>Getting embeddings results from Sanity that match the vector of the search query and return the corresponding document IDs.</li>
      <li>Retrieving the actual documents from Sanity using the obtained document IDs.</li>
    </ol>
    
    <h3 id="showing-it-to-the-user" class="scroll-m-20 text-lg sm:text-xl md:text-2xl lg:text-3xl">Showing it to the user</h3>
    <p>To display the search results to users, in a user-friendly manner, we can use React Query. React Query simplifies the process of fetching, caching, and managing the state of the search results. It also takes care of the heavy lifting, allowing you to focus on presenting the search results in an intuitive and visually appealing manner.</p>
    <p>When the search results are fetched from the API, React Query automatically caches them on the client-side. This means that if the user performs the same search again, React Query can serve the cached results instantly, providing a faster and more responsive user experience.</p>
    
    <h2 id="search-in-action" class="scroll-m-20 pb-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl first:mt-0">Search In Action</h2>
    <div class="mx-auto max-w-7xl">
      <div class="relative w-full">
        <div class="relative w-full">
          <img width="1600" height="900" loading="eager" alt="Video thumbnail" class="h-full w-full object-cover transition-opacity duration-300 hover:opacity-90" src="https://image.mux.com/null/thumbnail.webp?fit_mode=smartcrop&time=0">
          <button type="button" class="absolute inset-0 m-auto flex h-[54px] w-[54px] items-center justify-center rounded-full bg-zinc-900/70 ring-1 ring-zinc-600 transition hover:scale-105 hover:bg-zinc-900/80" aria-label="Play video">
            <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-0.5">
              <path d="M0 14V0L11 7L0 14Z" class="fill-white"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'setting-up-an-embeddings-index', title: 'Setting up an embeddings index', level: 1 },
    { id: 'adding-search-to-nextjs', title: 'Adding Search to Next.js', level: 1 },
    { id: 'search-box', title: 'Search Box', level: 2 },
    { id: 'api-endpoint', title: 'API Endpoint', level: 2 },
    { id: 'showing-it-to-the-user', title: 'Showing it to the user', level: 2 },
    { id: 'search-in-action', title: 'Search In Action', level: 1 }
  ]

  return (
    <main>
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      <HeroSection {...heroData} />
      <ArticleContent content={articleContent} tableOfContents={tableOfContents} />
    </main>
  )
}
