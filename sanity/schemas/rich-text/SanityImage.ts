import { defineField, defineType } from "sanity";

export const SanityImage = defineType({
    name: "sanityImage",
    title: "Image",
    type: "image",
    fields: [
        {
            name: "alt",
            title: "Alt",
            description: "Image title for context and accessibility",
            type: "string",
        },
    ],
});

export const SanityImageObject = defineField({
    name: "sanityImage",
    title: "Image",
    type: "sanityImage",
});
