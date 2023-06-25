import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import NavItem from "./NavItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../../screens/StartingScreen/type";
import translate from "./locales/translateNavbar.json"
import { LanguageContext } from "../../context/LanguageContext";
const logo = require("../img/logo.png");
const cardList = require("../img/icons/card-list.png");
const gridFill = require("../img/icons/grid-fill.png");
const people = require("../img/icons/people.png");
const personRolodex = require("../img/icons/person-rolodex.png");
const vs = require("../img/icons/vs.png");

interface NavItemProps {
  name: string;
  image: any;
  link: keyof RootStackParamList;
}

const Stack = createStackNavigator<RootStackParamList>();



const NavBar = ({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }): JSX.Element => {
  
  const {language} = useContext(LanguageContext)

  const navItem: NavItemProps[] = [
  { name: translate.Catalog[language], image: cardList, link: "CatalogScreen" },
  { name: translate.YourCatalog[language], image: personRolodex, link: "YourCatalogScreen" },
  { name: translate.YourTeamPanel[language], image: gridFill, link: "MainScreen" },
  { name: translate.Players[language], image: people, link: "PlayersScreen" },
  { name: translate.Opponents[language], image: vs, link: "OpponentsScreen" },
];
  const handlePress = (item: NavItemProps) => {
    navigation.navigate(item.link)
  }
  
  return (
    <View style={styles.navbarContainer}>
      {navItem.map((item) => (
        <TouchableOpacity key={item.name} onPress={() => handlePress(item)} style={styles.linkContainer}>
          <NavItem name={item.name} image={item.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    width: "100%",
    height: 80,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000000",
    flexDirection: "row",
  },
  linkContainer: {
    width: "100%",
  },
});

export default NavBar;
