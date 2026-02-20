import { defineArrayMember, defineField, defineType } from "sanity";

export const Button = defineType({
    name: "button",
    title: "Button",
    type: "object",
    fields: [
        defineField({
            name: "text",
            title: "Button Text",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "url",
            title: "URL",
            type: "string",
            description: "Internal path (e.g., /about) or external URL (e.g., https://example.com)",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "newTab",
            title: "Open in new tab",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "style",
            title: "Button Style",
            type: "string",
            options: {
                list: [
                    { title: "Primary", value: "primary" },
                    { title: "Secondary", value: "secondary" },
                ],
            },
            initialValue: "primary",
        }),
    ],
    preview: {
        select: {
            title: "text",
            url: "url",
        },
        prepare({ title, url }) {
            return {
                title: title || "Button",
                subtitle: url || "No URL",
            };
        },
    },
});

export const ButtonObject = defineArrayMember({
    name: "button",
    title: "Button",
    type: "button",
});
