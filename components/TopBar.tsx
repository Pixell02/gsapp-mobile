import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootStackParamList } from "../screens/StartingScreen/type";
interface imageProps {
  source: any;
}



const logo = require("../img/logo.png");
const personCircle = require("../img/icons/person-circle.png");
const cash = require("../img/icons/cash.png");

export default function TopBar(): JSX.Element {
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handleNavigate = () => {
    navigation.navigate("AccountScreen", null);
  };
  const handleOfferNavigate = () => {
    navigation.navigate("OfferScreen", null);
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
