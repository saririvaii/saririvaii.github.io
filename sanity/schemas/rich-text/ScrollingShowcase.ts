import { defineArrayMember, defineField, defineType } from "sanity";

export const scrollingShowcaseItem = defineType({
    name: "scrollingShowcaseItem",
    title: "Showcase Item",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
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
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: "title",
            media: "image",
        },
        prepare({ title, media }) {
            return {
                title: title || "Showcase Item",
                media,
            };
        },
    },
});

export const scrollingShowcase = defineType({
    name: "scrollingShowcase",
    title: "Scrolling Showcase",
    type: "object",
    fields: [
        defineField({
            name: "backgroundColor",
            title: "Background Color",
            type: "string",
            description: "Any CSS color value — e.g. #f0ede8, oklch(0.9 0.05 80), rgba(0,0,0,0.05)",
            initialValue: "#f0ede8",
        }),
        defineField({
            name: "items",
            title: "Items",
            type: "array",
            of: [{ type: "scrollingShowcaseItem" }],
            validation: (Rule) => Rule.min(1),
        }),
    ],
    preview: {
        select: { items: "items" },
        prepare({ items }) {
            const count = items?.length || 0;
            return {
                title: "Scrolling Showcase",
                subtitle: `${count} item${count !== 1 ? "s" : ""}`,
            };
        },
    },
});

export const ScrollingShowcaseObject = defineArrayMember({
    name: "scrollingShowcase",
    title: "Scrolling Showcase",
    type: "scrollingShowcase",
});
