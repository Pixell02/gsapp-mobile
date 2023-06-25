import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'



interface Props {
  name: string;
  value: string;
  type: string;
  backGround: string;
}

export default function UserAccountData(props: Props) {
  const { name, value, type, backGround } = props;
 
  const getTextStyle = (type: string) => {
    return {
      fontFamily: type === 'normal' ? 'Poppins-SemiBold' : 'Poppins_Medium',
      fontSize: 13,
      color: '#333',
    };
  };
  const getBackGroundStyle = (backGround: string) => {
    return {
      backgroundColor: backGround === "light" ? "#FFF" : "#ededed",
      paddingLeft: 5,
    borderRadius: 5,
    fontSize: 13,
    height: 30,
    width: "100%",
    color: backGround === "light" ? "#989898" : "#000",
    }
  }


  return (
    <View style={styles.container}>
      <View>
        <Text style={getTextStyle(type)}>{name}</Text>
      </View>
      <TextInput style={getBackGroundStyle(backGround)} value={value} editable={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 10
  },
  
});

