import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type RootStackParamList = {
  // Definiujesz tutaj swoje ścieżki nawigacji
  Home: undefined;
  Details: { itemId: number };
  // Dodaj inne ścieżki nawigacji, jeśli ich używasz
};

type NavBlockProps = {
  image: any;
  name: string;
  link: string | React.FC; // Przypisanie typu klucza nawigacji
  sign: any;
};

const NavBlock: React.FC<NavBlockProps> = ({ image, name, link, sign }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const handlePress = (link) => {
    navigation.navigate(link)
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => handlePress(link)}>
      <ImageBackground source={image} style={styles.background}>
        <View style={styles.signContainer}>
          <Image source={sign} />
        </View>
        <View>
          <Text style={styles.text}>{name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default NavBlock;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 150,
    marginTop: 20,
    marginBottom: 20,
  },
  background: {
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  text: {
    fontFamily: "Poppins-Bold",
    color: "white",
    marginBottom: 5,
    marginRight: 15,
    fontSize: 21,
    letterSpacing: 1,
    width: 150,
    textAlign: "right"
  },
  signContainer: {
    marginTop: 15,
    marginRight: 15
  }
})
