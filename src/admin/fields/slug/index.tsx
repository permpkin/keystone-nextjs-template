import React, { useEffect, useState } from 'react';
import { FieldProps } from '@keystone-6/core/types';
import { gql, useLazyQuery, useMutation, useQuery } from '@keystone-6/core/admin-ui/apollo';
import { FieldContainer, FieldLabel, TextInput } from '@keystone-ui/fields';
import { controller } from '@keystone-6/core/fields/types/json/views';
import { useToasts } from '@keystone-ui/toast';

import { style } from './style';
import Link from 'next/link';
import { slugify } from '../../../utils/Slugify';

interface Segment {
  id: string
  type: string
  slug: string
}

export const Field = (config: FieldProps<typeof controller>) => {

  const { field, value, onChange, autoFocus } = config

  const { addToast } = useToasts();

  const [editing, setEditing] = useState<boolean>(false)

  const [curValue, setCurValue] = useState<string>('')
  const [newValue, setNewValue] = useState<string>('')

  const { id } = (value as any)?.value;

  const { data, error, loading } = useQuery(
    gql`
    query ($id: ID!) {
      page(where: { id: $id }) {
        id
        title
        description
        path {
          id
          path
          prefix
        }
      }
    }
    `,
    { variables: { id: (value as any).id } }
  );

  // update paired route.
  const [updateRoute, updateState] = useMutation(gql`
    mutation UpdateRoute($ID: ID!, $PATH: String!){
      updateRoute(
        where: { id: $ID }
        data: { path: $PATH }
      ) {
        id
      }
    }
  `);

  const saveChanges = async () => {

    await updateRoute({
      variables: {
        ID: data.page.path.id,
        PATH: newValue,
      },
    })

    setCurValue(newValue)

    addToast({
      title: "Path Updated",
      message: `From "${curValue}" to "${newValue}"`,
      tone: 'positive'
    })

    setEditing(false)

  }

  useEffect(() => {
    if (data != undefined) {
      setCurValue(data.page.path.path)
      setNewValue(data.page.path.path)
    }
  }, [data])

  if (loading) {
    return null;
  }
  
  return (
    <FieldContainer>
      <div className={editing ? style.wrapper__editing : style.wrapper}>
        <>
          {
            editing ? (
              <>
                <span className={style.segment_disabled}>{window.location.origin.toString().replace(':8000',':3000')}{`${data.page.path.prefix?`${data.page.path.prefix}`:''}`}</span>
                <input
                type="text"
                placeholder={curValue}
                className={style.input} onChange={(e) => {
                  setNewValue(slugify(e.target.value[0] !== "/" ? `/${e.target.value}` : e.target.value))
                }} value={newValue}/>
              </>
            ) : (
              <Link href={`${window.location.origin.toString().replace(':8000',':3000')}${data.page.path.prefix?`${data.page.path.prefix}`:''}${curValue}`}>
                <a className={style.link}>
                  <span className={style.segment_disabled}>{window.location.origin.toString().replace(':8000',':3000')}</span>
                  {
                    // append prefix value if route is nested.
                    data.page.path.prefix ? (
                      <span className={style.segment_disabled}>{data.page.path.prefix}</span>
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