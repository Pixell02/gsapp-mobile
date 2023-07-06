import { createContext, useState } from "react";


const TeamContext = createContext(null);

const TeamProvider = ({children}) => {

  const [teamName, setTeamName] = useState(null);

  return (
    <TeamContext.Provider value={{teamName, setTeamName}}>

    </TeamContext.Provider>
  )


}

export {TeamContext, TeamProvider}