/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx } from '@keystone-ui/core';
import { component, fields, NotEditable } from '@keystone-6/fields-document/component-blocks';
import { useEffect } from 'react';
import { Button } from '@keystone-ui/button';

export default component({
  preview: function MyTable(props) {
    useEffect(() => {
      let maxColumns = 1;
      const rows = props.fields.rows;
      for (const row of rows.elements) {
        if (row.elements.length > maxColumns) {
          maxColumns = row.elements.length;
        }
      }
      if (rows.elements.some(x => x.elements.length !== maxColumns)) {
        rows.onChange(
          rows.elements.map(element => {
            return {
              key: element.key,
              value: [
                ...element.elements.map(x => ({ key: x.key })),
                ...Array.from({ length: maxColumns - element.elements.length }, () => ({
                  key: undefined,
                })),
              ],
            };
          })
        );
      }
    });

    return (
      <div>
        <table css={{ width: '100%' }}>
          <tbody>
            {props.fields.rows.elements.map((row, i) => {
              return (
                <tr key={i} css={{ border: '1px solid black' }}>
                  {row.elements.map((column, i) => {
                    return (
                      <td key={i} css={{ border: '1px solid black' }}>
                        {column.fields.content.element}
                      </td>
                    );
                  })}
                  <NotEditable>
                    <Button
                      onClick={() => {
                        props.fields.rows.onChange(
                          props.fields.rows.elements.map(element => {
                            return {
                              key: element.key,
                              value: [
                                ...element.elements.map(x => ({ key: x.key })),
                                { key: undefined },
                              ],
                            };
                          })
                        );
                      }}
                    >
                      Insert Column
                    </Button>
                  </NotEditable>
                </tr>
              );
            })}
          </tbody>
        </table>
        <NotEditable>
          <div
            onClick={() => {
              props.fields.rows.onChange([
                ...props.fields.rows.elements.map(x => ({ key: x.key })),
                { key: undefined },
              ]);
            }}
          >
            <Button>Insert row</Button>
          </div>
        </NotEditable>
      </div>
    );
  },
  label: 'Table',
  schema: {
    rows: fields.array(
      fields.array(
        fields.object({
          content: fields.child({ kind: 'block', placeholder: '' }),
        })
      )
    ),
    headers: fields.object({
      row: fields.checkbox({ label: 'Header Row' }),
      column: fields.checkbox({ label: 'Header Column' }),
    }),
  },
})