import { NavigationContainer } from "@react-navigation/native";
import "expo-dev-client";
import { useFonts } from "expo-font";
import * as Localization from "expo-localization";
import { useEffect, useState } from "react";
import { View } from "react-native";
import "react-native-gesture-handler";
import ScreenContainer from "./ScreenContainer";
import { AuthContextProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";


export default function App() {
  const [language, setLanguage] = useState("");
  useEffect(() => {
    const currentLocale = Localization.locale.split("-")[0];
    setLanguage(currentLocale || "en");
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


