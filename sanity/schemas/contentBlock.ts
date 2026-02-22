import { defineArrayMember, defineField, defineType } from "sanity";
import { richText } from "./rich-text/richTextBlock";

// Content Block - individual content item with headline and body
export const contentBlock = defineType({
    name: "contentBlock",
    title: "Content Block",
    type: "object",
    fields: [
        defineField({
            name: "headline",
            title: "Headline",
            type: "string",
            description: "Optional subheading for this content block",
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "richText",
            description: "Rich text content (can include text, images, buttons, etc.)",
        }),
        defineField({
            name: "fullWidth",
            title: "Full Width",
            type: "boolean",
            initialValue: false,
            description: "If true, the content block will be full width",
        }),
    ],
    preview: {
        select: {
            headline: "headline",
            body: "body",
        },
        prepare({ headline, body }) {
            const bodyText = body
                ?.filter((block: any) => block._type === "block")
                ?.map((block: any) => block.children?.map((child: any) => child.text).join(""))
                ?.join(" ") || "";
            const preview = headline || bodyText?.substring(0, 50) || "Empty content block";
            return {
                title: headline || "No headline",
                subtitle: bodyText?.substring(0, 50) || "No content",
            };
        },
    },
});

// Array member for content blocks
export const ContentBlockObject = defineArrayMember({
    type: "contentBlock",
});
