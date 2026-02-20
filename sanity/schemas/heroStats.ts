import { defineArrayMember, defineType, defineField } from "sanity";

export const heroStats = defineType({
    name: "heroStats",
    title: "Hero Stats",
    type: "object",
    fields: [
        defineField({
            name: "number",
            title: "Number",
            type: "string",
            description: "The stat number/value (e.g., '28 M+', '79x', '$2000+')",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "string",
            description: "The stat description (e.g., 'virtual visits post redesign')",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            number: "number",
            description: "description",
        },
        prepare({ number, description }) {
            return {
                title: number || "Stat",
                subtitle: description || "",
            };
        },
    },
});

export const HeroStatsObject = defineArrayMember({
    name: "heroStats",
    title: "Hero Stat",
    type: "heroStats",
});
