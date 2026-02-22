import { defineArrayMember, defineField, defineType } from "sanity";

export const videoBlock = defineType({
    name: "videoBlock",
    title: "Video",
    type: "object",
    fields: [
        defineField({
            name: "video",
            title: "Video file",
            type: "file",
            options: { accept: "video/mp4" },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "caption",
            title: "Caption (optional)",
            type: "string",
        }),
    ],
    preview: {
        select: { caption: "caption" },
        prepare({ caption }) {
            return { title: caption || "Video" };
        },
    },
});

export const VideoBlockObject = defineArrayMember({
    name: "videoBlock",
    title: "Video",
    type: "videoBlock",
});
