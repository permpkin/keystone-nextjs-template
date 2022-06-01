import { list } from '@keystone-6/core';

import {
  integer,
  json,
  relationship,
  select,
  text
} from '@keystone-6/core/fields';

export const Order = list({
  fields: {
    orderNo: text({
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    status: select({
      options: [
        { label: 'Pending payment', value: 'pending-payment' },
        { label: 'Failed', value: 'failed' },
        { label: 'Processing', value: 'processing' },
        { label: 'Completed', value: 'completed' },
        { label: 'On hold', value: 'on-hold' },
        { label: 'Canceled', value: 'canceled' },
        { label: 'Refunded', value: 'refunded' },
        { label: 'Authentication required', value: 'auth-required' },
      ],
      defaultValue: 'pending-payment'
    }),
    user: relationship({
      ref: 'User',
      ui: {
        hideCreate: true,
      }
    }),
    products: relationship({
      ref: 'Product',
      many: true,
      ui: {
        hideCreate: true,
      }
    }),
    coupons: relationship({
      ref: 'Coupon',
      many: true,
      ui: {
        hideCreate: true,
      }
    }),
    total: integer({ validation: { isRequired: true } }),
    orderMeta: json({
      defaultValue: {}
    })
  },
  ui: {
    listView: {
      initialColumns: ['orderNo', 'user', 'products', 'total']
    }
  }
});