import React from 'react'

type ButtonProps={
    handleClick:(event:React.MouseEvent<HTMLButtonElement>, text:string)=>void
}
export const Button = (props:ButtonProps)=>{
    return <button onClick={(event)=>props.handleClick(event,'gooo')}>+</button>
}