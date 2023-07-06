import React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import { useCollection } from '../../../hooks/useCollection';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  name: string;
  id: string;
  // favorite: boolean;
  key: string;
  open: () => void;
  setName: (name: string) => void;
  setId: (id: string) => void;
}

export default function CatalogContainer(props: Props): JSX.Element {

  

  const handleTouch = (name: string, id: string) => {
    
    props.open()
    props.setName(name)
    props.setId(id)
  }

  return (
    
    <View style={styles.catalogContainer}>
      <TouchableOpacity onPress={() => handleTouch(props.name, props.id)}>
      <View style={styles.name}>
        <Text>{props.name}</Text>
      </View>
      </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
  catalogContainer: {
    marginTop: 30,
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: "white"
  },
  name: {
    justifyContent: "center",
    height:"100%",
    marginLeft: 20
  }
})
