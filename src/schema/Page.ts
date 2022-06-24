import { toSlug } from '../utils/toSlug';
import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  json,
  checkbox
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

import { componentBlocks } from '../blocks/componentBlocks'

export const Page = list({
  fields: {
    title: text({
      isIndexed: 'unique',
      validation: { isRequired: true },
      ui: {
        views: require.resolve('../../admin/fields/title/index.tsx')
      }
    }),
    path: text({
      defaultValue: '',
      isIndexed: true,
      ui: {
        views: require.resolve('../../admin/fields/path/index.tsx'),
        itemView: {
          fieldMode: 'hidden'
        },
        createView: {
          fieldMode: 'hidden'
        }
      }
    }),
    slug: text({
      isIndexed: true,
      isOrderable: false,
      ui: {
        views: require.resolve('../../admin/fields/slug/index.tsx'),
        listView: {
          fieldMode: 'hidden'
        },
        createView: {
          fieldMode: 'hidden'
        }
      }
    }),
    description: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    parent: relationship({
      ref: 'Page',
      ui: {
        hideCreate: true
      }
    }),
    document: document({
      ui: { views: require.resolve('../blocks/componentBlocks.tsx') },
      componentBlocks,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      // formatting: {
      //   inlineMarks: {
      //     bold: true,
      //     italic: true,
      //     underline: true,
      //     strikethrough: true,
      //     code: true,
      //     superscript: true,
      //     subscript: true,
      //     keyboard: true,
      //   },
      //   listTypes: {
      //     ordered: true,
      //     unordered: true,
      //   },
      //   alignment: {
      //     center: true,
      //     end: true,
      //   },
      //   headingLevels: [1, 2, 3, 4, 5, 6],
      //   blockTypes: {
      //     blockquote: true,
      //     code: true
      //   },
      //   softBreaks: true,
      // },
      links: true,
      dividers: true,
      // layouts: [/* ... */],
    }),
    isHome: checkbox({
      defaultValue: false,
      isFilterable: true,
      isOrderable: false,
      ui: {
        listView: {
          fieldMode: 'hidden'
        },
        itemView: {
          fieldMode: 'hidden'
        },
        createView: {
          fieldMode: 'hidden'
        }
      }
    })
  },
  hooks: {
    resolveInput: async ({
      context,
      item,
      resolvedData,
      operation
    }) => {

      if (operation == "create") {
      
        const { title, parent } = resolvedData;

        // create slug from title
        const slug = toSlug(title);
        
        if (parent.connect) {

          // get parent page record.
          const pageParent = await context.query.Page.findOne({
            where: { id: `${parent.connect.id}` },
            query: 'path',
          })
          
          return {
            ...resolvedData,
            slug: `${slug}`,
            path: `${pageParent.path}/${slug}`
          }

        } else {

          return {
            ...resolvedData,
            slug: `${slug}`,
            path: `${slug}`
          }

        }

      } else if (operation == "update") {

        const slug: string = `${resolvedData.slug?.trim() === "" ? toSlug(`${item?.title}`) : resolvedData.slug || item.slug}`

        // if we have a new parent action
        if (resolvedData.parent !== undefined) {
      
          const { parent } = resolvedData;

          // if we're removing a parent.
          if (parent.disconnect) {

            return {
              ...resolvedData,
              path: `${slug}`,
              slug
            }

          // if we're adding a parent.
          } else if (parent.connect) {

            // get parent page record.
            const pageParent = await context.query.Page.findOne({
              where: { id: `${parent.connect.id}` },
              query: 'path',
            })
            
            return {
              ...resolvedData,
              path: `${pageParent.path}/${slug}`,
              slug
            }

          }

        } else {

          // if we already have a parent
          if (item.parentId) {

            // get parent page record.
            const pageParent = await context.query.Page.findOne({
              where: { id: `${item?.parentId}` },
              query: 'path',
            })
            
            return {
              ...resolvedData,
              path: `${pageParent.path}/${slug}`,
              slug
            }

          // if we don't have a parent
          } else {

            return {
              ...resolvedData,
              path: `${slug}`,
              slug
            }

          }

        }

      }
      
      // We always return resolvedData from the resolveInput hook
      return resolvedData;

    }
  }
});
