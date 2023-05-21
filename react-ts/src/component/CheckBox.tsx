import React from "react";

type CheckBox = {
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: React.CSSProperties;
  type: string;
  checked?:boolean
  
};

export const CheckBox = (props: CheckBox) => {
  return (
    <label className="label-radio">
    <input
      type={props.type}
      onChange={props.handleOnChange}
      style={props.styles}
      checked={props.checked}
    ></input>
    </label>
  );
};
