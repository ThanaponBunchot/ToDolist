import React from "react"
type ProgressBarBack = {
    styles?:React.CSSProperties
}

export const ProgressBarBack = (props:ProgressBarBack)=>{
    return <div style={props.styles}></div>
}