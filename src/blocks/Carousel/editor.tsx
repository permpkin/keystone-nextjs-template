/** @jsxRuntime classic */
/** @jsx jsx */

import { Box, jsx } from '@keystone-ui/core';
import { NotEditable } from '@keystone-6/fields-document/component-blocks';

interface Props {
  fields: any
  schema: any
  onChange: Function
}

export default ({ fields, schema, onChange }: Props) => {
  return (
    <NotEditable>
      <div
        css={{
          overflowY: 'scroll',
          display: 'flex',
          scrollSnapType: 'y mandatory',
        }}
      >
        {fields.items.elements.map((item: any, index: number) => {
          const data = item.fields
          return (
            <Box
              key={`caro-${data.key || index}`}
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
                src={data.image?.value || data.image}
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
                {data.title?.value || data.title}
              </h1>
            </Box>
          );
        })}
        {/* { props.fields.attribution.element} */}
      </div>
    </NotEditable>
  )
}