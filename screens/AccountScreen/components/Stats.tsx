import React from 'react'
import { StyleSheet, View } from 'react-native'
import useLanguageContext from '../../../hooks/useLanguageContext'
import Title from '../../components/Title'
import translate from "../locales/translate.json"
export default function Stats() {
  const {language} = useLanguageContext();
  return (
    <View style={styles.statsContainer}>
      <View style={styles.titleContainer}>
        <Title name={translate.stats[language]} />
        <View style={styles.statsContent}>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "flex-start"
  },
  statsContainer: {
    width: "90%"
  },
  statsContent: {
    height: 300,
    width: "100%",
    backgroundColor: "white"
  }
})