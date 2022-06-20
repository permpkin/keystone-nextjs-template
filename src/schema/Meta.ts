import { list } from '@keystone-6/core';
import {
  text,
  json,
  checkbox
} from '@keystone-6/core/fields';

export const Meta = list({
  fields: {
    key: text({  
      isIndexed: 'unique',
      validation: { isRequired: true }
    }),
    autoload: checkbox({
      defaultValue: true
    }),
    data: json({
      defaultValue: {}
    })
  },
  ui: {
    isHidden: true
  }
});
