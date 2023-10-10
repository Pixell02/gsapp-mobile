import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { StyleSheet, View } from 'react-native';



export default function TeamPicker({Teams, selectedValue, setSelectedValue}) {
  
  return (
    <View>
      <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.pickerContainer}>
            <Picker
              style={{ height: 20 }}
              selectedValue={selectedValue}
              onValueChange={(value) => setSelectedValue(value)}
            >
              {Teams.map((team) => (
                <Picker.Item
                  style={{ height: 10 }}
                  key={team.id}
                  label={team.firstName + " " + team.secondName}
                  value={team.firstName + " " + team.secondName}
                />
              ))}
            </Picker>
          </View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#c4c3c3",
    justifyContent: "center",
    padding: 10,
    height: 40,
    width: "65%",
    marginTop: 10,
    marginBottom: 20,
  },
  
});