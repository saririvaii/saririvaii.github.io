import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { skill, skillCategory, skillsPage } from './skill'
import { hero } from './hero'
import { homePage } from './homePage'

export const schemaTypes: SchemaTypeDefinition[] = [
  project,
  skill,
  skillCategory,
  skillsPage,
  hero,
  homePage,
]
