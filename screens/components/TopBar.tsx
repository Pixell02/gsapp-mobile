import { StackNavigationProp, createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { RootStackParamList } from "../StartingScreen/type";
import { TouchableOpacity } from "react-native-gesture-handler";
// import personCircle from './icons/person-circle.svg';

interface imageProps {
  source: any;
}

const Stack = createStackNavigator<RootStackParamList>();

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, "AccountScreen">;
type OfferScreenNavigationProp = StackNavigationProp<RootStackParamList, "OfferScreen">;

type Props = {
  navigation: AccountScreenNavigationProp;
};

const logo = require("../img/logo.png");
const personCircle = require("../img/icons/person-circle.png");
const cash = require("../img/icons/cash.png");

export default function TopBar({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }): JSX.Element {
  const handleNavigate = () => {
    navigation.navigate("AccountScreen");
  };
  const handleOfferNavigate = () => {
    navigation.navigate("OfferScreen");
  }

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.image} />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleOfferNavigate()}>
          <Image source={cash} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate()}>
          <Image source={personCircle} style={styles.icon} />
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "#000",
    flexDirection: "row",
  },
  imageContainer: {
    height: "100%",
    justifyContent: "center",
  },
  image: {
    height: 60,
    width: 60,
    marginLeft: 20,
  },
  icon: {
    height: 30,
    resizeMode: "contain",
  },
  iconContainer: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 9,
  },
});
