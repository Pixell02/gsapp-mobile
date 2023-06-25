import React, { useContext } from 'react'
import {View, StyleSheet} from 'react-native'
import Title from '../../components/Title'
import translate  from "../locales/translate.json"
import { LanguageContext } from '../../../context/LanguageContext'
export default function Stats() {
  const {language} = useContext(LanguageContext)
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