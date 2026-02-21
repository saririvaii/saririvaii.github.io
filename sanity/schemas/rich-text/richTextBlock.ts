import { defineArrayMember, defineField, defineType } from "sanity";
import { SanityImageObject } from "./SanityImage";
import { ButtonObject } from "./Button";
import { ImageDescriptionCardObject } from "./ImageDescriptionCard";
import { ScrollingShowcaseObject } from "./ScrollingShowcase";

// Define the richText type that can be reused
export const richText = defineType({
    name: "richText",
    title: "Rich Text Editor",
    type: "array",
    of: [
        // Block content with text formatting
        defineArrayMember({
            name: "block",
            title: "Block",
            type: "block",
            styles: [
                { title: "Normal", value: "normal" },
                { title: "Heading 1", value: "h1" },
                { title: "Heading 2", value: "h2" },
                { title: "Heading 3", value: "h3" },
                { title: "Heading 4", value: "h4" },
                { title: "Footnote", value: "footnote" },
                { title: "Quote", value: "blockquote" },
            ],
            marks: {
                decorators: [
                    { title: "Strong", value: "strong" },
                    { title: "Emphasis", value: "em" },
                    { title: "Underline", value: "underline" },
                    {
                        title: "Strikethrough",
                        value: "strike-through",
                        icon: () => "S",
                    },
                ],
                annotations: [
                    {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [
                            {
                                name: "url",
                                title: "URL",
                                description:
                                    "Internal path (e.g., /about) or external URL (e.g., https://example.com)",
                                type: "string",
                            },
                            {
                                title: "Open in new tab",
                                name: "newTab",
                                type: "boolean",
                                initialValue: false,
                            },
                        ],
                        options: {
                            modal: {
                                type: "dialog",
                                width: "auto",
                            },
                        },
                    },
                ],
            },
        }),
        // Image component
        SanityImageObject,
        // Button component
        ButtonObject,
        // Image Description Cards component
        ImageDescriptionCardObject,
        // Scrolling Showcase component
        ScrollingShowcaseObject,
    ],
});

// Also export as a field definition for convenience
export const RichText = defineField({
    name: "richText",
    title: "Rich Text Editor",
    type: "richText",
});
