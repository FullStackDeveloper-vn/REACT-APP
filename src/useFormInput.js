import { useState } from "react";

export default function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue)

  function hangleChange(e) {
    setValue(e.target.value)
  }

  const inputProps = {
    value: value,
    onChange: hangleChange
  }
  return inputProps
};
