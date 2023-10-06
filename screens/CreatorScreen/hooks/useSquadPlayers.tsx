import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useCollection } from '../../../hooks/useCollection';
import useLanguageContext from '../../../hooks/useLanguageContext';
import useTeamCollection from '../../../hooks/useTeamCollection';
import translate from "../locales/translate.json";

interface playerProps {
  firstName: string;
  secondName: string;
  number: string;
}

const useSquadPlayers = () => {
  const { user } = useAuthContext();
  const { language} = useLanguageContext();
  const [Players, setPlayers] = useState(null);
  const { documents: players } = useCollection("Players", ["uid", "==", user.uid]);
  const { documents: LicensedPlayers} = useTeamCollection("Players");
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    const combinedArray = [];
    if(players) combinedArray.push(players);
    if(LicensedPlayers) combinedArray.push(LicensedPlayers);
    setPlayers(combinedArray);
  },[players, LicensedPlayers])

  const handlePlayerChecked = (player: playerProps) => {
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
