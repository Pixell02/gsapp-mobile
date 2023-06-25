import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header

const styles= StyleSheet.create({
  header: {
    width: '100%',
    marginLeft: 20,
    marginTop: 20
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_Medium"
  }
})