import React from 'react'
import {View, StyleSheet} from 'react-native'
import { RadioButton } from 'react-native-paper';

const RadioContainer = ({checked, handleCheckedChange}) => {
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
