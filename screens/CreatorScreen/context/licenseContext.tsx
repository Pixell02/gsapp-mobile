import { createContext } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useDoc } from "../../../hooks/useDoc";



export const LicenseContext = createContext(null);

export const LicenseContextProvider = ({children}) => {

  const {user} = useAuthContext();
  const {documents: license} = useDoc("user", ["uid", "==", user.uid])

  return (
    <LicenseContext.Provider value={{license}}>
      {children}
    </LicenseContext.Provider>
  )

}