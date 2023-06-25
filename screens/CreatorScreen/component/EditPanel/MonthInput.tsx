import React, { useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Input from '../../../components/Input'
import translate from "../../locales/translate.json"
import { LanguageContext } from '../../../../context/LanguageContext'
const MonthInput = ({webViewRef, coords}) => {

  const {language} = useContext(LanguageContext);
  const [typeMonth, setTypeMonth] = useState(null);

  useEffect(() => {
    if(webViewRef.current && typeMonth) {
      webViewRef.current.injectJavaScript(`
      fabricCanvas._objects.forEach((item, i) => {
        if (item.className === "typeMonth") {
          fabricCanvas.remove(item);
        }
      });
      fabricCanvas.renderAll();
        var text = new fabric.Text("${typeMonth}", {
          top: ${ coords.typeMonth.Top},
          left: ${coords.typeMonth.Left},
          className: "typeMonth",
          selectable: false,
          fontFamily: "${coords.typeMonth.FontFamily}",
          fontSize: ${coords.typeMonth.FontSize},
          fill: "${coords.typeMonth.Fill}",
          originX: "${coords.typeMonth.OriginX}",
          originY: "${coords.typeMonth.OriginY}",
        });
        if(text.width > ${coords.typeMonth.ScaleToWidth}){
          text.scaleToWidth(${coords.typeMonth.ScaleToWidth});
        }
        fabricCanvas.add(text);
        fabricCanvas.renderAll();
    `);
    }
  },[typeMonth])

  return (
    <View>
      <Text>{translate.typeMonth[language]}</Text>
      <Input value={typeMonth} onChangeText={(value) => setTypeMonth(value)} />
    </View>
  )
}

export default MonthInput
