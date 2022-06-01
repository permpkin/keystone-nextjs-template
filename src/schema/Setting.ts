import { list } from '@keystone-6/core';

import {
  json,
  text
} from '@keystone-6/core/fields';

export const Setting = list({
  fields: {
    key: text({  
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    description: text(),
    value: json({
      defaultValue: {}
    })
  },
  ui: {
    listView: {
      initialColumns: ['key', 'description', 'value']
    }
  }
});