import React, { useContext, useState } from 'react'
import { Alert, View } from 'react-native'
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCollection } from '../../../hooks/useCollection';
import translate from "../locales/translate.json";
import { LanguageContext } from '../../../context/LanguageContext';
const useSquadPlayers = () => {
  const { user } = useAuthContext();
  const { language} = useContext(LanguageContext)
  const { documents: Players } = useCollection("Players", ["uid", "==", user.uid]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const handlePlayerChecked = (player) => {
    const { firstName, secondName, number } = player;
    
    const isSelected = selectedPlayers.some(
      (selectedPlayer) =>
        selectedPlayer.firstName === firstName &&
        selectedPlayer.secondName === secondName &&
        selectedPlayer.number === number
    );

    if (isSelected) {
      setSelectedPlayers((prevSelectedPlayers) =>
        prevSelectedPlayers.filter(
          (selectedPlayer) =>
            selectedPlayer.firstName !== firstName ||
            selectedPlayer.secondName !== secondName ||
            selectedPlayer.number !== number
        )
      );
    } else {
if(selectedPlayers.length !== 11){
      setSelectedPlayers((prevSelectedPlayers) => [
        ...prevSelectedPlayers,
        { firstName, secondName, number },
      ]);
      }else {
    Alert.alert(translate.elevenAlert[language])
  }
    }
   
  };

  return {Players, selectedPlayers, handlePlayerChecked}
}

export default useSquadPlayers
