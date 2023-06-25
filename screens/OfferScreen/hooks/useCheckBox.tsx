import React, {useState} from 'react'

const useCheckBox = () => {
  const [checked, setChecked] = useState("licencja");

  const handleCheckedChange = (value :string) => {
    setChecked(value);
  }

  return {checked, handleCheckedChange}
}

export default useCheckBox
