import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import useLanguageContext from '../../../hooks/useLanguageContext'
import translate from "../locales/translate.json"


export default function FreeTrialData({uses}) {
  const {language} = useLanguageContext();
  return (
    <View style={styles.container}>
      <Text>{translate.freeUsesFirstPart[language]} {uses} {translate.uses[language]}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
})
