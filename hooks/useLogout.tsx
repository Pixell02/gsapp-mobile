import { useAuthContext } from './useAuthContext'

import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const useLogout = () => {

    const { dispatch } = useAuthContext()

    const logout = () => {
      signOut(auth)
        .then(() => {
            dispatch({type: 'LOGOUT'});
            AsyncStorage.setItem("accessToken", "");
        })
        .catch((err) => {
            console.log(err.mess)
        })
    }

    return { logout }
}