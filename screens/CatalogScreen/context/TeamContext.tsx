import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";



export const TeamContext = createContext(null);


export const TeamProvider = ({ children }) => {

  const { user } = useAuthContext();
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  
  const [sportKeys, setSportKeys] = useState(null);
  const [sportOptions, setSportOptions] = useState(null);
  const [selectedSportKeys, setSelectedSportKeys] = useState(null);

  useEffect(() => {
    if (Teams) {
      const uniqueSportKeys = Array.from(
        new Set(Teams.map((team) => team.sport))
      );
      setSportKeys(uniqueSportKeys);
    }
  }, [Teams]);
  

  useEffect(() => {
    const options = sportKeys?.map((sport) => ({
      label: sport,
      value: sport
    }));
    setSportOptions(options);
  }, [sportKeys])
  
  useEffect(() => {
    if(sportOptions)
      setSelectedSportKeys(sportOptions[0]?.value);
  },[sportOptions])
  

  return (
    <TeamContext.Provider value={{sportKeys, setSportKeys, sportOptions, selectedSportKeys, setSelectedSportKeys}}>
     {children} 
    </TeamContext.Provider>
)

}