import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RoundedButtonProps {
  text: string;
  onPress? : () => void;
}

export default function RoundedButton({ text, onPress }: RoundedButtonProps): JSX.Element {
  
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000000',
    borderRadius: 15,
    height: 50,
    width: 200,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: '#FFF',
    fontSize: 17,
    fontFamily: "Poppins-SemiBold"
  }
});
