export default function AnimatedIcon() {
  return (
    <div className="group relative h-[16px] w-[16px] overflow-hidden">
      <div className="grid h-full w-full grid-cols-5 grid-rows-5">
        <div className="col-start-2 row-start-1 h-full w-full group-hover:animate-column-shift-1 bg-zinc-900 dark:bg-zinc-50 " style={{ animationDelay: '0ms' }}></div>
        <div className="col-start-3 row-start-2 h-full w-full group-hover:animate-column-shift-2 bg-zinc-900 dark:bg-zinc-50" style={{ animationDelay: '120ms' }}></div>
        <div className="col-start-4 row-start-3 h-full w-full group-hover:animate-column-shift-3 bg-zinc-900 dark:bg-zinc-50" style={{ animationDelay: '240ms' }}></div>
        <div className="col-start-3 row-start-4 h-full w-full group-hover:animate-column-shift-2 bg-zinc-900 dark:bg-zinc-50" style={{ animationDelay: '360ms' }}></div>
        <div className="col-start-2 row-start-5 h-full w-full group-hover:animate-column-shift-1 bg-zinc-900 dark:bg-zinc-50" style={{ animationDelay: '480ms' }}></div>
      </div>
    </div>
  )
}
