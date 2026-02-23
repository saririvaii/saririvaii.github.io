import { defineArrayMember, defineField, defineType } from "sanity";

export const playgroundItem = defineType({
    name: "playgroundItem",
    title: "Playground Item",
    type: "object",
    fields: [
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "video",
            title: "Video (MP4)",
            type: "file",
            options: { accept: "video/mp4" },
            description: "Upload a video instead of an image",
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "subtitle",
            title: "Subtitle",
            type: "string",
        }),
        defineField({
            name: "hexCode",
            title: "Hover Color (Hex)",
            type: "string",
            description: "Hex color for the hover overlay (e.g. #FF5733)",
            validation: (Rule) =>
                Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, {
                    name: "hex color",
                    invert: false,
                }).warning("Must be a valid hex color (e.g. #FF5733)"),
        }),
        defineField({
            name: "isBig",
            title: "Big (fill rectangle)",
            type: "boolean",
            initialValue: false,
            description: "If true, item expands to fill remaining row width instead of staying square",
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "subtitle",
            media: "image",
        },
        prepare({ title, subtitle, media }) {
            return { title: title || "Untitled", subtitle, media };
        },
    },
});

export const playgroundRow = defineType({
    name: "playgroundRow",
    title: "Playground Row",
    type: "object",
    fields: [
        defineField({
            name: "items",
            title: "Items",
            type: "array",
            of: [defineArrayMember({ type: "playgroundItem" })],
            validation: (Rule) => Rule.min(1),
        }),
    ],
    preview: {
        select: { items: "items" },
        prepare({ items }) {
            const count = items?.length || 0;
            return {
                title: `Row — ${count} item${count !== 1 ? "s" : ""}`,
            };
        },
    },
});

export const playgroundPage = defineType({
    name: "playgroundPage",
    title: "Playground Page",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "rows",
            title: "Rows",
            type: "array",
            of: [defineArrayMember({ type: "playgroundRow" })],
        }),
    ],
    preview: {
        select: { title: "title" },
        prepare({ title }) {
            return { title: title || "Playground Page" };
        },
    },
});
