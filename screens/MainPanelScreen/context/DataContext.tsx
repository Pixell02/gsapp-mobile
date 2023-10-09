import { createContext, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";

export const DataContext = createContext(null);

export interface teamDataProps {
  id: string;
  firstName: string;
  secondName: string;
  img: string;
  sport: string;
  uid?: string;
}

export interface trainerProps {
  id?: string;
  firstName: string;
  secondName: string;
  img: string;
  uid: string;
  team: string;
}

interface props {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: props) => {
  const { user } = useAuthContext();

  const [trainerData, setTrainerData] = useState<trainerProps>({
    firstName: "",
    secondName: "",
    img: "",
    team: "",
    uid: user.uid,
  });

  const [teamData, setTeamData] = useState<teamDataProps>({
    id: "",
    firstName: "",
    secondName: "",
    img: "",
    sport: "piłka nożna",
    uid: user.uid,
  });

  return (
    <DataContext.Provider
      value={{ trainerData, setTrainerData, teamData, setTeamData }}
    >
      {children}
    </DataContext.Provider>
  );
};
