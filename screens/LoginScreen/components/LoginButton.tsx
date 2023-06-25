import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

interface loginProps {
  name: string;
  onPress: () => void;
}



function LoginButton(props: loginProps):JSX.Element {
  return (
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={styles.text}>{props.name}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 5
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    color: "#FFF"
  }

})

export default LoginButton
