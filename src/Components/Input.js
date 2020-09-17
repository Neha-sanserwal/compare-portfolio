import React, { useState } from "react";

const Input = (props) => {
  const [value, setValue] = useState(props.initialValue);

  const handleChange = (event) => {
    const newVal = event.target.value;
    setValue(newVal);
  };

  const handleKey = (event) => {
    if (event.charCode === 13 && value !== "") {
      props.handleValue(value);
      setValue("");
    }
  };

  return (
    <input
      className={props.className}
      value={value || ""}
      onKeyPress={(event) => handleKey(event)}
      onChange={(event) => handleChange(event)}
    />
  );
};
export default Input;
