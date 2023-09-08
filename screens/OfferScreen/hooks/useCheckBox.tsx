import React, { useState } from 'react';

interface CheckBoxHook {
  checked: string;
  handleCheckedChange: (value: string) => void;
}

const useCheckBox = (): CheckBoxHook => {
  const [checked, setChecked] = useState<string>('licencja');

  const handleCheckedChange = (value: string): void => {
    setChecked(value);
  };

  return { checked, handleCheckedChange };
};

export default useCheckBox;
