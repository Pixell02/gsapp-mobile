import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import translate from "../../../locales/translate.json";
import { LanguageContext } from "../../../../../context/LanguageContext";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import { Picker } from "@react-native-picker/picker";
import { useCollection } from "../../../../../hooks/useCollection";
import SelectPicker from "../../../../components/SelectPicker";
import usePlayers from "../../../hooks/usePlayers";

const PlayersRoles = ({ capitan, setCapitan, goalkeeper, setGoalkeeper }) => {
  const { user } = useAuthContext();
  const { language } = useContext(LanguageContext);
  const {playerOptions} = usePlayers();
  
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Header title={translate.setRules[language]} />
      <SelectPicker 
      options={playerOptions} 
      name={translate.capitan[language]}
      onValueChange={(value) => setCapitan(value.split("...")[0] + " " + value.split("")[1])}
      selectedValue={capitan}
       />
      <SelectPicker 
      options={playerOptions} 
      name={translate.goalkeeper[language]}
      onValueChange={(value) => setGoalkeeper(value.split("...")[0] + " " + value.split("")[1])}
      selectedValue={goalkeeper}
       />
    </View>
  );
};

export default PlayersRoles;
const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    padding: 10,
    height: 40,
    width: "65%",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  text: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "65%",
  },
  textStyle: {
    fontFamily: "Poppins-SemiBold",
  },
});
