import React, { useContext } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import translate from "../locales/translate.json"
import { LanguageContext } from '../../../context/LanguageContext'


export default function FreeTrialData({uses}) {
  const {language} = useContext(LanguageContext)
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
