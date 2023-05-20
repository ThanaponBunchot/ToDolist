import React from 'react'
type EditInput = {
    title?:string
    handleChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
    placeholder?:string
    styles?:React.CSSProperties
    defualtValue:string
  }
  export const EditInput = (props:EditInput)=>{
    return <input type='text' value={props.title} onChange={props.handleChange} defaultValue={props.defualtValue} style={props.styles}/>
  }