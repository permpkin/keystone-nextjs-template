import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  json,
} from '@keystone-6/core/fields';

import slug from 'limax';

export const Page = list({
  fields: {
    title: text({  
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    description: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    path: relationship({
      ref: 'Route.page',
      ui: {
        hideCreate: true,
        displayMode: 'cards',
        cardFields: ["path"],
        linkToItem: false,
        inlineEdit: { fields: ["path"] },
        removeMode: 'none'
      }
    }),
    parent: relationship({
      ref: 'Page',
      ui: {
        hideCreate: true,
        displayMode: 'select'
      }
    }),
    blocks: json({
      defaultValue: [
        { type: 'Example', props: {} }
      ]
    })
  },
  ui: {
    listView: {
      initialColumns: ['title', 'description']
    }
  },
  hooks: {
    resolveInput: ({ listKey, resolvedData }) => {
      const { title } = resolvedData;
      if (title) {
        return {
          ...resolvedData,
          path: {
            // create paired route.
            create: {
              path: `/${slug(title)}`,
              typeRef: listKey,
              ref: resolvedData.id
            }
          }
        }
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    },
    afterOperation: async ({ context, operation, originalItem }) => {
      switch (operation) {
        case 'delete':
          // delete paired route object (if set).
          if (originalItem.pathId !== undefined) {
            await context.db.Route.deleteOne({
              where: { id: `${originalItem.pathId}` },
            });
          }
        break;
      }
    }
  }
});
