import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { CSSProperties } from "react";
import { getImageDimensions, SanityImageSource } from "@sanity/asset-utils";

type SanityImage = {
    _type?: string;
    asset?: {
        _ref?: string;
        _type?: string;
    };
    alt?: string;
    [key: string]: any;
};

type SanityImageProps = {
    image?: SanityImage | { image?: SanityImage; [key: string]: any };
    className?: string;
    width?: number;
    height?: number;
    priority?: boolean;
    style?: CSSProperties;
    loading?: "eager" | "lazy";
    onLoadingComplete?: () => void;
    quality?: number;
};

export default function CMSImage({
    image,
    className,
    width,
    height,
    priority,
    style,
    loading,
    onLoadingComplete,
    quality = 70,
}: SanityImageProps) {
    if (!image || !image.asset) return null;

    // Handle both direct SanityImage objects and wrapper objects with an image property
    let sanityImage: SanityImage | undefined;

    if (
        (image as any)._type === "sanityImage" ||
        (image as any)._type === "image"
    ) {
        sanityImage = image as SanityImage;
    } else if ((image as { image?: SanityImage }).image) {
        sanityImage = (image as { image?: SanityImage }).image;
    }

    if (!sanityImage) {
        console.warn("CMSImage: No valid image found in provided data:", image);
        return null;
    }

    // Derive image dimensions from the Sanity asset if none are provided
    let finalWidth = width;
    let finalHeight = height;
    let aspectRatio = 1;

    try {
        if (sanityImage.asset?._ref) {
            const dimensions = getImageDimensions(
                sanityImage as SanityImageSource,
            );
            const naturalWidth = dimensions.width;
            const naturalHeight = dimensions.height;

            // Store the original aspect ratio
            aspectRatio = naturalWidth / naturalHeight;

            if (!finalWidth) finalWidth = naturalWidth;
            if (!finalHeight) finalHeight = naturalHeight;
        }
    } catch {
        // Fallback to a reasonable default if dimension lookup fails
        if (!finalWidth) finalWidth = 1080;
        if (!finalHeight) finalHeight = 1080;
    }

    // Clamp dimensions to a maximum of 2560×1080 while preserving the original aspect ratio
    const MAX_WIDTH = 2560;
    const MAX_HEIGHT = 1080;

    if (finalWidth && finalHeight) {
        if (finalWidth > MAX_WIDTH) {
            finalWidth = MAX_WIDTH;
            finalHeight = Math.round(finalWidth / aspectRatio);
        }

        if (finalHeight > MAX_HEIGHT) {
            finalHeight = MAX_HEIGHT;
            finalWidth = Math.round(finalHeight * aspectRatio);
        }
    }

    // Ensure we have valid dimensions
    const imageWidth = finalWidth || 1080;
    const imageHeight = finalHeight || 1080;

    return (
        <Image
            src={
                urlFor(sanityImage)
                    .auto("format")
                    .width(imageWidth)
                    .height(imageHeight)
                    .quality(quality)
                    .url() || ""
            }
            alt={sanityImage.alt || ""}
            height={imageHeight}
            width={imageWidth}
            className={`${className} object-cover transition-all`}
            priority={priority}
            style={style}
            loading={loading}
            onLoad={onLoadingComplete}
            quality={quality}
            unoptimized
        />
    );
}
