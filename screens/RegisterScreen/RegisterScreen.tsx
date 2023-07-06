import { useContext, useEffect, useState } from "react";
import { Text, TextInput, View, ImageBackground, Alert } from "react-native";
import styles from "../LoginScreen/styles";
import Input from "../components/Input";
import SocialLoginButton from "../LoginScreen/components/SocialLoginButton";
import LoginButton from "../LoginScreen/components/LoginButton";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../StartingScreen/type";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSignup } from "../../hooks/useSignup";
import { useAuthContext } from "../../hooks/useAuthContext";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import { LanguageContext } from "../../context/LanguageContext";
const googleLogo = require("../img/google.png");
import translate from "./locales/translate.json"

type StartingScreenNavigationProp = StackNavigationProp<RootStackParamList, "MainScreen">;

type Props = {
  navigation: StartingScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props): JSX.Element {
 
  const {language} = useContext(LanguageContext)
  const { signup, error } = useSignup();
  const { googleLogin, initializeGoogleSignInAsync } = useGoogleLogin();
  const { user } = useAuthContext();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    initializeGoogleSignInAsync();
  }, []);

  const handleInputChange = (inputText: string, inputName: string) => {
    const newData = { ...loginData, [inputName]: inputText };
    setLoginData(newData);
  };

  const handleNavigate = () => {
    signup(loginData.email, loginData.password);
    if (error) {
      Alert.alert(error);
    }
  };

  return (
    <ImageBackground source={require("../../assets/do_tla.png")} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input name={(translate.email[language] || translate.email["en"])} onChangeText={(text) => handleInputChange(text, "email")} text={loginData.email} />
        </View>
        <View style={styles.inputContainer}>
          <Input name={(translate.password[language] || translate.password["en"])} onChangeText={(text) => handleInputChange(text, "password")} text={loginData.password} />
        </View>
        <View style={styles.buttonContainer}>
          <SocialLoginButton press={() => googleLogin(navigation)} name={(translate.registerWithGoogle[language] || translate.registerWithGoogle["en"])} img={googleLogo} />
        </View>
        <View style={styles.buttonContainer}>
          <LoginButton onPress={handleNavigate} name={(translate.register[language] || translate.register["en"])}/>
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footer}>
          {(translate.terms[language] || translate.terms["en"])}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
