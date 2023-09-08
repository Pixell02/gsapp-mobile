
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../../../firebase/config";
import translate from "../locales/translate.json"
import { LanguageContext } from "../../../context/LanguageContext";
import { useLogout } from "../../../hooks/useLogout";

const LogoutButton = ({ navigation }) => {
  const {language} = useContext(LanguageContext)
  const {logout} = useLogout();
 

  return (
    <TouchableOpacity style={styles.button} onPress={logout}>
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
