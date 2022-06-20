import React from 'react';
import { CellLink } from '@keystone-6/core/admin-ui/components';
import { CellComponent } from '@keystone-6/core/types';
import config from '../../../config'

// override list view to link to frontend path.
export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path] + '';
  return <CellLink href={`${config.SITE_URL}/${value}`} target="_blank">{value}</CellLink>;
};
