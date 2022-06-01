import { list } from '@keystone-6/core';

import {
  integer,
  json,
  relationship
} from '@keystone-6/core/fields';

export const Payment = list({
  fields: {
    amount: integer({ validation: { isRequired: true } }),
    user: relationship({
      ref: 'User'
    }),
    order: relationship({
      ref: 'Order'
    }),
    paymentMeta: json({
      defaultValue: {}
    })
  },
  ui: {
    isHidden: true
  }
});