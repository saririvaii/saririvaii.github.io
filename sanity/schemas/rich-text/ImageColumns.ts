import { defineArrayMember, defineField, defineType } from "sanity";

export const imageColumnsItem = defineType({
    name: "imageColumnsItem",
    title: "Image Column Item",
    type: "object",
    fields: [
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alt Text",
                    type: "string",
                    description: "Image description for accessibility",
                },
            ],
        }),
        defineField({
            name: "video",
            title: "Video (MP4)",
            type: "file",
            options: { accept: "video/mp4" },
            description: "Upload a video instead of an image",
        }),
    ],
    preview: {
        select: {
            media: "image",
        },
        prepare({ media }) {
            return {
                title: "Image Column Item",
                media,
            };
        },
    },
});

export const imageColumns = defineType({
    name: "imageColumns",
    title: "Image Columns",
    type: "object",
    fields: [
        defineField({
            name: "images",
            title: "Images",
            type: "array",
            of: [{ type: "imageColumnsItem" }],
            validation: (Rule) => Rule.min(1),
        }),
    ],
    preview: {
        select: { images: "images" },
        prepare({ images }) {
            const count = images?.length || 0;
            return {
                title: "Image Columns",
                subtitle: `${count} image${count !== 1 ? "s" : ""}`,
            };
        },
    },
});

export const ImageColumnsObject = defineArrayMember({
    name: "imageColumns",
    title: "Image Columns",
    type: "imageColumns",
});
