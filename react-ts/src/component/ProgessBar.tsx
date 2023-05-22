import React from "react"
type ProgressBar = {
    styles?:React.CSSProperties
}

export const ProgressBar = (props:ProgressBar)=>{
    return <div style={props.styles}></div>
}