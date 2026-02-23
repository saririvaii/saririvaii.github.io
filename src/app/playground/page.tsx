import { client, queries } from "@/lib/sanity";
import PlaygroundGrid from "@/components/sections/PlaygroundGrid";
import Footer from "@/components/layout/Footer";

export const revalidate = 3600;

export default async function PlaygroundPage() {
    const data = await client.fetch(queries.playgroundPage);

    return (
        <main className="pt-24">
            <section className="default-section">
                <div className="flex flex-col gap-8 pb-6 items-center">
                    {data?.title && (
                        <h1 className="text-section-title text-[10vw] md:text-[8vw] lg:text-[5vw] text-center text-black-main font-sans tracking-tight">
                            {data.title}
                        </h1>
                    )}
                    {data?.description && (
                        <p className="text-button text-center text-black-main/60 font-sans max-w-sm">
                            {data.description}
                        </p>
                    )}
                </div>
                {data?.rows?.length > 0 && (
                    <PlaygroundGrid rows={data.rows} />
                )}
            </section>
            <Footer />
        </main>
    );
}
