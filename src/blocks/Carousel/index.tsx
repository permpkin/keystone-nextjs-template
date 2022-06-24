/** @jsxRuntime classic */
/** @jsx jsx */

import { Box, jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';

export const view = (props: any) => {
  return (
    <NotEditable>
      <div
        css={{
          overflowY: 'scroll',
          display: 'flex',
          scrollSnapType: 'y mandatory',
        }}
      >
        {props?.items && props?.items.map((item: any) => {
          return (
            <Box
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
                src={item.image}
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
                {item.title}
              </h1>
            </Box>
          );
        })}
      </div>
    </NotEditable>
  );
}

export default component({
  // chromeless: true,
  label: 'Carousel',
  preview: view,
  schema: {
    items: fields.array(
      fields.object({
        title: fields.text({ label: 'Title' }),
        image: fields.url({
          label: 'Image URL',
          defaultValue: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
        }),
      })
    ),
  },
});