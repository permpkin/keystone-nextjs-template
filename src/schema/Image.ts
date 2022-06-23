import { list } from '@keystone-6/core';
import {
  text,
  json,
  image
} from '@keystone-6/core/fields';

export const Image = list({
  fields: {
    image: image({
      storage: 'local'
    }),
    description: text({
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    meta: json({
      defaultValue: {}
    })
  },
  ui: {
    isHidden: true
  }
});
