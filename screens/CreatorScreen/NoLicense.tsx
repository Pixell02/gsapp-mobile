import React, { useContext } from 'react'
import { Linking, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LanguageContext } from '../../context/LanguageContext'

const NoLicense = () => {

  const {language} = useContext(LanguageContext)

  const handleNavigate = () => {
    const url = `https://gsapp.pl/${language}/login`
    Linking.openURL(url)
  }

  return (
    <View style={{justifyContent: "center", flex: 1}}>
      <Text>Twoja licencja się skończyła</Text>
      <TouchableOpacity style={{alignItems:"center"}} onPress={handleNavigate}>
        <Text style={{fontFamily:"Poppins-SemiBold", fontSize: 20}}>Kup dostęp</Text>
        </TouchableOpacity>
    </View>
  )
}

export default NoLicense
