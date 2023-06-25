import React from 'react'
import {View, StyleSheet, Text, TextInput} from 'react-native'

interface inputProps {
  name: string;
  onChangeText?: (inputText: string) => void;
  text: string;
  type?: any; 
}


const InputData = (props: inputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.name}</Text>
      <TextInput keyboardType={props.type || 'default'} onChangeText={props.onChangeText} value={props.text} style={styles.input} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    fontFamily: "Poppins-SemiBold",
  },
  input: {
    borderColor: "#7f7f7f",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 50,
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default InputData
