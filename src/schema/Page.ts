// import { slug } from '../admin/fields/slug';
import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  json,
} from '@keystone-6/core/fields';

// import { slug } from "@/admin/fields/slug"

import toSlug from 'limax';

export const Page = list({
  fields: {
    title: text({  
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    path: relationship({
      ref: 'Route.page',
      ui: {
        views: require.resolve('../admin/fields/slug/index.tsx'),
        createView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'read' },
        itemView: { fieldMode: 'edit' },
      },
      // graphql: {
      //   omit: ['read', 'create', 'update'],
      // }
    }),
    description: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    blocks: json({
      defaultValue: [
        { type: 'Example', props: {} }
      ],
      ui: {
        views: require.resolve('../admin/fields/blocks/index.tsx'),
        createView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
      },
    })
  },
  ui: {
    listView: {
      initialColumns: ['title', 'description']
    }
  },
  hooks: {
    resolveInput: ({
      listKey,
      resolvedData,
      item,
      operation
    }) => {
      const { title } = resolvedData;
      if (operation == "create") {
        return {
          ...resolvedData,
          path: {
            // create paired route.
            create: {
              // TODO: auto affix "-<int>" on duplicate
              path: `/${toSlug(title)}`,
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
