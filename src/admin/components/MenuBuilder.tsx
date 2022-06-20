import { gql, useMutation, useQuery } from '@keystone-6/core/admin-ui/apollo';

import { FieldContainer, FieldLabel } from '@keystone-ui/fields';

import { Button } from '@keystone-ui/button';
import { Text } from '@keystone-ui/core';
import Select from 'react-select'

import { ReactSortable } from "react-sortablejs";

import { css } from '@emotion/css';
import { useEffect, useState } from 'react';

export const style = {
  wrapper: css`
    padding-top: 24px;
  `,
  sortable: css`
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-radius: 6px;
    border-style: solid;
    border-width: 1px;
    padding: 12px;
    cursor: pointer;
    margin-top: 12px;
  `,
  dropZone: css`
  `,
  actionHeader: css`
    display: flex;
  `,
  actionTitle: css``,
  actionButtons: css`
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    align-items: center;
  `
};

const sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  group: "shared"
};

export default function MenuBuilder() {

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      content: "item 1",
      children: [
        {
          id: 2,
          content: "item 2",
          width: 3,
          children: []
        },
        {
          id: 3,
          content: "item 3",
          width: 3,
          children: []
        }
      ]
    }
  ])

  // const { data, loading } = useQuery(
  //   gql`
  //   query {
  //     pages {
  //       id
  //       title
  //       description
  //       path
  //       slug
  //       isHome
  //     }
  //   }
  //   `
  // );

  // const [execUpdate] = useMutation(gql`
  //   mutation UpdateHomePage($ID: ID!, $VALUE: Boolean!){
  //     updatePage(
  //       where: { id: $ID }
  //       data: { isHome: $VALUE }
  //     ) {
  //       id
  //     }
  //   }
  // `);
  

  // await execUpdate({
  //   variables: {
  //     ID: currentPage.value,
  //     VALUE: false,
  //   }
  // })

  return (
    <FieldContainer>
      <div className={style.actionHeader}>
        <div className={style.actionTitle}>
          <FieldLabel>Navigation</FieldLabel>
          <Text>
            Drag and Drop menu items to populate the main navigation.
          </Text>
        </div>
        <div className={style.actionButtons}>
          <Button onClick={()=>{console.log("ADD")}}>
            Add Page
          </Button>
        </div>
      </div>
      <ReactSortable list={menuItems} setList={setMenuItems} {...sortableOptions}>
        {menuItems.map((block, blockIndex) => (
          <BlockWrapper
            key={block.id}
            block={block}
            blockIndex={[blockIndex]}
            setBlocks={setMenuItems}
          />
        ))}
      </ReactSortable>
    </FieldContainer>
  )

}

function Container({ block, blockIndex, setBlocks }:any) {
  return (
    <>
      <ReactSortable
        key={block.id}
        list={block.children}
        setList={(currentList) => {
          setBlocks((sourceList: any) => {
            const tempList = [...sourceList];
            const _blockIndex = [...blockIndex];
            const lastIndex = _blockIndex.pop();
            const lastArr = _blockIndex.reduce(
              (arr, i) => arr[i]["children"],
              tempList
            );
            lastArr[lastIndex]["children"] = currentList;
            return tempList;
          });
        }}
        {...sortableOptions}
      >
        {block.children &&
          block.children.map((childBlock: any, index: any) => {
            return (
              <BlockWrapper
                key={childBlock.id}
                block={childBlock}
                blockIndex={[...blockIndex, index]}
                setBlocks={setBlocks}
              />
            );
          })}
      </ReactSortable>
    </>
  );
}

function BlockWrapper({ block, blockIndex, setBlocks }: any) {
  if (!block) return null;
  return (
    <div className={style.sortable}>
      <FieldLabel>{block.content}</FieldLabel>
      <div className={style.dropZone}>
        <Container
          block={block}
          setBlocks={setBlocks}
          blockIndex={blockIndex}
        />
      </div>
    </div>
  );
}