import { Picker } from '@react-native-picker/picker';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Option {
  label: string;
  value: string;
}

interface SelectPickerProps {
  name: string;
  options: Option[];
  onValueChange: (value: string) => void;
  selectedValue: string | null;
}

const SelectPicker: FC<SelectPickerProps> = ({name, options, onValueChange, selectedValue}) => {
  return (
    <>
      <View style={styles.text}>
        <Text style={styles.textStyle}>{name}</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
        selectedValue={selectedValue ? selectedValue : null}
        onValueChange={(value) => onValueChange(value)}
        >
          <Picker.Item label='' value='' />
        {options?.map((option: Option, i: number) => (
          <Picker.Item
          key={i}
          label={option.label}
          value={option.value}
          />
        ))}
        </Picker>
      </View>
    </>
  )
}

export default SelectPicker

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#7f7f7f",
    justifyContent: "center",
    padding: 10,
    height: 40,
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%"
  },
  textStyle: {
    fontFamily: "Poppins-SemiBold",
  }
})