import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "expo-dev-client";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartingScreen from "./screens/StartingScreen/StartingScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import MainPanelScreen from "./screens/MainPanelScreen/MainPanelScreen";
import PlayersScreen from "./screens/PlayersScreen/PlayersScreen";
import CatalogScreen from "./screens/CatalogScreen/CatalogScreen";
import IndividualCatalogScreen from "./screens/IndividualCatalogScreen/IndividualCatalogScreen";
import OpponentsScreen from "./screens/OpponentsScreen/OpponentsScreen";
import AccountScreen from "./screens/AccountScreen/AccountScreen";
import CreatorScreen from "./screens/CreatorScreen/CreatorScreen";
import { useFonts } from "expo-font";
import { AuthContextProvider } from "./context/AuthContext";
import OfferScreen from "./screens/OfferScreen/OfferScreen";
import { LanguageContext, LanguageProvider } from "./context/LanguageContext";
import * as Localization from 'expo-localization';
import { useContext, useEffect, useState } from "react";
import translate from "./locales/translate.json"
const Stack = createStackNavigator();

export default function App() {
  const [language, setLanguage] = useState('');
  
  useEffect(() => {
    const currentLocale = Localization.locale.split('-')[0];
    setLanguage(currentLocale || 'en');
  }, []);
  const [fontsLoaded] = useFonts({
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
        <Stack.Navigator>
          <Stack.Screen name="StartingScreen" component={StartingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title:translate.login[language] }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title:translate.register[language] }} />
          <Stack.Screen name="MainScreen" component={MainPanelScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CatalogScreen" component={CatalogScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreatorScreen" component={CreatorScreen} options={{ headerShown: false }} />
          <Stack.Screen name="YourCatalogScreen" component={IndividualCatalogScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PlayersScreen" component={PlayersScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OpponentsScreen" component={OpponentsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OfferScreen" component={OfferScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
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
