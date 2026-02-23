import { type SchemaTypeDefinition } from "sanity";
import { project } from "./project";
import { skill, skillCategory, skillsPage } from "./skill";
import { hero } from "./hero";
import { animatedHeroImage } from "./heroImage";
import { homePage } from "./homePage";
import { SanityImage } from "./rich-text/SanityImage";
import { Button } from "./rich-text/Button";
import { ImageDescriptionCard, imageDescriptionCardItem } from "./rich-text/ImageDescriptionCard";
import { scrollingShowcase, scrollingShowcaseItem } from "./rich-text/ScrollingShowcase";
import { imageColumnsItem, imageColumns } from "./rich-text/ImageColumns";
import { videoBlock } from "./rich-text/VideoBlock";
import { richText } from "./rich-text/richTextBlock";
import { heroStats } from "./heroStats";
import { contentBlock } from "./contentBlock";
import { section } from "./section";
import { playgroundItem, playgroundRow, playgroundPage } from "./playgroundPage";

export const schemaTypes: SchemaTypeDefinition[] = [
    project,
    skill,
    skillCategory,
    skillsPage,
    hero,
    animatedHeroImage,
    homePage,
    SanityImage,
    Button,
    ImageDescriptionCard,
    imageDescriptionCardItem,
    scrollingShowcaseItem,
    scrollingShowcase,
    imageColumnsItem,
    imageColumns,
    videoBlock,
    richText,
    heroStats,
    contentBlock,
    section,
    playgroundItem,
    playgroundRow,
    playgroundPage,
];
