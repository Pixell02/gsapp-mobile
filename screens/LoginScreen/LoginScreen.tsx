import React, { useContext, useEffect, useState } from "react";
import { Text, View, ImageBackground, Alert } from "react-native";
import styles from "./styles";
import Input from "../components/Input";
import SocialLoginButton from "./components/SocialLoginButton";
import LoginButton from "./components/LoginButton";
import { useLogin } from "../../hooks/useLogin";
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import * as GoogleSignIn from "expo-google-sign-in";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import { useAuthContext } from "../../hooks/useAuthContext";
import translate from "./locales/translate.json";
import { LanguageContext } from "../../context/LanguageContext";
const googleLogo = require("../img/google.png");
const facebookLogo = require("../img/fb.png");

export default function LoginScreen({ navigation }) {
  const { language } = useContext(LanguageContext)
  const { login, error, handleOnPress } = useLogin();
  const { user } = useAuthContext();
  const { googleLogin, initializeGoogleSignInAsync } = useGoogleLogin();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    initializeGoogleSignInAsync();
  }, []);

  const handleInputChange = (inputText, inputName) => {
    const newData = { ...loginData, [inputName]: inputText };
    setLoginData(newData);
  };

  return (
    <ImageBackground source={require("../../assets/do_tla.png")} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input name={(translate.email[language] || translate.email["en"])}  onChangeText={(text) => handleInputChange(text, "email")} text={loginData.email} />
        </View>
        <View style={styles.inputContainer}>
          <Input
            isPassword={true}
            name={(translate.password[language] || translate.password["en"])} 
            onChangeText={(text) => handleInputChange(text, "password")}
            text={loginData.password}
          />
        </View>
        <View style={styles.buttonContainer}>
          <SocialLoginButton
            name={(translate.loginWithGoogle[language] || translate.loginWithGoogle["en"])} 
            img={googleLogo}
            press={() => googleLogin(navigation)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <LoginButton
            name={(translate.login[language] || translate.login["en"])} 
            onPress={() => handleOnPress(navigation, loginData.email, loginData.password)}
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
