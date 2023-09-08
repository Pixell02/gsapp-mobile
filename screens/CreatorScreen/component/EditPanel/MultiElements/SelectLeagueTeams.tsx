import React from "react";
import useSelectTeams from "./hooks/useSelectTeams";
import { View } from "react-native";
import SelectPicker from "../../../../components/SelectPicker";

const SelectLeagueTeams = ({ webViewRef, coords, selectedMatch }) => {
  const { teamOption, setSelectedGuest, selectedGuest } = useSelectTeams(webViewRef, coords, selectedMatch);
  console.log("asdasd")
  return (
    <View>
      <SelectPicker name="Drużyna" options={teamOption} selectedValue={selectedGuest} onValueChange={(value) => setSelectedGuest(value)} />
    </View>
  );
};

export default SelectLeagueTeams;
