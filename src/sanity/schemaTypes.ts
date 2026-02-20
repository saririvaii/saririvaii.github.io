import { type SchemaTypeDefinition } from "sanity";
import { project } from "../../sanity/schemas/project";
import { skill, skillCategory, skillsPage } from "../../sanity/schemas/skill";
import { hero } from "../../sanity/schemas/hero";
import { animatedHeroImage } from "../../sanity/schemas/heroImage";
import { homePage } from "../../sanity/schemas/homePage";
import { SanityImage } from "../../sanity/schemas/rich-text/SanityImage";
import { Button } from "../../sanity/schemas/rich-text/Button";
import { richText } from "../../sanity/schemas/rich-text/richTextBlock";
import { heroStats } from "../../sanity/schemas/heroStats";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroStats,
    project,
    skill,
    skillCategory,
    skillsPage,
    hero,
    animatedHeroImage,
    homePage,
    SanityImage,
    Button,
    richText,
  ],
};
