import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import useLanguageContext from '../../../../../hooks/useLanguageContext'
import Input from '../../../../components/Input'
import useAddText from '../../../hooks/useAddText'
import useThemeOption from '../../../hooks/useThemeOption'
import translate from "../../../locales/translate.json"
const MonthInput = ({webViewRef, coords}) => {

  const {language} = useLanguageContext();
  const [typeMonth, setTypeMonth] = useState(null);
  const {selectedTheme} = useThemeOption();
  const {handleAddText} = useAddText(webViewRef)
  useEffect(() => {
    if (webViewRef.current) {
      handleAddText(typeMonth, selectedTheme, "typeMonth", coords.typeData)
    }
  }, [typeMonth, selectedTheme]);
  return (
    <View>
      <Text>{translate.typeMonth[language] || translate.typeMonth["en"]}</Text>
      <Input value={typeMonth} onChangeText={(value: string) => setTypeMonth(value)} />
    </View>
  )
}

export default MonthInput
