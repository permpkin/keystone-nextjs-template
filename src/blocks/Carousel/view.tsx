/** @jsxRuntime classic */
/** @jsx jsx */

import { Box, jsx } from '@keystone-ui/core';

export default ({ items }: any) => {
  return (
    <div
      css={{
        overflowY: 'scroll',
        display: 'flex',
        scrollSnapType: 'y mandatory',
      }}
    >
      {items.map(({ key, image, title }: any, index: number) => {
        return (
          <Box
            key={`caro-${key || index}`}
            margin="xsmall"
            css={{
              minWidth: '61.8%',
              scrollSnapAlign: 'center',
              scrollSnapStop: 'always',
              margin: 4,
              padding: 8,
              boxSizing: 'border-box',
              borderRadius: 6,
              background: '#eff3f6',
            }}
          >
            <img
              role="presentation"
              src={image?.value}
              css={{
                objectFit: 'cover',
                objectPosition: 'center center',
                height: 240,
                width: '100%',
                borderRadius: 4,
              }}
            />
            <h1
              css={{
                '&&': {
                  fontSize: '1.25rem',
                  lineHeight: 'unset',
                  marginTop: 8,
                },
              }}
            >
              {title}
            </h1>
          </Box>
        );
      })}
      {/* { props.fields.attribution.element} */}
    </div>
  );
}