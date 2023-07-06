import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ChapterTitle = ({text}) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  )
}

export default ChapterTitle

const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins_Medium",
    marginLeft: 10
  }
});