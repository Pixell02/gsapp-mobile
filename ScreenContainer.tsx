import React, { useContext } from "react";
import StartingScreen from "./screens/StartingScreen/StartingScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import translate from "./locales/translate.json";
import { LanguageContext } from "./context/LanguageContext";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuthContext } from "./hooks/useAuthContext";
import MainPanelScreen from "./screens/MainPanelScreen/MainPanelScreen";
import CatalogScreen from "./screens/CatalogScreen/CatalogScreen";
import CreatorScreen from "./screens/CreatorScreen/CreatorScreen";
import IndividualCatalogScreen from "./screens/IndividualCatalogScreen/IndividualCatalogScreen";
import PlayersScreen from "./screens/PlayersScreen/PlayersScreen";
import OpponentsScreen from "./screens/OpponentsScreen/OpponentsScreen";
import AccountScreen from "./screens/AccountScreen/AccountScreen";
import OfferScreen from "./screens/OfferScreen/OfferScreen";
const ScreenContainer = () => {
  const { language } = useContext(LanguageContext);
  const Stack = createStackNavigator();
  const { user, authIsReady } = useAuthContext();
  return (
    <>
    {authIsReady && (
      <>
      {user && (
        <Stack.Navigator>
          <Stack.Screen name="MainScreen" component={MainPanelScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CatalogScreen" component={CatalogScreen} options={{ headerShown: false }} />
         <Stack.Screen name="YourCatalogScreen" component={IndividualCatalogScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CreatorScreen" component={CreatorScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PlayersScreen" component={PlayersScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OpponentsScreen" component={OpponentsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OfferScreen" component={OfferScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
      )}
      {!user && (
        <Stack.Navigator>
          <Stack.Screen name="StartingScreen" component={StartingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: translate.login[language] }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: translate.register[language] }} />
        </Stack.Navigator>
      )}
      
      </>
      )}
    </>
  );
};

export default ScreenContainer;
