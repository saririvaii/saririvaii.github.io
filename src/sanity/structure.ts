import type {StructureResolver} from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

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
      // Add other document types here
      ...S.documentTypeListItems().filter(
        (listItem) => !['project'].includes(listItem.getId()!)
      ),
    ])
