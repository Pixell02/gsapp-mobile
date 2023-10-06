import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface props {
    preview: string;
    setImageUri: (value: string) => void;
}


const PreviewBlock = ({preview, setImageUri}: props) => {
  return (
    <View style={styles.imageContainer}>
      {preview && (
        <>
          <View style={styles.imageContent}>
            <Image source={{ uri: preview }} style={styles.image} />
          </View>
          <View style={styles.binContent}>
            <TouchableOpacity onPress={() => setImageUri("")}>
              <Image
                source={require("../img/bin.png")}
                style={styles.binImage}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default PreviewBlock;

const styles = StyleSheet.create({
    imageContainer: {
    width: "100%",
    height: 150,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  imageContent: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  binContent: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  binImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
