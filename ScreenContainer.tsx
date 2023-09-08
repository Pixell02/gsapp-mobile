import React, { useContext } from "react";
import StartingScreen from "./screens/StartingScreen/StartingScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import translation from "./locales/translate.json";
import { LanguageContext } from "./context/LanguageContext";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuthContext } from "./hooks/useAuthContext";
import MainPanelScreen from "./screens/MainPanelScreen/MainPanelScreen";
import CatalogScreen from "./screens/CatalogScreen/CatalogScreen";
import CreatorScreen from "./screens/CreatorScreen/CreatorScreen";
import IndividualCatalogScreen from "./screens/IndividualCatalogScreen/IndividualCatalogScreen";
import PlayersScreen from "./screens/PlayersScreen/PlayersScreen";
import OpponentsScreen from "./screens/OpponentsScreen/OpponentsScreen";
import AccountScreen from "./screens/AccountScreen/AccountScreen";
import OfferScreen from "./screens/OfferScreen/OfferScreen";
import GuideScreen from "./screens/GuideScreen/GuideScreen";
import SuccessScreen from "./screens/SuccessScreen/SuccessScreen";
import translate from "./screens/components/locales/translateNavbar.json";
import { RootStackParamList } from "./screens/StartingScreen/type";
import useLanguageContext from "./hooks/useLanguageContext";
import { Image, StyleSheet } from "react-native";

interface NavItemProps {
  name?: string;
  image?: any;
  link?: keyof RootStackParamList;
  component: React.FC;
}

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();
  const { language } = useLanguageContext();
  const cardList = require("./screens/img/icons/card-list.png");
  const gridFill = require("./screens/img/icons/grid-fill.png");
  const people = require("./screens/img/icons/people.png");
  const personRolodex = require("./screens/img/icons/person-rolodex.png");
  const vs = require("./screens/img/icons/vs.png");

  const styles = StyleSheet.create({
    icon: {
      height: 30,
      resizeMode: "contain",
    },
  });
  const navItem: NavItemProps[] = [
    {
      name: translate.YourCatalog[language] || translate.YourCatalog["en"],
      image: personRolodex,
      link: "YourCatalogScreen",
      component: IndividualCatalogScreen,
    },
    {
      name: translate.Catalog[language] || translate.Catalog["en"],
      image: cardList,
      link: "CatalogScreen",
      component: CatalogScreen,
    },
    {
      name: translate.YourTeamPanel[language] || translate.YourTeamPanel["en"],
      image: gridFill,
      link: "MainScreen",
      component: MainPanelScreen,
    },
    {
      name: translate.Players[language] || translate.Players["en"],
      image: people,
      link: "PlayersScreen",
      component: PlayersScreen,
    },
    {
      name: translate.Opponents[language] || translate.Opponents["en"],
      image: vs,
      link: "OpponentsScreen",
      component: OpponentsScreen,
    },
  ];

  return (
    <Tab.Navigator>
      {navItem.map((item) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            headerShown: false,

            tabBarShowLabel: item.name === " " ? false : true,
            tabBarIcon: item.image
              ? ({ color, size }) => <Image source={item.image} style={{ ...styles.icon, tintColor: color }} />
              : null,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

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
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="CreatorScreen" component={CreatorScreen} options={{ headerShown: false }} />
              <Stack.Screen name="AccountScreen" component={AccountScreen} options={{ headerShown: false }} />
              <Stack.Screen name="OfferScreen" component={OfferScreen} options={{ headerShown: false }} />
              <Stack.Screen name="GuideScreen" component={GuideScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          )}
          {!user && (
            <Stack.Navigator>
              <Stack.Screen name="StartingScreen" component={StartingScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ title: translation.login[language] }} />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: translation.register[language] }}
              />
            </Stack.Navigator>
          )}
        </>
      )}
    </>
  );
};

export default ScreenContainer;
