import { list } from '@keystone-6/core';

import {
  text,
  relationship,
  timestamp,
  select,
} from '@keystone-6/core/fields';

import { document } from '@keystone-6/fields-document';

export const Page = list({
  fields: {
    title: text({  
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    content: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
    status: select({
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      defaultValue: 'draft',
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    publishDate: timestamp(),
    author: relationship({
      ref: 'User'
    }),
    categories: relationship({
      ref: 'Category',
      many: true
    }),
    tags: relationship({
      ref: 'Tag',
      many: true
    }),
    path: relationship({
      ref: 'Route',
      many: true
    })
  },
  ui: {
    listView: {
      initialColumns: ['title', 'status', 'author', 'categories', 'tags']
    }
  }
});
