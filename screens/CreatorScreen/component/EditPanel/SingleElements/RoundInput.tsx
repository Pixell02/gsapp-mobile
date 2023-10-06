import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import useLanguageContext from '../../../../../hooks/useLanguageContext'
import Input from '../../../../components/Input'
import useAddText from '../../../hooks/useAddText'
import useThemeOption from '../../../hooks/useThemeOption'
import translate from "../../../locales/translate.json"
const RoundInput = ({webViewRef, coords}) => {

  const {language} = useLanguageContext()
  const { selectedTheme } = useThemeOption();
  const [typeRound, setTypeRound] = useState<string>("");

  const { handleAddText } = useAddText(webViewRef);
  useEffect(() => {
    if (webViewRef.current) {
      handleAddText(typeRound, selectedTheme, "yourRound", coords.yourKolejka);
    }
  }, [typeRound, selectedTheme]);

 
  return (
    <View>
      <Input 
      name={translate.typeRound[language] || translate.typeRound["en"]} 
      value={typeRound} 
      onChangeText={(value: string) => setTypeRound(value)} 
      />
    </View>
  )
}

export default RoundInput
