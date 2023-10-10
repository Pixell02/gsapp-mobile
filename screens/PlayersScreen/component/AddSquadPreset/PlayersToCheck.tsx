import React from "react";
import { View } from "react-native";
import { CheckBox } from "react-native-elements";
import SelectPicker from "../../../../components/SelectPicker";
import useLanguageContext from "../../../../hooks/useLanguageContext";
import useSelectedTeamContext from "../../../CreatorScreen/hooks/useSelectedTeamContext";
import translate from "../../locales/translate.json";
import usePlayerOption from "./hooks/usePlayerOption";

const PlayersToCheck = ({ goalkeeper, setGoalkeeper, capitan, setCapitan }) => {
  const { Players, selectedPlayers, handlePlayerChecked } = useSelectedTeamContext();
  const option = usePlayerOption(selectedPlayers);
  const { language } = useLanguageContext();

  return (
    <View>
      {Players &&
        Players.map((player, i) => (
          <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={{ width: "80%" }}>
                <CheckBox
                  checked={selectedPlayers.some(
                    (selectedPlayer: any) =>
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
            selectedValue={capitan}
            name={translate.capitan[language || "en"]}
            onValueChange={(value) => setCapitan(value)}
          />
        </View>
        <View style={{ width: "80%", marginTop: 10 }}>
          <SelectPicker
            options={option}
            selectedValue={goalkeeper}
            name={translate.goalkeeper[language || "en"]}
            onValueChange={(value) => setGoalkeeper(value)}
          />
        </View>
      </View>
    </View>
  );
};

export default PlayersToCheck;
