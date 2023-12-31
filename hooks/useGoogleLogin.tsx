import AsyncStorage from '@react-native-async-storage/async-storage';
import * as GoogleSignIn from "expo-google-sign-in";
import { GoogleAuthProvider, getAuth, signInWithCredential } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';

const useGoogleLogin = () => {
 
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext()

    const googleLogin = async() => {
      try {
        await GoogleSignIn.askForPlayServicesAsync();
        const { type, user } = await GoogleSignIn.signInAsync();
        
        if (type === 'success') {
          const { accessToken } = user.auth; 
          
          AsyncStorage.setItem("accessToken", accessToken);
          const googleCredential = GoogleAuthProvider.credential(null, accessToken);
          
          const userSignIn = signInWithCredential(getAuth(), googleCredential);
          userSignIn.then((res) => {
            dispatch({type: 'LOGIN', payload: res.user})
          })
        }
      } catch (error) {
        console.log('Error signing in with Google:', error);
        setError(error)
      }
    }
    const initializeGoogleSignInAsync = async () => {
      try {
        await GoogleSignIn.initAsync({
          clientId: '230369778825-rsjla41trfrehb1jqdq2f6024dth5ndu.apps.googleusercontent.com',
        });
      } catch (error) {
        console.log('Error initializing Google Sign-In:', error);
      }
    };
    useEffect(() => {
    initializeGoogleSignInAsync();
  }, []);

    return {error, googleLogin}
}

export default useGoogleLogin
