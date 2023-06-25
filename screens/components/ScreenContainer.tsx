import React from 'react'
import {View, StyleSheet} from 'react-native'

interface Props {
  children: React.ReactNode;
}

export default function ScreenContainer({children}: Props):JSX.Element {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1
  }
})