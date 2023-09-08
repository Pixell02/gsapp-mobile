import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import usePromoCodeContext from "../../hooks/usePromoCodeContext";

const InputCode = () => {

  const {promoCode, usedCode, setUsedCode, handleUseCode} = usePromoCodeContext();

  return (
    <View style={styles.container}>
      <TextInput placeholder="Kod promocyjny" style={styles.input} value={usedCode} onChangeText={(value) => setUsedCode(value)} />
      <Button onPress={() => handleUseCode(usedCode)} 
      style={{ backgroundColor: "black", borderRadius: 0, marginLeft: 10 }}
      disabled={promoCode.code ? true : false}
      >
        <Text style={styles.text}>UŻYJ</Text>
      </Button>
    </View>
  );
};

export default InputCode;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    width: 150,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5
  },
  text: {
    color: "white",
    fontFamily: "Poppins-SemiBold"
  }
});
