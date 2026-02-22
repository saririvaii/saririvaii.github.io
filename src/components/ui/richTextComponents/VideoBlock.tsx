interface VideoBlockProps {
    url?: string
    caption?: string
}

export default function VideoBlock({ url, caption }: VideoBlockProps) {
    if (!url) return null

    return (
        <figure className="!m-0">
            <video
                src={url}
                autoPlay
                muted
                loop
                playsInline
                className="!m-0 w-full h-auto rounded-md"
            />
            {caption && (
                <figcaption className="mt-2 text-button text-black/50 text-center">
                    {caption}
                </figcaption>
            )}
        </figure>
    )
}
