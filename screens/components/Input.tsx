import { View, Text, TextInput, StyleSheet } from "react-native";

import React from "react";

interface inputProps {
  name: string;
  onChangeText: (inputText: string) => void;
  text: string;
  isPassword?: boolean;
}

export default function Input(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.name}</Text>
      <TextInput secureTextEntry={props.isPassword? true : false} onChangeText={props.onChangeText} value={props.text} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 10
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    marginLeft: 5
  },
  input: {
    borderColor: "#7f7f7f",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 40,
    width: 250,
    backgroundColor: "#fff",
  },
});
