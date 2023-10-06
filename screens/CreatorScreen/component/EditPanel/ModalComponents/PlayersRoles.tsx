import React from "react";
import { View } from "react-native";
import useLanguageContext from "../../../../../hooks/useLanguageContext";
import SelectPicker from "../../../../components/SelectPicker";
import usePlayers from "../../../hooks/usePlayers";
import translate from "../../../locales/translate.json";
import Header from "./components/Header";

const PlayersRoles = ({ capitan, setCapitan, goalkeeper, setGoalkeeper, webViewRef, selectedTheme }) => {
  
  const { language } = useLanguageContext();
  const {playerOptions} = usePlayers(webViewRef, selectedTheme);
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Header title={translate.setRules[language]} />
      <SelectPicker 
      options={playerOptions} 
      name={translate.capitan[language]}
      onValueChange={(value) => setCapitan(value)}
      selectedValue={capitan}
       />
      <SelectPicker 
      options={playerOptions} 
      name={translate.goalkeeper[language]}
      onValueChange={(value) => setGoalkeeper(value)}
      selectedValue={goalkeeper}
       />
    </View>
  );
};

export default PlayersRoles;
