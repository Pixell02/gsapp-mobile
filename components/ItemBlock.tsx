import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface TeamType {
  id: string;
  firstName: string;
  secondName?: string;
  img?: string;
  uid? : string
}

interface ItemBlockProps {
  firstName: string;
  secondName?: string;
  img: string;
  onPress: () => void;
}

function ItemBlock(props) {
 
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.touchableContainer}>
    <View key={props.firstName} style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.firstName + " "} {props.secondName ? props.secondName : null} </Text>
      </View>
      <View style={styles.imageContainer}>
        {props.img && (
          <Image style={styles.image} source={ {uri: props.img}} />
        )}
      </View>
    </View>
    </TouchableOpacity>
  );
}

export default ItemBlock;

const styles = StyleSheet.create({
  touchableContainer: {
    zIndex: 10,
    width: 200,
    height: 150,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#c4c3c3",
    backgroundColor: "white",
  },
  container: {
    width: 200,
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
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
    marginBottom: 10
  },
  image: {
    width: 100,
    flex: 1,
    resizeMode: "contain",
  },
});
