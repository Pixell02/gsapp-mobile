import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Description = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  )
}

export default Description

const styles = StyleSheet.create({
  container: {
    marginLeft: 10
  },
  text: {
    fontSize: 20
  }
});