import React, { useState } from 'react';
import { FieldProps } from '@keystone-6/core/types';
import { Button } from '@keystone-ui/button';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import { XIcon, PlusIcon, ChevronDownIcon, ChevronUpIcon, EditIcon } from '@keystone-ui/icons';
import { controller } from '@keystone-6/core/fields/types/json/views';

import { style } from './style';
import { BlockSelector } from '../../components/BlockSelector';
import { Drawer, DrawerController } from '@keystone-ui/modals';
import { BlockEditor } from './editor';

interface BlockItem {
  type: string;
  props?: any;
}

export const Field = ({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) => {

  const [showEditor, setShowEditor] = useState<boolean>(false)
  const [editorData, setEditorData] = useState<any>({})
  const [BlockEditorContext, setBlockEditorContext] = useState<any|null>(null)

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

  const updateBlock = (index: number, data: any) => {
    if (onChange) {
      const itemsCopy = [...items];
      itemsCopy[index].props = data;
      onChange(JSON.stringify(itemsCopy));
    }
  }

  // const BlockEditor: any = useMemo(() => {

  //   if (BlockEditorContext === null) return null;

  //   const { View, Schema } = require(`../../../src/blocks/${BlockEditorContext.type}/`)

  //   return () => {
  //     return (
  //       <BlockEditorWrapper
  //         schema={Schema}
  //         onChange={()=>{
  //           //BlockEditorContext.index
  //           //Update here?
  //           console.log("CHANGE_HAPPEND")
  //         }}
  //       >
  //         <View/>
  //       </BlockEditorWrapper>
  //     )
  //   }

  // }, [BlockEditorContext])

  const editBlock = (index: number, item: any) => {
    setBlockEditorContext({
      index,
      item
    })
    setShowEditor(true)
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
          
          const { View } = require(`../../../src/blocks/${item.type}/`)
          
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
                  onClick={() => {
                    editBlock(i, item)
                  }}
                >
                  <EditIcon
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
              <View {...item.props}/>
            </div>
          );
        })}
      </ul>
      <Button
        size="small"
        className={style.actions.row}
        onClick={() => addBlock()}
        aria-label="Add Block"
      >
        <PlusIcon
          size="small"
        />
        Add Block
      </Button>
      <DrawerController isOpen={showEditor}>
        <Drawer
          title={`Edit Block`}
          width="wide"
          actions={{
            confirm: {
              label: 'Update Block',
              action: () => {
                updateBlock(BlockEditorContext.index, editorData)
                setShowEditor(false)
              },
            },
            cancel: {
              label: 'Cancel',
              action: () => setShowEditor(false),
            },
          }}
        >
          <BlockEditor onChange={(val:any) => {
            setEditorData(val)
          }} {...BlockEditorContext}/>
        </Drawer>
      </DrawerController>
    </FieldContainer>
  );
};