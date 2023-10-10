import React, { createContext, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";



export const DataContext = createContext(null);

export interface OpponentDataProps {
    id: string;
    firstName: string;
    secondName: string;
    img: string;
    team: string;
    uid: string;
}

export const DataProvider = ({children}: {children: React.ReactNode}) => {

    const { user } = useAuthContext();
    const [selectedValue, setSelectedValue] = useState("");
    const [opponentData, setOpponentData] = useState<OpponentDataProps>({
        id: "",
      firstName: "",
      secondName: "",
      img: "",
      team: "",
      uid: user.uid,
    });
    const [place, setPlace] = useState(null);

    return(
        <DataContext.Provider value={{opponentData, setOpponentData}}>
            {children}
        </DataContext.Provider>
    )
}