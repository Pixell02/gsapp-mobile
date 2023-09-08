import React from 'react'
import {Linking, View, StyleSheet, Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';

const RadioContainer = ({checked, handleCheckedChange}) => {

  const handleClick = () => {
    const url = `https://grafika-sportowa.pl/sklep/`
    Linking.openURL(url)
  }
  return (
    <View style={styles.radioContainer}>
      <RadioButton.Group
        onValueChange={(value) => handleCheckedChange(value)}
        value={checked}
      >
        <View style={styles.radioItems}>
          <RadioButton.Item label="licencja" value="licencja" />
          <RadioButton.Item label="usługi" value="usługi" />
        </View>
      </RadioButton.Group>
      {checked === "usługi" && (
        <View>
          <TouchableOpacity onPress={handleClick}>
          <Text style={{color: "blue"}}>Zakup usług dostępne pod linkiem</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default RadioContainer

const styles = StyleSheet.create({
  radioContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  radioItems: {
    flexDirection: "row"
  }
});
