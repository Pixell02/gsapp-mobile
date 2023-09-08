import React from 'react'
import useTextLayer from './hooks/useTextLayer'
import { View } from 'react-native'
import InputData from '../../../../components/InputData'

const UniversalTextLayer = ({ webViewRef, coords, properties, selectedMatch }) => {
  
  const {textValue, setTextValue} = useTextLayer(webViewRef, coords, properties, selectedMatch)

  return (
    <View>
      <InputData name={coords.className} text={textValue} onChangeText={(value) => setTextValue(value)} />
    </View>
  )
}

export default UniversalTextLayer
