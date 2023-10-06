import React, { useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import useLanguageContext from "../../hooks/useLanguageContext";
import { useLogin } from "../../hooks/useLogin";
import Input from "../components/Input";
import LoginButton from "./components/LoginButton";
import SocialLoginButton from "./components/SocialLoginButton";
import translate from "./locales/translate.json";
import styles from "./styles";
const googleLogo = require("../img/google.png");

export default function LoginScreen() {
  const { language } = useLanguageContext();
  const {error, handleOnPress } = useLogin();
  const { googleLogin } = useGoogleLogin();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (inputText: string, inputName: string) => {
    const newData = { ...loginData, [inputName]: inputText };
    setLoginData(newData);
  };

  return (
    <ImageBackground source={require("../../assets/do_tla.png")} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input name={(translate.email[language] || translate.email["en"])}  onChangeText={(text: string) => handleInputChange(text, "email")} text={loginData.email} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            isPassword={true}
            name={(translate.password[language] || translate.password["en"])} 
            onChangeText={(text: string) => handleInputChange(text, "password")}
            text={loginData.password}
          />
        </View>
        <View style={styles.buttonContainer}>
          <SocialLoginButton
            name={(translate.loginWithGoogle[language] || translate.loginWithGoogle["en"])} 
            img={googleLogo}
            press={() => googleLogin()}
          />
        </View>
        <View style={styles.buttonContainer}>
          <LoginButton
            name={(translate.login[language] || translate.login["en"])} 
            onPress={() => handleOnPress(loginData.email, loginData.password)}
          />
        </View>
        {error && (
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: "red" }}>{(translate.error[language] || translate.error["en"])}</Text>
          </View>
        )}
        <View style={styles.footerContainer}>
          <Text style={styles.footer}>{(translate.terms[language] || translate.terms["en"])}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
