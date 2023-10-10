import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { Alert, ImageBackground, Text, View } from "react-native";
import Input from "../../components/Input";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import useLanguageContext from "../../hooks/useLanguageContext";
import { useSignup } from "../../hooks/useSignup";
import LoginButton from "../LoginScreen/components/LoginButton";
import SocialLoginButton from "../LoginScreen/components/SocialLoginButton";
import styles from "../LoginScreen/styles";
import { RootStackParamList } from "../StartingScreen/type";
import translate from "./locales/translate.json";
const googleLogo = require("../img/google.png");

type StartingScreenNavigationProp = StackNavigationProp<RootStackParamList, "MainScreen">;

type Props = {
  navigation: StartingScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props): JSX.Element {
 
  const {language} = useLanguageContext();
  const { signup, error } = useSignup();
  const { googleLogin } = useGoogleLogin();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

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
          <SocialLoginButton press={() => googleLogin()} name={(translate.registerWithGoogle[language] || translate.registerWithGoogle["en"])} img={googleLogo} />
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
