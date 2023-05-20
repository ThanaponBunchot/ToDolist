import React from 'react'
type InputProps = {
    value:string
    handleChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
    placeholder?:string
    styles?:React.CSSProperties
  }
  export const InputText = (props:InputProps)=>{
    return <input type='text' value={props.value} onChange={props.handleChange} placeholder='Add you todo...' style={props.styles}/>
  }