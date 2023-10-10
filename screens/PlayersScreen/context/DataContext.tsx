import { createContext, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";




export const DataContext = createContext(null);

interface props {
  children: React.ReactNode;
}

export interface playerProps {
  id: string;
  firstName: string;
  secondName: string;
  number: string;
  team: string;
  uid: string;
}

export interface squadPresetProps {}

export const DataProvider = ({ children }: props) => {
  const { user } = useAuthContext();
  const [selectedValue, setSelectedValue] = useState("");
  const [squadData, setSquadData] = useState(null);
  const [playerData, setPlayerData] = useState<playerProps>({
    id: "",
    firstName: "",
    secondName: "",
    number: "",
    team: "",
    uid: user.uid,
  });

  return <DataContext.Provider value={{ playerData, setPlayerData }}>{children}</DataContext.Provider>;
};
