import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../../../firebase/config";
import translate from "../locales/translate.json"
import { LanguageContext } from "../../../context/LanguageContext";

const LogoutButton = ({ navigation }) => {
  const {language} = useContext(LanguageContext)
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("StartingScreen");
      })
      .catch((err) => console.log(err));
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
      <Text style={styles.text}>{translate.logOut[language]}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    backgroundColor: "black",
    marginLeft: 10,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontFamily: "Poppins_Medium",
    fontSize: 10,
  },
});

export default LogoutButton;
