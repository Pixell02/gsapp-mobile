import React from "react";
import { Image, View } from "react-native";
import { CheckBox } from "react-native-elements";
import useSelectedTeamContext from "../../../CreatorScreen/hooks/useSelectedTeamContext";

const ReserveToCheck = () => {
  const { reservePlayers, selectedReserve, handleReserveChecked } = useSelectedTeamContext();
  return (
    <View>
      {reservePlayers &&
        reservePlayers.map((player, i) => (
          <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{width: "100%", alignItems: "center"}}>
            <View style={{ width: "80%" }}>
              <CheckBox
                checked={selectedReserve.some(
                  (selectedReserve: any) =>
                    selectedReserve.firstName === player.firstName &&
                    selectedReserve.secondName === player.secondName &&
                    selectedReserve.number === player.number
                )}
                title={player.firstName + " " + player.secondName}
                onPress={() => handleReserveChecked(player)}
              />
            </View>
            </View>
          </View>
        ))}
    </View>
  );
};

export default ReserveToCheck;
