import React, { useEffect } from "react";
import { View } from "react-native";
import { CheckBox } from "react-native-elements";
import SelectPicker from "../../../../components/SelectPicker";
import useLanguageContext from "../../../../hooks/useLanguageContext";
import useSelectedTeamContext from "../../../CreatorScreen/hooks/useSelectedTeamContext";
import { playerProps, selectedPlayerProps, squadPresetProps } from "../../context/DataContext";
import useDataContext from "../../hooks/useDataContext";
import translate from "../../locales/translate.json";
import usePlayerOption from "./hooks/usePlayerOption";

const PlayersToCheck = () => {
  const { Players, selectedPlayers, handlePlayerChecked, selectedReserve } = useSelectedTeamContext();
  const option = usePlayerOption(selectedPlayers);
  const { squadData, setSquadData } = useDataContext();
  const { language } = useLanguageContext();
  

  useEffect(() => {
    setSquadData((prev: squadPresetProps) => ({
      ...prev,
      squadPlayers: selectedPlayers
    }))
  },[selectedPlayers])

  useEffect(() => {
    setSquadData((prev: squadPresetProps) => ({
      ...prev,
      reservePlayers: selectedReserve
    }))
  },[selectedReserve])


  const handleValueChange = (value: string, className: string) => {
    setSquadData((prev: selectedPlayerProps[]) => ({
      ...prev,
      [className]: value
    }))
  }

  return (
    <View>
      {Players?.map((player: playerProps, i: string) => (
          <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={{ width: "80%" }}>
                <CheckBox
                  checked={selectedPlayers.some(
                    (selectedPlayer: selectedPlayerProps) =>
                      selectedPlayer.firstName === player.firstName &&
                      selectedPlayer.secondName === player.secondName &&
                      selectedPlayer.number === player.number
                  )}
                  title={player.firstName + " " + player.secondName}
                  onPress={() => handlePlayerChecked(player)}
                />
              </View>
            </View>
          </View>
        ))}
      <View style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "80%" }}>
          <SelectPicker
            options={option}
            selectedValue={squadData.capitan}
            name={translate.capitan[language || "en"]}
            onValueChange={(value) => handleValueChange(value, "capitan")}
          />
        </View>
        <View style={{ width: "80%", marginTop: 10 }}>
          <SelectPicker
            options={option}
            selectedValue={squadData.goalKeeper}
            name={translate.goalkeeper[language || "en"]}
            onValueChange={(value) => handleValueChange(value, "goalkeeper")}
          />
        </View>
      </View>
    </View>
  );
};

export default PlayersToCheck;
