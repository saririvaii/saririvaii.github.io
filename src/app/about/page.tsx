import { client, queries } from "@/lib/sanity";
import CMSImage from "@/components/ui/richTextComponents/CMSImage";
import RichTextBlock from "@/components/ui/RichTextBlock";
import Footer from "@/components/layout/Footer";

export const revalidate = 3600;

export default async function AboutPage() {
    const page = await client.fetch(queries.aboutPage);

    if (!page) return null;

    return (
        <main>
            <div className="flex flex-col items-center gap-12 py-24 px-4">
                {/* Title */}
                {page.title && (
                    <div className="w-[95vw] md:max-w-[70vw] text-center pt-24">
                        <RichTextBlock
                            value={page.title}
                            elementClassNames={{
                                h1: "text-section-title font-sans tracking-tight text-black-main text-center",
                                h2: "text-section-subtitle font-sans tracking-tight text-black-main text-center",
                                p: "text-body font-sans text-black-main text-center",
                            }}
                        />
                    </div>
                )}

                {/* Image */}
                {page.image && (
                    <div className="w-[95vw] md:w-[50vw]">
                        <CMSImage
                            image={page.image}
                            className="w-full h-auto rounded-2xl"
                            priority
                        />
                    </div>
                )}

                {/* Description */}
                {page.description && (
                    <div className="w-[95vw] md:w-[50vw] text-center pt-6">
                        <RichTextBlock 
                            value={page.description} 
                        />
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
