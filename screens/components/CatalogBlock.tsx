import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";


const CatalogBlock = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.touchableContainer}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.name}</Text>
        </View>
        <View style={styles.imageContainer}>
          {props.img && <Image style={styles.image} source={{ uri: props.img }} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CatalogBlock;

const styles = StyleSheet.create({
  touchableContainer: {
    width: "60%",
    height: 150,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#c4c3c3",
    backgroundColor: "white",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    width: "100%",
    flex: 1,
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    marginTop: 7,
    marginLeft: 10,
  },
  imageContainer: {
    alignItems: "center",
    flex: 3,
    marginBottom: 10,
  },
  image: {
    width: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
    resizeMode: "contain",
  },
});
