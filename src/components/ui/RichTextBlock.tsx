import { PortableText, PortableTextComponents } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";
import Link from "next/link";
import CMSImage from "./richTextComponents/CMSImage";

interface ElementClassNames {
    p?: string;
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    footnote?: string;
    link?: string;
}

interface PortableTextBlockProps {
    value: TypedObject | TypedObject[] | undefined;
    className?: string;
    elementClassNames?: ElementClassNames;
}

const EnhancedPortableTextBlock: React.FC<PortableTextBlockProps> = ({
    value,
    className,
    elementClassNames = {},
}) => {
    // Utility function to ensure custom classes override defaults
    const getClassName = (baseClasses: string, customClasses?: string) => {
        if (!customClasses) return baseClasses;

        // When custom classes are provided, use only the custom classes
        // This prevents conflicts with default text size classes
        // The custom classes should include all necessary styling
        return customClasses;
    };

    const components: PortableTextComponents = {
        block: {
            // Add custom styles for different block types
            normal: ({ children }) => (
                <p
                    className={getClassName(
                        "text-base lg:text-lg font-sans text-black-main [&:not(:last-child)]:mb-6",
                        elementClassNames.p,
                    )}
                >
                    {children}
                </p>
            ),
            h1: ({ children }) => (
                <h1
                    className={getClassName(
                        "text-4xl lg:text-7xl font-sans tracking-tight mb-6 text-black-main [&:not(:first-child)]:mt-12",
                        elementClassNames.h1 || "text-4xl lg:text-7xl font-sans tracking-tight mb-6 text-black-main [&:not(:first-child)]:mt-12",
                    )}
                >
                    {children}
                </h1>
            ),
            h2: ({ children }) => (
                <h2
                    className={getClassName(
                        "text-3xl lg:text-5xl font-sans font-semibold tracking-tight mb-5 text-black-main [&:not(:first-child)]:mt-10",
                        elementClassNames.h2,
                    )}
                >
                    {children}
                </h2>
            ),
            h3: ({ children }) => (
                <h3
                    className={getClassName(
                        "text-2xl lg:text-4xl font-sans font-semibold tracking-tight mb-4 text-black-main [&:not(:first-child)]:mt-8",
                        elementClassNames.h3,
                    )}
                >
                    {children}
                </h3>
            ),
            h4: ({ children }) => (
                <h4
                    className={getClassName(
                        "text-xl lg:text-2xl font-sans font-semibold tracking-tight mb-3 text-black-main",
                        elementClassNames.h4,
                    )}
                >
                    {children}
                </h4>
            ),
            h5: ({ children }) => (
                <h5
                    className={getClassName(
                        "~text-lg/xl font-medium tracking-tight mb-2 font-ebGaramond",
                        elementClassNames.h5,
                    )}
                >
                    {" "}
                    {children}{" "}
                </h5>
            ),
            footnote: ({ children }) => (
                <p
                    className={getClassName(
                        "text-black-main/60 ~text-sm/base [&:not(:last-child)]:mb-6",
                        elementClassNames.footnote,
                    )}
                >
                    {children}
                </p>
            ),
        },
        marks: {
            // Add custom styles for text marks
            strong: ({ children }) => (
                <strong className="font-bold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            italic: ({ children }) => (
                <span className="font-serif italic">{children}</span>
            ),
            underline: ({ children }) => (
                <span className="underline">{children}</span>
            ),
            "strike-through": ({ children }) => (
                <span className="line-through">{children}</span>
            ),
            link: ({ children, value }) => {
                const href = value?.url || "#";
                const isExternal = href.startsWith("http");
                const rel = isExternal ? "noreferrer noopener" : undefined;

                if (isExternal) {
                    return (
                        <a
                            href={href}
                            rel={rel}
                            target={value?.newTab ? "_blank" : "_self"}
                            className={getClassName(
                                "text-accent-primary underline hover:opacity-80 transition-opacity",
                                elementClassNames.link,
                            )}
                        >
                            {children}
                        </a>
                    );
                }

                return (
                    <Link
                        href={href}
                        target={value?.newTab ? "_blank" : "_self"}
                        className={getClassName(
                            "text-accent-primary underline hover:opacity-80 transition-opacity",
                            elementClassNames.link,
                        )}
                    >
                        {children}
                    </Link>
                );
            },
        },
        types: {
            image: ({ value }) => {
                // Make sure we have an image value
                if (!value || !value.asset) {
                    console.error(
                        "Invalid image value in PortableText:",
                        value,
                    );
                    return null;
                }

                return (
                    <div className="my-8 w-full flex justify-center">
                        <CMSImage
                            image={value}
                            className="max-w-full h-auto rounded-md"
                        />
                    </div>
                );
            },
            sanityImage: ({ value }) => {
                if (!value || !value.asset) {
                    console.error(
                        "Invalid image value in PortableText:",
                        value,
                    );
                    return null;
                }

                return (
                    <div className="my-8 w-full flex justify-center">
                        <CMSImage image={value} className="w-full rounded-md" />
                    </div>
                );
            },
            button: ({ value }) => {
                if (!value?.text || !value?.url) return null;

                const href = value.url;
                const isExternal = href.startsWith("http");
                const buttonClasses =
                    value.style === "secondary"
                        ? "px-6 py-3 border border-black-main text-black-main hover:bg-black-main hover:text-white-main transition-all duration-300"
                        : "px-6 py-3 bg-accent-primary text-white-main hover:opacity-90 transition-opacity";

                const ButtonContent = (
                    <span className="font-sans text-base font-medium">
                        {value.text}
                    </span>
                );

                if (isExternal) {
                    return (
                        <div className="my-6">
                            <a
                                href={href}
                                target={value.newTab ? "_blank" : "_self"}
                                rel={
                                    value.newTab
                                        ? "noreferrer noopener"
                                        : undefined
                                }
                                className={`inline-block ${buttonClasses}`}
                            >
                                {ButtonContent}
                            </a>
                        </div>
                    );
                }

                return (
                    <div className="my-6">
                        <Link
                            href={href}
                            target={value.newTab ? "_blank" : "_self"}
                            className={`inline-block ${buttonClasses}`}
                        >
                            {ButtonContent}
                        </Link>
                    </div>
                );
            },
            // tabAccordion: ({ value }) => <TabAccordionBlock value={value} />,
            // curriculaStages: ({ value }) => (
            //     <CurriculaStagesBlock value={value} />
            // ),
            // labeledImages: ({ value }) => <ImageLabelGridBlock value={value} />,
            // table: ({ value }) => <TableBlock value={value} />,
            // principalsLetter: ({ value }) => (
            //     <PrincipalsLetterBlock value={value} />
            // ),
            // staff: ({ value }) => <StaffBlock value={value} />,
            // lightbox: ({ value }) => <LightboxBlock value={value.images} />,
            // eventShowcase: ({ value }) => <EventShowcaseBlock value={value} />,
            // richTextSectionTab: ({ value }) => (
            //     <RichTextSectionTab value={value} />
            // ),
            // imageGrid: ({ value }) => <ImageGrid data={value} />,
            // paragraphImage: ({ value }) => (
            //     <ParagraphImageBlock value={value} />
            // ),
            // eventDetailCallout: ({ value }) => (
            //     <div className="pb-8">
            //         <EventDetailCalloutBlock value={value} />
            //     </div>
            // ),
            // visionMission: ({ value }) => <VisionMissionBlock value={value} />,
            // centeredRichText: ({ value }) => (
            //     <CenteredRichTextBlock value={value} />
            // ),
            // embed: ({ value }) => <EmbedBlock value={value} />,
            // sidebarForm: ({ value }) => <SidebarForm data={value} />,
            // ecaOptions: ({ value }) => <EcaBlock value={value} />,
            // richTextFeatureHighlight: ({ value }) => <FeatureHighlight value={value} />,
            // richTextImageTextCard: ({ value }) => <ImageTextCardBlock value={value} />,
        },
        list: {
            bullet: ({ children }) => (
                <ul className="mt-2 mb-4 ml-6 list-disc [&>li>ul]:list-disc [&>li>ul>li>ul]:list-disc space-y-2">
                    {children}
                </ul>
            ),
            number: ({ children }) => (
                <ol className="mt-2 mb-4 ml-6 list-decimal [&>li>ol]:list-[lower-alpha] [&>li>ol>li>ol]:list-[lower-roman] space-y-2">
                    {children}
                </ol>
            ),
        },
        listItem: {
            bullet: ({ children }) => <li className="">{children}</li>,
            number: ({ children }) => <li className="">{children}</li>,
        },
    };

    return (
        <div className={className}>
            <PortableText value={value || []} components={components} />
        </div>
    );
};

export default EnhancedPortableTextBlock;
