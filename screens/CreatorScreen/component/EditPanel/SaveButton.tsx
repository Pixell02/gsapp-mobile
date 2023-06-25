import React, { useContext } from 'react'
import RoundedButton from '../../../components/RoundedButton'
import translate from "../../locales/translate.json"
import { LanguageContext } from '../../../../context/LanguageContext'
import { Text, View } from 'react-native'

const SaveButton = ({webViewRef, handleSave}) => {

  const { language } = useContext(LanguageContext)

  

  return (
    <View style={{marginTop: 10, marginBottom: 10}}>
      <Text>Zapis jeszcze nie działa</Text>
    <RoundedButton text={translate.save[language]} onPress={() => handleSave()} />
    </View>
  )
}

export default SaveButton
