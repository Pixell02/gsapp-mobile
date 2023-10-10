import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import useTeamOption from "../hooks/useTeamOption";

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

export interface selectedPlayerProps {
  firstName: string;
  secondName: string;
  number: string;
}

export interface squadData {
  presetName: string;
  capitan: selectedPlayerProps;
  goalkeeper: selectedPlayerProps;
  squadPlayers: selectedPlayerProps[];
  reservePlayers: selectedPlayerProps[];
  uid: string;
}

export interface squadPresetProps {}

export const DataProvider = ({ children }: props) => {
  const { user } = useAuthContext();
  const [selectedValue, setSelectedValue] = useState("");
  const [squadData, setSquadData] = useState<squadData>(null);
  const [playerData, setPlayerData] = useState<playerProps>({
    id: "",
    firstName: "",
    secondName: "",
    number: "",
    team: "",
    uid: user.uid,
  });

  const { teamOption } = useTeamOption();
  useEffect(() => {
    if (teamOption && teamOption.length > 0) {
      setSelectedValue(teamOption[0].value);
    }
  }, [teamOption]);

  return (
    <DataContext.Provider value={{ playerData, setPlayerData, selectedValue, setSelectedValue, squadData, setSquadData }}>
      {children}
    </DataContext.Provider>
  );
};
