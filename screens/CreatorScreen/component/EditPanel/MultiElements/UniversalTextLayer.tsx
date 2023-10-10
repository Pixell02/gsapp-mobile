import React from 'react'
import { View } from 'react-native'
import InputData from '../../../../../components/InputData'
import useTextLayer from './hooks/useTextLayer'

const UniversalTextLayer = ({ webViewRef, coords, properties, selectedMatch }) => {
  
  const {textValue, setTextValue} = useTextLayer(webViewRef, coords, properties, selectedMatch)

  return (
    <View>
      <InputData name={coords.className} text={textValue} onChangeText={(value) => setTextValue(value)} />
    </View>
  )
}

export default UniversalTextLayer
