import { defineArrayMember, defineField, defineType } from "sanity";
import { ContentBlockObject } from "./contentBlock";

// Section - contains a title and array of content blocks
export const section = defineType({
    name: "section",
    title: "Section",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Section Title",
            type: "string",
            description: "The main title for this section (e.g., 'Research', 'Design')",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "contentBlocks",
            title: "Content Blocks",
            type: "array",
            of: [ContentBlockObject],
            description: "Array of content blocks for this section",
        }),
    ],
    preview: {
        select: {
            title: "title",
            contentBlocks: "contentBlocks",
        },
        prepare({ title, contentBlocks }) {
            const blockCount = contentBlocks?.length || 0;
            return {
                title: title || "Untitled Section",
                subtitle: `${blockCount} content block${blockCount !== 1 ? "s" : ""}`,
            };
        },
    },
});

// Array member for sections
export const SectionObject = defineArrayMember({
    type: "section",
});
