import { type SchemaTypeDefinition } from "sanity";
import { project } from "./project";
import { skill, skillCategory, skillsPage } from "./skill";
import { hero } from "./hero";
import { animatedHeroImage } from "./heroImage";
import { homePage } from "./homePage";
import { SanityImage } from "./rich-text/SanityImage";
import { Button } from "./rich-text/Button";
import { richText } from "./rich-text/richTextBlock";

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
    richText,
];
