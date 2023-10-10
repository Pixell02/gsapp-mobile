import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import useModalContextProvider from '../screens/MainPanelScreen/component/hooks/useModalContextProvider';

const AddBtn = ():JSX.Element => {

  const { setIsModalOpen} = useModalContextProvider();

  return (
    <TouchableOpacity onPress={() => setIsModalOpen(1)} style={styles.btn}>
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
