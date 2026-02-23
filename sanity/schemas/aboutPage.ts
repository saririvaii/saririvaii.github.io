import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
    name: "aboutPage",
    title: "About Page",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "array",
            of: [
                defineArrayMember({
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "Heading 1", value: "h1" },
                        { title: "Heading 2", value: "h2" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Strong", value: "strong" },
                            { title: "Emphasis", value: "em" },
                        ],
                    },
                }),
            ],
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "richText",
        }),
    ],
    preview: {
        select: { media: "image" },
        prepare({ media }) {
            return { title: "About Page", media };
        },
    },
});
