import { useState } from "react";
import { createContext, useContext } from "react";



const RadioContext = createContext(null);

export const RadioProvider = ({ children }) => {
  const [radioChecked, setRadioChecked] = useState("radio1");

  return (
    <RadioContext.Provider value={{ radioChecked, setRadioChecked }}>
      {children}
    </RadioContext.Provider>
  );
};

export default RadioContext;