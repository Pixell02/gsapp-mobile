import React, { useContext } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import translate from "../locales/translate.json";
import { LanguageContext } from "../../../context/LanguageContext";


const TemporaryContainer = () => {
  const { language } = useContext(LanguageContext);
  const handleClick = () => {
    const url = `https://gsapp.pl/${language}/login`;
    Linking.openURL(url);
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "center", marginTop: "75%" }}>
      <Text style={styles.text}>{translate.temporary[language] || translate.temporary["en"]}</Text>
      <TouchableOpacity onPress={() => handleClick()}>
        <Text style={styles.link}>Gsapp.pl</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TemporaryContainer;

const styles = StyleSheet.create({
  link: {
    color: "blue",
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
  text: {
    fontFamily: "Poppins_Medium",
  },
});
