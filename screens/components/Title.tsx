import {View, Text, StyleSheet} from 'react-native'

interface titleProps {
  name: string;
}



export default function Title(props: titleProps):JSX.Element {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.text}>{props.name}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  titleContainer: {
    width: "100%",
    marginLeft: 10,
    marginTop: 10
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20
  }

})
