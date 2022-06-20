import React, { useEffect, useState } from 'react';
import { FieldProps } from '@keystone-6/core/types';
import { gql, useMutation, useQuery } from '@keystone-6/core/admin-ui/apollo';
import { FieldContainer } from '@keystone-ui/fields';
import { controller } from '@keystone-6/core/fields/types/json/views';
import { useToasts } from '@keystone-ui/toast';

import { style } from './style';
import Link from 'next/link';
import { toSlug } from '../../../utils/toSlug';
import config from '../../../../config'
import { useRouter } from 'next/router';

export const Field = ({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) => {

  // TODO: find a better way to get current document.
  const { query } = useRouter()

  const { addToast } = useToasts();

  const [editing, setEditing] = useState<boolean>(false)

  const [page, setPage] = useState<any|null>(null)

  const [curValue, setCurValue] = useState<string>('')
  const [newValue, setNewValue] = useState<string>('')

  useEffect(() => {

    // refetch path on external path change.
    refetch({ ID: query.id })

  }, [value])

  const { data, error, loading, refetch } = useQuery(
    gql`
    query GetPage($ID: ID!) {
      page(where: { id: $ID }) {
        title
        description
        path
        slug
      }
    }
    `,
    { variables: { ID: query.id } }
  );

  // update paired route.
  const [updateRoute] = useMutation(gql`
    mutation UpdateRoute($ID: ID!, $PATH: String!, $SLUG: String!){
      updatePage(
        where: { id: $ID }
        data: {
          path: $PATH
          slug: $SLUG
        }
      ) {
        id
      }
    }
  `);

  const saveChanges = async () => {

    const _value = toSlug(newValue)

    await updateRoute({
      variables: {
        ID: query.id,
        PATH: `${page.path}${_value}`,
        SLUG: `${_value}`
      },
    })

    setCurValue(_value)
    setNewValue(_value)

    addToast({
      title: "Path Updated",
      message: `From "${curValue}" to "${_value}"`,
      tone: 'positive'
    })

    setEditing(false)

  }

  useEffect(() => {
    if (data != undefined) {
      setPage(data.page)
      setCurValue(data.page.slug)
      setNewValue(data.page.slug)
    }
  }, [data])

  if (loading || page === null) {
    return null;
  }
  
  return (
    <FieldContainer>
      <div className={editing ? style.wrapper__editing : style.wrapper}>
        <>
          {
            editing ? (
              <>
                <span className={style.segment_disabled}>
                  {config.SITE_URL}/{page.path.replace(page.slug,'')}
                </span>
                <input
                type="text"
                placeholder={curValue}
                className={style.input} onChange={(e) => {
                  setNewValue(e.target.value)
                }} value={newValue}/>
              </>
            ) : (
              <Link href={`${config.SITE_URL}/${page.path.replace(page.slug,'')}${curValue}`}>
                <a className={style.link} target="_blank">
                  <span className={style.segment_disabled}>{config.SITE_URL}/</span>
                  {
                    page.path ? (
                      <span className={style.segment_disabled}>{page.path.replace(page.slug,'')}</span>
                    ) : null
                  }
                  <span className={style.segment}>
                    {curValue}
                  </span>
                </a>
              </Link>
            )
          }
          <div>
            {
              editing ? (
                <a onClick={saveChanges} className={style.toggle}>
                  save
                </a>
              ) : (
                <a onClick={()=>setEditing(true)} className={style.toggle}>
                  edit
                </a>
              )
            }
          </div>
        </>
      </div>
    </FieldContainer>
  );
};
