import { type SchemaTypeDefinition } from "sanity";
import { project } from "../../sanity/schemas/project";
import { skill, skillCategory, skillsPage } from "../../sanity/schemas/skill";
import { hero } from "../../sanity/schemas/hero";
import { animatedHeroImage } from "../../sanity/schemas/heroImage";
import { homePage } from "../../sanity/schemas/homePage";
import { SanityImage } from "../../sanity/schemas/rich-text/SanityImage";
import { Button } from "../../sanity/schemas/rich-text/Button";
import { imageDescriptionCardItem, ImageDescriptionCard } from "../../sanity/schemas/rich-text/ImageDescriptionCard";
import { scrollingShowcaseItem, scrollingShowcase } from "../../sanity/schemas/rich-text/ScrollingShowcase";
import { imageColumnsItem, imageColumns } from "../../sanity/schemas/rich-text/ImageColumns";
import { videoBlock } from "../../sanity/schemas/rich-text/VideoBlock";
import { richText } from "../../sanity/schemas/rich-text/richTextBlock";
import { heroStats } from "../../sanity/schemas/heroStats";
import { contentBlock } from "../../sanity/schemas/contentBlock";
import { section } from "../../sanity/schemas/section";
import { playgroundItem, playgroundRow, playgroundPage } from "../../sanity/schemas/playgroundPage";
import { aboutPage } from "../../sanity/schemas/aboutPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroStats,
    imageDescriptionCardItem,
    ImageDescriptionCard,
    scrollingShowcaseItem,
    scrollingShowcase,
    imageColumnsItem,
    imageColumns,
    SanityImage,
    Button,
    videoBlock,
    richText,
    contentBlock,
    section,
    project,
    skill,
    skillCategory,
    skillsPage,
    hero,
    animatedHeroImage,
    homePage,
    playgroundItem,
    playgroundRow,
    playgroundPage,
    aboutPage,
  ],
};
