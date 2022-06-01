import { list } from '@keystone-6/core';

import {
  relationship,
  float,
  integer,
  text,
  image
} from '@keystone-6/core/fields';

export const Product = list({
  fields: {
    name: text({
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    featureImage: image(),
    price: float({ validation: { isRequired: true } }),
    stock: integer({ validation: { isRequired: true } }),
    childOf: relationship({
      ref: 'Product'
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
      initialColumns: ['name', 'price', 'categories', 'tags']
    }
  }
});