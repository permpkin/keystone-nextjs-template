import React from 'react';
import { FieldProps } from '@keystone-6/core/types';
import { Button } from '@keystone-ui/button';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { XIcon, PlusIcon, ChevronDownIcon, ChevronUpIcon } from '@keystone-ui/icons';
import { controller } from '@keystone-6/core/fields/types/json/views';
import dynamic from 'next/dynamic'

import { style } from './style';
import { BlockSelector } from '../../../admin/components/BlockSelector';

interface BlockItem {
  type: string;
  props?: any;
}

export const Field = ({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) => {

  const items: BlockItem[] = value ? JSON.parse(value) : [];

  const setBlockType = (index: number, type: string) => {
    if (onChange) {
      const itemsCopy = [...items];
      itemsCopy[index] = { type, props: {} };
      onChange(JSON.stringify(itemsCopy));
    }
  };

  const deleteBlock = (index: number) => {
    if (onChange) {
      const itemsCopy = [...items];
      itemsCopy.splice(index, 1);
      onChange(JSON.stringify(itemsCopy));
    }
  };

  const addBlock = () => {
    if (onChange) {
      const itemsCopy = [...items, { type: "BlockSelector" }];
      onChange(JSON.stringify(itemsCopy));
    }
  }

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (onChange) {
      const itemsCopy = [...items];
      var element = itemsCopy[index];
      itemsCopy.splice(index, 1);
      itemsCopy.splice(direction === "up" ? index - 1 : index + 1, 0, element);
      onChange(JSON.stringify(itemsCopy));
    }
  }

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <ul className={style.list.ul}>
        {items.map((item: BlockItem, i: number) => {
          if (item.type === "BlockSelector") {
            return (
              <div key={`related-link-${i}`} className={style.list.li}>
                <BlockSelector onSelect={(type: string) => {
                  setBlockType(i, type)
                }} />
              </div>
            )
          }
          const Block = dynamic(
            () => import(`../../../blocks/${item.type}/`),
            {
              loading: () => <p>...</p>,
              ssr: true
            }
          )
          return (
            <div key={`related-link-${i}`} className={style.list.li}>
              <div className={style.actions.wrapper}>
                <Button
                  size="small"
                  className={style.actions.option}
                  onClick={() => moveBlock(i, 'up')}
                >
                  <ChevronUpIcon
                    size="small"
                  />
                </Button>
                <Button
                  size="small"
                  className={style.actions.option}
                  onClick={() => deleteBlock(i)}
                >
                  <XIcon
                    size="small"
                  />
                </Button>
                <Button
                  size="small"
                  className={style.actions.option}
                  onClick={() => moveBlock(i, 'down')}
                >
                  <ChevronDownIcon
                    size="small"
                  />
                </Button>
              </div>
              <Block {...item.props}/>
            </div>
          );
        })}
      </ul>
      <Button
        size="small"
        className={style.actions.row}
        onClick={addBlock}
        aria-label="Add Block"
      >
        <PlusIcon
          size="small"
        />
        Add Block
      </Button>
    </FieldContainer>
  );
};