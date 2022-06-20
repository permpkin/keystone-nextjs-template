import React, { Fragment } from 'react';
import { CellLink, CellContainer } from '@keystone-6/core/admin-ui/components';
import { CellComponent } from '@keystone-6/core/types';

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path] + '';
  const TypeIndicator = () => {
    // TODO: lookup e.g. isHome, show "-- Home Page" indicator.
    return (
      <></>
    )
  }
  return (
    <Fragment>
      {
        linkTo ? <CellLink {...linkTo}>{value}</CellLink> : <CellContainer>{value}</CellContainer>
      }
      <TypeIndicator/>
    </Fragment>
  );
};
Cell.supportsLinkTo = true;
