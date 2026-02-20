import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { HeroStatsObject } from "./heroStats";
import { SectionObject } from "./section";

export const project = defineType({
    name: "project",
    title: "Project",
    type: "document",
    groups: [
        {
            name: "featureCard",
            title: "Feature Card",
        },
        {
            name: "hero",
            title: "Hero",
        },
        {
            name: "content",
            title: "Content",
        },
        {
            name: "meta",
            title: "Meta",
        },
    ],
    fields: [
        // Order rank field for drag-and-drop ordering
        orderRankField({ type: "project" }),
        defineField({
            group: "featureCard",
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "heroTitle",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        // Hero Section Fields
        defineField({
            group: "hero",
            name: "preTitle",
            title: "Pre-Title",
            type: "string",
            description: "Small text above the main title (e.g., 'Enaccess Maps 2024')",
        }),
        defineField({
            group: "hero",
            name: "heroTitle",
            title: "Hero Title",
            type: "text",
            rows: 2,
            description: "Main hero title (2 rows)",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            group: "hero",
            name: "heroIntro",
            title: "Hero Intro",
            type: "text",
            rows: 4,
            description: "Hero introduction text (4 rows)",
        }),
        defineField({
            group: "hero",
            name: "heroStats",
            title: "Hero Stats",
            type: "array",
            of: [HeroStatsObject],
        }),
        defineField({
            group: "hero",
            name: "heroImage",
            title: "Hero Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: "alt",
                    title: "Alt Text",
                    type: "string",
                },
            ],
        }),
        
        defineField({
            group: "content",
            name: "sections",
            title: "Sections",
            type: "array",
            of: [SectionObject],
            description: "Content sections with title and content blocks",
        }),
        defineField({
            group: "featureCard",
            name: "featuredImage",
            title: "Featured Image",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: "alt",
                    title: "Alt Text",
                    type: "string",
                },
            ],
        }),
        
        defineField({
            group: "meta",
            name: "technologies",
            title: "Technologies Used",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
        }),
        defineField({
            group: "meta",
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Web Development", value: "web" },
                    { title: "Mobile App", value: "mobile" },
                    { title: "Desktop App", value: "desktop" },
                    { title: "Design", value: "design" },
                    { title: "Tutorial", value: "tutorial" },
                    { title: "Case Study", value: "case-study" },
                    { title: "Other", value: "other" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            group: "meta",
            name: "liveUrl",
            title: "Live URL",
            type: "url",
        }),
        defineField({
            group: "meta",
            name: "githubUrl",
            title: "GitHub URL",
            type: "url",
        }),
        defineField({
            group: "meta",
            name: "featured",
            title: "Featured",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            group: "meta",
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            group: "featureCard",
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
        }),
    ],
    preview: {
        select: {
            title: "heroTitle",
            preTitle: "preTitle",
            category: "category",
            publishedAt: "publishedAt",
            media: "heroImage",
        },
        prepare(selection) {
            const { title, preTitle, category, publishedAt } = selection;
            const displayTitle = preTitle ? `${preTitle} - ${title}` : title;
            return {
                title: displayTitle || "Untitled Project",
                subtitle: `${category || ""}${publishedAt ? ` • ${new Date(publishedAt).toLocaleDateString()}` : ""}`,
                media: selection.media,
            };
        },
    },
    orderings: [
        orderRankOrdering,
        {
            title: "Published Date",
            name: "publishedDate",
            by: [{ field: "publishedAt", direction: "desc" }],
        },
    ],
});
