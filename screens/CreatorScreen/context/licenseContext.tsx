import { createContext, useEffect, useState } from "react";
import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";



export const LicenseContext = createContext(null);

export const LicenseContextProvider = ({children}) => {
  const [license, setLicense] = useState(null);
  const {user} = useAuthContext();
  const {documents: License} = useCollection("user", ["uid", "==", user.uid])
  
  useEffect(() => {
    if(License && License[0])
    setLicense(License[0])
  },[License])

  return (
    <LicenseContext.Provider value={{license}}>
      {children}
    </LicenseContext.Provider>
  )

}