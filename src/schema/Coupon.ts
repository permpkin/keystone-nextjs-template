import { list } from '@keystone-6/core';

import {
  json,
  text, timestamp
} from '@keystone-6/core/fields';

export const Coupon = list({
  fields: {
    code: text({
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    validFrom: timestamp(),
    validTo: timestamp(),
    rules: json({
      defaultValue: {}
    })
  },
  ui: {
    listView: {
      initialColumns: ['code', 'validFrom', 'validTo']
    }
  }
});