import { View, StyleSheet, Image, Text } from "react-native"


interface navItemProps {
  image: any;
  name: string;
}


export default function NavItem(props: navItemProps):JSX.Element {
  return (
    <View style={styles.itemContainer}>
      <Image source={props.image} style={styles.image} />
      <Text style={styles.text}>{props.name}</Text>
    </View>
  )
}




const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    height: 35,
    resizeMode: "contain"
  },
  text: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 8
  }
});