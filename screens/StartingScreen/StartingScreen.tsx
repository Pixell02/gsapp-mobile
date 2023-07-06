import { Button, ImageBackground, StyleSheet, Switch, Text, View } from "react-native";
import RoundedButton from "../components/RoundedButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import translate from "./locales/startingScreen.json"
import styles from "./style";
import { LanguageContext } from "../../context/LanguageContext";


export default function StartingScreen({ navigation }){

  const { language } = useContext(LanguageContext) 

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleRegisterPress = () => {
    navigation.navigate("Register");
  };

  return (
    <ImageBackground source={require("../../assets/do_tla.png")} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.block}>
          <Text style={styles.text}>{(translate.haveAccount[language] || translate.haveAccount["en"])}</Text>
          <View style={styles.button}>
            <RoundedButton text={(translate.login[language] || translate.login["en"])} onPress={handleLoginPress} />
          </View>
        </View>
        <View style={styles.block}>
          <View style={styles.blackLine}></View>
        </View>
        <View style={styles.block}>
          <View style={styles.block}>
            <Text style={styles.text}>{(translate.wantToChange[language] || translate.wantToChange["en"])}</Text>
            <RoundedButton text={(translate.register[language] || translate.register["en"])} onPress={handleRegisterPress} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
