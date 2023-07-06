import { useState } from 'react'
import {Alert} from 'react-native'
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {

    const [error, setError] = useState(null);
    const { dispatch, user } = useAuthContext()

    const login = (email, password) => {
        setError(null);
        signInWithEmailAndPassword(auth, email, password)
          .then((res) => {
            dispatch({type: 'LOGIN', payload: res.user })
          })
          .catch((err) => {
            console.log(err);
            setError(err.message)
          })
    }
    const handleOnPress = (navigation, email, password) => {
      login(email, password);
      if (error) {
        Alert.alert("Złe dane");
      }
    };

    return { error, login, handleOnPress }
}