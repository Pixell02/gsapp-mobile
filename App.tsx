
import { StyleSheet, Text, View } from "react-native";
import "expo-dev-client";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { AuthContextProvider } from "./context/AuthContext";
import { LanguageContext, LanguageProvider } from "./context/LanguageContext";
import * as Localization from 'expo-localization';
import { useContext, useEffect, useState } from "react";
import ScreenContainer from "./ScreenContainer";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

export default function App() {
  const [language, setLanguage] = useState('');
  useEffect(() => {
    const currentLocale = Localization.locale.split('-')[0];
    setLanguage(currentLocale || 'en');
  }, []);
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins_Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return <View />;
  }
  
  return (
    <AuthContextProvider>
      <LanguageProvider>
      <NavigationContainer>
        <ScreenContainer /> 
      </NavigationContainer>
      </LanguageProvider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
