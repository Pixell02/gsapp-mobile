import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ImageBackground } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/do_tla.png")} style={styles.background}>
      <ActivityIndicator style={styles.loop} size={100} color="#000000" />
      <Text style={styles.text}>! PAMIĘTAJ</Text>
      <Text style={styles.additionalText}>WYGLĄD MA ZNACZENIE</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: "100%"
  },
  loop: {
    marginBottom: 30,
  },
  text: {
    fontSize: 25,
    letterSpacing: 2,
    fontWeight: 'bold',
    fontFamily: "Poppins-SemiBold",
    color: '#000000',
  },
  additionalText: {
    marginTop: 10,
    fontSize: 15,
    letterSpacing: 5,
    fontFamily: "Poppins-Medium"
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    width: "100%"
  },
});

export default LoadingScreen;
