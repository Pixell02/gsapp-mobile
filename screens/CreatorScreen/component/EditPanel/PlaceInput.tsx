import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Input from '../../../components/Input'
import translate from "../../locales/translate.json"
import { LanguageContext } from '../../../../context/LanguageContext'
const PlaceInput = ({webViewRef, coords}) => {

  const {language} = useContext(LanguageContext)
  const [typePlace, setTypePlace] = useState(null);

  useEffect(() => {
    if(webViewRef.current && typePlace) {
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "typePlace") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
        var text = new fabric.Text("${typePlace}", {
          top: ${ coords.typePlace.Top},
          left: ${coords.typePlace.Left},
          className: "typePlace",
          selectable: false,
          fontFamily: "${coords.typePlace.FontFamily}",
          fontSize: ${coords.typePlace.FontSize},
          fill: "${coords.typePlace.Fill}",
          originX: "${coords.typePlace.OriginX}",
          originY: "${coords.typePlace.OriginY}",
        });
        if(text.width > ${coords.typePlace.ScaleToWidth}){
          text.scaleToWidth(${coords.typePlace.ScaleToWidth});
        }
        fabricCanvas.add(text);
        fabricCanvas.renderAll();
    `);
    }
  },[typePlace])

  return (
    <View>
      <Input name={translate.typePlace[language]} value={typePlace} onChangeText={(value) => setTypePlace(value)} /> 
    </View>
  )
}


export default PlaceInput
