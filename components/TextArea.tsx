import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'


interface inputProps {
  name: string;
  onChangeText?: (inputText: string) => void;
  text: string;
  type?: any; 
}


const TextArea = (props: inputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.name}</Text>
      <TextInput
      keyboardType={props.type || 'default'} 
      multiline
      numberOfLines={5}
      onChangeText={props.onChangeText} 
      value={props.text} 
      style={styles.input} />
    </View>
  )
}

export default TextArea

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    marginBottom: 10
  },
  input: {
    borderColor: "#7f7f7f",
    borderWidth: 1,
    padding: 10,
    width: "100%",
    backgroundColor: "#fff",
  },
});