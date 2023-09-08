import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'

const AddBtn = ({onPress}):JSX.Element => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Image style={styles.img} source={require("./icons/plus-btn.png")} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: 100,
    position: "absolute",
    zIndex: 100,
    bottom: 30,
    right: 10
  },
  img: {
    width: 100,
    height: 100
  }
})


export default AddBtn
