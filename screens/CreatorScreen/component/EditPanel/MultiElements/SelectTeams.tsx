import React from "react";
import useSelectTeams from "./hooks/useSelectTeams";
import { View } from "react-native";
import SelectPicker from "../../../../components/SelectPicker";
import useLanguageContext from "../../../../../hooks/useLanguageContext";
import translate from "../../../locales/translate.json"

const SelectTeams = ({ webViewRef, coords, selectedMatch }) => {
  const { teamOption, setSelectedHost, setSelectedGuest, selectedGuest, selectedHost } = useSelectTeams(webViewRef, coords, selectedMatch);
  const {language} = useLanguageContext();
  return (
    <View>
       <SelectPicker name={translate.host[language]} options={teamOption} selectedValue={selectedHost} onValueChange={(value) => setSelectedHost(value)} />
       <SelectPicker name={translate.guest[language]} options={teamOption} selectedValue={selectedGuest} onValueChange={(value) => setSelectedGuest(value)} />
    </View>
  );
};

export default SelectTeams;
