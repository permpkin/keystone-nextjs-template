import { useState } from "react"
import { FieldContainer, FieldLabel, TextInput, TextArea } from '@keystone-ui/fields';

import { style } from './style';

export const BlockEditor = ({ item, onChange }:{
  item: any,
  onChange: Function
}) => {

  const [{ View, Schema }] = useState(require(`../../../src/blocks/${item.type}/`))

  const [state, setState] = useState({
    ...item.props
  })

  const handleChange = (key: string, value: any) => {
    const _value = {
      ...state,
      [key]: value
    }
    setState(_value)
    onChange(_value)
  }
  
  return (
    <div>
      <div className={style.editor.wrapper}>
        <View {...state}/>
      </div>
      <div className={style.editor.fields}>
        {
          Object.keys(Schema).map((key) => {
            switch (Schema[key]) {
              case 'text':
                return (
                  <FieldContainer key={key}>
                    <FieldLabel>{key}</FieldLabel>
                    <TextInput value={state[key]||""} onChange={(e)=>{
                      handleChange(key, e.target.value)
                    }}/>
                  </FieldContainer>
                )
              case 'textarea':
                return (
                  <FieldContainer key={key}>
                    <FieldLabel>{key}</FieldLabel>
                    <TextArea size="large" value={state[key]||""} onChange={(e)=>{
                      handleChange(key, e.target.value)
                    }}/>
                  </FieldContainer>
                )
              default:
                return (
                  <div key={key}>unsupported field type ({Schema[key]}).</div>
                )
            }
          })
        }
      </div>
    </div>
  )
}