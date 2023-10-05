
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import useLanguageContext from "../../../hooks/useLanguageContext";
import { useLogout } from "../../../hooks/useLogout";
import translate from "../locales/translate.json";

const LogoutButton = ({navigation}) => {
  const {language} = useLanguageContext();
  const {logout} = useLogout();
 
  const handleLogout = () => {
    AsyncStorage.removeItem("accessToken");
    logout();
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.text}>{translate.logOut[language] || translate.logOut["en"]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    backgroundColor: "black",
    marginLeft: 10,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontFamily: "Poppins_Medium",
    fontSize: 12,
  },
});

export default LogoutButton;
