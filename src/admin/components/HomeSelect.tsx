import { gql, useMutation, useQuery } from '@keystone-6/core/admin-ui/apollo';

import { FieldContainer, FieldLabel } from '@keystone-ui/fields';

import { Text } from '@keystone-ui/core';
import Select from 'react-select'

import { css } from '@emotion/css';
import { useEffect, useState } from 'react';
import config from '../../../config';

export const style = {
  actionHeader: css`
    display: flex;
    margin-bottom: 12px;
  `,
  actionTitle: css``,
  actionButtons: css`
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
  `
};

export default function HomeSelect() {

  const [currentPage, setCurrentPage] = useState<any>(null)

  const { data, loading } = useQuery(
    gql`
    query {
      pages {
        id
        title
        description
        path
        slug
        isHome
      }
    }
    `
  );

  // update home page selection.
  const [execUpdate] = useMutation(gql`
    mutation UpdateHomePage($ID: ID!, $VALUE: Boolean!){
      updatePage(
        where: { id: $ID }
        data: { isHome: $VALUE }
      ) {
        id
      }
    }
  `);

  const updateHomePage = async (page: any) => {
    // if page is already set
    // remove it as home
    if (currentPage) {
      await execUpdate({
        variables: {
          ID: currentPage.value,
          VALUE: false,
        }
      })
    }
    // set new page to home (isHome=true)
    await execUpdate({
      variables: {
        ID: page.value,
        VALUE: true,
      }
    })
    setCurrentPage(page)
  }

  useEffect(()=>{

    if (loading) return;

    const currentPageDoc = data.pages.filter((page: any) => {
      return page.isHome
    })

    if (currentPageDoc.length >= 1) {
      setCurrentPage({
        label: currentPageDoc[0].title,
        value: currentPageDoc[0].id
      })
    }

  },[data])

  return (
    <FieldContainer>
      <div className={style.actionHeader}>
        <div className={style.actionTitle}>
          <FieldLabel>Home/Landing Page</FieldLabel>
          <Text>
            Access front-end via <a href={config.SITE_URL}>{config.SITE_URL}</a>
          </Text>
        </div>
      </div>
      <Select isLoading={loading} value={currentPage} defaultValue={currentPage} onChange={(page)=>{updateHomePage(page)}} options={data?.pages.map((page: any) => {
        return { label: page.title, value: page.id }
      })}/>
    </FieldContainer>
  )

}