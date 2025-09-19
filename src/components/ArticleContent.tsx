interface ArticleContentProps {
  content: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <section className="container">
      <div className="border-x relative py-8 px-4 border-b border-zinc-200 dark:border-zinc-800 border-x-[0.5] ">
        <div className="max-w-2xl">
          <div 
            className="prose prose-slate prose-headings:font-normal dark:prose-invert prose-headings:scroll-m-24 prose-headings:text-opacity-90 dark:prose-headings:text-opacity-100 prose-p:text-opacity-80 dark:prose-p:text-opacity-90 prose-a:underline prose-a:decoration-dotted prose-ol:list-decimal prose-ol:text-opacity-80 dark:prose-ol:text-opacity-90 prose-ul:list-disc prose-ul:text-opacity-80 dark:prose-ul:text-opacity-90 prose-h2:prose-h2:first:mt-0 max-w-none prose-img:max-w-none prose-img:w-full prose-img:mx-0"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </section>
  )
}
