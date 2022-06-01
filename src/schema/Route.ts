import { list } from '@keystone-6/core';

import {
  text,
  select,
} from '@keystone-6/core/fields';

export const Route = list({
  fields: {
    path: text({
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    type: select({
      validation: { isRequired: true },
      options: [
        { label: '200 OK', value: '200' },
        { label: '301 Moved Permanently', value: '301' },
        { label: '302 Moved Temporarily', value: '302' },
        { label: '404 Not Found', value: '404' },
      ],
      defaultValue: '200'
    })
  },
  ui: {
    isHidden: true
  }
});
