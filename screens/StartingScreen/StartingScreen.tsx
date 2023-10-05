import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleAuthProvider, getAuth, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import { ImageBackground, Text, View } from "react-native";
import { useAuthContext } from "../../hooks/useAuthContext";
import useLanguageContext from "../../hooks/useLanguageContext";
import RoundedButton from "../components/RoundedButton";
import translate from "./locales/startingScreen.json";
import styles from "./style";

export default function StartingScreen({ navigation }) {
  const { language } = useLanguageContext();
  const { dispatch } = useAuthContext();

  useEffect(() => {
    AsyncStorage.getItem("accessToken").then((res) => {
      if (res) {
        const googleCredential = GoogleAuthProvider.credential(null, res);

        const userSignIn = signInWithCredential(getAuth(), googleCredential);
        userSignIn.then((res) => {
          dispatch({ type: "LOGIN", payload: res.user });
        });
      }
    });
  }, []);

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
          <Text style={styles.text}>{translate.haveAccount[language] || translate.haveAccount["en"]}</Text>
          <View style={styles.button}>
            <RoundedButton text={translate.login[language] || translate.login["en"]} onPress={handleLoginPress} />
          </View>
        </View>
        <View style={styles.block}>
          <View style={styles.blackLine}></View>
        </View>
        <View style={styles.block}>
          <View style={styles.block}>
            <Text style={styles.text}>{translate.wantToChange[language] || translate.wantToChange["en"]}</Text>
            <View style={styles.button}>
              <RoundedButton
                text={translate.register[language] || translate.register["en"]}
                onPress={handleRegisterPress}
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
