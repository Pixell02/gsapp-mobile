import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useLanguageContext from '../../../../hooks/useLanguageContext';
import translate from "../../locales/translate.json";

const Title = () => {
  const {language} = useLanguageContext();
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{translate.editPanel[language]}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontFamily: "Poppins_Medium",
    fontSize: 25
  }
})
