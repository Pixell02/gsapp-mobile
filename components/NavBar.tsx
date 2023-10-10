import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useLanguageContext from "../hooks/useLanguageContext";
import { RootStackParamList } from "../screens/StartingScreen/type";
import NavItem from "./NavItem";
import translate from "./locales/translateNavbar.json";
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



const NavBar = (): JSX.Element => {
  const { language } = useLanguageContext();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navItem: NavItemProps[] = [
    { name: (translate.Catalog[language] || translate.Catalog["en"]), image: cardList, link: "CatalogScreen" },
    { name: (translate.YourCatalog[language] || translate.YourCatalog["en"]), image: personRolodex, link: "YourCatalogScreen" },
    { name: (translate.YourTeamPanel[language] || translate.YourTeamPanel["en"]), image: gridFill, link: "MainScreen" },
    { name: (translate.Players[language] || translate.Players["en"]), image: people, link: "PlayersScreen" },
    { name: (translate.Opponents[language] || translate.Opponents["en"]), image: vs, link: "OpponentsScreen" },
  ];

  const handlePress = (item: NavItemProps) => {
    navigation.navigate(item.link, null);
  };

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
