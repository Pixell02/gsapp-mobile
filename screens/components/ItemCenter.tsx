import React from 'react'
import {View, StyleSheet} from 'react-native'

interface Props {
  children: React.ReactNode;
}

export default function ItemCenter({children}) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    flex: 8
  }
})