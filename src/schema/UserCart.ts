import { list } from '@keystone-6/core';

import {
  relationship,
  text,
  timestamp
} from '@keystone-6/core/fields';

export const UserCart = list({
  fields: {
    session: text({
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    lastActivity: timestamp(),
    products: relationship({
      ref: 'Product',
      many: true
    }),
    coupons: relationship({
      ref: 'Coupon',
      many: true
    })
  },
  ui: {
    isHidden: true
  },
});