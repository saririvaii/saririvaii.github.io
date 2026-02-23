import type {StructureResolver} from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

const singletonTypes = ['homePage', 'playgroundPage', 'skillsPage']

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Orderable projects list
      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Projects',
        S,
        context,
      }),
      S.divider(),
      // Singleton pages — only one instance allowed
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Playground Page')
        .id('playgroundPage')
        .child(S.document().schemaType('playgroundPage').documentId('playgroundPage')),
      S.listItem()
        .title('Skills Page')
        .id('skillsPage')
        .child(S.document().schemaType('skillsPage').documentId('skillsPage')),
      S.divider(),
      // All other document types (excluding singletons and projects)
      ...S.documentTypeListItems().filter(
        (listItem) => !['project', ...singletonTypes].includes(listItem.getId()!)
      ),
    ])
