import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface props {
  place: string;
  onPress: () => void;
}

const SlabBlock = (props: props) => {
  return (
    <TouchableOpacity style={styles.slab} onPress={props.onPress}>
      <Text>{props.place}</Text>
    </TouchableOpacity>
  )
}

export default SlabBlock

const styles = StyleSheet.create({
  slab: {
    justifyContent: "center",
    width: 200,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#c4c3c3",
    height: 40,
    alignItems: "center",
    backgroundColor: "white"
  }
})