import { toSlug } from '../utils/toSlug';
import { list } from '@keystone-6/core';
import {
  text,
  relationship,
  json,
  checkbox,
  float
} from '@keystone-6/core/fields';

export const Product = list({
  fields: {
    title: text({  
      isIndexed: 'unique',
      validation: { isRequired: true },
      ui: {
        views: require.resolve('../../admin/fields/title/index.tsx')
      }
    }),
    price: float({
      //
    }),
    description: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    variations: relationship({
      ref: 'Product.variationOf',
      many: true
    }),
    variationOf: relationship({
      ref: 'Product.variations',
      ui: {
        hideCreate: true,
        displayMode: "select",
      }
    })
  }
});
