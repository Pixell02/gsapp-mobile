import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import useLanguageContext from "../../../hooks/useLanguageContext";
import { playerProps } from "../../PlayersScreen/PlayersScreen";
import useSquadPlayers from "../hooks/useSquadPlayers";
import translate from "../locales/translate.json";

export const SelectedTeamContext = createContext(null);

export const SelectedTeamProvider = ({ children }) => {
  const {language} = useLanguageContext();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedReserve, setSelectedReserve] = useState([]);
  const { Players, selectedPlayers, handlePlayerChecked } = useSquadPlayers();
  const [reservePlayers, setReservePlayers] = useState(null);
  useEffect(() => {
    const filteredPlayers = Players?.filter(
      (player: playerProps) =>
        !selectedPlayers.some(
          (selectedPlayer) =>
            selectedPlayer.firstName === player.firstName &&
            selectedPlayer.secondName === player.secondName &&
            selectedPlayer.number === player.number
        )
    );
    setReservePlayers(filteredPlayers);
  }, [Players, selectedPlayers]);

  const handleReserveChecked = (reserve: playerProps) => {
    const { firstName, secondName, number } = reserve;
    
    const isSelected = selectedReserve.some(
      (selectedReserve) =>
        selectedReserve.firstName === firstName &&
        selectedReserve.secondName === secondName &&
        selectedReserve.number === number
    );

    if (isSelected) {
      setSelectedReserve((prev) =>
        prev.filter(
          (selectedReserve) =>
            selectedReserve.firstName !== firstName ||
            selectedReserve.secondName !== secondName ||
            selectedReserve.number !== number
        )
      );
    } else {
if(selectedReserve.length !== 9){
      setSelectedReserve((prev) => [
        ...prev,
        { firstName, secondName, number },
      ]);
      } else {
    Alert.alert(translate.nineAlert[language])
  }
    }
   
  }

  return (
    <SelectedTeamContext.Provider
      value={{
        selectedTeam,
        setSelectedTeam,
        Players,
        selectedPlayers,
        handlePlayerChecked,
        reservePlayers,
        selectedReserve,
        setSelectedReserve,
        handleReserveChecked
      }}
    >
      {children}
    </SelectedTeamContext.Provider>
  );
};
