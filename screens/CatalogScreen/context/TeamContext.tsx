import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCollection } from "../../../hooks/useCollection";
import useTeamCollection from "../../../hooks/useTeamCollection";

export const TeamContext = createContext(null);

interface teamProps {
  sport: string
}

export const TeamProvider = ({ children }) => {
  const { user } = useAuthContext();
  const { documents: Teams } = useCollection("Teams", ["uid", "==", user.uid]);
  const { documents: LicensedTeams } = useTeamCollection("Teams");
  const [sportKeys, setSportKeys] = useState([]);
  const [sportOptions, setSportOptions] = useState([]);
  const [selectedSportKeys, setSelectedSportKeys] = useState(null);

  useEffect(() => {
    if (Teams || LicensedTeams) {
      const uniqueSportKeys = Array.from(
        new Set(
          (Teams || []).concat(LicensedTeams || []).map((team: teamProps) => team.sport)
        )
      );
      setSportKeys(uniqueSportKeys);
    }
  }, [Teams, LicensedTeams]);

  useEffect(() => {
    const options = sportKeys.map((sport) => ({
      label: sport,
      value: sport,
    }));
    setSportOptions(options);
  }, [sportKeys]);

  useEffect(() => {
    if (sportOptions.length > 0) {
      setSelectedSportKeys(sportOptions[0]?.value);
    }
  }, [sportOptions]);

  return (
    <TeamContext.Provider
      value={{
        sportKeys,
        setSportKeys,
        sportOptions,
        selectedSportKeys,
        setSelectedSportKeys,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
