import { list } from '@keystone-6/core';

import {
  text
} from '@keystone-6/core/fields';

export const UserRole = list({
  fields: {
    name: text({  
      isIndexed: 'unique',
      validation: { isRequired: true }
    })
  },
  ui: {
    isHidden: true
  },
});