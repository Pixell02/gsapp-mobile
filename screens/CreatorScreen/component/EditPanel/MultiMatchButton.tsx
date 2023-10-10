import React from 'react';
import { View } from 'react-native';
import RoundedButton from '../../../../components/RoundedButton';

interface propsTypes {
  i: number;
  handleClick: (i: number) => void;
  
}

const MultiMatchButton = (props: propsTypes ) => {
  return (
    <View style={{ marginTop: 10, marginBottom: 10, width: "100%"}}>
      <RoundedButton text={"mecz" + props.i} onPress={() => props.handleClick(props.i)} />
    </View>
  )
}

export default MultiMatchButton
