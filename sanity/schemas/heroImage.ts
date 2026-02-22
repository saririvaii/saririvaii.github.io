import { defineType, defineField } from "sanity";

export const animatedHeroImage = defineType({
    name: "animatedHeroImage",
    title: "Animated Hero Image",
    type: "object",
    fields: [
        defineField({
            name: "desktopImages",
            title: "Desktop Images",
            type: "array",
            of: [{ type: "sanityImage" }],
            validation: (Rule) => Rule.required().min(2).max(2),
            description: "Exactly 2 desktop images required",
        }),
        defineField({
            name: "mobileImages",
            title: "Mobile Images",
            type: "array",
            of: [{ type: "sanityImage" }],
            validation: (Rule) => Rule.required().min(3).max(3),
            description: "Exactly 3 mobile images required",
        }),
    ],
    preview: {
        select: {
            desktopCount: "desktopImages",
            mobileCount: "mobileImages",
        },
        prepare({ desktopCount, mobileCount }) {
            return {
                title: "Animated Hero Image",
                subtitle: `${desktopCount?.length || 0} desktop, ${mobileCount?.length || 0} mobile images`,
            };
        },
    },
});
