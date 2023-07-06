import { createContext, useState } from "react";


export const ThemeOptionContext = createContext(null);

export const ThemeOptionProvider = ({children}) => {
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [posterInfo, setPosterInfo] = useState(null)
  return (
    <ThemeOptionContext.Provider value={{selectedTheme, setSelectedTheme, posterInfo, setPosterInfo}}>
      {children}
    </ThemeOptionContext.Provider>
  )
}