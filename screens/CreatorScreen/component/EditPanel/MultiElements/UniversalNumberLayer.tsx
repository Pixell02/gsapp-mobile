import React from 'react'
import { View } from 'react-native'
import InputData from '../../../../../components/InputData'
import useTextLayer from './hooks/useTextLayer'

const UniversalNumberLayer = ({webViewRef, coords, properties, selectedMatch}) => {

  const {textValue, setTextValue} = useTextLayer(webViewRef, coords, properties, selectedMatch)

  return (
    <View>
      <InputData type={"numeric"} name={coords.className} text={textValue} onChangeText={(value) => setTextValue(value)} />
    </View>
  )
}

export default UniversalNumberLayer
