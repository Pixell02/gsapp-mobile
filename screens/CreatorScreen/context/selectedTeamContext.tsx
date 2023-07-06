import { Children, createContext, useContext, useEffect, useState } from "react";
import useSquadPlayers from "../hooks/useSquadPlayers";
import { Alert } from "react-native";
import translate from "../locales/translate.json"
import { LanguageContext } from "../../../context/LanguageContext";

export const SelectedTeamContext = createContext(null);

export const SelectedTeamProvider = ({ children }) => {
  const {language} = useContext(LanguageContext)
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedReserve, setSelectedReserve] = useState([]);
  const { Players, selectedPlayers, handlePlayerChecked } = useSquadPlayers();
  const [reservePlayers, setReservePlayers] = useState(null);
  useEffect(() => {
    const filteredPlayers = Players?.filter(
      (player: any) =>
        !selectedPlayers.some(
          (selectedPlayer) =>
            selectedPlayer.firstName === player.firstName &&
            selectedPlayer.secondName === player.secondName &&
            selectedPlayer.number === player.number
        )
    );
    setReservePlayers(filteredPlayers);
  }, [Players, selectedPlayers]);

  const handleReserveChecked = (reserve) => {
    const { firstName, secondName, number } = reserve;
    
    const isSelected = selectedReserve.some(
      (selectedReserve) =>
        selectedReserve.firstName === firstName &&
        selectedReserve.secondName === secondName &&
        selectedReserve.number === number
    );

    if (isSelected) {
      setSelectedReserve((prevselectedReserves) =>
        prevselectedReserves.filter(
          (selectedReserve) =>
            selectedReserve.firstName !== firstName ||
            selectedReserve.secondName !== secondName ||
            selectedReserve.number !== number
        )
      );
    } else {
if(selectedReserve.length !== 9){
      setSelectedReserve((prevselectedReserves) => [
        ...prevselectedReserves,
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
