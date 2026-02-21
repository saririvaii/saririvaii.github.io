import { defineArrayMember, defineField, defineType } from "sanity";

// First define the card type
export const imageDescriptionCardItem = defineType({
    name: "imageDescriptionCardItem",
    title: "Image Description Card Item",
    type: "object",
    fields: [
        defineField({
            name: "upperText",
            title: "Upper Text",
            type: "string",
        }),
        defineField({
            name: "image",
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
        }),
        defineField({
            name: "bottomText",
            title: "Bottom Text",
            type: "richText",
        }),
    ],
    preview: {
        select: {
            title: "upperText",
            subtitle: "bottomText",
            media: "image",
        },
    },
});

// Array member for card items
export const ImageDescriptionCardItemObject = defineArrayMember({
    type: "imageDescriptionCardItem",
});

// Main ImageDescriptionCard type that contains an array of cards
export const ImageDescriptionCard = defineType({
    name: "imageDescriptionCard",
    title: "Image Description Card",
    type: "object",
    fields: [
        defineField({
            name: "numbered",
            title: "Show Card Numbers",
            type: "boolean",
            initialValue: false,
            description: "If enabled, cards will display numbers (1, 2, 3, etc.) on top",
        }),
        defineField({
            name: "cards",
            title: "Cards",
            type: "array",
            of: [ImageDescriptionCardItemObject],
            validation: (Rule) => Rule.min(1),
        }),
    ],
    preview: {
        select: {
            cards: "cards",
        },
        prepare({ cards }) {
            const count = cards?.length || 0;
            return {
                title: "Image Description Cards",
                subtitle: `${count} card${count !== 1 ? "s" : ""}`,
            };
        },
    },
});

export const ImageDescriptionCardObject = defineArrayMember({
    name: "imageDescriptionCard",
    title: "Image Description Cards",
    type: "imageDescriptionCard",
});
