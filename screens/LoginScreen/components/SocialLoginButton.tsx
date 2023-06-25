import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import { ImageSourcePropType } from "react-native";
interface SocialLoginButtonProps {
  name: string;
  img: ImageSourcePropType;
  press: () => void;
}

export default function SocialLoginButton(props: SocialLoginButtonProps): JSX.Element {
  return (
    <View>
      <TouchableOpacity onPress={props.press} style={styles.button}>
        <Image style={styles.image} source={props.img} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{props.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 250,
    backgroundColor: "#FFF",
    borderColor: "#7f7f7f",
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    marginLeft: 12,
    width: 25,
    height: 25,
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    marginLeft: 10,
  },
  textContainer: {
    alignItems: "center",
    paddingRight: 20
  },
});
