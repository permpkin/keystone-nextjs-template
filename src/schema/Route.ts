import { list } from '@keystone-6/core';

import {
  text,
  select,
  relationship,
} from '@keystone-6/core/fields';

export const Route = list({
  fields: {
    prefix: text(),
    path: text({
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    typeRef: select({
      validation: { isRequired: true },
      options: [
        'Page'
      ]
    }),
    page: relationship({
      ref: 'Page.path'
    })
  },
  ui: {
    hideCreate: true,
    // hideDelete: true,
    // isHidden: true,
    listView: {
      initialColumns: ['page', 'path']
    }
  }
});
